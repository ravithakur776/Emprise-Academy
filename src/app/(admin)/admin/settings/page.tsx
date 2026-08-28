"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Settings, Shield, Clock, Database, Lock, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const auditLogs = [
    {
      id: "log-1",
      action: "LEAD_STATUS_CHANGED",
      entity: "leads",
      recordId: "ENQ-2026-554210",
      user: "rahul.sharma@empriseacademy.com",
      timestamp: "Today, 04:45 PM",
      details: "Updated status to CAMPUS_VISIT",
    },
    {
      id: "log-2",
      action: "COUNSELLOR_ASSIGNED",
      entity: "leads",
      recordId: "ENQ-2026-773412",
      user: "admissions.admin@empriseacademy.com",
      timestamp: "Today, 09:15 AM",
      details: "Assigned lead to Pooja Sharma",
    },
    {
      id: "log-3",
      action: "ADMISSION_CONFIRMED",
      entity: "admissions",
      recordId: "ADM-2026-00104",
      user: "admissions.admin@empriseacademy.com",
      timestamp: "25 Aug 2026, 03:20 PM",
      details: "Enrolled Tanmay Singhal into JEE-DROP-2026-B1",
    },
    {
      id: "log-4",
      action: "ETSE_REGISTRATION_CREATED",
      entity: "etse_registrations",
      recordId: "ETSE2026-000100",
      user: "system_intake",
      timestamp: "26 Aug 2026, 02:10 PM",
      details: "Candidate Aarav Verma (Class 8) registered with ₹0 fee",
    },
  ];

  return (
    <AdminLayout staffName="Super Admin" staffRole="SUPER_ADMIN">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              SECURITY & SYSTEM GOVERNANCE
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              System Settings & Audit Log
            </h1>
          </div>
        </div>

        {/* Roles Overview */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-[var(--brand-primary)]" />
            <h2 className="text-base font-bold text-slate-900">Role-Based Access Control Architecture</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 space-y-1">
              <strong className="block font-bold">SUPER_ADMIN</strong>
              <span className="text-purple-700">Full system access, role governance, database administration.</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <strong className="block font-bold">DIRECTOR</strong>
              <span className="text-amber-700">Dashboard, lead CRM, admissions, batch performance, reports.</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
              <strong className="block font-bold">ADMISSION_ADMIN</strong>
              <span className="text-blue-700">Leads, follow-ups, admissions, student records, courses, batches.</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <strong className="block font-bold">COUNSELLOR</strong>
              <span className="text-emerald-700">Assigned leads, follow-up calls, assigned student enquiries only.</span>
            </div>
          </div>
        </div>

        {/* Audit Trail Viewer */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">Security & Operational Audit Trail</h2>
            </div>
            <span className="text-xs text-slate-400">PostgreSQL Immutable Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 pl-4">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Entity / Record</th>
                  <th className="p-3">Staff Identity</th>
                  <th className="p-3 pr-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4 font-mono text-[11px] text-slate-500">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold text-[var(--brand-primary)]">
                      {log.recordId}
                    </td>
                    <td className="p-3 text-slate-700">
                      {log.user}
                    </td>
                    <td className="p-3 pr-4 text-slate-600">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
