import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/link/TextLink";
import { ArrowRight, BookOpen, CheckCircle2, Stethoscope, HeartPulse, Award } from "lucide-react";

export interface NeetHeroProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  h1: string;
  subheading: string;
  paragraph: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  statsBadge?: string;
}

export const NeetHero: React.FC<NeetHeroProps> = ({
  breadcrumbs,
  eyebrow,
  h1,
  subheading,
  paragraph,
  primaryCta,
  secondaryCta,
  statsBadge = "★ Mathura Campus • Est. 2011",
}) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20 border-b border-slate-800">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-6">
        {/* Breadcrumb Navigation */}
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
                  >
                    {secondaryCta.label}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Academic Framework Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-linear-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[var(--brand-accent)] text-white flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      NEET Medical Rigor
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Physics • Chemistry • Biology (Botany + Zoology)
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-md">
                  {statsBadge}
                </span>
              </div>

              <div className="space-y-3 mb-6 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <BookOpen className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">NCERT Line-by-Line Pedagogy</span>
                    <span className="text-slate-400">Diagrams, tables, and concept maps thoroughly dissected.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <HeartPulse className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Physics Numerical Demystification</span>
                    <span className="text-slate-400">Formula derivations and 45-second execution drills.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">720-Mark OMR Mock Series</span>
                    <span className="text-slate-400">Full-length tests with negative marking control.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 text-center">
                <a
                  href="#counselling"
                  className="block w-full py-2.5 px-4 rounded-lg bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Request Medical Batch Guidance & Counselling
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
