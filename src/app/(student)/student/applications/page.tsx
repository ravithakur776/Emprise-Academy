"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { FileText, Calendar, Building, CheckCircle2, ArrowRight, Eye, CreditCard, RefreshCw } from "lucide-react";

export default function StudentApplicationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentIdentity, setStudentIdentity] = useState({
    name: "Student",
    class: "Class 12",
    applicationNo: "ETSE Portal",
  });
  const [applications, setApplications] = useState<any[]>([]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fapplications");
        return;
      }

      // Fetch student profile
      const { data: studentProf } = await (supabase
        .from("student_profiles") as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: userProf } = await (supabase
        .from("user_profiles") as any)
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const name =
        studentProf?.full_name ||
        userProf?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student";
      const currentClass = studentProf?.current_class || "Class 12";

      // Query etse_registrations
      let q = (supabase.from("etse_registrations") as any)
        .select("*, etse_exams(*), exam_centres(*)");

      if (studentProf?.id) {
        q = q.or(`student_profile_id.eq.${studentProf.id},user_id.eq.${user.id}`);
      } else {
        q = q.eq("user_id", user.id);
      }

      const { data: appRecords } = await q.order("created_at", { ascending: false });

      if (appRecords && appRecords.length > 0) {
        const formatted = appRecords.map((r: any) => {
          const exam = r.etse_exams || {};
          const centre = r.exam_centres || {};
          return {
            id: r.id,
            examTitle: exam.title || "Emprise Talent Search Examination 2026",
            applicationNo: r.application_number,
            academicYear: exam.year ? `${exam.year}–${(exam.year + 1).toString().slice(2)}` : "2026–27",
            registrationDate: new Date(r.registered_at || r.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            examDate: exam.exam_date
              ? `${new Date(exam.exam_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} (${exam.exam_time || "10:00 AM"})`
              : "6 September 2026 (10:00 AM – 12:00 PM)",
            status: r.status || "CONFIRMED",
            classEnrolled: r.current_class || currentClass,
            stream: r.stream_interest || "Foundation (Science & Mathematics)",
            centre: centre.centre_name ? `${centre.centre_name}, ${centre.city || "Mathura"}` : "Emprise Academy Campus, Mathura",
          };
        });
        setApplications(formatted);
        setStudentIdentity({
          name,
          class: currentClass,
          applicationNo: formatted[0].applicationNo,
        });
      } else {
        setApplications([]);
        setStudentIdentity({
          name,
          class: currentClass,
          applicationNo: studentProf?.admission_number || "No Application",
        });
      }
    } catch (err) {
      console.error("[APPLICATIONS_LOAD_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-md w-1/3" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-64" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      studentName={studentIdentity.name}
      studentClass={studentIdentity.class}
      applicationNo={studentIdentity.applicationNo}
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              EXAMINATION APPLICATIONS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Registered Applications
            </h1>
          </div>

          <Link href="/etse-2026">
            <Button variant="primary" size="sm">
              Register for New Exam
            </Button>
          </Link>
        </div>

        {/* Applications List */}
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4 hover:border-[var(--brand-accent)] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-slate-400">
                        Session {app.academicYear}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] font-bold text-[var(--brand-accent)]">
                        {app.stream}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--brand-primary)]">
                      {app.examTitle}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="md">
                      {app.status === "REGISTERED" || app.status === "CONFIRMED" ? "Registration Confirmed" : app.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Application Number</span>
                    <strong className="text-slate-900 font-mono text-sm">{app.applicationNo}</strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Exam Date</span>
                    <strong className="text-amber-800">{app.examDate}</strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Allotted Center</span>
                    <strong className="text-slate-900">{app.centre}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500">
                    Registered on: {app.registrationDate}
                  </span>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <Link href={`/student/applications/${app.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" fullWidth className="sm:w-auto" leftIcon={<Eye className="w-4 h-4" />}>
                        View Details
                      </Button>
                    </Link>
                    <Link href="/student/admit-cards" className="w-full sm:w-auto">
                      <Button variant="primary" size="sm" fullWidth className="sm:w-auto" leftIcon={<CreditCard className="w-4 h-4" />}>
                        Admit Card
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Applications Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have any active examination applications registered under your account.
            </p>
            <Link href="/etse-2026">
              <Button variant="primary" size="sm">
                Register for ETSE 2026
              </Button>
            </Link>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
