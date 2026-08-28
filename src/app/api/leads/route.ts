import { NextRequest, NextResponse } from "next/server";
import { leadIntakeSchema } from "@/validations/crm.validation";
import { LeadService } from "@/services/lead.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    let dbQuery = (supabase.from("leads") as any)
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (status && status !== "ALL") {
      dbQuery = dbQuery.eq("status", status);
    }

    if (query) {
      dbQuery = dbQuery.or(`student_name.ilike.%${query}%,phone.ilike.%${query}%`);
    }

    const { data, error } = await dbQuery.limit(100);

    if (error) {
      return NextResponse.json({ success: true, data: [] });
    }

    const leads = (data || []).map((item: any) => ({
      id: item.id,
      reference: `ENQ-${item.id.slice(0, 8).toUpperCase()}`,
      studentName: item.student_name || "Prospective Student",
      parentName: item.parent_name || "-",
      phone: item.phone,
      email: item.email || "-",
      class: item.class || "Not Specified",
      school: item.school || "-",
      programme: item.course_interest || "General Enquiry",
      source: item.source || "WEBSITE",
      status: item.status || "NEW",
      assignedCounsellor: "Unassigned",
      nextFollowup: item.next_followup_at
        ? new Date(item.next_followup_at).toLocaleDateString("en-IN")
        : "-",
      createdAt: new Date(item.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json({ success: true, data: leads });
  } catch {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = leadIntakeSchema.parse(body);

    const result = await LeadService.captureLead(validatedInput);

    return apiSuccess(
      result,
      {
        message: "Your enquiry has been received. Our academic counsellor will contact you shortly.",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
