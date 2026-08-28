"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { Layers, Plus, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function AdminBatchesPage() {
  const toast = useToast();
  const [batches, setBatches] = useState([
    {
      id: "b-1",
      batchName: "JEE-11-2026-ALPHA",
      courseName: "IIT-JEE 2-Year Classroom Integrated",
      startDate: "01 April 2026",
      timings: "03:30 PM – 07:30 PM (Mon to Sat)",
      isEnrolling: true,
      studentsCount: 28,
    },
    {
      id: "b-2",
      batchName: "JEE-DROP-2026-B1",
      courseName: "IIT-JEE Dropper Rankers Target",
      startDate: "15 June 2026",
      timings: "09:00 AM – 02:00 PM (Daily)",
      isEnrolling: true,
      studentsCount: 34,
    },
    {
      id: "b-3",
      batchName: "NEET-11-2026-A",
      courseName: "NEET-UG 2-Year Comprehensive",
      startDate: "05 April 2026",
      timings: "03:30 PM – 07:30 PM (Mon to Sat)",
      isEnrolling: true,
      studentsCount: 25,
    },
    {
      id: "b-4",
      batchName: "FND-08-2026-A",
      courseName: "Foundation Junior Olympiad (Class 8)",
      startDate: "10 April 2026",
      timings: "04:30 PM – 07:00 PM (Alternate Days)",
      isEnrolling: true,
      studentsCount: 22,
    },
  ]);

  const toggleEnrolling = (id: string) => {
    setBatches(
      batches.map((b) => (b.id === id ? { ...b, isEnrolling: !b.isEnrolling } : b))
    );
    toast.success("Batch Updated", "Enrollment status toggled.");
  };

  return (
    <AdminLayout staffName="Academic Administrator" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              TIMETABLE & COHORTS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Academic Batch Management
            </h1>
          </div>
        </div>

        {/* Batches Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Batch Identifier</th>
                  <th className="p-3.5">Associated Course</th>
                  <th className="p-3.5">Start Date</th>
                  <th className="p-3.5">Schedule & Timings</th>
                  <th className="p-3.5">Enrolled Count</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {batches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-[var(--brand-primary)] font-mono font-bold text-sm">
                        {b.batchName}
                      </strong>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-medium">{b.courseName}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700 font-semibold">{b.startDate}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-600 text-[11px]">{b.timings}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-slate-900">{b.studentsCount} Students</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={b.isEnrolling ? "success" : "muted"} size="sm">
                        {b.isEnrolling ? "Enrolling Open" : "Closed"}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEnrolling(b.id)}
                      >
                        {b.isEnrolling ? "Close" : "Open"}
                      </Button>
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
