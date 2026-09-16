import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, CourseCardData } from "@/data/homepage";
import {
  Atom,
  Stethoscope,
  GraduationCap,
  Laptop,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  Atom,
  Stethoscope,
  GraduationCap,
  Laptop,
};

export const CoursesGridSection: React.FC = () => {
  const courses: CourseCardData[] = HOMEPAGE_DATA.courses;

  return (
    <Section variant="default" spacing="lg" id="courses" className="bg-[var(--brand-background)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="primary" size="md">
            ACADEMIC PROGRAMS
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#14213D] tracking-tight leading-[1.2] mt-3.5 sm:mt-4">
            4 PROGRAMS <span className="text-[#1769E0] block sm:inline">TOWARDS SUCCESS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-2xl mx-auto mt-3.5 sm:mt-4">
            Emprise Mathura offers structured classroom programs for IIT-JEE, NEET, and Foundation (Classes 8–10), designed for conceptual clarity, regular testing, and competitive success.
          </p>
        </div>

        {/* 4-Column Responsive Grid (Desktop 4, Tablet 2, Mobile 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const Icon = iconMap[course.iconName as keyof typeof iconMap] || Atom;

            return (
              <div
                key={course.id}
                className="group p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <span className="text-[10px] font-bold text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                      {course.badge}
                    </span>
                  </div>

                  {/* Course Title & Target / Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {course.title}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${
                        course.tagline
                          ? "font-medium text-[#FF8A00] leading-snug"
                          : "font-semibold text-[var(--brand-accent)]"
                      }`}
                    >
                      {course.tagline || course.targetClasses}
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
                    {course.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
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
                      variant="courseCta"
                      size="sm"
                      fullWidth
                      className="font-bold bg-white text-[#1769E0] border border-[#1769E0] hover:bg-[#1769E0] hover:text-white hover:border-[#1769E0] hover:shadow-xs hover:-translate-y-px active:bg-[#1358BE] active:border-[#1358BE] active:text-white transition-all duration-200"
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
