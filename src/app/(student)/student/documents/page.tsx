"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { FolderOpen, FileText, Download, Printer, ShieldCheck, FileCheck, ExternalLink } from "lucide-react";

export default function StudentDocumentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentIdentity, setStudentIdentity] = useState({
    name: "Student",
    class: "Class 12",
    applicationNo: "ETSE Portal",
  });
  const [documents, setDocuments] = useState<any[]>([]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fdocuments");
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

      // Query active registrations
      const { data: appRecord } = await (supabase
        .from("etse_registrations") as any)
        .select("id, application_number, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const appNo = appRecord?.application_number || studentProf?.admission_number || "ETSE Portal";
      setStudentIdentity({
        name,
        class: currentClass,
        applicationNo: appNo,
      });

      const docs: any[] = [];

      // If registration exists, add admit card doc link
      if (appRecord) {
        docs.push({
          id: "doc-etse-admit",
          title: "ETSE 2026 Examination Pass & Admit Card",
          type: "ADMIT_CARD",
          fileFormat: "PDF Document",
          fileSize: "245 KB",
          issueDate: new Date(appRecord.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          isReady: true,
          downloadUrl: "/student/admit-cards",
        });
      }

      // Add syllabus curriculum guide
      docs.push({
        id: "doc-curriculum-syllabus",
        title: `${currentClass} Foundation & Competitive Pacing Guide`,
        type: "ACADEMIC_GUIDE",
        fileFormat: "PDF Document",
        fileSize: "1.2 MB",
        issueDate: "Academic Session 2026–27",
        isReady: true,
        downloadUrl: "/courses",
      });

      setDocuments(docs);
    } catch (err) {
      console.error("[DOCUMENTS_LOAD_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
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
              OFFICIAL STUDENT ARCHIVE
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Academic Documents
            </h1>
          </div>
        </div>

        {/* Documents Grid */}
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-[var(--brand-accent)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)]">
                      {doc.type.replace(/_/g, " ")}
                    </span>
                    <Badge variant="muted" size="sm">
                      {doc.fileFormat}
                    </Badge>
                  </div>

                  <h2 className="text-base font-bold text-[var(--brand-primary)]">
                    {doc.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Issued: {doc.issueDate} • Approx. {doc.fileSize}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <FileCheck className="w-4 h-4" />
                    <span>Verified Authenticity</span>
                  </div>

                  <Link href={doc.downloadUrl}>
                    <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Access Document
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Documents Available</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your official certificates and examination passes will appear here once released.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
