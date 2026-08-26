import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./Card";
import { Badge } from "@/components/ui/badge/Badge";
import { ArrowLink } from "@/components/ui/link/TextLink";
import { CheckCircle2, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseCardData {
  id: string;
  name: string;
  targetExam: "IIT_JEE" | "NEET_UG" | "FOUNDATION" | string;
  eligibleClasses: string[];
  duration: string;
  description: string;
  features: string[];
  slug: string;
}

export interface CourseCardProps {
  course: CourseCardData;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const isJEE = course.targetExam === "IIT_JEE";
  const isNEET = course.targetExam === "NEET_UG";

  const examBadgeVariant = isJEE ? "primary" : isNEET ? "accent" : "gold";
  const examLabel = isJEE ? "IIT-JEE" : isNEET ? "NEET-UG" : "Foundation";

  return (
    <Card variant="interactive" className={cn("flex flex-col justify-between h-full border-t-4", isJEE ? "border-t-[var(--brand-primary)]" : isNEET ? "border-t-[var(--brand-accent)]" : "border-t-[var(--brand-gold)]", className)}>
      <div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant={examBadgeVariant} size="sm">
              {examLabel}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-[var(--brand-muted)] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
          </div>
          <CardTitle className="text-xl font-bold">{course.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-[var(--brand-text-secondary)] mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-md mb-4 border border-slate-100">
            <Users className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
            <span className="font-semibold">Eligible:</span>
            <span>{course.eligibleClasses.join(", ")}</span>
          </div>

          <div className="space-y-2">
            {course.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <ArrowLink href={`/courses#${course.slug}`}>
          Explore Course Details
        </ArrowLink>
      </CardFooter>
    </Card>
  );
};
