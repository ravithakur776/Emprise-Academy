"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { VerifiedResultItem } from "@/data/results";
import { PublicResultCard } from "./PublicResultCard";
import {
  Trophy,
  Search,
  CheckCircle2,
  Lock,
  FileCheck2,
  Building2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResultsDirectoryClientProps {
  resultsList: VerifiedResultItem[];
}

export const ResultsDirectoryClient: React.FC<ResultsDirectoryClientProps> = ({ resultsList }) => {
  const toast = useToast();
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Scorecard Verification State
  const [verifyRoll, setVerifyRoll] = useState("");
  const [verifyDob, setVerifyDob] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Available dynamic years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(resultsList.map((r) => r.academicYear))).sort().reverse();
    return ["ALL", ...years];
  }, [resultsList]);

  // Filtered results
  const filteredResults = useMemo(() => {
    return resultsList.filter((r) => {
      const matchExam = selectedExam === "ALL" || r.exam === selectedExam;
      const matchYear = selectedYear === "ALL" || r.academicYear === selectedYear;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        r.candidateName.toLowerCase().includes(q) ||
        (r.rollNumberMasked && r.rollNumberMasked.toLowerCase().includes(q)) ||
        (r.collegeAllotted && r.collegeAllotted.toLowerCase().includes(q)) ||
        (r.courseOrBranch && r.courseOrBranch.toLowerCase().includes(q));

      return matchExam && matchYear && matchQuery;
    });
  }, [resultsList, selectedExam, selectedYear, searchQuery]);

  // Featured Results
  const featuredResults = useMemo(() => {
    return filteredResults.filter((r) => r.isFeatured);
  }, [filteredResults]);

  // Official Scorecard Verification Handler
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
      toast.success("Scorecard Verified", "Official examination scorecard retrieved.");
    } catch (err: any) {
      setVerificationError(
        err.message || "No verified record found with the provided Roll Number and Date of Birth."
      );
      toast.error("Lookup Failed", "No scorecard matched the provided credentials.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Section variant="default" spacing="lg" id="results-directory">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="primary" size="md">
            SELECTION ROSTER
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Explore Verified Student Achievements
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Filter by national competitive examination, academic batch year, or search by candidate or institution.
          </Text>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Exam Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
              {[
                { id: "ALL", label: "All Selections" },
                { id: "JEE_ADVANCED", label: "JEE Advanced" },
                { id: "JEE_MAIN", label: "JEE Main" },
                { id: "NEET", label: "NEET-UG" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedExam(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer",
                    selectedExam === tab.id
                      ? "bg-[var(--brand-primary)] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Year Selector & Search Input */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Year Chips */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer",
                      selectedYear === yr
                        ? "bg-orange-50 text-[var(--brand-accent)] border border-orange-200 font-bold"
                        : "text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {yr === "ALL" ? "All Years" : yr}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate or college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[var(--brand-accent)] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Showcase (if any match) */}
        {featuredResults.length > 0 && selectedExam === "ALL" && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                Featured Highlights
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResults.map((result) => (
                <PublicResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}

        {/* All Filtered Results Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--brand-primary)]">
              Published Results ({filteredResults.length})
            </h3>
            {(selectedExam !== "ALL" || selectedYear !== "ALL" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedExam("ALL");
                  setSelectedYear("ALL");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[var(--brand-accent)] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((result) => (
                <PublicResultCard key={result.id} result={result} />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-lg mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[var(--brand-primary)]">
                No Verified Results Found
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No published result records match your selected filter criteria. Verified records are updated following official exam counseling and score releases.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedExam("ALL");
                  setSelectedYear("ALL");
                  setSearchQuery("");
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </div>

        {/* Secure Candidate Scorecard Lookup Section */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-200" id="verify-scorecard">
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Info */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <Badge variant="gold" size="md">
                  AUTHENTIC VERIFICATION
                </Badge>
                <Heading as="h2" variant="h1" color="white">
                  Verify Official Candidate Scorecard
                </Heading>
                <Text variant="body-large" color="white" className="opacity-90">
                  Enrolled students and parents can instantly verify official examination scorecards, All India Ranks, and scholarship percentages using their registered credentials.
                </Text>
                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Protected verification requires both exact Roll Number and Date of Birth.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Returns official subject marks breakdown and verified qualifying status.</span>
                  </div>
                </div>
              </div>

              {/* Right Form / Scorecard Result */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl">
                {verificationResult ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Official Verified Scorecard
                        </span>
                        <h4 className="text-lg font-bold text-[var(--brand-primary)]">
                          {verificationResult.candidateName}
                        </h4>
                      </div>
                      <Badge variant="accent" size="sm">
                        {verificationResult.qualifyingStatus}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Roll Number</span>
                        <span className="font-bold text-[var(--brand-primary)]">{verificationResult.rollNumber}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Academic Year</span>
                        <span className="font-bold text-[var(--brand-primary)]">{verificationResult.academicYear}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Total Marks</span>
                        <span className="font-bold text-[var(--brand-primary)]">
                          {verificationResult.totalMarksObtained} / {verificationResult.maxMarks}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Percentage</span>
                        <span className="font-bold text-[var(--brand-accent)]">{verificationResult.percentage}%</span>
                      </div>
                    </div>

                    {verificationResult.rank && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between">
                        <span>All India Rank (AIR)</span>
                        <span className="text-sm">#{verificationResult.rank}</span>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        setVerificationResult(null);
                        setVerifyRoll("");
                        setVerifyDob("");
                      }}
                    >
                      Verify Another Scorecard
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleScorecardLookup} className="space-y-4">
                    <div className="border-b border-slate-100 pb-3 mb-2">
                      <h4 className="text-base font-bold text-[var(--brand-primary)]">
                        Candidate Scorecard Lookup
                      </h4>
                      <p className="text-xs text-slate-500">
                        Enter credentials exactly as printed on the admit card.
                      </p>
                    </div>

                    {verificationError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{verificationError}</span>
                      </div>
                    )}

                    <FormField label="Candidate Roll Number" required htmlFor="verify-roll">
                      <Input
                        id="verify-roll"
                        placeholder="e.g. 2401XXXX or ETSE2026-000001"
                        value={verifyRoll}
                        onChange={(e) => setVerifyRoll(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Date of Birth (YYYY-MM-DD)" required htmlFor="verify-dob">
                      <Input
                        id="verify-dob"
                        type="date"
                        value={verifyDob}
                        onChange={(e) => setVerifyDob(e.target.value)}
                        required
                      />
                    </FormField>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        isLoading={isVerifying}
                        leftIcon={<FileCheck2 className="w-4 h-4" />}
                      >
                        Verify Official Record
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
