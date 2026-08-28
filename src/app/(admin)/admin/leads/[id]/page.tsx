"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Select, Textarea } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  UserCheck,
  Calendar,
  Clock,
  Send,
  Building,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const toast = useToast();

  const [status, setStatus] = useState("NEW");
  const [counsellor, setCounsellor] = useState("Unassigned");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const lead = {
    id: "lead-1",
    reference: "ENQ-2026-891240",
    studentName: "Devansh Rajput",
    parentName: "Vikram Rajput",
    phone: "+91 98765 11223",
    email: "devansh.rajput@example.com",
    class: "Class 11",
    school: "Kanha Makhan Public School, Mathura",
    programme: "IIT-JEE 2-Year Target Batch",
    targetExam: "JEE (Advanced) 2028",
    source: "ADMISSIONS",
    preferredMode: "Classroom (Offline)",
    preferredDate: "2026-08-30",
    createdAt: "28 August 2026, 11:30 AM",
    notes: [
      {
        id: "n-1",
        author: "System Intake",
        date: "28 August 2026, 11:30 AM",
        text: "Enquiry submitted via Online Admissions Portal. Parent requested weekend counselling session for Class 11 IIT-JEE.",
      },
    ],
    timeline: [
      { action: "Lead Captured", time: "28 Aug 2026, 11:30 AM", user: "Website Intake" },
      { action: "Notification Dispatched", time: "28 Aug 2026, 11:31 AM", user: "CRM Engine" },
    ],
  };

  const handleUpdateStatus = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Lead Updated", `Status updated to ${status}.`);
    }, 500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    toast.success("Note Added", "Counsellor interaction note logged.");
    setNewNote("");
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Leads CRM</span>
          </Link>
        </div>

        {/* Lead Master Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-slate-400 font-bold">{lead.reference}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-[var(--brand-accent)]">{lead.source} SOURCE</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">{lead.studentName}</h1>
            </div>

            <div className="flex items-center gap-3">
              <LeadStatusBadge status={status} size="md" />
              <a
                href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                title="Call Lead"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                title="WhatsApp Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Particulars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Parent Name</span>
              <strong className="text-slate-900">{lead.parentName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Phone Number</span>
              <strong className="text-slate-900">{lead.phone}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Current Class</span>
              <strong className="text-slate-900">{lead.class}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Target Exam</span>
              <strong className="text-[var(--brand-primary)]">{lead.targetExam}</strong>
            </div>
          </div>

          {/* Enquiry Particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Details
              </span>
              <div className="space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">School:</span>
                  <strong className="text-slate-900">{lead.school}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Programme:</span>
                  <strong className="text-slate-900">{lead.programme}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mode:</span>
                  <strong className="text-slate-900">{lead.preferredMode}</strong>
                </div>
              </div>
            </div>

            {/* Counsellor Actions & Status Controls */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                CRM Controls & Assignment
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Status</label>
                  <Select
                    id="lead-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
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
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Assign Counsellor</label>
                  <Select
                    id="lead-counsellor"
                    value={counsellor}
                    onChange={(e) => setCounsellor(e.target.value)}
                    options={[
                      { value: "Unassigned", label: "Unassigned" },
                      { value: "Rahul Sharma", label: "Rahul Sharma" },
                      { value: "Pooja Sharma", label: "Pooja Sharma" },
                      { value: "Admissions Head", label: "Admissions Head" },
                    ]}
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                isLoading={isSaving}
                onClick={handleUpdateStatus}
              >
                Save CRM Updates
              </Button>
            </div>
          </div>

          {/* Notes Log & Activity Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Notes Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Counsellor Interaction Notes</span>
              </h3>

              <div className="space-y-2">
                {lead.notes.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400 text-[10px] font-semibold">
                      <span>{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                    <p className="text-slate-700">{n.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                <Textarea
                  placeholder="Record call discussion, counselling outcome, or follow-up note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                />
                <Button type="submit" variant="outline" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Post Note
                </Button>
              </form>
            </div>

            {/* Audit History Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Activity & Audit Trail</span>
              </h3>

              <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 text-xs">
                {lead.timeline.map((item, idx) => (
                  <div key={idx} className="relative space-y-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] absolute -left-[21px] top-1" />
                    <strong className="block text-slate-900 font-bold">{item.action}</strong>
                    <span className="text-[11px] text-slate-500 block">
                      {item.time} • by {item.user}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
