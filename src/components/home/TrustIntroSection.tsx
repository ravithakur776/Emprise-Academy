import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { CheckCircle2, ArrowRight, Trophy, GraduationCap } from "lucide-react";

export const TrustIntroSection: React.FC = () => {
  const { trustIntro } = HOMEPAGE_DATA;

  return (
    <Section variant="default" spacing="lg" id="about-intro" className="bg-white">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <Badge variant="primary" size="md">
                ACADEMIC EXCELLENCE • EST. 2011
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0B2748] tracking-tight leading-[1.2]">
                The Leader in{" "}
                <span className="text-[var(--brand-primary)]">
                  IIT-JEE, NEET &amp; Foundation
                </span>{" "}
                Coaching in Mathura
              </h2>
            </div>

            <Text variant="body-large" color="secondary" className="leading-relaxed text-sm sm:text-base">
              {trustIntro.paragraph}
            </Text>

            {/* Credibility Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E3EAF3] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-[#1769E0]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0B2748] tracking-tight">7+</div>
                  <div className="text-xs font-semibold text-[#667085] leading-tight">
                    National Education Awards
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E3EAF3] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF4E5] text-[#FF8A00] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#FF8A00]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0B2748] tracking-tight">IITians &amp; Doctors</div>
                  <div className="text-xs font-semibold text-[#667085] leading-tight">
                    as Faculty
                  </div>
                </div>
              </div>
            </div>

            {/* Core Institutional Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Director-Led Classrooms & Mentorship</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Small Batches for 100% Doubt Coverage</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Graded DPPs & CBT Pattern Test Series</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Board Excellence Synchronized with JEE/NEET</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link href="/about">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Emprise
                </Button>
              </Link>
              <Link href="#directors">
                <Button variant="secondary" size="md">
                  Meet Directors
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Credibility Highlights Cards (Clean White Type A) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {trustIntro.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--brand-text)] mt-1">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] text-[var(--brand-text-secondary)] mt-1 leading-snug">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
