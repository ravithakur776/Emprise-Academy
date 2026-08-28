"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { Layers, Plus, Calendar, Clock, CheckCircle2, RefreshCw } from "lucide-react";

interface BatchItem {
  id: string;
  batchName: string;
  courseName: string;
  startDate: string;
  timings: string;
  isEnrolling: boolean;
  studentsCount: number;
}

export default function AdminBatchesPage() {
  const toast = useToast();
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBatches = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production, fetch from batches table
      setBatches([]);
    } catch {
      setBatches([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

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

          <Button
            variant="outline"
            size="sm"
            onClick={fetchBatches}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        </div>

        {/* Batches Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {batches.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">No batches configured</p>
                <p className="text-xs text-slate-400">
                  New academic cohorts, timings, and faculty assignments will appear here.
                </p>
              </div>
            ) : (
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
                        <span className="text-slate-700">{b.startDate}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="text-slate-600 font-mono text-[11px]">{b.timings}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-slate-900">{b.studentsCount} Students</span>
                      </td>

                      <td className="p-3.5">
                        <Badge variant={b.isEnrolling ? "success" : "muted"} size="sm">
                          {b.isEnrolling ? "Enrolling" : "Batch Closed"}
                        </Badge>
                      </td>

                      <td className="p-3.5 pr-6 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEnrolling(b.id)}
                        >
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
