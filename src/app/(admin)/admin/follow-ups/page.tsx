"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowupItem {
  id: string;
  leadId: string;
  reference: string;
  studentName: string;
  phone: string;
  class: string;
  programme: string;
  scheduledDate: string;
  counsellor: string;
  status: "TODAY" | "OVERDUE" | "UPCOMING" | "COMPLETED";
  note: string;
}

export default function AdminFollowupsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"TODAY" | "OVERDUE" | "UPCOMING" | "COMPLETED">("TODAY");
  const [followups, setFollowups] = useState<FollowupItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowups = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production, load from lead_followups
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Map leads with next followup dates
        const items: FollowupItem[] = json.data
          .filter((l: any) => l.nextFollowup && l.nextFollowup !== "-")
          .map((l: any) => ({
            id: `f-${l.id}`,
            leadId: l.id,
            reference: l.reference,
            studentName: l.studentName,
            phone: l.phone,
            class: l.class,
            programme: l.programme,
            scheduledDate: l.nextFollowup,
            counsellor: l.assignedCounsellor,
            status: "TODAY",
            note: "Scheduled follow-up enquiry call.",
          }));
        setFollowups(items);
      } else {
        setFollowups([]);
      }
    } catch {
      setFollowups([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowups();
  }, [fetchFollowups]);

  const markComplete = (id: string) => {
    setFollowups((prev) => prev.map((f) => (f.id === id ? { ...f, status: "COMPLETED" } : f)));
    toast.success("Follow-up Completed", "Interaction logged in CRM activity.");
  };

  const filteredList = followups.filter((f) => f.status === activeTab);

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              COMMUNICATION SCHEDULE
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Follow-up & Counselling Calls
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchFollowups}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Queue
          </Button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs font-bold overflow-x-auto">
          {(["TODAY", "OVERDUE", "UPCOMING", "COMPLETED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap",
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {tab === "TODAY" && <Clock className="w-3.5 h-3.5" />}
              {tab === "OVERDUE" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
              {tab === "UPCOMING" && <Calendar className="w-3.5 h-3.5" />}
              {tab === "COMPLETED" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{tab.charAt(0) + tab.slice(1).toLowerCase()}</span>
            </button>
          ))}
        </div>

        {/* Follow-up Cards */}
        <div className="space-y-3">
          {filteredList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">No follow-ups in this queue</p>
              <p className="text-xs text-slate-400">
                Scheduled callbacks and counselling visits will appear here automatically.
              </p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-slate-900">{item.studentName}</strong>
                    <span className="text-xs text-slate-500 font-mono">({item.reference})</span>
                    <Badge variant="primary" size="sm">{item.class}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Phone:</span> {item.phone} | <span className="font-semibold text-slate-800">Target:</span> {item.programme}
                  </p>
                  <p className="text-xs text-slate-500 italic">"{item.note}"</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status !== "COMPLETED" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => markComplete(item.id)}
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Mark Completed
                    </Button>
                  )}
                  <Link href={`/admin/leads/${item.leadId}`}>
                    <Button variant="outline" size="sm">
                      Open Lead
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
