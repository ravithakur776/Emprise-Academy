"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Select } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  ArrowLeft,
  Layers,
  Sparkles,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Building,
} from "lucide-react";

export default function AdminAdmitCardsBulkPage() {
  const router = useRouter();
  const toast = useToast();

  const [examId, setExamId] = useState("etse-2026");
  const [classFilter, setClassFilter] = useState("ALL");
  const [centreId, setCentreId] = useState("ctr-1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const candidateCount = classFilter === "ALL" ? 42 : 12;

  const handleBulkExecute = () => {
    setShowConfirmModal(false);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success(
        "Bulk Generation Complete",
        `Successfully generated and published ${candidateCount} admit cards for ETSE 2026.`
      );
      router.push("/admin/admit-cards");
    }, 1200);
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
            <span>Back to Admit Cards</span>
          </Link>
        </div>

        {/* Master Bulk Control Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
              HIGH-VOLUME OPERATIONS
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Bulk Admit Card Generation & Dispatch
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Generate, snapshot, and publish entire cohorts with automated roll-number allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Target Examination" required htmlFor="blk-exam">
              <Select
                id="blk-exam"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                options={[{ value: "etse-2026", label: "ETSE 2026 (All Classes)" }]}
              />
            </FormField>

            <FormField label="Candidate Class Filter" required htmlFor="blk-class">
              <Select
                id="blk-class"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                options={[
                  { value: "ALL", label: "All Registered Classes (7–10)" },
                  { value: "Class 7", label: "Class 7" },
                  { value: "Class 8", label: "Class 8" },
                  { value: "Class 9", label: "Class 9" },
                  { value: "Class 10", label: "Class 10" },
                ]}
              />
            </FormField>

            <FormField label="Assign Venue / Centre" required htmlFor="blk-centre">
              <Select
                id="blk-centre"
                value={centreId}
                onChange={(e) => setCentreId(e.target.value)}
                options={[
                  { value: "ctr-1", label: "Main Academic Block, Mathura" },
                  { value: "ctr-2", label: "City Campus, Krishna Nagar" },
                ]}
              />
            </FormField>
          </div>

          {/* Target Summary Banner */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Candidate Pool</span>
              <div className="text-xl font-black text-slate-900">
                {candidateCount} Candidates Qualified for Generation
              </div>
              <span className="text-xs text-slate-500">Venue: Main Academic Block, Mathura</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="md"
                isLoading={isProcessing}
                onClick={() => setShowConfirmModal(true)}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Execute Bulk Generation
              </Button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-[var(--brand-accent)]">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">Confirm Bulk Generation</h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div>Exam: <strong>ETSE 2026</strong></div>
                <div>Cohort: <strong>{classFilter === "ALL" ? "Classes 7, 8, 9, 10" : classFilter}</strong></div>
                <div>Total Admit Cards: <strong className="text-[var(--brand-accent)] font-bold">{candidateCount} Passes</strong></div>
                <div>Centre: <strong>Main Academic Block, Mathura</strong></div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                This operation will allocate unique roll numbers, snapshot candidate details, generate cryptographic verification tokens, and publish the passes to the student portal.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleBulkExecute}>
                  Confirm & Generate All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
