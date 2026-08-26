import React from "react";
import { Card } from "./Card";
import { Badge } from "@/components/ui/badge/Badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FacultyCardData {
  id: string;
  name: string;
  subject: string;
  designation: string;
  experienceYearsText?: string | null;
  photoUrl?: string | null;
}

export interface FacultyCardProps {
  faculty: FacultyCardData;
  className?: string;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty, className }) => {
  return (
    <Card variant="interactive" className={cn("text-center p-6 flex flex-col items-center", className)}>
      <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-[var(--brand-accent)]/30 flex items-center justify-center mb-4 overflow-hidden shadow-xs">
        {faculty.photoUrl ? (
          <img
            src={faculty.photoUrl}
            alt={faculty.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <GraduationCap className="w-10 h-10 text-[var(--brand-primary)] opacity-60" />
        )}
      </div>

      <Badge variant="accent" size="sm" className="mb-2">
        {faculty.subject}
      </Badge>

      <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-1">{faculty.name}</h3>
      <p className="text-xs text-[var(--brand-muted)] font-medium mb-3">{faculty.designation}</p>

      {faculty.experienceYearsText && (
        <div className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          <Briefcase className="w-3.5 h-3.5 text-[var(--brand-muted)]" />
          <span>{faculty.experienceYearsText} Experience</span>
        </div>
      )}
    </Card>
  );
};

export interface DirectorCardData {
  id: string;
  name: string;
  designation: string;
  message: string;
  photoUrl?: string | null;
}

export interface DirectorCardProps {
  director: DirectorCardData;
  className?: string;
}

export const DirectorCard: React.FC<DirectorCardProps> = ({ director, className }) => {
  return (
    <Card variant="surface" className={cn("p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center", className)}>
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-200 border-2 border-[var(--brand-primary)]/20 shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
        {director.photoUrl ? (
          <img
            src={director.photoUrl}
            alt={director.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <GraduationCap className="w-16 h-16 text-[var(--brand-primary)] opacity-40" />
        )}
      </div>

      <div className="flex flex-col justify-center text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)] mb-1">
          {director.name}
        </h3>
        <p className="text-sm font-semibold text-[var(--brand-accent)] mb-3">
          {director.designation}
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed italic border-l-2 border-[var(--brand-accent)] pl-4">
          &ldquo;{director.message}&rdquo;
        </p>
      </div>
    </Card>
  );
};
