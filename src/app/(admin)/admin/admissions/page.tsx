"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdmissionStatusBadge } from "@/components/admin/AdmissionStatusBadge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import {
  GraduationCap,
  Search,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastProvider";

interface AdmissionItem {
  id: string;
  admissionNo: string;
  studentName: string;
  class: string;
  course: string;
  batch: string;
  counsellor: string;
  status: string;
  enrolledAt: string;
}

export default function AdminAdmissionsPage() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [admissions, setAdmissions] = useState<AdmissionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdmissions = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production, fetch admissions from database
      setAdmissions([]);
    } catch {
      setAdmissions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const handleExportCSV = () => {
    if (admissions.length === 0) {
      toast.error("Export Empty", "No admission records available to export.");
      return;
    }
    const headers = ["Admission No", "Student Name", "Class", "Course", "Batch", "Status", "Date"];
    const rows = admissions.map((a) => [a.admissionNo, a.studentName, a.class, a.course, a.batch, a.status, a.enrolledAt]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.map((f) => `"${f || ""}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Emprise_Admissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("CSV Exported", "Admissions roster exported.");
  };

  const filtered = admissions.filter((a) => {
    const matchesSearch =
      searchQuery === "" ||
      a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              CONFIRMED ENROLLMENTS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Admissions Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAdmissions}
              isLoading={isLoading}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Roster
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by student name, admission number, or target course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="sm:w-48 text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
          >
            <option value="ALL">All Admission Statuses</option>
            <option value="ADMITTED">Admitted / Enrolled</option>
            <option value="APPLICATION_SUBMITTED">Application Submitted</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Admissions Roster Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">No admissions found</p>
                <p className="text-xs text-slate-400">
                  {searchQuery || statusFilter !== "ALL"
                    ? "Try adjusting your search query or filter criteria."
                    : "Confirmed enrollments converted from CRM leads will appear here."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Admission No</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Enrolled Course</th>
                    <th className="py-3.5 px-4">Batch Allocation</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Enrolled Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {adm.admissionNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{adm.studentName}</strong>
                        <span className="text-[11px] text-slate-500">{adm.class}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {adm.course}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {adm.batch}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <AdmissionStatusBadge status={adm.status} />
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {adm.enrolledAt}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href={`/admin/admissions/${adm.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                            View Record
                          </Button>
                        </Link>
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
