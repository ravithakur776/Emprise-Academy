"use client";

import React from "react";
import Link from "next/link";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import {
  CreditCard,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck,
  Printer,
  Download,
  AlertCircle,
  QrCode,
  ExternalLink,
} from "lucide-react";

export default function StudentAdmitCardsPage() {
  const admitCards = [
    {
      id: "ac-etse-2026",
      examTitle: "Emprise Talent Search Examination 2026 (ETSE 2026)",
      applicationNo: "ETSE2026-000100",
      rollNumber: "26080100",
      candidateName: "Aarav Verma",
      fatherName: "Sunil Verma",
      currentClass: "Class 8",
      examDate: "Sunday, 6 September 2026",
      examTime: "10:00 AM – 12:00 PM (Reporting: 09:30 AM)",
      examCentre: "Emprise Academy Campus, Mathura",
      centreAddress: "Mathura, Uttar Pradesh",
      status: "PUBLISHED",
      verificationToken: "0d9388cde8d8b32f91a0b3",
      isReady: true,
    },
  ];

  return (
    <StudentLayout
      studentName="Aarav Verma"
      studentClass="Class 8"
      applicationNo="ETSE2026-000100"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              EXAMINATION CREDENTIALS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Admit Cards
            </h1>
          </div>
        </div>

        {/* Admit Cards List */}
        {admitCards.length > 0 ? (
          <div className="space-y-6">
            {admitCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 sm:p-8 space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--brand-primary)]" />

                {/* Card Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    <EmpriseLogo size="md" />
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block">
                        OFFICIAL EXAMINATION PASS
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)]">
                        {card.examTitle}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={card.status === "PUBLISHED" ? "success" : "warning"} size="md">
                      {card.status === "PUBLISHED" ? "Admit Card Issued" : "Pending Release"}
                    </Badge>
                  </div>
                </div>

                {/* Candidate & Roll Snapshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Official Roll Number</span>
                    <strong className="text-[var(--brand-accent)] font-mono text-base font-black">
                      {card.rollNumber}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Application ID</span>
                    <strong className="text-slate-900 font-mono text-sm">{card.applicationNo}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Candidate Name</span>
                    <strong className="text-slate-900">{card.candidateName}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Class / Pacing</span>
                    <strong className="text-slate-900">{card.currentClass}</strong>
                  </div>
                </div>

                {/* Centre & Timings Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-linear-to-br from-slate-900 to-[var(--brand-primary)] text-white space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                      Date & Reporting
                    </span>
                    <div className="text-sm font-extrabold text-white">{card.examDate}</div>
                    <div className="text-xs text-slate-300">{card.examTime}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Allotted Examination Center
                    </span>
                    <div className="text-sm font-bold text-slate-900">{card.examCentre}</div>
                    <div className="text-xs text-slate-600">{card.centreAddress}</div>
                  </div>
                </div>

                {/* Important Instructions Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                  <strong className="block font-bold">Important Instructions for Candidates:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>Candidates must bring a printed copy of this digital admit card to the examination hall.</li>
                    <li>Carry 2 passport-size photographs and a valid school photo ID or Aadhaar card.</li>
                    <li>Electronic devices, calculators, and smartwatches are strictly prohibited.</li>
                  </ul>
                </div>

                {/* Bottom Verification & Print Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <QrCode className="w-4 h-4 text-[var(--brand-accent)]" />
                    <span>Public Verification Token: <strong className="font-mono text-slate-700">{card.verificationToken}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/verify-admit-card/${card.verificationToken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        Verify QR Link
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.print()}
                      leftIcon={<Printer className="w-4 h-4" />}
                    >
                      Print Admit Card
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Admit Cards Published</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your digital admit card has not been released yet. It will appear here prior to your scheduled examination date.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
