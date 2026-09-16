"use client";

import React from "react";
import { EmpriseSystemStep } from "@/data/homepage";
import {
  BookOpen,
  ClipboardCheck,
  Compass,
  GraduationCap,
  MonitorPlay,
  Users,
  RefreshCcw,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveMethodologyPanelProps {
  step: EmpriseSystemStep;
  index: number;
  totalSteps: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  ClipboardCheck,
  Compass,
  GraduationCap,
  MonitorPlay,
  Users,
  RefreshCcw,
  HeartHandshake,
};

export const ActiveMethodologyPanel: React.FC<ActiveMethodologyPanelProps> = ({
  step,
  index,
  totalSteps,
}) => {
  const IconComponent = (step.iconName && ICON_MAP[step.iconName]) || Sparkles;
  const progressPercent = Math.round(((index + 1) / totalSteps) * 100);

  return (
    <div
      id={`methodology-panel-${step.stepNumber}`}
      role="tabpanel"
      aria-labelledby={`methodology-tab-${step.stepNumber}`}
      className="relative rounded-3xl overflow-hidden text-white border border-blue-900/40 shadow-2xl bg-gradient-to-br from-[#123E73] via-[#1554A8] to-[#1769E0] transition-all duration-300"
    >
      {/* Layered Subtle Radial Light & Ambient Glow */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-900/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Academic Blueprint Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <pattern id="academic-grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#academic-grid-pattern)" />
      </svg>

      {/* Restrained Academic Coordinate Corner Accent */}
      <div
        className="absolute top-4 right-5 text-[10px] font-mono tracking-widest text-blue-200/40 select-none pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        SYS.EMPRISE // {step.stepNumber}
      </div>

      {/* Panel Inner Content with Smooth Fade Micro-Transition */}
      <div
        key={step.stepNumber}
        className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full space-y-6 transition-opacity duration-200 ease-out motion-reduce:transition-none"
      >
        {/* Top Header: Step Counter & Context Chip */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
              STEP {step.stepNumber} OF {String(totalSteps).padStart(2, "0")}
            </span>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-blue-100 border border-white/15 font-semibold tracking-wide uppercase backdrop-blur-sm truncate max-w-[200px] sm:max-w-none">
            {step.subtitle}
          </span>
        </div>

        {/* Middle Hero: Large Academic Icon + Step Title & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/25 shadow-inner">
              <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-blue-200 mt-1">
                {step.phase || `Phase ${index + 1}: Classroom & System Integration`}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-100/95 leading-relaxed font-normal pt-1">
            {step.description}
          </p>
        </div>

        {/* Bottom Supporting Outcomes / Benefits */}
        {step.benefits && step.benefits.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5 pb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Systemic Academic Outcomes</span>
            </div>

            <div className="space-y-2">
              {step.benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Understated Progress Indicator */}
        <div className="pt-2 border-t border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-blue-200 font-medium">
            <span>Academic Methodology Progress</span>
            <span className="font-mono text-amber-300 font-bold">{progressPercent}%</span>
          </div>

          {/* Thin Progress Track */}
          <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-sky-300 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Understated Progress Dots */}
          <div className="flex items-center justify-between pt-1" aria-hidden="true">
            {Array.from({ length: totalSteps }).map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200",
                  dotIdx === index
                    ? "w-4 bg-amber-300 ring-2 ring-amber-300/40"
                    : dotIdx < index
                    ? "bg-white/70"
                    : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
