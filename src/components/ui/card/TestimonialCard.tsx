import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Quote, Trophy, ArrowUpRight, Bell, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardData {
  id: string;
  studentName: string;
  examCleared: string;
  rankText: string;
  courseAttended: string;
  year: number;
  quote: string;
}

export const TestimonialCard: React.FC<{ testimonial: TestimonialCardData; className?: string }> = ({
  testimonial,
  className,
}) => {
  return (
    <Card variant="default" className={cn("p-6 flex flex-col justify-between border-t-2 border-t-[var(--brand-accent)]", className)}>
      <div>
        <Quote className="w-8 h-8 text-[var(--brand-accent)]/30 mb-3" />
        <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-[var(--brand-primary)]">{testimonial.studentName}</h4>
          <p className="text-xs text-[var(--brand-muted)]">{testimonial.courseAttended} ({testimonial.year})</p>
        </div>
        <div className="text-right">
          <Badge variant="gold" size="sm">
            {testimonial.rankText}
          </Badge>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{testimonial.examCleared}</p>
        </div>
      </div>
    </Card>
  );
};

export interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card variant="default" className={cn("p-6 border-l-4 border-l-[var(--brand-accent)]", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">{label}</span>
        {icon && <span className="text-[var(--brand-primary)] opacity-80">{icon}</span>}
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-primary)] tracking-tight mb-1">
        {value}
      </div>
      {description && <p className="text-xs text-slate-500">{description}</p>}
      {trend && (
        <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-2">
          {trend}
        </span>
      )}
    </Card>
  );
};

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <Card variant="interactive" className={cn("p-6 flex flex-col items-start gap-4", className)}>
      <div className="w-12 h-12 rounded-xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center shrink-0 border border-orange-100 shadow-2xs">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[var(--brand-primary)] mb-1.5">{title}</h4>
        <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export interface AnnouncementCardData {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT" | string;
  startDate: string;
  linkUrl?: string | null;
}

export const AnnouncementCard: React.FC<{ announcement: AnnouncementCardData; className?: string }> = ({
  announcement,
  className,
}) => {
  const isUrgent = announcement.priority === "URGENT" || announcement.priority === "HIGH";

  return (
    <Card
      variant="default"
      className={cn(
        "p-4 sm:p-5 border-l-4",
        isUrgent ? "border-l-red-500 bg-red-50/30" : "border-l-[var(--brand-primary)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant={isUrgent ? "danger" : "primary"} size="sm">
            {announcement.category}
          </Badge>
          {isUrgent && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 uppercase tracking-wider">
              <Bell className="w-3 h-3 animate-bounce" /> Urgent
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--brand-muted)]">{announcement.startDate}</span>
      </div>
      <h4 className="text-base font-bold text-[var(--brand-primary)] mb-1">{announcement.title}</h4>
      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{announcement.content}</p>
    </Card>
  );
};

export interface ExamCardData {
  id: string;
  title: string;
  year: number;
  examDate: string;
  examTime: string;
  reportingTime: string;
  eligibleClasses: string[];
  instructions: string[];
}

export const ExamCard: React.FC<{ exam: ExamCardData; onRegister?: () => void; className?: string }> = ({
  exam,
  onRegister,
  className,
}) => {
  return (
    <Card variant="default" className={cn("p-6 sm:p-8 border-2 border-orange-200/80 bg-linear-to-br from-white to-orange-50/30", className)}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <Badge variant="accent" size="lg">
          ETSE {exam.year}
        </Badge>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          Registrations Open
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)] mb-4">{exam.title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-slate-200/80 mb-6 shadow-2xs">
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <Calendar className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Exam Date</span>
            <span className="font-bold">{exam.examDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <Clock className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Timings</span>
            <span className="font-bold">{exam.examTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <MapPin className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Eligible Classes</span>
            <span className="font-bold">{exam.eligibleClasses.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-slate-500">Upto 100% Scholarship Concession on Tuition Fees</span>
        <Button variant="primary" size="md" onClick={onRegister} rightIcon={<ArrowUpRight className="w-4 h-4" />}>
          Register for ETSE {exam.year}
        </Button>
      </div>
    </Card>
  );
};
