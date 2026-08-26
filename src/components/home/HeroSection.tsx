import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA } from "@/data/homepage";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  BookOpen,
  Trophy,
  CheckCircle2,
  Calendar,
  Phone,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { hero, announcement } = HOMEPAGE_DATA;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white py-12 sm:py-16 lg:py-24 border-b border-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Verified Institutional Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                {hero.badge}
              </span>
            </div>

            {/* Primary H1 */}
            <Heading
              as="h1"
              variant="display"
              color="white"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              {hero.h1}
            </Heading>

            {/* Supporting Pillar Line */}
            <div className="text-base sm:text-lg font-semibold text-[var(--brand-accent-light)] flex flex-wrap items-center gap-2">
              <span>JEE Main</span>
              <span className="text-slate-500">•</span>
              <span>JEE Advanced</span>
              <span className="text-slate-500">•</span>
              <span>NEET-UG</span>
              <span className="text-slate-500">•</span>
              <span>Foundation Classes 8–10</span>
            </div>

            {/* Supporting Paragraph */}
            <Text
              variant="body-large"
              color="white"
              className="text-slate-300 leading-relaxed max-w-2xl text-sm sm:text-base"
            >
              {hero.paragraph}
            </Text>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href={hero.primaryCta1.href}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {hero.primaryCta1.label}
                </Button>
              </Link>
              <Link href={hero.primaryCta2.href}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[var(--brand-primary)] hover:bg-slate-100"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {hero.primaryCta2.label}
                </Button>
              </Link>
              <Link href={hero.secondaryCta.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  {hero.secondaryCta.label}
                </Button>
              </Link>
            </div>

            {/* ETSE Campaign Highlight Box */}
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-orange-500/30 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-accent)] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-orange-300 uppercase tracking-wider block">
                    {announcement.badge} • Free Scholarship Test
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium block">
                    Exam Date: <strong className="text-white">{announcement.examDate}</strong> ({announcement.eligibleClasses})
                  </span>
                </div>
              </div>
              <Link href={announcement.ctaHref}>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-accent-light)] hover:text-white underline whitespace-nowrap">
                  Register for Free &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Impact Editorial Academic Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-linear-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              {/* Card Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[var(--brand-accent)] text-white flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Emprise Academic System
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Mathura Campus • Est. 2011
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-md">
                  ★ 15+ Years
                </span>
              </div>

              {/* Core Pedagogical Value Points */}
              <div className="space-y-3.5 mb-6 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <BookOpen className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Concept-First Pedagogy</span>
                    <span className="text-slate-400">Deep conceptual derivation instead of superficial memorization.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Engineering & Medical Mentorship</span>
                    <span className="text-slate-400">Guided by University of Derby (UK) alumni & Kota mentors.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Strict Testing & Doubt Cycles</span>
                    <span className="text-slate-400">Weekly chapter-wise tests with personalized error feedback.</span>
                  </div>
                </div>
              </div>

              {/* Counselling Anchor CTA */}
              <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href="#counselling"
                  className="w-full text-center py-2.5 px-4 rounded-lg bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Free Academic Counselling
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
