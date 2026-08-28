"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Building,
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";

export default function AdminExamCentresPage() {
  const toast = useToast();

  const [centres, setCentres] = useState([
    {
      id: "ctr-1",
      centreCode: "MTH-MAIN-01",
      centreName: "Main Academic Block, Emprise Academy",
      address: "Near Highway Crossing, Mathura, Uttar Pradesh - 281001",
      city: "Mathura",
      capacity: 300,
      assignedCandidates: 38,
      status: "ACTIVE",
      reportingTime: "09:15 AM",
    },
    {
      id: "ctr-2",
      centreCode: "MTH-CITY-02",
      centreName: "Krishna Nagar City Campus",
      address: "Near BSA College Road, Krishna Nagar, Mathura - 281004",
      city: "Mathura",
      capacity: 150,
      assignedCandidates: 4,
      status: "ACTIVE",
      reportingTime: "09:15 AM",
    },
  ]);

  const toggleStatus = (id: string) => {
    setCentres(
      centres.map((c) =>
        c.id === id ? { ...c, status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : c
      )
    );
    toast.success("Centre Updated", "Venue status toggled successfully.");
  };

  return (
    <AdminLayout staffName="Examination Officer" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              INFRASTRUCTURE & VENUES
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Exam Centre Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/admit-cards">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Admit Cards
              </Button>
            </Link>
          </div>
        </div>

        {/* Centres Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-6">Centre Code / Name</th>
                  <th className="p-3.5">Address & City</th>
                  <th className="p-3.5">Assigned / Capacity</th>
                  <th className="p-3.5">Reporting Time</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {centres.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <strong className="block text-slate-900 font-bold text-sm">{c.centreName}</strong>
                      <span className="font-mono text-[11px] text-[var(--brand-primary)] font-semibold">{c.centreCode}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-700 block max-w-sm leading-relaxed">{c.address}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-900">
                        {c.assignedCandidates} <span className="text-slate-400 font-normal">/ {c.capacity}</span>
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-[var(--brand-accent)]">{c.reportingTime}</span>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={c.status === "ACTIVE" ? "success" : "muted"} size="sm">
                        {c.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 pr-6 text-right">
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(c.id)}>
                        {c.status === "ACTIVE" ? "Set Inactive" : "Activate"}
                      </Button>
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
