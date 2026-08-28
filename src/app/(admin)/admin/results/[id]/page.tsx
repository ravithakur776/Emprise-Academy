"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import { FormField } from "@/components/ui/form/FormField";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ArrowLeft,
  Trophy,
  Save,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  Award,
  Clock,
  Printer,
  ExternalLink,
} from "lucide-react";

export default function AdminResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [result, setResult] = useState({
    id: "res-1",
    rollNumber: "26080100",
    studentName: "Aarav Verma",
    fatherName: "Sunil Verma",
    dob: "15 May 2011",
    class: "Class 8",
    schoolName: "St. Dominic's Senior Secondary School, Mathura",
    examTitle: "Diagnostic Academic Assessment (Foundation Batch)",
    academicYear: "2026–27",
    status: "PUBLISHED",
    rank: 14,
    rankType: "CLASS_RANK",
    scholarshipConcession: "50% Merit Concession",
    subjects: [
      { name: "Physics", marks: 82, maxMarks: 100 },
      { name: "Chemistry", marks: 78, maxMarks: 100 },
      { name: "Mathematics", marks: 88, maxMarks: 100 },
    ],
  });

  const totalMarks = result.subjects.reduce((sum, s) => sum + s.marks, 0);
  const maxTotal = result.subjects.reduce((sum, s) => sum + s.maxMarks, 0);
  const percentage = Number(((totalMarks / maxTotal) * 100).toFixed(2));

  const handleSubjectMarksChange = (idx: number, newMarks: number) => {
    const updated = [...result.subjects];
    updated[idx].marks = Math.min(newMarks, updated[idx].maxMarks);
    setResult({ ...result, subjects: updated });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success("Result Saved", "Subject marks and rank indicators updated with audit log.");
    }, 600);
  };

  const togglePublish = () => {
    const nextStatus = result.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setResult({ ...result, status: nextStatus });
    toast.success("Visibility Changed", `Result scorecard is now ${nextStatus}.`);
  };

  return (
    <AdminLayout staffName="Examination Head" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/results"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results List</span>
          </Link>
        </div>

        {/* Master Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                OFFICIAL SCORECARD RECORD
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">{result.studentName}</h1>
              <span className="text-xs text-slate-500">{result.examTitle} • Session {result.academicYear}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={result.status === "PUBLISHED" ? "success" : "warning"} size="md">
                {result.status}
              </Badge>
              <Button variant="outline" size="sm" onClick={togglePublish}>
                {result.status === "PUBLISHED" ? "Unpublish Scorecard" : "Publish to Search"}
              </Button>
            </div>
          </div>

          {/* Quick Particulars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Roll Number</span>
              <strong className="text-[var(--brand-primary)] font-mono text-base font-black">
                {result.rollNumber}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Candidate Class</span>
              <strong className="text-slate-900">{result.class}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Total Marks</span>
              <strong className="text-slate-900 font-mono text-base">{totalMarks} / {maxTotal}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Percentage Score</span>
              <strong className="text-emerald-700 text-base">{percentage}%</strong>
            </div>
          </div>

          {/* Dynamic Subject Breakdown Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Subject Marks Breakdown</span>
              </h2>

              {!isEditing ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Subject Marks
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.subjects.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                >
                  <strong className="block text-slate-800 font-bold">{sub.name}</strong>

                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={sub.maxMarks}
                        value={sub.marks}
                        onChange={(e) => handleSubjectMarksChange(idx, Number(e.target.value))}
                        className="w-20 h-9 px-2.5 rounded-lg border border-slate-300 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                      />
                      <span className="text-slate-400 font-mono">/ {sub.maxMarks}</span>
                    </div>
                  ) : (
                    <div className="font-mono font-extrabold text-base text-[var(--brand-primary)]">
                      {sub.marks} <span className="text-xs text-slate-400 font-normal">/ {sub.maxMarks}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="sm" isLoading={isSaving} onClick={handleSave} rightIcon={<Save className="w-4 h-4" />}>
                  Save Marks Updates
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
