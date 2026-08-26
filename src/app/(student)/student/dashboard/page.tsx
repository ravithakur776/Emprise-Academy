import type { Metadata } from "next";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Dashboard | Emprise Academy",
  robots: { index: false, follow: false },
};

export default function StudentDashboardPage() {
  // In production, student session and active registration are fetched via Supabase SSR
  const student = {
    name: "Aarav Verma",
    class: "Class 8",
    school: "St. Dominic's Senior Secondary School, Mathura",
    applicationNo: "ETSE2026-000100",
    phone: "+91 98765 43210",
    email: "aarav.verma@example.com",
    activeExam: {
      title: "Emprise Talent Search Examination 2026 (ETSE 2026)",
      examDate: "Sunday, 6 September 2026 (10:00 AM)",
      status: "CONFIRMED",
      centre: "Main Academic Block, Mathura",
      admitCardReady: false,
    },
    notificationsCount: 2,
  };

  return (
    <StudentLayout
      studentName={student.name}
      studentClass={student.class}
      applicationNo={student.applicationNo}
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
                Welcome, {student.name}!
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
            <div className="text-xl sm:text-2xl font-black text-slate-900">01</div>
            <span className="text-[11px] font-semibold text-emerald-600">Active (ETSE 2026)</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Admit Card</span>
              <CreditCard className="w-4 h-4 text-[var(--brand-accent)]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">Pending</div>
            <span className="text-[11px] text-slate-500">Releases before exam</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Scorecard</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">Post-Exam</div>
            <span className="text-[11px] text-slate-500">Exam: 6 Sept 2026</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Updates</span>
              <Bell className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{student.notificationsCount}</div>
            <span className="text-[11px] text-indigo-600 font-semibold">Unread Notices</span>
          </div>
        </div>

        {/* Active Application Highlight */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
                Active Examination Registration
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)]">
                {student.activeExam.title}
              </h2>
            </div>
            <Badge variant="success" size="md">
              Registration Confirmed
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1">Application Number</span>
              <strong className="text-slate-900 font-mono text-sm">{student.applicationNo}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1">Exam Date & Time</span>
              <strong className="text-amber-800">{student.activeExam.examDate}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1">Exam Centre</span>
              <strong className="text-slate-900">{student.activeExam.centre}</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Registered under {student.class} • {student.school}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/student/applications">
                <Button variant="outline" size="sm">
                  View Full Application
                </Button>
              </Link>
              <Link href="/student/admit-cards">
                <Button variant="primary" size="sm">
                  Check Admit Card Status
                </Button>
              </Link>
            </div>
          </div>
        </div>

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
