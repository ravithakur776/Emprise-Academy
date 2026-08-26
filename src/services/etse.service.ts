import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import { ETSERegistrationInput } from "@/validations/etse.validation";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { logAuditEvent } from "@/lib/audit";

export class ETSEService {
  /**
   * Registers a student for ETSE and triggers automatic admit card creation
   */
  public static async registerStudent(
    input: ETSERegistrationInput,
    userId?: string | null
  ) {
    const adminSupabase = createAdminClient();

    // 1. Verify exam exists and registration is open
    const { data: exam, error: examError } = await (adminSupabase
      .from("etse_exams") as any)
      .select("*")
      .eq("id", input.examId)
      .eq("is_active", true)
      .single();

    if (examError || !exam) {
      throw new NotFoundError("ETSE Exam", input.examId);
    }

    const today = new Date().toISOString().split("T")[0];
    if (today < exam.registration_start_date || today > exam.registration_end_date) {
      throw new ValidationError("Registrations for this examination are currently closed.");
    }

    // 2. Verify Exam Centre exists and is active
    const { data: centre, error: centreError } = await (adminSupabase
      .from("exam_centres") as any)
      .select("*")
      .eq("id", input.examCentreId)
      .eq("is_active", true)
      .single();

    if (centreError || !centre) {
      throw new NotFoundError("Exam Centre", input.examCentreId);
    }

    // 3. Generate sequential application number server-side: ETSE{YEAR}-{SEQUENCE}
    const appSeq = Date.now().toString().slice(-6);
    const applicationNumber = `ETSE${exam.year}-${appSeq}`;

    // 4. Create registration record (trigger will automatically generate Admit Card)
    const { data: registration, error: regError } = await (adminSupabase
      .from("etse_registrations") as any)
      .insert({
        application_number: applicationNumber,
        user_id: userId || null,
        exam_id: input.examId,
        student_name: input.studentName,
        father_name: input.fatherName,
        mother_name: input.motherName || null,
        dob: input.dob,
        gender: input.gender,
        phone: input.phone,
        email: input.email || null,
        current_class: input.currentClass,
        school_name: input.schoolName,
        stream_interest: input.streamInterest,
        exam_centre_id: input.examCentreId,
        photo_url: input.photoUrl || null,
        status: "REGISTERED",
        registered_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (regError || !registration) {
      throw new Error(`Failed to create ETSE registration: ${regError?.message}`);
    }

    // 5. Fetch generated Admit Card
    const { data: admitCard } = await (adminSupabase
      .from("admit_cards") as any)
      .select("*")
      .eq("registration_id", registration.id)
      .maybeSingle();

    // 6. Log audit event
    await logAuditEvent({
      userId: userId || null,
      action: "ETSE_REGISTRATION_SUBMITTED",
      entityName: "etse_registrations",
      entityId: registration.id,
      metadata: {
        applicationNumber,
        examId: input.examId,
        studentName: input.studentName,
      },
    });

    return {
      registration,
      admitCard,
      applicationNumber,
    };
  }

  /**
   * Fetches active ETSE exams for public registration
   */
  public static async getActiveExams() {
    const supabase = await createClientServer();
    const { data, error } = await supabase
      .from("etse_exams")
      .select("*")
      .eq("is_active", true)
      .order("exam_date", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Fetches active exam centres for registration dropdown
   */
  public static async getActiveCentres() {
    const supabase = await createClientServer();
    const { data, error } = await supabase
      .from("exam_centres")
      .select("id, centre_code, centre_name, address, city, pincode")
      .eq("is_active", true)
      .order("centre_name", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }
}
