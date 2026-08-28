import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { data, error } = await (supabase
      .from("leads") as any)
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    const lead = {
      id: data.id,
      reference: `ENQ-${data.id.slice(0, 8).toUpperCase()}`,
      studentName: data.student_name || "Prospective Student",
      parentName: data.parent_name || "-",
      phone: data.phone,
      email: data.email || "-",
      class: data.class || "Not Specified",
      school: data.school || "-",
      programme: data.course_interest || "General Enquiry",
      targetExam: data.course_interest || "Academic Assessment",
      source: data.source || "WEBSITE",
      preferredMode: "Classroom",
      preferredDate: data.next_followup_at || "-",
      status: data.status || "NEW",
      createdAt: new Date(data.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      notes: data.notes
        ? [
            {
              id: "n-1",
              author: "Intake Note",
              date: new Date(data.created_at).toLocaleDateString("en-IN"),
              text: data.notes,
            },
          ]
        : [],
      timeline: [
        {
          action: "Lead Captured",
          time: new Date(data.created_at).toLocaleDateString("en-IN"),
          user: data.source || "System",
        },
      ],
    };

    return NextResponse.json({ success: true, data: lead });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createAdminClient();

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.status) updatePayload.status = body.status;
    if (body.notes) updatePayload.notes = body.notes;

    const { data, error } = await (supabase
      .from("leads") as any)
      .update(updatePayload)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Failed to update lead" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
