import type { Metadata } from "next";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FileText, Calendar, Building, CheckCircle2, ArrowRight, Eye, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "My Applications | Emprise Academy Student Portal",
  robots: { index: false, follow: false },
};

export default function StudentApplicationsPage() {
  const applications = [
    {
      id: "etse-2026-app",
      examTitle: "Emprise Talent Search Examination 2026 (ETSE 2026)",
      applicationNo: "ETSE2026-000100",
      academicYear: "2026–27",
      registrationDate: "26 August 2026",
      examDate: "6 September 2026 (10:00 AM – 12:00 PM)",
      status: "CONFIRMED",
      classEnrolled: "Class 8",
      stream: "Foundation (Science & Mathematics)",
      centre: "Emprise Academy Campus, Mathura",
      admitCardStatus: "PENDING_RELEASE",
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
                      {app.status}
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

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500">
                    Registered on: {app.registrationDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link href={`/student/applications/${app.id}`}>
                      <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                        View Details
                      </Button>
                    </Link>
                    <Link href="/student/admit-cards">
                      <Button variant="primary" size="sm" leftIcon={<CreditCard className="w-4 h-4" />}>
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
