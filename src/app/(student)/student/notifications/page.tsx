"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { Bell, CheckCircle2, Clock, Sparkles, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentNotificationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentIdentity, setStudentIdentity] = useState({
    name: "Student",
    class: "Class 12",
    applicationNo: "ETSE Portal",
  });
  const [notifications, setNotifications] = useState<any[]>([]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fnotifications");
        return;
      }

      // Fetch student profile
      const { data: studentProf } = await (supabase
        .from("student_profiles") as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: userProf } = await (supabase
        .from("user_profiles") as any)
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const name =
        studentProf?.full_name ||
        userProf?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student";
      const currentClass = studentProf?.current_class || "Class 12";

      const { data: appRecord } = await (supabase
        .from("etse_registrations") as any)
        .select("application_number")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      setStudentIdentity({
        name,
        class: currentClass,
        applicationNo: appRecord?.application_number || studentProf?.admission_number || "ETSE Portal",
      });

      // Query notifications
      const { data: notifs } = await (supabase
        .from("notifications") as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (notifs && notifs.length > 0) {
        setNotifications(
          notifs.map((n: any) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            date: new Date(n.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            isRead: n.is_read,
            type: n.type || "GENERAL",
          }))
        );
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("[NOTIFICATIONS_LOAD_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      const supabase = createClientBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase.from("notifications") as any)
          .update({ is_read: true })
          .eq("user_id", user.id);
      }
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch {
      // Safe fallback
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const supabase = createClientBrowser();
      await (supabase.from("notifications") as any)
        .update({ is_read: true })
        .eq("id", id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      // Safe fallback
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-md w-1/3" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-64" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      studentName={studentIdentity.name}
      studentClass={studentIdentity.class}
      applicationNo={studentIdentity.applicationNo}
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

          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "p-5 rounded-2xl border transition-all cursor-pointer space-y-2",
                  n.isRead
                    ? "bg-white border-slate-200 opacity-80"
                    : "bg-orange-50/40 border-orange-200 shadow-xs"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] shrink-0" />
                    )}
                    <h2 className="text-sm font-bold text-slate-900">{n.title}</h2>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-4">{n.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Bell className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No New Notifications</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You are all caught up! Examination circulars and admit card releases will appear here.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
