import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import { AdmitCard, AdmitCardVerificationResult } from "@/types/etse";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { logAuditEvent } from "@/lib/audit";
import crypto from "crypto";

export class AdmitCardService {
  /**
   * Idempotently creates an admit card for an ETSE registration with snapshot immutability
   */
  public static async createAdmitCardForRegistration(
    registrationId: string,
    context?: {
      exam?: any;
      centre?: any;
      registration?: any;
    }
  ): Promise<AdmitCard> {
    const adminSupabase = createAdminClient();

    // 1. Check if admit card already exists (Idempotency)
    const { data: existingCard } = await (adminSupabase
      .from("admit_cards") as any)
      .select("*")
      .eq("registration_id", registrationId)
      .maybeSingle();

    if (existingCard) {
      return existingCard as AdmitCard;
    }

    // 2. Fetch registration, exam, and centre details if not passed
    let reg = context?.registration;
    let exam = context?.exam;
    let centre = context?.centre;

    if (!reg) {
      const { data: fetchedReg, error: regErr } = await (adminSupabase
        .from("etse_registrations") as any)
        .select("*, exam:etse_exams(*), centre:exam_centres(*)")
        .eq("id", registrationId)
        .single();

      if (regErr || !fetchedReg) {
        throw new NotFoundError("ETSE Registration", registrationId);
      }
      reg = fetchedReg;
      exam = fetchedReg.exam;
      centre = fetchedReg.centre;
    }

    // 3. Generate Roll Number: YEAR + 2-digit Class Code + 5-digit sequence
    const classDigits = (reg.current_class || "").replace(/\D/g, "").padStart(2, "0") || "10";
    const appSeq = (reg.application_number || "").split("-")[1] || Math.floor(10000 + Math.random() * 90000).toString();
    const rollNumber = `${exam.year}${classDigits}${appSeq}`;

    // 4. Generate Cryptographic Verification Token
    const verificationToken = crypto
      .createHash("sha256")
      .update(`${reg.id}:${reg.phone}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`)
      .digest("hex");

    const qrVerificationUrl = `/verify-admit-card/${verificationToken}`;

    // 5. Insert Admit Card with Historical Snapshot Data
    const { data: admitCard, error: insertError } = await (adminSupabase
      .from("admit_cards") as any)
      .insert({
        registration_id: reg.id,
        exam_id: reg.exam_id,
        roll_number: rollNumber,
        verification_token: verificationToken,
        qr_verification_url: qrVerificationUrl,
        exam_date: exam.exam_date,
        exam_time: exam.exam_time,
        reporting_time: exam.reporting_time,
        exam_centre_id: reg.exam_centre_id,
        status: "PUBLISHED",
        // Snapshot immutability
        student_name_snapshot: reg.student_name,
        father_name_snapshot: reg.father_name,
        mother_name_snapshot: reg.mother_name || null,
        dob_snapshot: reg.dob,
        class_snapshot: reg.current_class,
        school_name_snapshot: reg.school_name,
        centre_name_snapshot: centre.centre_name,
        centre_address_snapshot: centre.address,
        instructions_snapshot: exam.instructions || [],
        is_generated: true,
        generated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (insertError || !admitCard) {
      throw new Error(`Failed to create admit card: ${insertError?.message}`);
    }

    // Update registration status
    await (adminSupabase
      .from("etse_registrations") as any)
      .update({ status: "ADMIT_CARD_GENERATED", updated_at: new Date().toISOString() })
      .eq("id", reg.id);

    return admitCard as AdmitCard;
  }

  /**
   * Regenerates an admit card with new token or updated center
   */
  public static async regenerateAdmitCard(
    admitCardId: string,
    adminUserId: string,
    reason: string
  ): Promise<AdmitCard> {
    const adminSupabase = createAdminClient();

    const { data: existing, error } = await (adminSupabase
      .from("admit_cards") as any)
      .select("*, registration:etse_registrations(*), exam:etse_exams(*), centre:exam_centres(*)")
      .eq("id", admitCardId)
      .single();

    if (error || !existing) throw new NotFoundError("Admit Card", admitCardId);

    const newToken = crypto
      .createHash("sha256")
      .update(`${existing.id}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`)
      .digest("hex");

    const { data: updatedCard, error: updateError } = await (adminSupabase
      .from("admit_cards") as any)
      .update({
        verification_token: newToken,
        qr_verification_url: `/verify-admit-card/${newToken}`,
        regenerated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", admitCardId)
      .select("*")
      .single();

    if (updateError || !updatedCard) throw new Error(updateError?.message);

    await logAuditEvent({
      userId: adminUserId,
      action: "ADMIT_CARD_REGENERATED",
      entityName: "admit_cards",
      entityId: admitCardId,
      metadata: { reason, previousToken: existing.verification_token },
    });

    return updatedCard as AdmitCard;
  }

  /**
   * Revokes an admit card
   */
  public static async revokeAdmitCard(
    admitCardId: string,
    adminUserId: string,
    reason: string
  ): Promise<AdmitCard> {
    const adminSupabase = createAdminClient();

    if (!reason || reason.trim().length < 5) {
      throw new ValidationError("A valid revocation reason is required (min 5 characters).");
    }

    const { data: updated, error } = await (adminSupabase
      .from("admit_cards") as any)
      .update({
        status: "REVOKED",
        revoked_at: new Date().toISOString(),
        revocation_reason: reason,
        updated_at: new Date().toISOString(),
      })
      .eq("id", admitCardId)
      .select("*")
      .single();

    if (error || !updated) throw new NotFoundError("Admit Card", admitCardId);

    await logAuditEvent({
      userId: adminUserId,
      action: "ADMIT_CARD_REVOKED",
      entityName: "admit_cards",
      entityId: admitCardId,
      metadata: { reason },
    });

    return updated as AdmitCard;
  }

  /**
   * Verifies an admit card publicly using its unique verification token.
   * Checks status and reveals only minimum necessary information.
   */
  public static async verifyPublicAdmitCard(
    token: string
  ): Promise<AdmitCardVerificationResult> {
    const supabase = await createClientServer();

    const { data, error } = await (supabase as any).rpc("verify_admit_card_public", {
      p_token: token,
    });

    if (error || !data) {
      return {
        isValid: false,
        message: "Invalid or expired admit card verification token",
        verifiedAt: new Date().toISOString(),
      };
    }

    const res = data as any;
    if (res.status === "REVOKED") {
      return {
        isValid: false,
        status: "REVOKED",
        candidateName: res.candidateName,
        rollNumber: res.rollNumber,
        examTitle: res.examTitle,
        revocationReason: res.revocationReason || "Revoked by examination board",
        message: "This admit card has been REVOKED and is no longer valid.",
        verifiedAt: new Date().toISOString(),
      };
    }

    return {
      isValid: res.isValid !== false,
      candidateName: res.candidateName,
      applicationNumber: res.applicationNumber,
      rollNumber: res.rollNumber,
      examTitle: res.examTitle,
      examDate: res.examDate,
      examCentre: res.examCentre,
      centreAddress: res.centreAddress,
      status: res.status || "PUBLISHED",
      verifiedAt: new Date().toISOString(),
    };
  }

  /**
   * Fetches admit cards for an authenticated student
   */
  public static async getStudentAdmitCards(studentUserId: string) {
    const supabase = await createClientServer();

    const { data, error } = await (supabase
      .from("admit_cards") as any)
      .select(`
        *,
        registration:etse_registrations(*),
        exam:etse_exams(*),
        centre:exam_centres(*)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to load admit cards: ${error.message}`);
    }

    return data as AdmitCard[];
  }
}
