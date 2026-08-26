import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import {
  LeadIntakeInput,
  LeadUpdateStatusInput,
  LeadFollowupInput,
} from "@/validations/crm.validation";
import { logAuditEvent } from "@/lib/audit";
import { NotFoundError } from "@/lib/errors";

export class LeadService {
  /**
   * Captures a new lead from any public source (Website enquiry, popup, WhatsApp link, etc.)
   */
  public static async captureLead(input: LeadIntakeInput) {
    const adminSupabase = createAdminClient();

    // Check if recent lead with same phone exists to prevent spam duplicates
    const { data: existingLead } = await (adminSupabase
      .from("leads") as any)
      .select("id, status, notes")
      .eq("phone", input.phone)
      .is("deleted_at", null)
      .maybeSingle();

    if (existingLead) {
      // Append note rather than duplicate
      const updatedNotes = `${existingLead.notes || ""}\n[${new Date().toISOString()}] Re-enquiry: ${input.notes || "Interest in " + (input.courseInterest || "courses")}`;
      await (adminSupabase
        .from("leads") as any)
        .update({
          notes: updatedNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingLead.id);

      return { leadId: existingLead.id, isExisting: true };
    }

    const { data: newLead, error } = await (adminSupabase
      .from("leads") as any)
      .insert({
        student_name: input.studentName,
        parent_name: input.parentName || null,
        phone: input.phone,
        email: input.email || null,
        class: input.class || null,
        school: input.school || null,
        course_interest: input.courseInterest || null,
        source: input.source,
        status: "NEW",
        notes: input.notes || null,
      })
      .select("id")
      .single();

    if (error || !newLead) {
      throw new Error(`Failed to capture lead: ${error?.message}`);
    }

    await logAuditEvent({
      action: "LEAD_CAPTURED",
      entityName: "leads",
      entityId: newLead.id,
      metadata: { source: input.source, studentName: input.studentName },
    });

    return { leadId: newLead.id, isExisting: false };
  }

  /**
   * Records a counsellor follow-up interaction
   */
  public static async addFollowup(input: LeadFollowupInput, counsellorId: string) {
    const supabase = await createClientServer();

    const { data: followup, error } = await (supabase
      .from("lead_followups") as any)
      .insert({
        lead_id: input.leadId,
        counsellor_id: counsellorId,
        followup_type: input.followupType,
        remarks: input.remarks,
        next_action: input.nextAction || null,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    // If next followup date is scheduled, update lead
    if (input.nextFollowupDate) {
      await (supabase
        .from("leads") as any)
        .update({ next_followup_at: input.nextFollowupDate })
        .eq("id", input.leadId);
    }

    return followup;
  }

  /**
   * Updates lead status and assigned counsellor
   */
  public static async updateLeadStatus(
    leadId: string,
    input: LeadUpdateStatusInput,
    adminUserId: string
  ) {
    const supabase = await createClientServer();

    const { data, error } = await (supabase
      .from("leads") as any)
      .update({
        status: input.status,
        assigned_counsellor_id: input.assignedCounsellorId || null,
        next_followup_at: input.nextFollowupAt || null,
        notes: input.notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId)
      .select("*")
      .single();

    if (error || !data) throw new NotFoundError("Lead", leadId);

    await logAuditEvent({
      userId: adminUserId,
      action: "LEAD_STATUS_CHANGED",
      entityName: "leads",
      entityId: leadId,
      metadata: { newStatus: input.status, counsellor: input.assignedCounsellorId },
    });

    return data;
  }
}
