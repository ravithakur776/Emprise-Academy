import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./Card";
import { Badge, StatusBadge } from "@/components/ui/badge/Badge";
import { Trophy, Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResultCardData {
  id: string;
  candidateName: string;
  rollNumber: string;
  examTitle: string;
  academicYear: string;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  rank?: number | null;
  scholarshipAwarded?: number | null;
  qualifyingStatus: string;
  subjects?: { name: string; marksObtained: number; maxMarks: number }[];
}

export interface ResultCardProps {
  result: ResultCardData;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, className }) => {
  return (
    <Card variant="default" className={cn("border border-slate-200/80 shadow-xs", className)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--brand-muted)]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{result.academicYear}</span>
          </div>
          <StatusBadge status={result.qualifyingStatus} size="sm" />
        </div>
        <CardTitle className="text-lg font-bold">{result.candidateName}</CardTitle>
        <p className="text-xs text-[var(--brand-muted)]">Roll No: {result.rollNumber}</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-3">
          <div>
            <span className="text-[11px] text-[var(--brand-muted)] uppercase tracking-wider block">Score</span>
            <span className="text-base font-bold text-[var(--brand-primary)]">
              {result.totalMarks} <span className="text-xs font-normal text-slate-500">/ {result.maxMarks}</span>
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--brand-muted)] uppercase tracking-wider block">Percentage</span>
            <span className="text-base font-bold text-[var(--brand-accent)]">{result.percentage}%</span>
          </div>
        </div>

        {result.rank && (
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200/60 mb-2">
            <Trophy className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />
            <span>All India Rank: #{result.rank}</span>
          </div>
        )}

        {result.scholarshipAwarded && result.scholarshipAwarded > 0 && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200/60">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{result.scholarshipAwarded}% Scholarship Concession Awarded</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
