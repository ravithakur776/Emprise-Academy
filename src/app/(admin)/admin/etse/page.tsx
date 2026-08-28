"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import {
  Award,
  Search,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AdminEtsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");

  const registrations = [
    {
      id: "reg-1",
      applicationNo: "ETSE2026-000100",
      rollNumber: "26080100",
      candidateName: "Aarav Verma",
      fatherName: "Sunil Verma",
      currentClass: "Class 8",
      schoolName: "St. Dominic's Senior Secondary",
      phone: "+91 98765 43210",
      stream: "Foundation (Science & Math)",
      registrationDate: "26 August 2026",
      status: "CONFIRMED",
      admitCardStatus: "PUBLISHED",
    },
    {
      id: "reg-2",
      applicationNo: "ETSE2026-000099",
      rollNumber: "26100099",
      candidateName: "Ishita Agarwal",
      fatherName: "Deepak Agarwal",
      currentClass: "Class 10",
      schoolName: "Kanha Makhan Public School",
      phone: "+91 98765 22334",
      stream: "IIT-JEE Foundation",
      registrationDate: "26 August 2026",
      status: "CONFIRMED",
      admitCardStatus: "PUBLISHED",
    },
    {
      id: "reg-3",
      applicationNo: "ETSE2026-000098",
      rollNumber: "Pending",
      candidateName: "Yuvraj Singh",
      fatherName: "Rajendra Singh",
      currentClass: "Class 9",
      schoolName: "Delhi Public School, Mathura",
      phone: "+91 98765 77889",
      stream: "NEET Foundation",
      registrationDate: "25 August 2026",
      status: "CONFIRMED",
      admitCardStatus: "PENDING_RELEASE",
    },
  ];

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);

    const matchesClass = classFilter === "ALL" || r.currentClass === classFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <AdminLayout staffName="Examination Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              CAMPAIGN MONITOR (CLASSES 7–10)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              ETSE 2026 Candidate Registrations
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold border border-amber-200">
              Exam Date: 6 September 2026
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search candidate name, application number, school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="w-full sm:w-56">
            <Select
              id="etse-class-filter"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Eligible Classes (7–10)" },
                { value: "Class 7", label: "Class 7" },
                { value: "Class 8", label: "Class 8" },
                { value: "Class 9", label: "Class 9" },
                { value: "Class 10", label: "Class 10" },
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
                  <th className="p-3.5 pl-6">Application ID / Candidate</th>
                  <th className="p-3.5">Class & School</th>
                  <th className="p-3.5">Stream Interest</th>
                  <th className="p-3.5">Contact Phone</th>
                  <th className="p-3.5">Roll Number</th>
                  <th className="p-3.5">Admit Card</th>
                  <th className="p-3.5 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{r.candidateName}</strong>
                      <span className="font-mono text-[11px] text-[var(--brand-primary)] font-semibold">{r.applicationNo}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{r.currentClass}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[160px]">{r.schoolName}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700">{r.stream}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700 font-mono">{r.phone}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-900">{r.rollNumber}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={r.admitCardStatus === "PUBLISHED" ? "success" : "muted"} size="sm">
                        {r.admitCardStatus === "PUBLISHED" ? "Issued" : "Pending"}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6">
                      <Badge variant="primary" size="sm">
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} candidate applications</span>
            <span>ETSE Examination Date: 6 September 2026</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
