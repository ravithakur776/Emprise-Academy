"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Trophy,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  History,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminResultsPage() {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [examFilter, setExamFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const results = [
    {
      id: "res-1",
      rollNumber: "26080100",
      studentName: "Aarav Verma",
      examTitle: "Diagnostic Assessment (Foundation Batch)",
      examId: "fnd-diag-2026",
      academicYear: "2026–27",
      class: "Class 8",
      totalMarks: 248,
      maxMarks: 300,
      percentage: 82.67,
      rank: 14,
      rankType: "CLASS_RANK",
      status: "PUBLISHED",
      publishedAt: "18 Aug 2026",
    },
    {
      id: "res-2",
      rollNumber: "26120045",
      studentName: "Tanmay Singhal",
      examTitle: "JEE Advanced Grand Mock 1",
      examId: "jee-mock-1",
      academicYear: "2026–27",
      class: "Dropper",
      totalMarks: 274,
      maxMarks: 360,
      percentage: 76.11,
      rank: 4,
      rankType: "AIR",
      status: "PUBLISHED",
      publishedAt: "20 Aug 2026",
    },
    {
      id: "res-3",
      rollNumber: "26110088",
      studentName: "Kavya Goyal",
      examTitle: "NEET Full Syllabus Test 1",
      examId: "neet-fst-1",
      academicYear: "2026–27",
      class: "Class 11",
      totalMarks: 642,
      maxMarks: 720,
      percentage: 89.17,
      rank: 2,
      rankType: "AIR",
      status: "PUBLISHED",
      publishedAt: "22 Aug 2026",
    },
    {
      id: "res-4",
      rollNumber: "26100099",
      studentName: "Ishita Agarwal",
      examTitle: "Foundation Olympiad Benchmark",
      examId: "fnd-olym-1",
      academicYear: "2026–27",
      class: "Class 10",
      totalMarks: 184,
      maxMarks: 200,
      percentage: 92.0,
      rank: 1,
      rankType: "CITY_RANK",
      status: "DRAFT",
      publishedAt: "Pending Review",
    },
  ];

  const filteredResults = results.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExam = examFilter === "ALL" || r.examId === examFilter;
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;

    return matchesSearch && matchesExam && matchesStatus;
  });

  const exportResultsCSV = () => {
    const headers = "Roll Number,Student Name,Exam,Year,Class,Marks,Max Marks,Percentage,Rank,Status\n";
    const rows = filteredResults
      .map(
        (r) =>
          `"${r.rollNumber}","${r.studentName}","${r.examTitle}","${r.academicYear}","${r.class}",${r.totalMarks},${r.maxMarks},${r.percentage},"${r.rank} (${r.rankType})","${r.status}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `emprise-results-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Results Exported", `Exported ${filteredResults.length} records to CSV.`);
  };

  return (
    <AdminLayout staffName="Examination Head" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              EXAMINATION AUTHORITY
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Examination Result Management
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/results/import-history">
              <Button variant="outline" size="sm" leftIcon={<History className="w-4 h-4" />}>
                Import History
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={exportResultsCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
            <Link href="/admin/results/import">
              <Button variant="primary" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                Import Excel / CSV
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Scorecards</span>
              <Trophy className="w-4 h-4 text-[var(--brand-primary)]" />
            </div>
            <div className="text-2xl font-black text-slate-900">1,240</div>
            <span className="text-[10px] text-slate-500">Across 14 examinations</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Published</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">1,180</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Live in Search & Portal</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Draft / Review</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">60</div>
            <span className="text-[10px] text-amber-700 font-semibold">Pending Publication</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Top Score</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-[var(--brand-accent)]">92.0%</div>
            <span className="text-[10px] text-slate-500">Foundation Benchmark</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="w-full sm:w-64">
            <Select
              id="res-exam-filter"
              value={examFilter}
              onChange={(e) => setExamFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Examinations" },
                { value: "fnd-diag-2026", label: "Diagnostic Assessment" },
                { value: "jee-mock-1", label: "JEE Advanced Mock 1" },
                { value: "neet-fst-1", label: "NEET Full Syllabus Test 1" },
                { value: "fnd-olym-1", label: "Foundation Olympiad Benchmark" },
              ]}
            />
          </div>

          <div className="w-full sm:w-44">
            <Select
              id="res-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "PUBLISHED", label: "Published" },
                { value: "DRAFT", label: "Draft / Pending" },
              ]}
            />
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Roll Number / Student</th>
                  <th className="p-3.5">Examination & Year</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Score (Marks)</th>
                  <th className="p-3.5">Percentage</th>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{r.studentName}</strong>
                      <span className="font-mono text-[11px] text-[var(--brand-primary)] font-semibold">{r.rollNumber}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-semibold block">{r.examTitle}</span>
                      <span className="text-[11px] text-slate-400 block">{r.academicYear}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-medium">{r.class}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-900">
                        {r.totalMarks} <span className="text-slate-400 font-normal">/ {r.maxMarks}</span>
                      </span>
                    </td>

                    <td className="p-3.5">
                      <strong className="text-slate-900">{r.percentage}%</strong>
                    </td>

                    <td className="p-3.5">
                      <Badge variant="gold" size="sm">
                        #{r.rank} {r.rankType}
                      </Badge>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={r.status === "PUBLISHED" ? "success" : "warning"} size="sm">
                        {r.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Link href={`/admin/results/${r.id}`}>
                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                          Edit
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredResults.length} of {results.length} results</span>
            <span>Server-side result indexing active</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
