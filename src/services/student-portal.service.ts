import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

export interface StudentDashboardPayload {
  user: {
    id: string;
    email: string;
  };
  studentName: string;
  studentClass: string;
  targetExam: string;
  schoolName: string;
  phone: string;
  email: string;
  applicationNo: string;
  totalApplications: number;
  activeExam: {
    id: string;
    title: string;
    examDate: string;
    status: string;
    centre: string;
    applicationNo: string;
    classEnrolled: string;
    stream: string;
  } | null;
  admitCard: {
    rollNumber: string;
    verificationToken: string;
    isGenerated: boolean;
    status: string;
  } | null;
  admitCardStatus: string;
  scorecardStatus: string;
  notificationsCount: number;
}

/**
 * Fetches dynamic, real database-backed dashboard information for the authenticated student.
 * Scoped strictly to the authenticated user ID and compliant with PostgreSQL RLS.
 */
export async function getStudentDashboardData(
  supabase: SupabaseClient<Database>
): Promise<StudentDashboardPayload | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // 1. Fetch Student Profile
  const { data: studentProfile } = await (supabase
    .from("student_profiles") as any)
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // 2. Fetch User Profile (fallback)
  const { data: userProfile } = await (supabase
    .from("user_profiles") as any)
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const studentName =
    studentProfile?.full_name ||
    userProfile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Student";

  const studentClass = studentProfile?.current_class || "Class 12";
  const targetExam = studentProfile?.target_exam || "IIT-JEE";
  const schoolName = studentProfile?.school_name || "Emprise Academy";
  const phone = studentProfile?.phone || userProfile?.phone || "";
  const email = user.email || studentProfile?.email || "";

  // 3. Fetch ETSE Registrations (scoped to owner)
  let applicationsQuery = (supabase.from("etse_registrations") as any)
    .select("*, etse_exams(*), exam_centres(*)", { count: "exact" });

  if (studentProfile?.id) {
    applicationsQuery = applicationsQuery.or(`student_profile_id.eq.${studentProfile.id},user_id.eq.${user.id}`);
  } else {
    applicationsQuery = applicationsQuery.eq("user_id", user.id);
  }

  const { data: applications, count: totalAppsCount } = await applicationsQuery
    .order("created_at", { ascending: false });

  const totalApplications = totalAppsCount || applications?.length || 0;
  const latestApp = applications && applications.length > 0 ? applications[0] : null;

  let activeExam: StudentDashboardPayload["activeExam"] = null;
  let activeAdmitCard: StudentDashboardPayload["admitCard"] = null;

  if (latestApp) {
    const examData = latestApp.etse_exams || {};
    const centreData = latestApp.exam_centres || {};

    activeExam = {
      id: latestApp.id,
      title: examData.title || "Emprise Talent Search Examination 2026 (ETSE 2026)",
      examDate: examData.exam_date
        ? `${new Date(examData.exam_date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} (${examData.exam_time || "10:00 AM"})`
        : "Sunday, 6 September 2026 (10:00 AM)",
      status: latestApp.status || "CONFIRMED",
      centre: centreData.centre_name ? `${centreData.centre_name}, ${centreData.city || "Mathura"}` : "Emprise Academy Campus, Mathura",
      applicationNo: latestApp.application_number,
      classEnrolled: latestApp.current_class || studentClass,
      stream: latestApp.stream_interest || "Engineering (IIT-JEE)",
    };

    // 4. Fetch Admit Card for active registration
    const { data: admitCardRecord } = await (supabase
      .from("admit_cards") as any)
      .select("*")
      .eq("registration_id", latestApp.id)
      .maybeSingle();

    if (admitCardRecord) {
      activeAdmitCard = {
        rollNumber: admitCardRecord.roll_number,
        verificationToken: admitCardRecord.verification_token,
        isGenerated: admitCardRecord.is_generated,
        status: admitCardRecord.status || "PUBLISHED",
      };
    }
  }

  // 5. Fetch Notifications Count
  const { count: unreadCount } = await (supabase
    .from("notifications") as any)
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  const notificationsCount = unreadCount || 0;

  // 6. Compute Admit Card Status
  let admitCardStatus = "No Application";
  if (latestApp) {
    if (activeAdmitCard?.isGenerated || activeAdmitCard?.status === "PUBLISHED" || activeAdmitCard?.status === "GENERATED") {
      admitCardStatus = "Ready";
    } else {
      admitCardStatus = "Pending";
    }
  }

  // 7. Compute Scorecard Status
  let scorecardStatus = "No Records";
  if (studentProfile?.id) {
    const { data: results } = await (supabase
      .from("results") as any)
      .select("qualifying_status")
      .eq("student_profile_id", studentProfile.id)
      .eq("is_published", true)
      .limit(1)
      .maybeSingle();

    if (results) {
      scorecardStatus = results.qualifying_status || "Declared";
    } else if (latestApp) {
      scorecardStatus = "Post-Exam";
    }
  } else if (latestApp) {
    scorecardStatus = "Post-Exam";
  }

  const applicationNo = activeExam?.applicationNo || studentProfile?.admission_number || "Pending";

  return {
    user: {
      id: user.id,
      email: user.email || "",
    },
    studentName,
    studentClass,
    targetExam,
    schoolName,
    phone,
    email,
    applicationNo,
    totalApplications,
    activeExam,
    admitCard: activeAdmitCard,
    admitCardStatus,
    scorecardStatus,
    notificationsCount,
  };
}
