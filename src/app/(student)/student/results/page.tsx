import type { Metadata } from "next";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Trophy, Award, Calendar, CheckCircle2, Clock, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Examination Results | Emprise Academy Student Portal",
  robots: { index: false, follow: false },
};

export default function StudentResultsPage() {
  const publishedResults = [
    {
      id: "res-diag-2026",
      examTitle: "Diagnostic Academic Assessment (Foundation Batch)",
      academicYear: "2026–27",
      rollNumber: "26080100",
      examDate: "15 August 2026",
      publishedDate: "18 August 2026",
      totalMarksObtained: 248,
      maxMarks: 300,
      percentage: 82.67,
      rank: 14,
      rankType: "CLASS_RANK",
      scholarshipPercentageAwarded: 50,
      qualifyingStatus: "QUALIFIED",
      subjects: [
        { subject: "Physics", marks: 82, maxMarks: 100 },
        { subject: "Chemistry", marks: 78, maxMarks: 100 },
        { subject: "Mathematics", marks: 88, maxMarks: 100 },
      ],
    },
  ];

  return (
    <StudentLayout
      studentName="Aarav Verma"
      studentClass="Class 8"
      applicationNo="ETSE2026-000100"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              ACADEMIC SCORECARDS & MERIT
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Examination Results
            </h1>
          </div>
        </div>

        {/* Upcoming ETSE 2026 Status Card */}
        <div className="p-6 rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white border border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Awaiting Examination
              </span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
              Exam Date: 6 September 2026
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Emprise Talent Search Examination 2026 (ETSE 2026)
            </h2>
            <p className="text-xs text-slate-300">
              Official scorecards, All-Mathura ranks, and merit scholarship decisions will be published here within 10 days of exam completion.
            </p>
          </div>
        </div>

        {/* Published Historical Results */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Published Academic Assessments
          </h2>

          {publishedResults.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                    Session {res.academicYear} • Roll No: {res.rollNumber}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                    {res.examTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="success" size="md">
                    {res.qualifyingStatus}
                  </Badge>
                  {res.scholarshipPercentageAwarded > 0 && (
                    <Badge variant="gold" size="md">
                      {res.scholarshipPercentageAwarded}% Scholarship
                    </Badge>
                  )}
                </div>
              </div>

              {/* High-Level Score Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Marks Obtained</span>
                  <strong className="text-lg font-extrabold text-[var(--brand-primary)]">
                    {res.totalMarksObtained} <span className="text-xs text-slate-400 font-normal">/ {res.maxMarks}</span>
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Percentage Score</span>
                  <strong className="text-lg font-extrabold text-slate-900">
                    {res.percentage}%
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Class Rank</span>
                  <strong className="text-lg font-extrabold text-amber-600">
                    Rank #{res.rank}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Merit Concession</span>
                  <strong className="text-lg font-extrabold text-emerald-600">
                    {res.scholarshipPercentageAwarded}% Fee Off
                  </strong>
                </div>
              </div>

              {/* Dynamic Subject Marks Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Subject-Wise Performance Breakdown
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {res.subjects.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center text-xs"
                    >
                      <span className="font-bold text-slate-800">{sub.subject}</span>
                      <span className="font-mono font-extrabold text-[var(--brand-primary)]">
                        {sub.marks} <span className="text-slate-400 font-normal">/ {sub.maxMarks}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>Evaluated on: {res.publishedDate}</span>
                <Link href="/scholarship" className="font-bold text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1">
                  <span>View Scholarship Matrix</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
