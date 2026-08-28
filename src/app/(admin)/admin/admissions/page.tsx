"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdmissionStatusBadge } from "@/components/admin/AdmissionStatusBadge";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import {
  GraduationCap,
  Search,
  Download,
  Eye,
  Calendar,
  Layers,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function AdminAdmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const admissions = [
    {
      id: "adm-1",
      admissionNo: "ADM-2026-00104",
      studentName: "Tanmay Singhal",
      class: "Dropper",
      course: "IIT-JEE Dropper Rankers Target",
      batch: "JEE-DROP-2026-B1",
      counsellor: "Rahul Sharma",
      status: "ADMITTED",
      enrolledAt: "25 August 2026",
    },
    {
      id: "adm-2",
      admissionNo: "ADM-2026-00088",
      studentName: "Kavya Goyal",
      class: "Class 11",
      course: "NEET-UG 2-Year Classroom Integrated",
      batch: "NEET-11-2026-A",
      counsellor: "Pooja Sharma",
      status: "ADMITTED",
      enrolledAt: "22 August 2026",
    },
    {
      id: "adm-3",
      admissionNo: "ADM-2026-00054",
      studentName: "Aarav Verma",
      class: "Class 8",
      course: "Foundation Junior Olympiad Track",
      batch: "FND-08-2026-A",
      counsellor: "Admissions Head",
      status: "ADMITTED",
      enrolledAt: "18 August 2026",
    },
    {
      id: "adm-4",
      admissionNo: "ADM-2026-00112",
      studentName: "Rohan Agrawal",
      class: "Class 12",
      course: "NEET-UG 1-Year Fast-Track",
      batch: "Pending Allocation",
      counsellor: "Rahul Sharma",
      status: "APPLICATION_SUBMITTED",
      enrolledAt: "27 August 2026",
    },
  ];

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
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by student name, admission number, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="w-full sm:w-56">
            <Select
              id="adm-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Admission Statuses" },
                { value: "ADMITTED", label: "Admitted" },
                { value: "APPLICATION_SUBMITTED", label: "Application Submitted" },
                { value: "APPLICATION_STARTED", label: "Application Started" },
                { value: "CAMPUS_VISIT", label: "Campus Visit" },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Admission No / Student</th>
                  <th className="p-3.5">Course Enrolled</th>
                  <th className="p-3.5">Class & Batch</th>
                  <th className="p-3.5">Counsellor</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Enrolled Date</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{item.studentName}</strong>
                      <span className="font-mono text-[11px] text-slate-400">{item.admissionNo}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-semibold">{item.course}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{item.class}</span>
                      <span className="text-[11px] text-slate-500 block">{item.batch}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700">{item.counsellor}</span>
                    </td>

                    <td className="p-3.5">
                      <AdmissionStatusBadge status={item.status} />
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-600">{item.enrolledAt}</span>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Link href={`/admin/admissions/${item.id}`}>
                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {admissions.length} active admission records</span>
            <span>Batch allocation sync enabled</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
