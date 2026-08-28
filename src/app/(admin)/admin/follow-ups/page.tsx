"use client";

import React, { useState } from "react";
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
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminFollowupsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"TODAY" | "OVERDUE" | "UPCOMING" | "COMPLETED">("TODAY");

  const [followups, setFollowups] = useState([
    {
      id: "f-1",
      leadId: "lead-3",
      reference: "ENQ-2026-554210",
      studentName: "Rohan Agrawal",
      phone: "+91 98765 66778",
      class: "Class 12",
      programme: "NEET-UG Target",
      scheduledDate: "Today, 04:00 PM",
      counsellor: "Rahul Sharma",
      status: "TODAY",
      note: "Confirm campus visit timing for parent and student.",
    },
    {
      id: "f-2",
      leadId: "lead-2",
      reference: "ENQ-2026-773412",
      studentName: "Ananya Dixit",
      phone: "+91 98765 33445",
      class: "Class 8",
      programme: "Foundation Junior",
      scheduledDate: "Tomorrow, 11:00 AM",
      counsellor: "Pooja Sharma",
      status: "UPCOMING",
      note: "Discuss ETSE 2026 test pattern and syllabus breakdown.",
    },
    {
      id: "f-3",
      leadId: "lead-1",
      reference: "ENQ-2026-891240",
      studentName: "Devansh Rajput",
      phone: "+91 98765 11223",
      class: "Class 11",
      programme: "IIT-JEE 2-Year Target",
      scheduledDate: "27 Aug 2026 (Yesterday)",
      counsellor: "Unassigned",
      status: "OVERDUE",
      note: "Callback requested on fee concession criteria.",
    },
  ]);

  const markComplete = (id: string) => {
    setFollowups(followups.map((f) => (f.id === id ? { ...f, status: "COMPLETED" } : f)));
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
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab("TODAY")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
              activeTab === "TODAY"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Today&apos;s Calls ({followups.filter((f) => f.status === "TODAY").length})</span>
          </button>

          <button
            onClick={() => setActiveTab("OVERDUE")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
              activeTab === "OVERDUE"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-rose-600 hover:bg-rose-50"
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Overdue ({followups.filter((f) => f.status === "OVERDUE").length})</span>
          </button>

          <button
            onClick={() => setActiveTab("UPCOMING")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
              activeTab === "UPCOMING"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming ({followups.filter((f) => f.status === "UPCOMING").length})</span>
          </button>

          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
              activeTab === "COMPLETED"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-emerald-700 hover:bg-emerald-50"
            )}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed ({followups.filter((f) => f.status === "COMPLETED").length})</span>
          </button>
        </div>

        {/* Follow-up Cards */}
        {filteredList.length > 0 ? (
          <div className="space-y-3">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{item.reference}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-800">{item.class}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-[var(--brand-accent)] font-semibold">{item.programme}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.studentName}</h3>

                  <p className="text-xs text-slate-600">
                    <strong>Note:</strong> {item.note}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>Scheduled: <strong className="text-slate-700">{item.scheduledDate}</strong></span>
                    <span>•</span>
                    <span>Counsellor: <strong className="text-slate-700">{item.counsellor}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${item.phone.replace(/\s+/g, "")}`}
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  {item.status !== "COMPLETED" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => markComplete(item.id)}
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Done
                    </Button>
                  )}

                  <Link href={`/admin/leads/${item.leadId}`}>
                    <Button variant="outline" size="sm">
                      Lead 360°
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Pending Follow-ups</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no calls scheduled under this category right now.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
