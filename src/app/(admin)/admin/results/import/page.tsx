"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Upload,
  FileSpreadsheet,
  Download,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminResultImportPage() {
  const router = useRouter();
  const toast = useToast();

  const [examId, setExamId] = useState("fnd-diag-2026");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const exams = [
    { value: "fnd-diag-2026", label: "Diagnostic Assessment (Foundation Batch)", subjects: "Physics (100), Chemistry (100), Math (100)" },
    { value: "jee-mock-1", label: "JEE Advanced Grand Mock 1", subjects: "Physics (120), Chemistry (120), Math (120)" },
    { value: "neet-fst-1", label: "NEET Full Syllabus Test 1", subjects: "Physics (180), Chemistry (180), Biology (360)" },
    { value: "etse-2026", label: "ETSE 2026 (Emprise Talent Search Examination)", subjects: "Physics & Chemistry (30), Mathematics (30), Reasoning (20)" },
  ];

  const selectedExamDetails = exams.find((e) => e.value === examId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      const validExts = [".xlsx", ".xls", ".csv"];
      const ext = selected.name.substring(selected.name.lastIndexOf(".")).toLowerCase();

      if (!validExts.includes(ext)) {
        toast.error("Invalid Format", "Please upload a valid .xlsx, .xls, or .csv file.");
        return;
      }

      if (selected.size > 5 * 1024 * 1024) {
        toast.error("File Too Large", "Maximum allowed upload size is 5MB.");
        return;
      }

      setFile(selected);
      setErrorMessage(null);
    }
  };

  const handleDownloadTemplate = () => {
    window.open(`/api/results/template/${examId}`, "_blank");
    toast.success("Template Generated", "Downloading dynamic Excel template configured for this examination.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!file) {
      toast.error("File Required", "Please choose an Excel or CSV file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("examId", examId);
      formData.append("academicYear", academicYear);

      const res = await fetch("/api/results/import/preview", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "Failed to validate import dataset.");
      }

      // Store preview report in session storage for the preview screen
      sessionStorage.setItem("import_preview_report", JSON.stringify(json.data));
      sessionStorage.setItem("import_exam_id", examId);
      sessionStorage.setItem("import_academic_year", academicYear);

      toast.success("Validation Complete", "File parsed and validated against exam subjects. Proceeding to review...");
      router.push("/admin/results/import/preview");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to process import file.");
      toast.error("Validation Error", err.message || "Upload processing error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout staffName="Examination Head" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/results"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results Dashboard</span>
          </Link>
        </div>

        {/* Wizard Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
              BULK RESULT INGESTION ENGINE
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Import Examination Results (Excel / CSV)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Upload class scorecards with automatic dynamic subject mapping, duplicate protection, and student matching.
            </p>
          </div>

          {/* Step Progress Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xs">
              1. Exam & File Upload
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-500">
              2. Validate & Preview
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-500">
              3. Commit & Publish
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exam & Year Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Target Examination" required htmlFor="imp-exam">
                <Select
                  id="imp-exam"
                  value={examId}
                  onChange={(e) => setExamId(e.target.value)}
                  options={exams.map((e) => ({ value: e.value, label: e.label }))}
                />
              </FormField>

              <FormField label="Academic Session" required htmlFor="imp-year">
                <Select
                  id="imp-year"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  options={[
                    { value: "2026-27", label: "Session 2026–27" },
                    { value: "2025-26", label: "Session 2025–26" },
                  ]}
                />
              </FormField>
            </div>

            {/* Dynamic Subjects Info Banner */}
            {selectedExamDetails && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">Configured Exam Subjects:</strong>
                  <span className="text-slate-600">{selectedExamDetails.subjects}</span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTemplate}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download Excel Template
                </Button>
              </div>
            )}

            {/* File Upload Drop Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Upload Spreadsheet File (.xlsx, .xls, .csv) <span className="text-rose-500">*</span>
              </label>

              <div className="border-2 border-dashed border-slate-300 hover:border-[var(--brand-accent)] rounded-3xl p-8 text-center transition-colors bg-slate-50/50">
                <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-800">
                  {file ? file.name : "Drag & drop your Excel or CSV file here, or browse"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supported extensions: .xlsx, .xls, .csv (Max 5MB)
                </p>

                <div className="mt-4">
                  <input
                    type="file"
                    id="excel-file-upload"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="excel-file-upload">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                      <Upload className="w-4 h-4" />
                      <span>{file ? "Choose Different File" : "Select Spreadsheet File"}</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link href="/admin/results">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isUploading}
                disabled={!file}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Validate & Generate Preview
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
