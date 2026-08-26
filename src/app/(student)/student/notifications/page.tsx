"use client";

import React, { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Bell, CheckCircle2, Clock, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "ETSE 2026 Registration Confirmed",
      message: "Your application for ETSE 2026 (Application ID: ETSE2026-000100) has been verified. Exam is scheduled for Sunday, 6 September 2026.",
      date: "26 August 2026",
      isRead: false,
      type: "REGISTRATION",
    },
    {
      id: "notif-2",
      title: "Admit Card Generation Schedule",
      message: "Digital admit cards with assigned examination roll numbers will be released 10 days prior to the examination date.",
      date: "26 August 2026",
      isRead: false,
      type: "ADMIT_CARD",
    },
    {
      id: "notif-3",
      title: "Foundation Batch Orientation",
      message: "Foundation classroom orientation webinar recording is now available in your academic document portal.",
      date: "20 August 2026",
      isRead: true,
      type: "ACADEMIC",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <StudentLayout
      studentName="Aarav Verma"
      studentClass="Class 8"
      applicationNo="ETSE2026-000100"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              COMMUNICATIONS & ALERTS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              Notifications & Updates
            </h1>
          </div>

          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={cn(
                "p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4",
                notif.isRead
                  ? "bg-white border-slate-200 opacity-80"
                  : "bg-white border-[var(--brand-accent)] shadow-xs"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                  notif.isRead
                    ? "bg-slate-100 text-slate-400"
                    : "bg-orange-50 text-[var(--brand-accent)]"
                )}
              >
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{notif.title}</span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {notif.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
