import type { Metadata } from "next";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FolderOpen, FileText, Download, Printer, ShieldCheck, FileCheck, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "My Documents | Emprise Academy Student Portal",
  robots: { index: false, follow: false },
};

export default function StudentDocumentsPage() {
  const documents = [
    {
      id: "doc-etse-admit",
      title: "ETSE 2026 Examination Pass & Admit Card",
      type: "ADMIT_CARD",
      fileFormat: "PDF Document",
      fileSize: "245 KB",
      issueDate: "26 August 2026",
      isReady: true,
      downloadUrl: "/student/admit-cards",
    },
    {
      id: "doc-foundation-syllabus",
      title: "Class 8 Foundation Curriculum Pacing & Syllabus Guide",
      type: "ACADEMIC_GUIDE",
      fileFormat: "PDF Document",
      fileSize: "1.2 MB",
      issueDate: "15 August 2026",
      isReady: true,
      downloadUrl: "#",
    },
    {
      id: "doc-scholarship-certificate",
      title: "Academic Merit Concession Letter (Diagnostic Assessment)",
      type: "SCHOLARSHIP_LETTER",
      fileFormat: "PDF Document",
      fileSize: "310 KB",
      issueDate: "18 August 2026",
      isReady: true,
      downloadUrl: "/student/results",
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
              OFFICIAL STUDENT ARCHIVE
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Academic Documents
            </h1>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:border-[var(--brand-accent)] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[var(--brand-primary)]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" size="sm">
                    {doc.fileFormat}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[var(--brand-primary)] line-clamp-2">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>Issued: {doc.issueDate}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link href={doc.downloadUrl}>
                  <Button variant="outline" size="sm" fullWidth leftIcon={<Download className="w-4 h-4" />}>
                    Access Document
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            All academic documents in this portal are cryptographically signed and verified by the Emprise Academy Examination Authority.
          </span>
        </div>
      </div>
    </StudentLayout>
  );
}
