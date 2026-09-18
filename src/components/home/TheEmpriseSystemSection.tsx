"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA, EmpriseSystemStep } from "@/data/homepage";
import { MethodologyRailItem } from "./MethodologyRailItem";
import { ActiveMethodologyPanel } from "./ActiveMethodologyPanel";
import { cn } from "@/lib/utils";

export const TheEmpriseSystemSection: React.FC = () => {
  const steps: EmpriseSystemStep[] = HOMEPAGE_DATA.empriseSystem;
  const [activeStep, setActiveStep] = useState<number>(0);

  const selectedStep = steps[activeStep] || steps[0];
  const totalSteps = steps.length;

  return (
    <Section
      variant="default"
      spacing="lg"
      id="emprise-system"
      className="bg-white border-y border-[#E3EAF3]"
    >
      {/* Anchor compatibility for existing #the-system links */}
      <div id="the-system" className="scroll-mt-24" />
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-3.5">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <Badge variant="primary" size="md">
              SIGNATURE METHODOLOGY
            </Badge>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[var(--brand-text)] tracking-tight leading-tight">
            The Emprise <span className="text-[var(--brand-primary)]">System</span>
          </h2>

          {/* Positioning Statement (Distinct Line 1 Hierarchy) */}
          <p className="text-base sm:text-xl font-bold text-[#14213D] tracking-tight leading-snug">
            Setting the Benchmark for IIT-JEE, NEET & Academic Excellence in Mathura
          </p>

          {/* Supporting Statement (Distinct Line 2 Hierarchy) */}
          <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
            A Structured Academic System Designed for Consistent Progress & Better Results.
          </p>
        </div>

        {/* Mobile-Only Active Step Showcase + Quick Chips Selector */}
        <div className="lg:hidden space-y-5 mb-8">
          {/* Mobile Quick Chips Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x focus-visible:outline-none">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 snap-start flex items-center gap-2 border select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
                    isActive
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                      : "bg-white text-[var(--brand-text)] border-[#E3EAF3] hover:bg-slate-50"
                  )}
                >
                  <span className={cn(isActive ? "text-amber-300" : "text-[var(--brand-primary)]")}>
                    {step.stepNumber}
                  </span>
                  <span className="truncate max-w-[130px] font-medium">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Showcase Panel */}
          <ActiveMethodologyPanel
            step={selectedStep}
            index={activeStep}
            totalSteps={totalSteps}
          />
        </div>

        {/* Desktop & Tablet 2-Panel Methodology Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Vertical Numbered Methodology Rail (~42% desktop width) */}
          <div
            className="lg:col-span-5 space-y-2.5 sm:space-y-3"
            role="tablist"
            aria-label="The Emprise System Methodology Steps"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveStep((prev) => (prev + 1) % totalSteps);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveStep((prev) => (prev - 1 + totalSteps) % totalSteps);
              }
            }}
          >
            <div className="pb-1 px-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#667085]">
                Methodology Pathway • {totalSteps} Core Pillars
              </span>
            </div>

            {steps.map((step, idx) => (
              <MethodologyRailItem
                key={step.stepNumber}
                step={step}
                index={idx}
                totalSteps={totalSteps}
                isActive={idx === activeStep}
                onSelect={() => setActiveStep(idx)}
                onHover={() => setActiveStep(idx)}
              />
            ))}
          </div>

          {/* Right Column: Sticky Active Methodology Showcase Panel (~58% desktop width) */}
          <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-24">
            <ActiveMethodologyPanel
              step={selectedStep}
              index={activeStep}
              totalSteps={totalSteps}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
