"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { HOMEPAGE_DATA, EmpriseSystemStep } from "@/data/homepage";
import {
  BookOpen,
  FileCheck2,
  CalendarCheck2,
  GraduationCap,
  Monitor,
  Users2,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [
  BookOpen,
  FileCheck2,
  CalendarCheck2,
  GraduationCap,
  Monitor,
  Users2,
  Sparkles,
  HeartHandshake,
];

export const TheEmpriseSystemSection: React.FC = () => {
  const steps: EmpriseSystemStep[] = HOMEPAGE_DATA.empriseSystem;
  const [activeStep, setActiveStep] = useState<number>(0);

  const selected = steps[activeStep];
  const Icon = stepIcons[activeStep] || Sparkles;

  return (
    <Section variant="default" spacing="lg" id="the-system" className="bg-[var(--brand-background)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            SIGNATURE METHODOLOGY
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            The Emprise <span className="text-[var(--brand-primary)]">System</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            A Structured Academic System Designed for Consistent Progress & Better Results in Mathura
          </Text>
        </div>

        {/* Interactive 8-Step Pathway Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 Connected Steps List */}
          <div className="lg:col-span-7 space-y-2.5">
            {steps.map((step, idx) => {
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveStep(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "group w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between",
                    isCurrent
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md translate-x-1"
                      : "bg-white text-[var(--brand-text)] border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 hover:bg-slate-50/80"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                        isCurrent
                          ? "bg-white/20 text-white"
                          : "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
                      )}
                    >
                      {step.stepNumber}
                    </span>

                    <div>
                      <h3
                        className={cn(
                          "text-xs sm:text-sm font-bold tracking-tight leading-snug",
                          isCurrent ? "text-white" : "text-[var(--brand-text)]"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "text-[11px] font-medium mt-0.5",
                          isCurrent ? "text-blue-100" : "text-[var(--brand-muted)]"
                        )}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform shrink-0",
                      isCurrent
                        ? "text-white translate-x-0 opacity-100"
                        : "text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Step Interactive Deep-Dive Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#123E73] via-[#1769E0] to-[#0B2748] text-white border border-blue-900/40 shadow-xl space-y-5 text-left relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--brand-accent)]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  STEP {selected.stepNumber} OF 08
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-blue-100 border border-white/15 font-semibold">
                  {selected.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300 flex items-center justify-center shrink-0 border border-white/20">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {selected.title}
                  </h3>
                  <span className="text-xs text-blue-200">
                    Phase {activeStep + 1}: Classroom & System Integration
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed">
                {selected.description}
              </p>

              <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Integrated with regular OMR & CBT examination pattern.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real-time mentor tracking with proactive doubt resolution.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
