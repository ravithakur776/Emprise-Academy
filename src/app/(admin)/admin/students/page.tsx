"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import {
  Users,
  Search,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastProvider";

interface StudentItem {
  id: string;
  admissionNo: string;
  fullName: string;
  currentClass: string;
  schoolName: string;
  phone: string;
  email: string;
  status: string;
  enrolledProgramme: string;
}

export default function AdminStudentsPage() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production, fetch from student_profiles
      setStudents([]);
    } catch {
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleExportCSV = () => {
    if (students.length === 0) {
      toast.error("Export Empty", "No student records available to export.");
      return;
    }
    const headers = ["Admission No", "Student Name", "Class", "School", "Phone", "Programme", "Status"];
    const rows = students.map((s) => [s.admissionNo, s.fullName, s.currentClass, s.schoolName, s.phone, s.enrolledProgramme, s.status]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.map((f) => `"${f || ""}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Emprise_Students_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("CSV Exported", "Student directory exported.");
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      searchQuery === "" ||
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery) ||
      s.schoolName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = classFilter === "ALL" || s.currentClass === classFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              STUDENT ROSTER
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Student Directory
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStudents}
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
              Export Directory
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by student name, admission number, school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
            >
              <option value="ALL">All Enrolled Classes</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="Dropper">Dropper Batch</option>
            </select>
          </div>
        </div>

        {/* Student Directory Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">No students found</p>
                <p className="text-xs text-slate-400">
                  {searchQuery || classFilter !== "ALL"
                    ? "Try adjusting your search query or filter criteria."
                    : "Enrolled student profiles linked to active admissions will appear here."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Admission No</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Class & School</th>
                    <th className="py-3.5 px-4">Enrolled Programme</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {s.admissionNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{s.fullName}</strong>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-semibold block">{s.currentClass}</span>
                        <span className="text-[11px] text-slate-500">{s.schoolName}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {s.enrolledProgramme}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 block">{s.phone}</span>
                        <span className="text-[11px] text-slate-500">{s.email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={s.status === "ACTIVE" ? "success" : "muted"} size="sm">
                          {s.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href={`/admin/students/${s.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                            Profile
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
