"use client";

import React, { useState, useEffect, use } from "react";
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
  AlertCircle,
} from "lucide-react";

interface LeadDetail {
  id: string;
  reference: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  class: string;
  school: string;
  programme: string;
  targetExam: string;
  source: string;
  preferredMode: string;
  preferredDate: string;
  createdAt: string;
  status: string;
  notes: Array<{ id: string; author: string; date: string; text: string }>;
  timeline: Array<{ action: string; time: string; user: string }>;
}

export default function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const toast = useToast();

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [status, setStatus] = useState("NEW");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/leads/${resolvedParams.id}`);
        if (!res.ok) {
          setIsNotFound(true);
          return;
        }
        const json = await res.json();
        if (json.success && json.data) {
          setLead(json.data);
          setStatus(json.data.status);
        } else {
          setIsNotFound(true);
        }
      } catch {
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [resolvedParams.id]);

  const handleUpdateStatus = async () => {
    if (!lead) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success("Lead Updated", `Status updated to ${status}.`);
      } else {
        toast.error("Update Failed", "Could not save status change.");
      }
    } catch {
      toast.error("Update Failed", "Network error.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !lead) return;

    toast.success("Note Logged", "Counsellor interaction note logged.");
    setLead({
      ...lead,
      notes: [
        ...lead.notes,
        {
          id: `n-${Date.now()}`,
          author: "Counsellor",
          date: new Date().toLocaleDateString("en-IN"),
          text: newNote,
        },
      ],
    });
    setNewNote("");
  };

  if (isLoading) {
    return (
      <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
        <div className="p-12 text-center text-slate-400">
          <p className="text-sm font-semibold">Loading lead record...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isNotFound || !lead) {
    return (
      <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
        <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Lead Record Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested lead ID does not exist in the database or has been deleted.
          </p>
          <Link href="/admin/leads">
            <Button variant="primary" size="sm">
              Return to Leads CRM
            </Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

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
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {lead.reference}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                  {lead.source}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {lead.studentName}
              </h1>
              <p className="text-xs text-slate-500">
                Enquiry captured on {lead.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <LeadStatusBadge status={lead.status} />
              <Link href={`tel:${lead.phone}`}>
                <Button variant="outline" size="sm" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                  Call Candidate
                </Button>
              </Link>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Parent Name</span>
              <strong className="text-slate-800 font-semibold">{lead.parentName}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Contact Mobile</span>
              <strong className="text-slate-800 font-semibold">{lead.phone}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Current Class</span>
              <strong className="text-slate-800 font-semibold">{lead.class}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">School</span>
              <strong className="text-slate-800 font-semibold">{lead.school}</strong>
            </div>
          </div>

          {/* Academic Interest & Target */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                PROGRAMME INTEREST
              </span>
              <p className="font-bold text-slate-900 text-sm">{lead.programme}</p>
              <p className="text-slate-500">Target Goal: {lead.targetExam}</p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                COUNSELLING PREFERENCE
              </span>
              <p className="font-bold text-slate-900 text-sm">{lead.preferredMode}</p>
              <p className="text-slate-500">Preferred Date: {lead.preferredDate}</p>
            </div>
          </div>

          {/* Counsellor Actions & Status Update */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full space-y-1">
              <label className="text-xs font-bold text-slate-700">Update Lead Lifecycle Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
              >
                <option value="NEW">New Lead</option>
                <option value="CONTACTED">Contacted</option>
                <option value="INTERESTED">Interested</option>
                <option value="COUNSELLING_SCHEDULED">Counselling Scheduled</option>
                <option value="CAMPUS_VISIT">Campus Visit</option>
                <option value="CONVERTED">Admitted / Converted</option>
                <option value="LOST">Lost</option>
              </select>
            </div>

            <Button
              variant="primary"
              onClick={handleUpdateStatus}
              isLoading={isSaving}
            >
              Save Lifecycle Status
            </Button>
          </div>
        </div>

        {/* Counsellor Notes & Activity Stream */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--brand-accent)]" />
            <span>Counsellor Interaction Notes</span>
          </h3>

          <form onSubmit={handleAddNote} className="space-y-3">
            <Textarea
              placeholder="Enter remarks from phone call, in-person counselling, or fee discussion..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              className="text-xs"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Add Interaction Note
            </Button>
          </form>

          <div className="space-y-3 pt-2">
            {lead.notes.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No notes logged yet.</p>
            ) : (
              lead.notes.map((note) => (
                <div key={note.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                    <span>{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 whitespace-pre-wrap">{note.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
