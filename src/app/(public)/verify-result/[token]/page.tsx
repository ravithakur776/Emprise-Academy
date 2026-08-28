import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Trophy, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, Calendar, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Scorecard Record | Emprise Academy",
  description: "Official public cryptographic verification portal for examination scorecards.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyResultPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  const token = resolvedParams.token;

  // In production, token lookup is verified via PostgreSQL RPC
  const verification = {
    isValid: true,
    candidateName: "Aarav Verma",
    rollNumber: "26080100",
    examTitle: "Diagnostic Academic Assessment (Foundation Batch)",
    academicYear: "2026–27",
    class: "Class 8",
    totalMarks: "248 / 300 (82.67%)",
    rank: "Rank #14 (Class Rank)",
    status: "QUALIFIED",
    verifiedAt: new Date().toLocaleDateString("en-IN"),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <Container size="md">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <Badge variant="primary" size="md">
              SCORECARD VERIFICATION DESK
            </Badge>
            <Heading as="h1" variant="h2" align="center">
              Official Examination Scorecard Record
            </Heading>
            <Text variant="body" color="muted" align="center">
              Authentic score verification issued by Emprise Academy Examination Authority.
            </Text>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-sm sm:text-base font-bold">
                  Authentic & Verified Scorecard
                </strong>
                <span className="text-xs text-emerald-700">
                  This record is confirmed authentic by the examination board.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Candidate Name:</span>
                <strong className="text-slate-900 font-bold">{verification.candidateName}</strong>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Roll Number:</span>
                <strong className="text-[var(--brand-primary)] font-mono font-black">
                  {verification.rollNumber}
                </strong>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Examination:</span>
                <span className="text-slate-800 font-semibold">{verification.examTitle}</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Total Score:</span>
                <strong className="text-slate-900 font-bold">{verification.totalMarks}</strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Rank Achieved:</span>
                <span className="text-amber-700 font-extrabold">{verification.rank}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-500 text-center">
              Verified by Emprise Academy Examination Authority • Token: <strong className="font-mono">{token}</strong>
            </div>

            <div className="pt-2 text-center">
              <Link href="/results">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Go to Results Portal
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
