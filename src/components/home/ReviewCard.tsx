"use client";

import React from "react";
import { HomepageReviewItem } from "@/data/testimonials";
import { Quote, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: HomepageReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const isJee = review.category === "JEE";

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E3EAF3] shadow-xs",
        "hover:border-[var(--brand-primary)]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200",
        "motion-reduce:transition-none motion-reduce:transform-none",
        "flex flex-col justify-between text-left h-full select-none"
      )}
    >
      {/* Top Bar: Subtle Quote Graphic + Category Pill */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0 border border-blue-100">
            <Quote className="w-4 h-4" />
          </div>

          <span
            className={cn(
              "text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
              isJee
                ? "bg-blue-50 text-[var(--brand-primary)] border-blue-200/60"
                : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
            )}
          >
            {review.categoryLabel}
          </span>
        </div>

        {/* Full Editorial Review Text (No Truncation) */}
        <div className="space-y-3 text-sm sm:text-[15px] text-[#334155] leading-relaxed font-normal">
          {review.paragraphs.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Bottom Identity Footer: Student Name & Institution */}
      <div className="pt-4 mt-6 border-t border-[#E3EAF3] flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-[#14213D] tracking-tight">
            {review.studentName}
          </h3>
          <p
            className={cn(
              "text-xs sm:text-sm font-bold mt-0.5 tracking-wide uppercase",
              isJee ? "text-[var(--brand-primary)]" : "text-emerald-700"
            )}
          >
            {review.institution}
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-200/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
