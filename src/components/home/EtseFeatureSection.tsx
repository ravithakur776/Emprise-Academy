"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  Award,
} from "lucide-react";

export const EtseFeatureSection: React.FC = () => {
  const { etseFeature } = HOMEPAGE_DATA;

  return (
    <section
      id="etse-banner"
      aria-label="ETSE 2026 Talent Search Examination"
      className="w-full bg-gradient-to-b from-[#123E73] via-[#0D2F57] to-[#123E73] text-white py-14 sm:py-18 lg:py-22 relative overflow-hidden border-y border-blue-900/60 select-none shadow-xl"
    >
      {/* Subtle Geometric Background Depth (No particles, no neon, institutional academic lines) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & High-Conversion Action Prompts */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Event Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold shadow-xs">
              <Trophy className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>ANNUAL TALENT SEARCH EXAMINATION • 2026</span>
            </div>

            {/* Main Event Heading */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.18]">
                {etseFeature.heading}
              </h2>
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-100/90 max-w-xl leading-relaxed font-normal">
                {etseFeature.subheading}
              </p>
            </div>

            {/* Key Information Snapshot Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-100 shadow-2xs">
                <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                <span>
                  <strong className="text-white block sm:inline">Exam Date:</strong>{" "}
                  {etseFeature.examDate}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-100 shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  <strong className="text-white block sm:inline">Eligibility:</strong>{" "}
                  {etseFeature.eligibility}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-100 shadow-2xs">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>
                  <strong className="text-white block sm:inline">Time:</strong>{" "}
                  {etseFeature.examTime}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  <strong className="text-white block sm:inline">Registration Fee:</strong>{" "}
                  {etseFeature.fee}
                </span>
              </div>
            </div>

            {/* High-Conversion CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href={etseFeature.ctaRegister.href}>
                <Button
                  variant="accent"
                  size="lg"
                  className="font-bold bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 text-sm sm:text-base px-7"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {etseFeature.ctaRegister.label}
                </Button>
              </Link>

              <Link href={etseFeature.ctaAdmitCard.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10 font-semibold text-sm sm:text-base px-6"
                  leftIcon={<CreditCard className="w-4 h-4 text-amber-300" />}
                >
                  {etseFeature.ctaAdmitCard.label}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Institutional Merit Reward System Panel */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-5 text-left relative overflow-hidden">
              {/* Subtle Ambient Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-accent)]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Merit Reward System
                  </span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold tracking-wide">
                  UP TO 100% SCHOLARSHIP
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-100/90 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>State-level benchmark ranking across Western UP schools.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant digital Admit Card with verified roll number & QR token.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Comprehensive performance diagnostic report sent after exam.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct academic counseling with Emprise Academy directors.</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>
                  <strong>Exam Centre:</strong> {etseFeature.centre}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
