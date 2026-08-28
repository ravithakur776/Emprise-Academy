"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
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
  RefreshCw,
  Calendar,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadItem {
  id: string;
  reference: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  class: string;
  school: string;
  programme: string;
  source: string;
  status: string;
  assignedCounsellor: string;
  nextFollowup: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedProgramme, setSelectedProgramme] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      if (searchQuery) params.set("q", searchQuery);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setLeads(json.data);
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatus, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("Export Empty", "No lead records available to export.");
      return;
    }
    const headers = ["Reference", "Student Name", "Parent Name", "Phone", "Email", "Class", "Programme", "Source", "Status", "Date"];
    const rows = leads.map((l) => [l.reference, l.studentName, l.parentName, l.phone, l.email, l.class, l.programme, l.source, l.status, l.createdAt]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.map((f) => `"${f || ""}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Emprise_Leads_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("CSV Exported", "Filtered leads exported successfully.");
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              LEAD PIPELINE & CRM
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Student Enquiries & Leads
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLeads}
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
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search by student name or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
            >
              <option value="ALL">All Lead Statuses</option>
              <option value="NEW">New Enquiries</option>
              <option value="CONTACTED">Contacted</option>
              <option value="INTERESTED">Interested</option>
              <option value="COUNSELLING_SCHEDULED">Counselling Scheduled</option>
              <option value="CAMPUS_VISIT">Campus Visit</option>
              <option value="CONVERTED">Admitted / Converted</option>
              <option value="LOST">Lost</option>
            </select>

            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
            >
              <option value="ALL">All Target Programmes</option>
              <option value="IIT-JEE">IIT-JEE (Main & Advanced)</option>
              <option value="NEET-UG">NEET-UG (Medical)</option>
              <option value="FOUNDATION">Foundation (Classes 8-10)</option>
            </select>

            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
            >
              <option value="ALL">All Acquisition Sources</option>
              <option value="WEBSITE">Direct Website</option>
              <option value="ADMISSIONS">Admissions Form</option>
              <option value="ETSE">ETSE Campaign</option>
              <option value="WHATSAPP">WhatsApp</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {leads.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">No leads found</p>
                <p className="text-xs text-slate-400">
                  {searchQuery || selectedStatus !== "ALL"
                    ? "Try adjusting your search query or filter criteria."
                    : "New inquiries from website forms, ETSE, and WhatsApp will appear here."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Ref / Student</th>
                    <th className="py-3.5 px-4">Parent / Contact</th>
                    <th className="py-3.5 px-4">Class & Programme</th>
                    <th className="py-3.5 px-4">Source</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="block text-slate-900">{lead.studentName}</strong>
                        <span className="text-[11px] font-mono text-slate-400">{lead.reference}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium block">{lead.phone}</span>
                        <span className="text-[11px] text-slate-500">{lead.parentName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-semibold block">{lead.class}</span>
                        <span className="text-[11px] text-slate-500">{lead.programme}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <LeadStatusBadge status={lead.status} />
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {lead.createdAt}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                            Manage
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
