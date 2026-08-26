import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/link/TextLink";
import { ArrowRight, Trophy, ShieldCheck, CheckCircle2, Search } from "lucide-react";

export interface ResultsHeroProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  h1: string;
  subheading: string;
  paragraph: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const ResultsHero: React.FC<ResultsHeroProps> = ({
  breadcrumbs,
  eyebrow,
  h1,
  subheading,
  paragraph,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20 border-b border-slate-800">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-6">
        <div className="text-slate-400">
          <Breadcrumbs
            items={breadcrumbs}
            className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headings & Copy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                {eyebrow}
              </span>
            </div>

            <Heading
              as="h1"
              variant="display"
              color="white"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              {h1}
            </Heading>

            <div className="text-base sm:text-lg font-semibold text-[var(--brand-accent-light)]">
              {subheading}
            </div>

            <Text
              variant="body-large"
              color="white"
              className="text-slate-300 leading-relaxed max-w-2xl text-sm sm:text-base"
            >
              {paragraph}
            </Text>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href={primaryCta.href}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {primaryCta.label}
                </Button>
              </a>
              {secondaryCta && (
                <a href={secondaryCta.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white/20 hover:bg-white/10"
                    leftIcon={<Search className="w-4 h-4" />}
                  >
                    {secondaryCta.label}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Credibility Highlights */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-linear-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Authentic Examination Roster
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    IIT-JEE Advanced • JEE Main • NEET-UG
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">100% Verifiable Records</span>
                    <span className="text-slate-400">Every published rank is tied to official examination roll numbers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Explicit AIR & Category Rank</span>
                    <span className="text-slate-400">No ambiguous merges or misleading rank representations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Premier Institution Selections</span>
                    <span className="text-slate-400">IITs, NITs, IIITs, and Government Medical Colleges.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 text-center">
                <a
                  href="#verify-scorecard"
                  className="block w-full py-2.5 px-4 rounded-lg bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Verify Candidate Scorecard Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
