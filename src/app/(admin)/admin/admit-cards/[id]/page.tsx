"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import {
  ArrowLeft,
  Printer,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Building,
  Calendar,
  Clock,
  QrCode,
  ShieldCheck,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function AdminAdmitCardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const toast = useToast();

  const [card, setCard] = useState({
    id: "ac-1",
    applicationNo: "ETSE2026-000100",
    rollNumber: "26080100",
    candidateName: "Aarav Verma",
    fatherName: "Sunil Verma",
    motherName: "Pooja Verma",
    dob: "15 May 2011",
    class: "Class 8",
    school: "St. Dominic's Senior Secondary School, Mathura",
    examTitle: "Emprise Talent Search Examination (ETSE 2026)",
    examDate: "06 September 2026",
    examTime: "10:00 AM – 12:00 PM",
    reportingTime: "09:15 AM",
    centre: "Emprise Academy Campus, Mathura",
    centreAddress: "Mathura, Uttar Pradesh",
    status: "PUBLISHED",
    verificationToken: "0d9388cde8d8b32f91a0b3e6e890c29f",
    generatedAt: "26 Aug 2026, 04:30 PM",
  });

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setCard({
        ...card,
        verificationToken: "f4a8b9c0d1e2f3a4b5c6d7e8",
        generatedAt: "Just now",
      });
      toast.success("Admit Card Regenerated", "Issued new cryptographic verification token and updated snapshot.");
    }, 600);
  };

  const handleRevoke = () => {
    if (!revokeReason.trim()) {
      toast.error("Reason Required", "Please specify a revocation reason.");
      return;
    }
    setCard({ ...card, status: "REVOKED" });
    setShowRevokeModal(false);
    toast.error("Admit Card Revoked", "Admit card is now invalidated for verification and examination entry.");
  };

  const togglePublish = () => {
    const nextStatus = card.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setCard({ ...card, status: nextStatus });
    toast.success("Visibility Updated", `Admit card status changed to ${nextStatus}.`);
  };

  return (
    <AdminLayout staffName="Examination Officer" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/admit-cards"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admit Cards List</span>
          </Link>
        </div>

        {/* Master Inspector Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                OFFICIAL EXAMINATION PASS
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">{card.candidateName}</h1>
              <span className="text-xs text-slate-500">{card.examTitle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={card.status === "PUBLISHED" ? "success" : card.status === "DRAFT" ? "warning" : "danger"} size="md">
                {card.status}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => window.print()} leftIcon={<Printer className="w-4 h-4" />}>
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleRegenerate} isLoading={isRegenerating} leftIcon={<RefreshCw className="w-4 h-4" />}>
                Regenerate
              </Button>
              {card.status !== "REVOKED" ? (
                <Button variant="outline" size="sm" className="text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => setShowRevokeModal(true)} leftIcon={<XCircle className="w-4 h-4" />}>
                  Revoke
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={togglePublish}>
                  Re-publish Pass
                </Button>
              )}
            </div>
          </div>

          {/* Printable Official Admit Card Canvas */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-slate-800 bg-white space-y-6 text-slate-900 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-4">
                <EmpriseLogo size="md" />
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    ETSE 2026 OFFICIAL ADMIT CARD
                  </h2>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold">
                    Talent Search & Scholarship Examination (Session 2026–27) • Mathura
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Roll Number</span>
                <strong className="text-lg sm:text-xl font-black font-mono text-[var(--brand-primary)]">
                  {card.rollNumber}
                </strong>
                <span className="text-[10px] font-mono text-slate-500 block">App: {card.applicationNo}</span>
              </div>
            </div>

            {/* Candidate & Exam Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <strong className="block text-slate-900 font-bold border-b border-slate-200 pb-1.5">
                  Candidate Particulars (Historical Snapshot)
                </strong>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Candidate Name:</span>
                    <strong className="text-slate-900">{card.candidateName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Father's Name:</span>
                    <span className="text-slate-800 font-medium">{card.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date of Birth:</span>
                    <span className="text-slate-800 font-medium">{card.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class & School:</span>
                    <span className="text-slate-800 font-semibold">{card.class} • {card.school}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <strong className="block text-slate-900 font-bold border-b border-slate-200 pb-1.5">
                  Examination Schedule & Centre
                </strong>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exam Date:</span>
                    <strong className="text-slate-900">{card.examDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exam Timings:</span>
                    <span className="text-slate-800 font-medium">{card.examTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reporting Time:</span>
                    <strong className="text-[var(--brand-accent)]">{card.reportingTime}</strong>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 block text-[11px]">Allotted Centre:</span>
                    <strong className="text-slate-900 block">{card.centre}</strong>
                    <span className="text-[10px] text-slate-500 leading-tight block">{card.centreAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification QR & Security Token */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-800 shrink-0">
                  <QrCode className="w-7 h-7" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Cryptographic Security Verification</strong>
                  <span className="text-[11px] text-slate-500 font-mono">Token: {card.verificationToken}</span>
                </div>
              </div>

              <Link
                href={`/verify-admit-card/${card.verificationToken}`}
                target="_blank"
                className="text-[11px] font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1"
              >
                <span>Test Public Verification URL</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Revoke Confirmation Modal */}
        {showRevokeModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">Revoke Admit Card Pass</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Revoking this admit card will immediately invalidate the candidate's QR verification code and block examination entry.
              </p>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Revocation Reason (Mandatory Audit) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="e.g., Inaccurate class submitted by candidate, duplicate registration correction..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowRevokeModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" size="sm" onClick={handleRevoke}>
                  Confirm Revocation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
