import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge/Badge";
import { VerifiedResultItem } from "@/data/results";
import { Trophy, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PublicResultCardProps {
  result: VerifiedResultItem;
  className?: string;
}

export const PublicResultCard: React.FC<PublicResultCardProps> = ({ result, className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 relative overflow-hidden",
        result.isFeatured ? "border-amber-300 ring-1 ring-amber-200/60" : "",
        className
      )}
    >
      {/* Featured Gold Corner Accent */}
      {result.isFeatured && (
        <div className="absolute top-0 right-0 bg-[var(--brand-gold)] text-slate-900 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-xl shadow-2xs">
          Featured
        </div>
      )}

      <div>
        {/* Top Meta: Exam & Academic Year */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge
            variant={
              result.exam === "JEE_ADVANCED"
                ? "primary"
                : result.exam === "NEET"
                ? "accent"
                : "gold"
            }
            size="sm"
          >
            {result.examLabel}
          </Badge>
          <span className="text-xs font-bold text-slate-400">
            Batch {result.academicYear}
          </span>
        </div>

        {/* Large Rank Typography */}
        <div className="mb-4">
          {result.airRank ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-extrabold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                AIR
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-primary)] tracking-tight">
                #{result.airRank}
              </span>
            </div>
          ) : result.categoryRank ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-extrabold tracking-wider uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Category Rank
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)] tracking-tight">
                #{result.categoryRank}
              </span>
            </div>
          ) : (
            <div className="text-xl font-bold text-[var(--brand-primary)]">
              Qualified
            </div>
          )}
        </div>

        {/* Candidate Name & Masked Roll */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[var(--brand-primary)] shrink-0">
            <GraduationCap className="w-6 h-6 opacity-70" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--brand-primary)] leading-tight">
              {result.candidateName}
            </h3>
            {result.rollNumberMasked && (
              <span className="text-[11px] text-slate-400">
                Roll No: {result.rollNumberMasked}
              </span>
            )}
          </div>
        </div>

        {/* College & Course */}
        <div className="space-y-2 mb-4">
          {result.collegeAllotted && (
            <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
              <Building2 className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
              <span>{result.collegeAllotted}</span>
            </div>
          )}

          {result.courseOrBranch && (
            <div className="text-[11px] text-slate-500 pl-6">
              Branch: {result.courseOrBranch}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Story CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {result.hasStory && result.slug ? (
          <Link
            href={`/results/${result.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
          >
            <span>Read Preparation Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">
            Verified Selection Roster
          </span>
        )}
      </div>
    </div>
  );
};
