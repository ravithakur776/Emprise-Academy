"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Building,
  Calendar,
  Clock,
  UserCheck,
} from "lucide-react";

export default function AdminAdmitCardGeneratePage() {
  const router = useRouter();
  const toast = useToast();

  const [selectedCandidate, setSelectedCandidate] = useState("reg-3");
  const [centreId, setCentreId] = useState("ctr-1");
  const [isGenerating, setIsGenerating] = useState(false);

  const pendingCandidates = [
    {
      id: "reg-3",
      applicationNo: "ETSE2026-000098",
      name: "Yuvraj Singh",
      class: "Class 9",
      school: "Delhi Public School, Mathura",
      phone: "+91 98765 77889",
    },
    {
      id: "reg-4",
      applicationNo: "ETSE2026-000097",
      name: "Divyansh Soni",
      class: "Class 8",
      school: "Kanha Makhan Public School",
      phone: "+91 98765 11223",
    },
  ];

  const centres = [
    { value: "ctr-1", label: "Main Academic Block, Emprise Academy, Mathura (Capacity: 300)" },
    { value: "ctr-2", label: "Krishna Nagar City Campus, Mathura (Capacity: 150)" },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      toast.success(
        "Admit Card Generated",
        "Assigned transaction-safe roll number 26090098 and created cryptographic verification snapshot."
      );
      router.push("/admin/admit-cards");
    }, 700);
  };

  return (
    <AdminLayout staffName="Examination Officer" staffRole="DIRECTOR">
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/admit-cards"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admit Cards</span>
          </Link>
        </div>

        {/* Generator Wizard Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
              AUTOMATIC PASS GENERATOR
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Generate Individual Admit Card
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Allocate exam venue and generate unique roll number with cryptographic verification.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <FormField label="Select Pending ETSE Candidate" required htmlFor="gen-cand">
              <Select
                id="gen-cand"
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                options={pendingCandidates.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${c.applicationNo}) - ${c.class} • ${c.school}`,
                }))}
              />
            </FormField>

            <FormField label="Allotted Examination Centre" required htmlFor="gen-centre">
              <Select
                id="gen-centre"
                value={centreId}
                onChange={(e) => setCentreId(e.target.value)}
                options={centres}
              />
            </FormField>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <strong className="block text-slate-900 font-bold">Standard ETSE 2026 Schedule:</strong>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>Date: <strong>06 September 2026</strong></div>
                <div>Time: <strong>10:00 AM – 12:00 PM</strong></div>
                <div>Reporting: <strong className="text-[var(--brand-accent)]">09:15 AM</strong></div>
                <div>Exam Format: <strong>Pen & Paper (OMR)</strong></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link href="/admin/admit-cards">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isGenerating}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate & Issue Pass
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
