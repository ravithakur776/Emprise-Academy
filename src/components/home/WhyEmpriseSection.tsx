"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { HOMEPAGE_DATA, WhyEmpriseItem } from "@/data/homepage";
import {
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Library,
  HelpCircle,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Library,
  HelpCircle,
  HeartHandshake,
  Sparkles,
};

export const WhyEmpriseSection: React.FC = () => {
  const items: WhyEmpriseItem[] = HOMEPAGE_DATA.whyEmprise;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = items[activeIndex] || items[0];
  const ActiveIcon = iconMap[activeItem.iconName] || Sparkles;

  return (
    <Section variant="default" spacing="lg" id="why-emprise" className="bg-[#EEF5FF]/45 border-y border-[var(--brand-border)] select-none">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-10 sm:mb-12">
          <Badge variant="primary" size="md">
            THE EMPRISE ADVANTAGE
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#14213D] tracking-tight leading-[1.2] mt-3.5 sm:mt-4">
            <span className="inline-block">Trusted by Mathura’s Parents. </span>
            <span className="inline-block text-[#1769E0]">Proven by Results. </span>
            <span className="block mt-1 sm:mt-1.5 text-[#14213D]">Chosen for IIT-JEE &amp; NEET Success.</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed">
            Ten foundational pillars that create disciplined study habits, deeper conceptual clarity, and confident academic achievers in Mathura.
          </Text>
        </div>

        {/* 10-Reason Interactive Showcase Stage */}
        <div className="mb-8 sm:mb-10 rounded-3xl bg-white border border-[#D8E4F2] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden text-left">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1769E0]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF8A00]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Showcase: Active Item Focus */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1769E0] text-white text-xs font-bold tracking-wider uppercase shadow-2xs">
                  Pillar {activeItem.number} of 10
                </span>
                <span className="text-xs font-semibold text-[#FF8A00]">
                  Active Advantage
                </span>
              </div>

              <div className="flex items-start gap-4 pt-1">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center shrink-0 shadow-xs border border-blue-100">
                  <ActiveIcon className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold text-[#14213D] tracking-tight leading-snug">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#667085] mt-2.5 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Showcase: Institutional Value Proposition */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#123E73] to-[#0B2748] text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-3.5">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Academic Benchmark
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/15 text-white font-semibold">
                  Mathura Campus
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct accountability and regular monitoring of every enrolled student.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Synchronized academic progression eliminating school vs exam conflict.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Personal doubt counter access with senior IITian and Doctor mentors.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Differentiators Responsive Grid with Click & Hover Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {items.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            const isActive = idx === activeIndex;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                aria-label={`Select advantage ${item.number}: ${item.title}`}
                className={cn(
                  "group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between select-none relative overflow-hidden",
                  isActive
                    ? "bg-[#1769E0] text-white border-[#1769E0] shadow-md -translate-y-1 ring-2 ring-[#1769E0]/30"
                    : "bg-white text-[var(--brand-text)] border-[#E3EAF3] hover:border-[#1769E0]/50 hover:-translate-y-0.5 shadow-2xs"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
                      )}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold transition-colors font-mono",
                        isActive
                          ? "text-amber-300"
                          : "text-slate-300 group-hover:text-[var(--brand-primary)]"
                      )}
                    >
                      {item.number}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "text-xs sm:text-[13px] font-bold leading-snug transition-colors",
                      isActive
                        ? "text-white"
                        : "text-[var(--brand-text)] group-hover:text-[var(--brand-primary)]"
                    )}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className={cn(
                    "text-[11px] mt-2 leading-relaxed line-clamp-2 transition-colors",
                    isActive ? "text-blue-100" : "text-[var(--brand-text-secondary)]"
                  )}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
