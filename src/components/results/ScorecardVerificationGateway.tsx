"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { ShieldCheck, Search, CheckCircle2, Lock, FileCheck2, Building2, Calendar, AlertCircle } from "lucide-react";

export const ScorecardVerificationGateway: React.FC = () => {
  const toast = useToast();
  const [verifyRoll, setVerifyRoll] = useState("");
  const [verifyDob, setVerifyDob] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleScorecardLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyRoll.trim() || !verifyDob) {
      toast.error("Required Information", "Please enter both Roll Number and Date of Birth.");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);
    setVerificationResult(null);

    try {
      const res = await fetch("/api/results/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: verifyRoll.trim().toUpperCase(),
          dob: verifyDob,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No scorecard found matching these credentials.");
      }

      setVerificationResult(data.data);
      toast.success("Scorecard Verified", "Official record loaded from Emprise database.");
    } catch (err: any) {
      setVerificationError(err.message || "Failed to locate scorecard record.");
      toast.error("Lookup Notice", err.message || "No verified record found.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section id="verify-scorecard" className="py-16 sm:py-20 bg-slate-900 text-white scroll-mt-24 border-t border-slate-800">
      <Container size="xl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <Badge variant="gold" size="sm" className="bg-amber-400/20 text-amber-300 border border-amber-400/30">
              OFFICIAL VERIFICATION GATEWAY
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Verify Digital Scorecard & Roll Number
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Authenticate genuine Emprise Academy selection records using candidate credentials.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
            <form onSubmit={handleScorecardLookup} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Roll / Registration Number"
                  required
                  htmlFor="verify-roll"
                  helperText="Format: 8-digit Roll Number or Candidate ID"
                >
                  <Input
                    id="verify-roll"
                    placeholder="e.g. 26090101"
                    value={verifyRoll}
                    onChange={(e) => setVerifyRoll(e.target.value)}
                    required
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                  />
                </FormField>

                <FormField
                  label="Date of Birth"
                  required
                  htmlFor="verify-dob"
                  helperText="Required to authenticate the scorecard search"
                >
                  <Input
                    id="verify-dob"
                    type="date"
                    value={verifyDob}
                    onChange={(e) => setVerifyDob(e.target.value)}
                    required
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                  />
                </FormField>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/60">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  Direct database lookup — only verified authentic scorecards will display.
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isVerifying}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Verify Scorecard
                </Button>
              </div>
            </form>

            {/* Error Message */}
            {verificationError && (
              <div className="mt-6 p-4 rounded-2xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Verification Notice:</strong>
                  {verificationError}
                </div>
              </div>
            )}

            {/* Success Scorecard Result */}
            {verificationResult && (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                      Verified Authentic Emprise Record
                    </span>
                  </div>
                  <Badge variant="gold" size="sm">
                    {verificationResult.exam || "VERIFIED"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs">Candidate Name:</span>
                    <strong className="text-white text-base">{verificationResult.candidateName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Roll Number:</span>
                    <strong className="text-white font-mono">{verificationResult.rollNumberMasked || verifyRoll}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Rank / Percentile:</span>
                    <strong className="text-amber-400 text-base font-bold">
                      {verificationResult.airRank ? `AIR #${verificationResult.airRank}` : verificationResult.percentile ? `${verificationResult.percentile}%ile` : "Qualified"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Allotted Institution:</span>
                    <strong className="text-slate-200">{verificationResult.collegeAllotted || "Confirmed"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Academic Year:</span>
                    <strong className="text-slate-200">{verificationResult.academicYear || "Batch 2026"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Verified Via:</span>
                    <strong className="text-emerald-400">Emprise Examination Registry</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
