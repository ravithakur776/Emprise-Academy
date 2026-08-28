"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import {
  History,
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from "lucide-react";

export default function AdminResultImportHistoryPage() {
  const history = [
    {
      id: "imp-2026-004",
      fileName: "class8_diagnostic_scorecards.xlsx",
      examTitle: "Diagnostic Academic Assessment",
      academicYear: "2026-27",
      totalProcessed: 48,
      insertedCount: 45,
      failedCount: 3,
      adminUser: "rakesh.kumar@empriseacademy.com",
      status: "COMPLETED",
      completedAt: "28 Aug 2026, 05:15 PM",
    },
    {
      id: "imp-2026-003",
      fileName: "jee_mock_test_1_results.xlsx",
      examTitle: "JEE Advanced Grand Mock 1",
      academicYear: "2026-27",
      totalProcessed: 120,
      insertedCount: 120,
      failedCount: 0,
      adminUser: "sushil.dagur@empriseacademy.com",
      status: "COMPLETED",
      completedAt: "20 Aug 2026, 03:30 PM",
    },
    {
      id: "imp-2026-002",
      fileName: "neet_fst_1_batch_results.csv",
      examTitle: "NEET Full Syllabus Test 1",
      academicYear: "2026-27",
      totalProcessed: 95,
      insertedCount: 95,
      failedCount: 0,
      adminUser: "rakesh.kumar@empriseacademy.com",
      status: "COMPLETED",
      completedAt: "22 Aug 2026, 04:00 PM",
    },
  ];

  return (
    <AdminLayout staffName="Examination Head" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              AUDIT & TRANSACTION LOGS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Excel Import Batch History
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/results">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Results
              </Button>
            </Link>
            <Link href="/admin/results/import">
              <Button variant="primary" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                New Excel Import
              </Button>
            </Link>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Batch ID / File Name</th>
                  <th className="p-3.5">Examination & Session</th>
                  <th className="p-3.5">Total Rows</th>
                  <th className="p-3.5">Inserted / Updated</th>
                  <th className="p-3.5">Rejected</th>
                  <th className="p-3.5">Operator Identity</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{h.fileName}</strong>
                      <span className="font-mono text-[11px] text-slate-400">{h.id}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-semibold block">{h.examTitle}</span>
                      <span className="text-[11px] text-slate-400 block">{h.academicYear}</span>
                    </td>

                    <td className="p-3.5 font-bold text-slate-900">
                      {h.totalProcessed}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-emerald-700">
                      {h.insertedCount}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-rose-600">
                      {h.failedCount}
                    </td>

                    <td className="p-3.5 text-slate-700">
                      {h.adminUser}
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {h.completedAt}
                    </td>

                    <td className="p-3.5 pr-6">
                      <Badge variant="success" size="sm">
                        {h.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
