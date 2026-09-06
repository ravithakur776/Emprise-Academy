import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, CourseCardData } from "@/data/homepage";
import {
  Compass,
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  Compass: Compass,
  Sparkles: Sparkles,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
};

export const CoursesGridSection: React.FC = () => {
  const courses: CourseCardData[] = HOMEPAGE_DATA.courses;

  return (
    <Section variant="default" spacing="lg" id="courses" className="bg-[var(--brand-background)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            ACADEMIC PROGRAMS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            Structured <span className="text-[var(--brand-primary)]">Courses</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            Comprehensive classroom programs engineered for conceptual mastery, disciplined testing, and competitive success in Mathura.
          </Text>
        </div>

        {/* 4-Column Responsive Grid (Desktop 4, Tablet 2, Mobile 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const Icon = iconMap[course.iconName as keyof typeof iconMap] || BookOpen;

            return (
              <div
                key={course.id}
                className="group p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                      {course.badge}
                    </span>
                  </div>

                  {/* Course Title & Target */}
                  <div>
                    <h3 className="text-lg font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mt-0.5">
                      {course.targetClasses}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                    {course.description}
                  </p>

                  {/* Key Benefit Pill */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-medium">
                    <strong className="text-[var(--brand-text)] block mb-0.5">Key Advantage:</strong>
                    {course.keyBenefit}
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-1.5 pt-1">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link href={course.ctaHref} className="block w-full">
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      className="font-bold group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:border-transparent transition-colors"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {course.ctaLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
