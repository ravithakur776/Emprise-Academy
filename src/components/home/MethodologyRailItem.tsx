"use client";

import React from "react";
import { EmpriseSystemStep } from "@/data/homepage";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MethodologyRailItemProps {
  step: EmpriseSystemStep;
  index: number;
  totalSteps: number;
  isActive: boolean;
  onSelect: () => void;
  onHover?: () => void;
}

export const MethodologyRailItem: React.FC<MethodologyRailItemProps> = ({
  step,
  index,
  totalSteps,
  isActive,
  onSelect,
  onHover,
}) => {
  const isLast = index === totalSteps - 1;

  return (
    <div className="relative flex items-start group">
      {/* Subtle Vertical Timeline Connector Line */}
      {!isLast && (
        <div
          className={cn(
            "absolute left-[19px] top-11 bottom-0 w-0.5 pointer-events-none transition-colors duration-300",
            isActive ? "bg-[var(--brand-primary)]/40" : "bg-slate-200"
          )}
          aria-hidden="true"
        />
      )}

      {/* Interactive Step Button Trigger */}
      <button
        type="button"
        role="tab"
        id={`methodology-tab-${step.stepNumber}`}
        aria-selected={isActive}
        aria-controls={`methodology-panel-${step.stepNumber}`}
        tabIndex={0}
        onClick={onSelect}
        onMouseEnter={onHover}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className={cn(
          "w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 select-none",
          "motion-reduce:transition-none motion-reduce:transform-none",
          isActive
            ? "bg-[#F4F8FD] border-[var(--brand-primary)] shadow-sm translate-x-1"
            : "bg-white border-[#E3EAF3] hover:border-[var(--brand-primary)]/50 hover:bg-slate-50/80 hover:translate-x-0.5"
        )}
      >
        {/* Active Indicator Left Accent Strip */}
        {isActive && (
          <span
            className="absolute left-0 top-3 bottom-3 w-1.5 bg-[var(--brand-primary)] rounded-r-full"
            aria-hidden="true"
          />
        )}

        <div className="flex items-center gap-3.5 min-w-0">
          {/* Number Badge */}
          <span
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-all duration-200",
              "motion-reduce:transition-none",
              isActive
                ? "bg-[var(--brand-primary)] text-white shadow-sm ring-4 ring-[#EEF5FF]"
                : "bg-[#EEF5FF] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
            )}
          >
            {step.stepNumber}
          </span>

          {/* Title & Phase/Category Subtitle */}
          <div className="min-w-0">
            <h3
              className={cn(
                "text-xs sm:text-sm font-bold tracking-tight leading-snug truncate transition-colors",
                isActive ? "text-[#123E73]" : "text-[var(--brand-text)] group-hover:text-[var(--brand-primary)]"
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "text-[11px] font-medium mt-0.5 truncate transition-colors",
                isActive ? "text-[var(--brand-primary)] font-semibold" : "text-[#667085]"
              )}
            >
              {step.subtitle}
            </p>
          </div>
        </div>

        {/* Right Arrow/Chevron */}
        <ChevronRight
          className={cn(
            "w-4 h-4 shrink-0 transition-all duration-200",
            "motion-reduce:transition-none motion-reduce:transform-none",
            isActive
              ? "text-[var(--brand-primary)] translate-x-0 opacity-100"
              : "text-slate-300 -translate-x-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--brand-primary)]"
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
