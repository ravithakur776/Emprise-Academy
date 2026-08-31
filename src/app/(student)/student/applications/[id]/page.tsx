"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { ArrowLeft, CreditCard, Building, Calendar, CheckCircle2, ShieldCheck, Printer, AlertCircle, RefreshCw } from "lucide-react";

export default function StudentApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [app, setApp] = useState<any | null>(null);

  const loadDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push(`/student/login?redirectTo=%2Fstudent%2Fapplications%2F${resolvedParams.id}`);
        return;
      }

      // Query application
      const { data: reg, error: regError } = await (supabase
        .from("etse_registrations") as any)
        .select("*, etse_exams(*), exam_centres(*)")
        .eq("id", resolvedParams.id)
        .maybeSingle();

      if (regError || !reg) {
        setError("Application not found or access restricted.");
        return;
      }

      const exam = reg.etse_exams || {};
      const centre = reg.exam_centres || {};

      setApp({
        id: reg.id,
        examTitle: exam.title || "Emprise Talent Search Examination 2026 (ETSE 2026)",
        applicationNo: reg.application_number,
        studentName: reg.student_name,
        fatherName: reg.father_name,
        motherName: reg.mother_name || "",
        dob: reg.dob ? new Date(reg.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "",
        gender: reg.gender || "Male",
        currentClass: reg.current_class || "Class 12",
        schoolName: reg.school_name || "Emprise Academy",
        phone: reg.phone,
        email: reg.email || user.email,
        streamInterest: reg.stream_interest || "Engineering (IIT-JEE)",
        registrationDate: new Date(reg.registered_at || reg.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        examDate: exam.exam_date
          ? new Date(exam.exam_date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
          : "Sunday, 6 September 2026",
        examTime: `${exam.exam_time || "10:00 AM – 12:00 PM"} (Reporting: ${exam.reporting_time || "09:30 AM"})`,
        examCentre: centre.centre_name ? `${centre.centre_name}, ${centre.city || "Mathura"}` : "Emprise Academy Campus, Mathura",
        centreAddress: centre.address || "Mathura, Uttar Pradesh",
        status: reg.status || "CONFIRMED",
      });
    } catch (err: any) {
      console.error("[APP_DETAIL_ERROR]", err);
      setError(err?.message || "Failed to load application details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
          <div className="h-6 bg-slate-200 rounded-md w-1/4" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-96" />
        </div>
      </StudentLayout>
    );
  }

  if (error || !app) {
    return (
      <StudentLayout>
        <div className="p-8 rounded-3xl bg-white border border-rose-200 text-center space-y-4 max-w-md mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Application Unavailable</h2>
          <p className="text-xs text-slate-600">{error || "Could not locate this examination application."}</p>
          <Link href="/student/applications">
            <Button variant="primary" size="sm">
              Back to Applications
            </Button>
          </Link>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      studentName={app.studentName}
      studentClass={app.currentClass}
      applicationNo={app.applicationNo}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top Back Link & Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/applications"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[var(--brand-primary)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Applications List</span>
          </Link>
        </div>

        {/* Application Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                OFFICIAL REGISTRATION SNAPSHOT
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)]">
                {app.examTitle}
              </h1>
            </div>

            <Badge variant="success" size="md">
              {app.status === "REGISTERED" || app.status === "CONFIRMED" ? "Registration Confirmed" : app.status}
            </Badge>
          </div>

          {/* Key Reference Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Application No</span>
              <strong className="text-[var(--brand-primary)] font-mono text-sm">{app.applicationNo}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Registration Date</span>
              <strong className="text-slate-900">{app.registrationDate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Candidate Class</span>
              <strong className="text-slate-900">{app.currentClass}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Stream</span>
              <strong className="text-slate-900">{app.streamInterest}</strong>
            </div>
          </div>

          {/* Candidate Details Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Candidate Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Full Name</span>
                <span className="font-semibold text-slate-900">{app.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Father&apos;s Name</span>
                <span className="font-semibold text-slate-900">{app.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Mother&apos;s Name</span>
                <span className="font-semibold text-slate-900">{app.motherName || "—"}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Date of Birth</span>
                <span className="font-semibold text-slate-900">{app.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Gender</span>
                <span className="font-semibold text-slate-900">{app.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">School Name</span>
                <span className="font-semibold text-slate-900">{app.schoolName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Contact Phone</span>
                <span className="font-semibold text-slate-900">{app.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Contact Email</span>
                <span className="font-semibold text-slate-900">{app.email}</span>
              </div>
            </div>
          </div>

          {/* Allotted Examination Centre */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--brand-primary)]">
              <Building className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>Allotted Examination Center</span>
            </div>
            <p className="text-xs font-semibold text-slate-900">{app.examCentre}</p>
            <p className="text-xs text-slate-500">{app.centreAddress}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => window.print()} leftIcon={<Printer className="w-4 h-4" />}>
              Print Confirmation
            </Button>
            <Link href="/student/admit-cards">
              <Button variant="primary" size="sm" rightIcon={<CreditCard className="w-4 h-4" />}>
                Check Admit Card
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
