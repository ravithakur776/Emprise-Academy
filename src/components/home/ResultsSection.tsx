import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Trophy, Award, Search, ArrowRight, ShieldCheck } from "lucide-react";

export const ResultsSection: React.FC = () => {
  return (
    <Section variant="default" spacing="lg" id="results">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            PROVEN TRACK RECORD
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Results That Speak
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Real achievements. Real students. Real journeys. Built through conceptual clarity and relentless practice in Mathura.
          </Text>
        </div>

        {/* Results Showcase / Search Gateway Card */}
        <div className="max-w-4xl mx-auto bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-amber-300 border border-white/10 font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>Verified Academic Examinations</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Authentic JEE & NEET Selection Roster
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Emprise Academy, we maintain absolute authenticity in our results reporting. Every published scorecard is backed by verifiable roll numbers, examination years, and student identity records.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-300">
                  JEE Main & Advanced
                </span>
                <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-300">
                  NEET-UG Medical
                </span>
                <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-300">
                  ETSE Scholarship Ranks
                </span>
              </div>
            </div>

            <div className="md:col-span-5 bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent-light)] block">
                  Candidate Verification
                </span>
                <p className="text-xs text-slate-300">
                  Students and parents can verify official examination scorecards, ranks, and scholarship certificates online.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link href="/results" className="block">
                  <Button variant="primary" size="md" fullWidth rightIcon={<Search className="w-4 h-4" />}>
                    Search Official Results
                  </Button>
                </Link>
                <Link href="/results" className="block">
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    View All Results Archive
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
