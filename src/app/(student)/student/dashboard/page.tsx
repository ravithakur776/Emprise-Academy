"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import {
  getStudentDashboardData,
  StudentDashboardPayload,
} from "@/services/student-portal.service";
import {
  FileText,
  CreditCard,
  Trophy,
  Bell,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading dashboard...">
      {/* Banner Skeleton */}
      <div className="rounded-3xl bg-slate-200 h-48 sm:h-52 w-full p-6 sm:p-8" />

      {/* 4 Stat Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 h-28 space-y-2">
            <div className="h-3 bg-slate-200 rounded-md w-1/2" />
            <div className="h-6 bg-slate-200 rounded-md w-3/4" />
            <div className="h-3 bg-slate-100 rounded-md w-2/3" />
          </div>
        ))}
      </div>

      {/* Application Card Skeleton */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 h-64 space-y-4">
        <div className="h-4 bg-slate-200 rounded-md w-1/4" />
        <div className="h-6 bg-slate-200 rounded-md w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StudentDashboardPayload | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClientBrowser();
      const payload = await getStudentDashboardData(supabase);

      if (!payload) {
        // Not authenticated
        router.push("/student/login?redirectTo=%2Fstudent%2Fdashboard");
        return;
      }

      setData(payload);
    } catch (err: any) {
      console.error("[STUDENT_DASHBOARD_ERROR]", err);
      setError(err?.message || "Failed to load student dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <DashboardSkeleton />
      </StudentLayout>
    );
  }

  if (error || !data) {
    return (
      <StudentLayout>
        <div className="p-8 rounded-3xl bg-white border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Dashboard Unavailable</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {error || "Could not retrieve your authenticated student record."}
          </p>
          <Button variant="primary" size="sm" onClick={loadDashboard} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry Connection
          </Button>
        </div>
      </StudentLayout>
    );
  }

  const {
    studentName,
    studentClass,
    applicationNo,
    totalApplications,
    activeExam,
    admitCardStatus,
    scorecardStatus,
    notificationsCount,
    schoolName,
  } = data;

  return (
    <StudentLayout
      studentName={studentName}
      studentClass={studentClass}
      applicationNo={applicationNo}
    >
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-linear-to-br from-[var(--brand-primary)] via-[#0C223E] to-[#0A192F] text-white p-6 sm:p-8 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--brand-accent)]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-amber-300 border border-white/10">
                <Sparkles className="w-3 h-3" />
                <span>SESSION 2026–27 PORTAL</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {studentName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Track your active ETSE registration, download your digital admit card, and view official examination scorecards.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link href="/student/admit-cards">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  My Admit Card
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Applications</span>
              <FileText className="w-4 h-4 text-[var(--brand-primary)]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {totalApplications > 0 ? (totalApplications < 10 ? `0${totalApplications}` : totalApplications) : "0"}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600">
              {totalApplications > 0 ? "Active (ETSE 2026)" : "No Registrations"}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Admit Card</span>
              <CreditCard className="w-4 h-4 text-[var(--brand-accent)]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{admitCardStatus}</div>
            <span className="text-[11px] text-slate-500">
              {admitCardStatus === "Ready" ? "Available to download" : (totalApplications > 0 ? "Releases before exam" : "No active application")}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Scorecard</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{scorecardStatus}</div>
            <span className="text-[11px] text-slate-500">
              {scorecardStatus === "Declared" ? "Scorecard Published" : (totalApplications > 0 ? "Exam: 6 Sept 2026" : "No exam records")}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Updates</span>
              <Bell className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{notificationsCount}</div>
            <span className="text-[11px] text-indigo-600 font-semibold">Unread Notices</span>
          </div>
        </div>

        {/* Active Application Highlight OR Empty State */}
        {activeExam ? (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
                  Active Examination Registration
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)]">
                  {activeExam.title}
                </h2>
              </div>
              <Badge variant="success" size="md">
                {activeExam.status === "REGISTERED" || activeExam.status === "CONFIRMED" ? "Registration Confirmed" : activeExam.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Application Number</span>
                <strong className="text-slate-900 font-mono text-sm">{activeExam.applicationNo}</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Exam Date & Time</span>
                <strong className="text-amber-800">{activeExam.examDate}</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Exam Centre</span>
                <strong className="text-slate-900">{activeExam.centre}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registered under {activeExam.classEnrolled} • {schoolName}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Link href="/student/applications" className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" fullWidth className="sm:w-auto">
                    View Full Application
                  </Button>
                </Link>
                <Link href="/student/admit-cards" className="w-full sm:w-auto">
                  <Button variant="primary" size="sm" fullWidth className="sm:w-auto">
                    Check Admit Card Status
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center mx-auto border border-orange-200/60">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="text-lg font-bold text-slate-900">No Active Examination Applications</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                You have not registered for any upcoming scholarship or talent search examination yet. Register for ETSE 2026 to qualify for up to 100% tuition scholarships.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/etse-2026">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Register for ETSE 2026
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Academic Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Merit Scholarship Pathways</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Explore Tuition Fee Concession Slabs
              </h3>
              <p className="text-xs text-slate-600">
                Top 100 rank holders in ETSE qualify for direct merit fee concessions on all 1-Year and 2-Year Foundation classroom programmes.
              </p>
            </div>
            <Link href="/scholarship" className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-accent)] hover:underline">
              <span>View Scholarship Criteria</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)]">
                <Building className="w-4 h-4 text-[var(--brand-primary)]" />
                <span>Academic Guidance & Counselling</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Campus Doubt & Mentorship Desk
              </h3>
              <p className="text-xs text-slate-600">
                Need guidance regarding syllabus topics, previous year practice sheets, or batch schedules? Connect with our Mathura desk.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-accent)] hover:underline">
              <span>Contact Campus Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
