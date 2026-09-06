import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
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
} from "lucide-react";

export const EtseFeatureSection: React.FC = () => {
  const { etseFeature } = HOMEPAGE_DATA;

  return (
    <Section variant="default" spacing="lg" id="etse-feature" className="bg-white">
      <Container size="xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#123E73] via-[#1769E0] to-[#0B2748] text-white p-6 sm:p-10 lg:p-12 border border-blue-900/40 shadow-xl overflow-hidden">
          {/* Decorative Background Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Heading & Key Details */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold">
                <Trophy className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>ANNUAL TALENT SEARCH EXAMINATION</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {etseFeature.heading}
                </h2>
                <p className="text-sm sm:text-base text-slate-100/90 max-w-xl leading-relaxed">
                  {etseFeature.subheading}
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-slate-100">
                  <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                  <span><strong>Exam Date:</strong> {etseFeature.examDate}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-slate-100">
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>Eligibility:</strong> {etseFeature.eligibility}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-slate-100">
                  <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span><strong>Time:</strong> {etseFeature.examTime}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>Registration Fee:</strong> {etseFeature.fee}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href={etseFeature.ctaRegister.href}>
                  <Button
                    variant="accent"
                    size="lg"
                    className="font-bold bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {etseFeature.ctaRegister.label}
                  </Button>
                </Link>

                <Link href={etseFeature.ctaAdmitCard.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10 font-semibold"
                    leftIcon={<CreditCard className="w-4 h-4" />}
                  >
                    {etseFeature.ctaAdmitCard.label}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Information Snapshot Box */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Merit Reward System
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                    UP TO 100% SCHOLARSHIP
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-100/90 leading-relaxed">
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
                </div>

                <div className="pt-2 border-t border-white/15 flex items-start gap-2 text-[11px] text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span><strong>Exam Centre:</strong> {etseFeature.centre}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
