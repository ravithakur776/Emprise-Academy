"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  CreditCard,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Building,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAdmitCardsPage() {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const admitCards = [
    {
      id: "ac-1",
      applicationNo: "ETSE2026-000100",
      rollNumber: "26080100",
      candidateName: "Aarav Verma",
      fatherName: "Sunil Verma",
      class: "Class 8",
      school: "St. Dominic's Senior Secondary",
      examTitle: "ETSE 2026",
      examDate: "06 Sept 2026",
      centre: "Emprise Academy Campus, Mathura",
      status: "PUBLISHED",
      generatedAt: "26 Aug 2026",
      verificationToken: "0d9388cde8d8b32f91a0b3",
    },
    {
      id: "ac-2",
      applicationNo: "ETSE2026-000099",
      rollNumber: "26100099",
      candidateName: "Ishita Agarwal",
      fatherName: "Deepak Agarwal",
      class: "Class 10",
      school: "Kanha Makhan Public School",
      examTitle: "ETSE 2026",
      examDate: "06 Sept 2026",
      centre: "Emprise Academy Campus, Mathura",
      status: "PUBLISHED",
      generatedAt: "26 Aug 2026",
      verificationToken: "77a8b9c0d1e2f3a4b5c6",
    },
    {
      id: "ac-3",
      applicationNo: "ETSE2026-000098",
      rollNumber: "26090098",
      candidateName: "Yuvraj Singh",
      fatherName: "Rajendra Singh",
      class: "Class 9",
      school: "Delhi Public School, Mathura",
      examTitle: "ETSE 2026",
      examDate: "06 Sept 2026",
      centre: "Emprise Academy Campus, Mathura",
      status: "DRAFT",
      generatedAt: "25 Aug 2026",
      verificationToken: "44e5f6a7b8c9d0e1f2",
    },
  ];

  const filtered = admitCards.filter((c) => {
    const matchesSearch =
      searchQuery === "" ||
      c.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.rollNumber.includes(searchQuery) ||
      c.school.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = classFilter === "ALL" || c.class === classFilter;
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedCards.length === filtered.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(filtered.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((item) => item !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleBulkPrint = () => {
    if (selectedCards.length === 0) {
      toast.error("Selection Required", "Please select one or more admit cards to print.");
      return;
    }
    toast.success("Printing Batch", `Prepared ${selectedCards.length} admit cards for batch printing.`);
    window.print();
  };

  return (
    <AdminLayout staffName="Examination Officer" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header & Main Triggers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              EXAMINATION AUTHORITY
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Admit Card Management
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/admit-cards/centres">
              <Button variant="outline" size="sm" leftIcon={<Building className="w-4 h-4" />}>
                Centres
              </Button>
            </Link>
            <Link href="/admin/admit-cards/bulk">
              <Button variant="outline" size="sm" leftIcon={<Layers className="w-4 h-4" />}>
                Bulk Operations
              </Button>
            </Link>
            <Link href="/admin/admit-cards/generate">
              <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
                Generate Single
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Candidates</span>
            <div className="text-2xl font-black text-slate-900">42</div>
            <span className="text-[10px] text-slate-500">ETSE 2026 Registrations</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Published Passes</span>
            <div className="text-2xl font-black text-emerald-700">38</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Available in student portal</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Draft / Pending</span>
            <div className="text-2xl font-black text-amber-600">4</div>
            <span className="text-[10px] text-amber-700 font-semibold">Roll number assigned</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Exam Date</span>
            <div className="text-xl font-bold text-slate-900">06 Sept 2026</div>
            <span className="text-[10px] text-slate-500">10:00 AM – 12:00 PM</span>
          </div>
        </div>

        {/* Filters & Bulk Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by student name, application number, roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              id="ac-class-filter"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Classes" },
                { value: "Class 7", label: "Class 7" },
                { value: "Class 8", label: "Class 8" },
                { value: "Class 9", label: "Class 9" },
                { value: "Class 10", label: "Class 10" },
              ]}
            />
          </div>

          <div className="w-full sm:w-44">
            <Select
              id="ac-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "PUBLISHED", label: "Published" },
                { value: "DRAFT", label: "Draft" },
                { value: "REVOKED", label: "Revoked" },
              ]}
            />
          </div>

          {selectedCards.length > 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleBulkPrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Selected ({selectedCards.length})
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-4 w-8">
                    <input
                      type="checkbox"
                      checked={selectedCards.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
                    />
                  </th>
                  <th className="p-3.5">Roll Number / App ID</th>
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">Class & School</th>
                  <th className="p-3.5">Allotted Centre</th>
                  <th className="p-3.5">Exam Schedule</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4">
                      <input
                        type="checkbox"
                        checked={selectedCards.includes(c.id)}
                        onChange={() => toggleSelectOne(c.id)}
                        className="rounded border-slate-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
                      />
                    </td>

                    <td className="p-3.5">
                      <strong className="block text-[var(--brand-accent)] font-mono text-sm font-black">
                        {c.rollNumber}
                      </strong>
                      <span className="font-mono text-[11px] text-slate-400">{c.applicationNo}</span>
                    </td>

                    <td className="p-3.5">
                      <strong className="block text-slate-900 font-bold">{c.candidateName}</strong>
                      <span className="text-[11px] text-slate-500">S/o {c.fatherName}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{c.class}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">{c.school}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-medium">{c.centre}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{c.examDate}</span>
                      <span className="text-[11px] text-slate-500 block">10:00 AM – 12:00 PM</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={c.status === "PUBLISHED" ? "success" : c.status === "DRAFT" ? "warning" : "danger"} size="sm">
                        {c.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/admin/admit-cards/${c.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {admitCards.length} candidate passes</span>
            <span>Historical snapshot immutability active</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
