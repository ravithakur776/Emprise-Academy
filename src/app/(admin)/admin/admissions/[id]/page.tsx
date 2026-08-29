"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdmissionStatusBadge } from "@/components/admin/AdmissionStatusBadge";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ArrowLeft,
  GraduationCap,
  Layers,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function AdminAdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const toast = useToast();

  const [admissionStatus, setAdmissionStatus] = useState("ADMITTED");
  const [allocatedBatch, setAllocatedBatch] = useState("JEE-DROP-2026-B1");

  const admission = {
    id: "adm-1",
    admissionNo: "ADM-2026-00104",
    studentName: "Tanmay Singhal",
    fatherName: "Gopal Singhal",
    phone: "+91 98765 44332",
    email: "tanmay.singhal@example.com",
    course: "IIT-JEE Dropper Rankers Target",
    class: "Dropper",
    batch: "JEE-DROP-2026-B1",
    counsellor: "Rahul Sharma",
    enrolledAt: "25 August 2026",
    status: "ADMITTED",
    scholarshipConcession: "35% Merit Concession (Diagnostic Score)",
    feeReceiptNo: "REC-2026-00441",
    centre: "Emprise Academy Campus, Mathura",
  };

  const handleUpdate = () => {
    toast.success("Record Saved", "Batch and admission status updated successfully.");
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admissions</span>
          </Link>
        </div>

        {/* Master Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                OFFICIAL ADMISSION RECORD
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">{admission.studentName}</h1>
            </div>

            <AdmissionStatusBadge status={admissionStatus} size="md" />
          </div>

          {/* Quick Particulars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Admission Number</span>
              <strong className="text-[var(--brand-primary)] font-mono text-sm font-black">
                {admission.admissionNo}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Enrollment Date</span>
              <strong className="text-slate-900">{admission.enrolledAt}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Class / Stream</span>
              <strong className="text-slate-900">{admission.class}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Counsellor</span>
              <strong className="text-slate-900">{admission.counsellor}</strong>
            </div>
          </div>

          {/* Course & Batch Allocation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Course Details
              </span>
              <div className="space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrolled Course:</span>
                  <strong className="text-slate-900">{admission.course}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Centre Campus:</span>
                  <strong className="text-slate-900">{admission.centre}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fee Concession:</span>
                  <span className="text-emerald-700 font-bold">{admission.scholarshipConcession}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Batch Allocation & Management
              </span>

              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Assigned Batch</label>
                  <Select
                    id="adm-batch"
                    value={allocatedBatch}
                    onChange={(e) => setAllocatedBatch(e.target.value)}
                    options={[
                      { value: "JEE-DROP-2026-B1", label: "JEE-DROP-2026-B1 (Dropper Target)" },
                      { value: "JEE-12-2026-A", label: "JEE-12-2026-A (Class 12 Advanced)" },
                      { value: "NEET-11-2026-A", label: "NEET-11-2026-A (Class 11 Medical)" },
                    ]}
                  />
                </div>

                <Button variant="primary" size="sm" fullWidth onClick={handleUpdate}>
                  Update Batch Allocation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
