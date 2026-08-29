import type { Metadata } from "next";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { ArrowLeft, CreditCard, Building, Calendar, CheckCircle2, ShieldCheck, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Details | Emprise Academy Student Portal",
  robots: { index: false, follow: false },
};

export default async function StudentApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const app = {
    id: resolvedParams.id,
    examTitle: "Emprise Talent Search Examination 2026 (ETSE 2026)",
    applicationNo: "ETSE2026-000100",
    studentName: "Aarav Verma",
    fatherName: "Sunil Verma",
    dob: "15 May 2011",
    gender: "Male",
    currentClass: "Class 8",
    schoolName: "St. Dominic's Senior Secondary School, Mathura",
    phone: "98XXXXXXXX",
    email: "student@example.com",
    streamInterest: "Foundation (Science & Mathematics)",
    registrationDate: "26 August 2026",
    examDate: "Sunday, 6 September 2026",
    examTime: "10:00 AM – 12:00 PM (2 Hours)",
    examCentre: "Emprise Academy Campus, Mathura",
    centreAddress: "Mathura, Uttar Pradesh",
    status: "CONFIRMED",
    admitCardStatus: "Will be published prior to exam day",
  };

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
              {app.status}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{app.studentName}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Father&apos;s Name:</span>
                <span className="font-bold text-slate-900">{app.fatherName}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-bold text-slate-900">{app.dob} ({app.gender})</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Mobile:</span>
                <span className="font-bold text-slate-900">{app.phone}</span>
              </div>
              <div className="sm:col-span-2 flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">School:</span>
                <span className="font-bold text-slate-900">{app.schoolName}</span>
              </div>
            </div>
          </div>

          {/* Exam Centre Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Examination Schedule & Centre Details
            </h2>

            <div className="p-4 rounded-2xl bg-linear-to-br from-slate-900 to-[var(--brand-primary)] text-white space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-300">Exam Date:</span>
                <strong className="text-amber-300">{app.examDate}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-300">Time:</span>
                <span className="text-white">{app.examTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Centre:</span>
                <span className="text-white text-right">{app.examCentre}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Application Record</span>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/student/admit-cards">
                <Button variant="primary" size="sm" leftIcon={<CreditCard className="w-4 h-4" />}>
                  Go to Admit Cards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
