"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Button } from "@/components/ui/button/Button";
import {
  Users,
  PhoneCall,
  Calendar,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardMetrics, DashboardRecentLead, LeadSourceStat } from "@/services/dashboard.service";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<"TODAY" | "WEEK" | "MONTH" | "QUARTER">("MONTH");
  const [isLoading, setIsLoading] = useState(true);

  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalLeads: 0,
    newLeads: 0,
    todaysFollowups: 0,
    pendingCounselling: 0,
    admissionsThisPeriod: 0,
    etseRegistrations: 0,
    conversionRate: 0,
  });

  const [recentLeads, setRecentLeads] = useState<DashboardRecentLead[]>([]);
  const [sourceBreakdown, setSourceBreakdown] = useState<LeadSourceStat[]>([]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      if (json.success && json.data) {
        setMetrics(json.data.metrics);
        setRecentLeads(json.data.recentLeads);
        setSourceBreakdown(json.data.sourceBreakdown);
      }
    } catch {
      // Safe zero state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Top Header & Time Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              OPERATIONAL OVERVIEW
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Admissions & CRM Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardData}
              isLoading={isLoading}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>

            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold">
              {(["TODAY", "WEEK", "MONTH", "QUARTER"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all",
                    timeRange === range
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {range === "TODAY" ? "Today" : range === "WEEK" ? "This Week" : range === "MONTH" ? "This Month" : "This Quarter"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Top Summary KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
              <PhoneCall className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.totalLeads}</div>
            <span className="text-[10px] text-slate-500">Active Pipeline</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">New Leads</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">+{metrics.newLeads}</div>
            <span className="text-[10px] text-amber-700 font-semibold">Requires Action</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Today&apos;s Calls</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.todaysFollowups}</div>
            <span className="text-[10px] text-purple-600 font-semibold">Scheduled Today</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">ETSE Passes</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.etseRegistrations}</div>
            <span className="text-[10px] text-slate-500">Candidates</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Admitted</span>
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">{metrics.admissionsThisPeriod}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Confirmed Seats</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Conversion</span>
              <TrendingUp className="w-4 h-4 text-[var(--brand-accent)]" />
            </div>
            <div className="text-2xl font-black text-[var(--brand-accent)]">{metrics.conversionRate}%</div>
            <span className="text-[10px] text-slate-500">Lead → Admission</span>
          </div>
        </div>

        {/* Action Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                CAMPAIGN MONITOR
              </span>
              <h3 className="text-base font-bold text-white">
                ETSE 2026 Registrations (Classes 7–10)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Exam on 6 Sept 2026. {metrics.etseRegistrations} candidate applications recorded.
              </p>
            </div>
            <Link href="/admin/etse">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View ETSE Registrations
              </Button>
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-1">
                DAILY WORKFLOW
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Pending Follow-up Calls & Reminders
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {metrics.todaysFollowups} counselling follow-ups scheduled. Review notes and update interaction status.
              </p>
            </div>
            <Link href="/admin/follow-ups">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Open Follow-up Queue
              </Button>
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                ENROLLMENT FLOW
              </span>
              <h3 className="text-base font-bold text-slate-900">
                New Admission Applications
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {metrics.admissionsThisPeriod} students admitted. Check batch allocation and student profile links.
              </p>
            </div>
            <Link href="/admin/admissions">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Admissions Roster
              </Button>
            </Link>
          </div>
        </div>

        {/* Lead Sources & Recent Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Source Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Leads by Acquisition Source</span>
              </h3>
            </div>

            <div className="space-y-3">
              {sourceBreakdown.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">No acquisition data available yet.</p>
              ) : (
                sourceBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{item.source}</span>
                      <span className="text-slate-900 font-bold">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[var(--brand-accent)] h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Leads Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Incoming Enquiries
                </h3>
                <span className="text-[11px] text-slate-400">Latest CRM activity stream</span>
              </div>

              <Link href="/admin/leads" className="text-xs font-bold text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1">
                <span>View All Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              {recentLeads.length === 0 ? (
                <div className="py-8 text-center text-slate-400 space-y-1">
                  <p className="text-xs font-semibold">No recent enquiries recorded in CRM.</p>
                  <p className="text-[11px] text-slate-400">New leads captured from public forms will appear here.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-2.5">Lead / Student</th>
                      <th className="pb-2.5">Class / Target</th>
                      <th className="pb-2.5">Source</th>
                      <th className="pb-2.5">Status</th>
                      <th className="pb-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3">
                          <strong className="block text-slate-900">{lead.studentName}</strong>
                          <span className="text-[11px] font-mono text-slate-400">{lead.reference}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-slate-800 font-semibold">{lead.class}</span>
                          <span className="block text-[11px] text-slate-500">{lead.programme}</span>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3">
                          <LeadStatusBadge status={lead.status} />
                        </td>
                        <td className="py-3 text-right">
                          <Link href={`/admin/leads/${lead.id}`}>
                            <Button variant="ghost" size="sm">
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
      </div>
    </AdminLayout>
  );
}
