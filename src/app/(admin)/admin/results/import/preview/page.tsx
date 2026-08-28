"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Trophy,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminResultImportPreviewPage() {
  const router = useRouter();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<"VALID" | "ERRORS">("VALID");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [examId, setExamId] = useState<string>("fnd-diag-2026");
  const [academicYear, setAcademicYear] = useState<string>("2026-27");

  useEffect(() => {
    const raw = sessionStorage.getItem("import_preview_report");
    const eId = sessionStorage.getItem("import_exam_id");
    const aYr = sessionStorage.getItem("import_academic_year");

    if (raw) {
      try {
        setReport(JSON.parse(raw));
      } catch {
        // Ignore
      }
    }
    if (eId) setExamId(eId);
    if (aYr) setAcademicYear(aYr);
  }, []);

  // Fallback demonstration report if page is loaded directly in development
  const displayReport = report || {
    fileName: "class8_foundation_results.xlsx",
    examTitle: "Diagnostic Academic Assessment",
    academicYear: "2026-27",
    totalRows: 48,
    validRowsCount: 45,
    invalidRowsCount: 3,
    matchedStudentsCount: 38,
    newStudentsCount: 7,
    duplicateRollsInFile: [],
    validRows: [
      {
        rowNumber: 2,
        rollNumber: "26080100",
        studentName: "Aarav Verma",
        dob: "2011-05-15",
        classEnrolled: "Class 8",
        schoolName: "St. Dominic's Senior Secondary",
        totalMarks: 248,
        maxMarks: 300,
        percentage: 82.67,
        studentMatchStatus: "MATCHED",
        subjects: [
          { subjectName: "Physics", marksObtained: 82, maxMarks: 100 },
          { subjectName: "Chemistry", marksObtained: 78, maxMarks: 100 },
          { subjectName: "Mathematics", marksObtained: 88, maxMarks: 100 },
        ],
      },
      {
        rowNumber: 3,
        rollNumber: "26080101",
        studentName: "Divyansh Soni",
        dob: "2011-08-20",
        classEnrolled: "Class 8",
        schoolName: "Kanha Makhan Public School",
        totalMarks: 215,
        maxMarks: 300,
        percentage: 71.67,
        studentMatchStatus: "MATCHED",
        subjects: [
          { subjectName: "Physics", marksObtained: 70, maxMarks: 100 },
          { subjectName: "Chemistry", marksObtained: 68, maxMarks: 100 },
          { subjectName: "Mathematics", marksObtained: 77, maxMarks: 100 },
        ],
      },
    ],
    errors: [
      {
        rowNumber: 47,
        rollNumber: "26080145",
        field: "Physics",
        providedValue: "110",
        reason: "Marks (110) exceed configured maximum allowed marks (100)",
        suggestedFix: "Verify scorecard marks <= 100",
      },
    ],
  };

  const handleConfirmImport = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/results/import/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          validRows: displayReport.validRows,
          examId,
          academicYear,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "Failed to commit import transaction.");
      }

      toast.success(
        "Import Successful!",
        `Committed ${displayReport.validRowsCount} student results with transactional safety.`
      );
      sessionStorage.removeItem("import_preview_report");
      router.push("/admin/results");
    } catch (err: any) {
      toast.error("Import Error", err.message || "Failed to finalize import.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadErrorReport = () => {
    if (!displayReport.errors || displayReport.errors.length === 0) {
      toast.success("No Errors", "There are no invalid rows in this dataset.");
      return;
    }

    const headers = "Row Number,Roll Number,Field,Provided Value,Reason,Suggested Fix\n";
    const rows = displayReport.errors
      .map(
        (e: any) =>
          `${e.rowNumber},"${e.rollNumber || ""}","${e.field}","${e.providedValue}","${e.reason}","${e.suggestedFix || ""}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `import-errors-${displayReport.fileName || "dataset"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Error Report Downloaded", "CSV downloaded for administrative review.");
  };

  return (
    <AdminLayout staffName="Examination Head" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              STEP 2 OF 3 — VALIDATION & AUDIT
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Review Import Dataset
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              File: <strong className="text-slate-800">{displayReport.fileName}</strong> • Session {displayReport.academicYear}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/results/import">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Re-upload File
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={displayReport.validRowsCount === 0}
              onClick={handleConfirmImport}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirm & Upsert ({displayReport.validRowsCount} Rows)
            </Button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Rows</span>
            <div className="text-2xl font-black text-slate-900">{displayReport.totalRows}</div>
            <span className="text-[10px] text-slate-500">Processed in file</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Valid Rows</span>
            <div className="text-2xl font-black text-emerald-700">{displayReport.validRowsCount}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Ready for commit</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Invalid Rows</span>
            <div className="text-2xl font-black text-rose-700">{displayReport.invalidRowsCount}</div>
            <span className="text-[10px] text-rose-600 font-semibold">Rejected for safety</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Linked Students</span>
            <div className="text-2xl font-black text-blue-700">{displayReport.matchedStudentsCount}</div>
            <span className="text-[10px] text-blue-600 font-semibold">{displayReport.newStudentsCount} new profiles</span>
          </div>
        </div>

        {/* Tabs & Error Report Trigger */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs font-bold">
            <button
              onClick={() => setActiveTab("VALID")}
              className={cn(
                "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
                activeTab === "VALID"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid Rows ({displayReport.validRowsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("ERRORS")}
              className={cn(
                "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
                activeTab === "ERRORS"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-rose-600 hover:bg-rose-50"
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Errors & Rejections ({displayReport.invalidRowsCount})</span>
            </button>
          </div>

          {displayReport.invalidRowsCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadErrorReport}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Error Report CSV
            </Button>
          )}
        </div>

        {/* Table View */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {activeTab === "VALID" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 pl-6">Row / Roll No</th>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Class & School</th>
                    <th className="p-3.5">Subject Breakdown</th>
                    <th className="p-3.5">Total Marks</th>
                    <th className="p-3.5">Percentage</th>
                    <th className="p-3.5 pr-6">Identity Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayReport.validRows.map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-6">
                        <span className="text-slate-400 font-mono text-[10px] block">#{r.rowNumber}</span>
                        <strong className="text-[var(--brand-primary)] font-mono text-xs">{r.rollNumber}</strong>
                      </td>

                      <td className="p-3.5">
                        <strong className="text-slate-900 block font-bold">{r.studentName}</strong>
                        <span className="text-[11px] text-slate-400">{r.dob}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="text-slate-800 font-semibold block">{r.classEnrolled}</span>
                        <span className="text-[11px] text-slate-500 block truncate max-w-[140px]">{r.schoolName}</span>
                      </td>

                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          {r.subjects.map((s: any, sIdx: number) => (
                            <span key={sIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {s.subjectName}: <strong className="text-slate-900">{s.marksObtained}</strong>/{s.maxMarks}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {r.totalMarks} / {r.maxMarks}
                      </td>

                      <td className="p-3.5 font-bold text-slate-900">
                        {r.percentage}%
                      </td>

                      <td className="p-3.5 pr-6">
                        <Badge variant={r.studentMatchStatus === "MATCHED" ? "success" : "accent"} size="sm">
                          {r.studentMatchStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-rose-50 border-b border-rose-200 text-rose-900 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 pl-6">Row #</th>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Field in Error</th>
                    <th className="p-3.5">Provided Value</th>
                    <th className="p-3.5">Rejection Reason</th>
                    <th className="p-3.5 pr-6">Suggested Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100">
                  {displayReport.errors.map((err: any, idx: number) => (
                    <tr key={idx} className="bg-rose-50/20 hover:bg-rose-50/40">
                      <td className="p-3.5 pl-6 font-mono font-bold text-rose-800">
                        #{err.rowNumber}
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">
                        {err.rollNumber || "Missing"}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {err.field}
                      </td>
                      <td className="p-3.5 font-mono text-rose-700 bg-rose-100/50 px-2 py-0.5 rounded">
                        {err.providedValue}
                      </td>
                      <td className="p-3.5 text-rose-900 font-semibold">
                        {err.reason}
                      </td>
                      <td className="p-3.5 pr-6 text-slate-600">
                        {err.suggestedFix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
