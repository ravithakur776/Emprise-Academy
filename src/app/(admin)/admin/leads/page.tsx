"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Search,
  Filter,
  Download,
  PhoneCall,
  Plus,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  Calendar,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLeadsPage() {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedProgramme, setSelectedProgramme] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");

  const leads = [
    {
      id: "lead-1",
      reference: "ENQ-2026-891240",
      studentName: "Devansh Rajput",
      parentName: "Vikram Rajput",
      phone: "+91 98765 11223",
      email: "devansh.rajput@example.com",
      class: "Class 11",
      school: "Kanha Makhan Public School",
      programme: "IIT-JEE 2-Year Target",
      source: "ADMISSIONS",
      status: "NEW",
      assignedCounsellor: "Unassigned",
      nextFollowup: "29 Aug 2026",
      createdAt: "28 Aug 2026",
    },
    {
      id: "lead-2",
      reference: "ENQ-2026-773412",
      studentName: "Ananya Dixit",
      parentName: "Sanjay Dixit",
      phone: "+91 98765 33445",
      email: "ananya.dixit@example.com",
      class: "Class 8",
      school: "St. Dominic's Senior Secondary",
      programme: "Foundation Junior",
      source: "ETSE",
      status: "COUNSELLING_SCHEDULED",
      assignedCounsellor: "Pooja Sharma",
      nextFollowup: "30 Aug 2026",
      createdAt: "28 Aug 2026",
    },
    {
      id: "lead-3",
      reference: "ENQ-2026-554210",
      studentName: "Rohan Agrawal",
      parentName: "Manoj Agrawal",
      phone: "+91 98765 66778",
      email: "rohan.agrawal@example.com",
      class: "Class 12",
      school: "Delhi Public School, Mathura",
      programme: "NEET-UG 1-Year Fast-Track",
      source: "WEBSITE",
      status: "CAMPUS_VISIT",
      assignedCounsellor: "Rahul Sharma",
      nextFollowup: "28 Aug 2026",
      createdAt: "27 Aug 2026",
    },
    {
      id: "lead-4",
      reference: "ENQ-2026-339811",
      studentName: "Mehak Sharma",
      parentName: "Ramesh Sharma",
      phone: "+91 98765 99001",
      email: "mehak.sharma@example.com",
      class: "Class 9",
      school: "Sacred Heart Convent",
      programme: "Foundation Pacing",
      source: "WHATSAPP",
      status: "INTERESTED",
      assignedCounsellor: "Pooja Sharma",
      nextFollowup: "01 Sep 2026",
      createdAt: "26 Aug 2026",
    },
    {
      id: "lead-5",
      reference: "ENQ-2026-118742",
      studentName: "Tanmay Singhal",
      parentName: "Gopal Singhal",
      phone: "+91 98765 44332",
      email: "tanmay.singhal@example.com",
      class: "Dropper",
      school: "Brij Modern School",
      programme: "IIT-JEE Dropper Rankers",
      source: "SCHOLARSHIP",
      status: "CONVERTED",
      assignedCounsellor: "Rahul Sharma",
      nextFollowup: "-",
      createdAt: "25 Aug 2026",
    },
  ];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      searchQuery === "" ||
      l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.school.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "ALL" || l.status === selectedStatus;
    const matchesProgramme = selectedProgramme === "ALL" || l.programme.includes(selectedProgramme);
    const matchesSource = selectedSource === "ALL" || l.source === selectedSource;

    return matchesSearch && matchesStatus && matchesProgramme && matchesSource;
  });

  const exportCSV = () => {
    const headers = "Reference,Student Name,Parent Name,Phone,Email,Class,Programme,Source,Status,Counsellor,Next Followup,Created At\n";
    const rows = filteredLeads
      .map(
        (l) =>
          `"${l.reference}","${l.studentName}","${l.parentName}","${l.phone}","${l.email}","${l.class}","${l.programme}","${l.source}","${l.status}","${l.assignedCounsellor}","${l.nextFollowup}","${l.createdAt}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `emprise-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Export Complete", `Exported ${filteredLeads.length} leads to CSV.`);
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              ADMISSIONS PIPELINE
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Lead & Enquiry Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search name, phone, school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]"
              />
            </div>

            {/* Status Filter */}
            <Select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "NEW", label: "New Lead" },
                { value: "CONTACTED", label: "Contacted" },
                { value: "INTERESTED", label: "Interested" },
                { value: "COUNSELLING_SCHEDULED", label: "Counselling Scheduled" },
                { value: "CAMPUS_VISIT", label: "Campus Visit" },
                { value: "CONVERTED", label: "Converted / Admitted" },
                { value: "NOT_INTERESTED", label: "Not Interested" },
                { value: "LOST", label: "Lost" },
              ]}
            />

            {/* Programme Filter */}
            <Select
              id="programme-filter"
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              options={[
                { value: "ALL", label: "All Programmes" },
                { value: "IIT-JEE", label: "IIT-JEE Target Batches" },
                { value: "NEET", label: "NEET-UG Target Batches" },
                { value: "Foundation", label: "Foundation (Classes 8–10)" },
              ]}
            />

            {/* Source Filter */}
            <Select
              id="source-filter"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              options={[
                { value: "ALL", label: "All Sources" },
                { value: "ADMISSIONS", label: "Admissions Form" },
                { value: "ETSE", label: "ETSE 2026 Campaign" },
                { value: "WEBSITE", label: "Website Enquiry" },
                { value: "WHATSAPP", label: "WhatsApp Desk" },
                { value: "SCHOLARSHIP", label: "Scholarship Test" },
              ]}
            />
          </div>
        </div>

        {/* Leads CRM Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Reference / Student</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Class / School</th>
                  <th className="p-3.5">Programme Interest</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Counsellor</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Next Follow-up</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold">{lead.studentName}</strong>
                      <span className="font-mono text-[11px] text-slate-400">{lead.reference}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{lead.phone}</span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">{lead.email}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold block">{lead.class}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[140px]">{lead.school}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-900 font-medium">{lead.programme}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                        {lead.source}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className={cn(
                        "text-xs font-semibold",
                        lead.assignedCounsellor === "Unassigned" ? "text-amber-600 italic" : "text-slate-700"
                      )}>
                        {lead.assignedCounsellor}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <LeadStatusBadge status={lead.status} />
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-600">{lead.nextFollowup}</span>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Link href={`/admin/leads/${lead.id}`}>
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

          {filteredLeads.length === 0 && (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No leads matched your search or filters.</p>
              <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
            </div>
          )}

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredLeads.length} of {leads.length} recorded leads</span>
            <span>Server-side pagination active</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
