"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import {
  Users,
  Search,
  Download,
  Eye,
  GraduationCap,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function AdminStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");

  const students = [
    {
      id: "std-1",
      admissionNo: "ADM-2026-00104",
      fullName: "Tanmay Singhal",
      currentClass: "Dropper",
      schoolName: "Brij Modern School, Mathura",
      phone: "+91 98765 44332",
      email: "tanmay.singhal@example.com",
      status: "ACTIVE",
      enrolledProgramme: "IIT-JEE Dropper Rankers",
    },
    {
      id: "std-2",
      admissionNo: "ADM-2026-00088",
      fullName: "Kavya Goyal",
      currentClass: "Class 11",
      schoolName: "Kanha Makhan Public School",
      phone: "+91 98765 55667",
      email: "kavya.goyal@example.com",
      status: "ACTIVE",
      enrolledProgramme: "NEET-UG 2-Year Classroom",
    },
    {
      id: "std-3",
      admissionNo: "ADM-2026-00054",
      fullName: "Aarav Verma",
      currentClass: "Class 8",
      schoolName: "St. Dominic's Senior Secondary",
      phone: "+91 98765 43210",
      email: "aarav.verma@example.com",
      status: "ACTIVE",
      enrolledProgramme: "Foundation Junior Olympiad",
    },
  ];

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
            <Select
              id="std-class-filter"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Classes" },
                { value: "Class 8", label: "Class 8" },
                { value: "Class 9", label: "Class 9" },
                { value: "Class 10", label: "Class 10" },
                { value: "Class 11", label: "Class 11" },
                { value: "Class 12", label: "Class 12" },
                { value: "Dropper", label: "Dropper" },
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
                  <th className="p-3.5 pl-6">Student / Admission No</th>
                  <th className="p-3.5">Enrolled Programme</th>
                  <th className="p-3.5">Class & School</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{s.fullName}</strong>
                      <span className="font-mono text-[11px] text-slate-400">{s.admissionNo}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-semibold">{s.enrolledProgramme}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{s.currentClass}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[160px]">{s.schoolName}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700 font-mono">{s.phone}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant="success" size="sm">
                        {s.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
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
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} active students</span>
            <span>RLS isolated database records</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
