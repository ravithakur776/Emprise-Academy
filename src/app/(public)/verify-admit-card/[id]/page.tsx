import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { AdmitCardService } from "@/services/admit-card.service";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight, Building, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Admit Card Verification | Emprise Academy",
  description: "Official public verification portal for ETSE 2026 examination admit cards.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyAdmitCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const token = resolvedParams.id;

  let verificationResult: any = {
    isValid: false,
    message: "Invalid verification token.",
  };

  try {
    verificationResult = await AdmitCardService.verifyPublicAdmitCard(token);
  } catch {
    verificationResult = {
      isValid: false,
      message: "Unable to verify admit card with provided token.",
    };
  }

  const isValid = verificationResult.isValid;
  const isRevoked = verificationResult.status === "REVOKED";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <Container size="md">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <Badge variant="primary" size="md">
              OFFICIAL VERIFICATION DESK
            </Badge>
            <Heading as="h1" variant="h2" align="center">
              Admit Card Verification Record
            </Heading>
            <Text variant="body" color="muted" align="center">
              Candidate credential verification for Emprise Talent Search Examination.
            </Text>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 overflow-hidden">
            {isValid ? (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-sm sm:text-base font-bold">
                      Valid & Verified Admit Card
                    </strong>
                    <span className="text-xs text-emerald-700">
                      This admit card record is authentic and confirmed by the Emprise Examination Board.
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500 font-medium">Candidate Name:</span>
                      <strong className="text-slate-900 font-bold">{verificationResult.candidateName}</strong>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500 font-medium">Application / Roll Number:</span>
                      <strong className="text-[var(--brand-primary)] font-extrabold">
                        {verificationResult.rollNumber || verificationResult.applicationNumber}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500 font-medium">Examination:</span>
                      <span className="text-slate-800 font-semibold">{verificationResult.examTitle}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500 font-medium">Exam Date:</span>
                      <span className="text-amber-700 font-bold">{verificationResult.examDate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Allotted Centre:</span>
                      <span className="text-slate-800 font-semibold text-right">
                        {verificationResult.examCentre}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-500 text-center">
                  Verified by Emprise Academy Authentication Authority • {new Date().toLocaleDateString("en-IN")}
                </div>

                <div className="pt-2 text-center">
                  <Link href="/etse-2026">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Go to ETSE 2026 Campaign Portal
                    </Button>
                  </Link>
                </div>
              </div>
            ) : isRevoked ? (
              <div className="space-y-6 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <XCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-700">
                    Revoked Admit Card
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                    {verificationResult.message || "This admit card has been cancelled by the examination administration."}
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      Contact Admissions Desk
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Admit Card Not Found or Invalid Token
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                    The requested verification token could not be verified against official candidate records.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/etse-2026">
                    <Button variant="primary" size="sm">
                      Visit ETSE 2026 Registration
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
