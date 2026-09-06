import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, StudentAchiever } from "@/data/homepage";
import { Trophy, Award, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const ResultsSection: React.FC = () => {
  const achievers: StudentAchiever[] = HOMEPAGE_DATA.studentAchievers;

  return (
    <Section variant="default" spacing="lg" id="results" className="bg-[var(--brand-background)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            ACADEMIC ACHIEVEMENTS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            Performance That <span className="text-[var(--brand-primary)]">Speaks For Itself</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            Verified achievements of Emprise Academy students across JEE Advanced, NEET-UG, JEE Main, and Foundation Olympiads.
          </Text>
        </div>

        {/* Achiever Cards Grid (Type A Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {achievers.map((student, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Top Badge & Exam */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                    {student.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {student.exam} {student.academicYear}
                  </span>
                </div>

                {/* Candidate Name & Rank */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--brand-text)]">
                    {student.name}
                  </h3>
                  {student.rank && (
                    <div className="text-lg font-extrabold text-[var(--brand-primary)] mt-0.5 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span>{student.rank}</span>
                    </div>
                  )}
                </div>

                {/* Achievement Summary */}
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                  {student.achievement}
                </p>
              </div>

              {/* Program Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{student.program}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Official Scorecard Verification Gateway Card (Refined Type B Featured Card) */}
        <div className="rounded-3xl bg-white border border-[var(--brand-border)] p-6 sm:p-8 shadow-sm relative overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary-soft)] text-xs text-[var(--brand-primary)] font-bold">
                <Trophy className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <span>Verified Candidate Archive</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--brand-text)]">
                Verify Official Examination Scorecards
              </h3>
              <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] max-w-xl leading-relaxed">
                Enrolled students and parents can instantly verify official examination results, subject-wise marks, All India Ranks, and scholarship percentages.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Link href="/results" className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  className="font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Results
                </Button>
              </Link>
              <Link href="/results#verify-scorecard" className="w-full">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  className="text-xs"
                  leftIcon={<Lock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />}
                >
                  Scorecard Lookup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
