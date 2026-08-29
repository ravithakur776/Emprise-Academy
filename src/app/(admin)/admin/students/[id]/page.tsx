import type { Metadata } from "next";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Award,
  CreditCard,
  Trophy,
  Calendar,
  Building,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student 360° | Emprise Admin Desk",
  robots: { index: false, follow: false },
};

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const student = {
    id: resolvedParams.id,
    admissionNo: "ADM-2026-00054",
    fullName: "Aarav Verma",
    fatherName: "Sunil Verma",
    dob: "15 May 2011",
    gender: "Male",
    phone: "98XXXXXXXX",
    email: "student@example.com",
    currentClass: "Class 8",
    schoolName: "St. Dominic's Senior Secondary School, Mathura",
    address: "Mathura, Uttar Pradesh",
    status: "ACTIVE",
    enrolledProgramme: "Foundation Junior Olympiad Track (Class 8)",
    allocatedBatch: "FND-08-2026-A",
    enrolledDate: "18 August 2026",
    etseApplication: {
      applicationNo: "ETSE2026-000100",
      rollNumber: "26080100",
      examDate: "6 September 2026",
      status: "CONFIRMED",
      admitCardStatus: "PUBLISHED",
    },
    diagnosticResult: {
      totalScore: "248 / 300 (82.67%)",
      rank: "Rank #14",
      scholarship: "50% Merit Concession",
    },
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/students"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Directory</span>
          </Link>
        </div>

        {/* Student Master Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)] text-white font-extrabold text-xl flex items-center justify-center">
                {student.fullName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-0.5">
                  {student.admissionNo}
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900">{student.fullName}</h1>
              </div>
            </div>

            <Badge variant="success" size="md">
              Account Active
            </Badge>
          </div>

          {/* Key Reference Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Father&apos;s Name</span>
              <strong className="text-slate-900">{student.fatherName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Contact Phone</span>
              <strong className="text-slate-900">{student.phone}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Current Class</span>
              <strong className="text-slate-900">{student.currentClass}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Batch</span>
              <strong className="text-[var(--brand-primary)]">{student.allocatedBatch}</strong>
            </div>
          </div>

          {/* Academic & ETSE Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* ETSE 2026 Registration Card */}
            <div className="p-4 rounded-2xl bg-linear-to-br from-slate-900 to-[var(--brand-primary)] text-white space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  ETSE 2026 Application
                </span>
                <Badge variant="success" size="sm">
                  Confirmed
                </Badge>
              </div>

              <div className="space-y-1 text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application ID:</span>
                  <span className="font-mono font-bold text-white">{student.etseApplication.applicationNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Roll Number:</span>
                  <span className="font-mono font-bold text-amber-300">{student.etseApplication.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Admit Card:</span>
                  <span className="text-emerald-400 font-bold">{student.etseApplication.admitCardStatus}</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Scorecard */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-amber-950">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-bold">
                  Diagnostic Performance
                </span>
                <Trophy className="w-4 h-4 text-amber-600" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Score:</span>
                  <strong className="text-slate-900">{student.diagnosticResult.totalScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rank:</span>
                  <strong className="text-amber-700">{student.diagnosticResult.rank}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Scholarship:</span>
                  <strong className="text-emerald-700">{student.diagnosticResult.scholarship}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
