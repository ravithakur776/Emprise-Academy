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

const COURSE_THEMES: Record<
  string,
  {
    topLine: string;
    badgeStyle: string;
    iconStyle: string;
    accentGlow: string;
  }
> = {
  "iit-jee": {
    topLine: "bg-[#1769E0]",
    badgeStyle: "text-[#1769E0] bg-blue-50 border-blue-200/80",
    iconStyle: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white",
    accentGlow: "group-hover:border-[#1769E0]/45",
  },
  "neet-ug": {
    topLine: "bg-[#16A36A]",
    badgeStyle: "text-[#16A36A] bg-emerald-50 border-emerald-200/80",
    iconStyle: "bg-emerald-50 text-[#16A36A] group-hover:bg-[#16A36A] group-hover:text-white",
    accentGlow: "group-hover:border-[#16A36A]/45",
  },
  foundation: {
    topLine: "bg-[#D97706]",
    badgeStyle: "text-[#D97706] bg-amber-50 border-amber-200/80",
    iconStyle: "bg-amber-50 text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white",
    accentGlow: "group-hover:border-[#D97706]/45",
  },
  "digital-learning": {
    topLine: "bg-gradient-to-r from-[#FF8A00] to-[#1769E0]",
    badgeStyle: "text-[#FF8A00] bg-orange-50 border-orange-200/80",
    iconStyle: "bg-orange-50 text-[#FF8A00] group-hover:bg-[#FF8A00] group-hover:text-white",
    accentGlow: "group-hover:border-[#FF8A00]/45",
  },
};

export const CoursesGridSection: React.FC = () => {
  const courses: CourseCardData[] = HOMEPAGE_DATA.courses;

  return (
    <Section variant="default" spacing="lg" id="programs" className="bg-[#F8FAFC] border-y border-[#E3EAF3]">
      {/* Anchor compatibility for existing #courses links */}
      <div id="courses" className="scroll-mt-24" />
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

        {/* Asymmetric Program Showcase: 3 Top Panels + 1 Wide Digital Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {courses.map((course, idx) => {
            const Icon = iconMap[course.iconName as keyof typeof iconMap] || Atom;
            const theme = COURSE_THEMES[course.id] || COURSE_THEMES["iit-jee"];
            const isWideDigital = course.id === "digital-learning";

            if (isWideDigital) {
              return (
                <div
                  key={course.id}
                  className={`lg:col-span-12 group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#E3EAF3] hover:border-[#1769E0]/40 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden ${theme.accentGlow}`}
                >
                  {/* Thematic Top Accent Line */}
                  <div
                    className={`absolute top-0 left-6 right-6 h-[2.5px] rounded-full ${theme.topLine} opacity-80 group-hover:opacity-100 transition-opacity`}
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Left Column of Wide Card: Identity & Benefits */}
                    <div className="lg:col-span-5 space-y-3.5 text-left">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl transition-colors flex items-center justify-center shrink-0 ${theme.iconStyle}`}>
                          <Icon className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${theme.badgeStyle}`}>
                          {course.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-[#FF8A00] leading-snug mt-1">
                          {course.tagline || course.targetClasses}
                        </p>
                      </div>

                      {course.description ? (
                        <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                          {course.description}
                        </p>
                      ) : null}

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                        <strong className="text-[var(--brand-text)] block mb-0.5 font-bold">Key Advantage:</strong>
                        {course.keyBenefit}
                      </div>
                    </div>

                    {/* Right Column of Wide Card: 5 Features in 2-Column Grid + CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-8 text-left">
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#123E73] mb-3">
                          Included Study Ecosystem
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {course.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Designed for competitive rigor &amp; regular practice
                        </span>
                        <Link href={course.ctaHref} className="w-full sm:w-auto">
                          <Button
                            variant="courseCta"
                            size="md"
                            className="w-full sm:w-auto font-bold bg-white text-[#1769E0] border border-[#1769E0] hover:bg-[#1769E0] hover:text-white hover:border-[#1769E0] hover:shadow-xs hover:-translate-y-px active:bg-[#1358BE] active:border-[#1358BE] active:text-white transition-all duration-200"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            {course.ctaLabel}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard Classroom Cards (IIT-JEE, NEET-UG, Foundation)
            return (
              <div
                key={course.id}
                className={`lg:col-span-4 group relative p-6 rounded-2xl bg-white border border-[#E3EAF3] hover:border-[#1769E0]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left overflow-hidden ${theme.accentGlow} ${idx === 0 ? "ring-1 ring-[#1769E0]/15" : ""}`}
              >
                {/* Subtle Thematic Top Accent Line */}
                <div
                  className={`absolute top-0 left-6 right-6 h-[2.5px] rounded-full ${theme.topLine} opacity-80 group-hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between pt-1">
                    <div className={`w-12 h-12 rounded-xl transition-colors flex items-center justify-center shrink-0 ${theme.iconStyle}`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${theme.badgeStyle}`}>
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
                  {course.description ? (
                    <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                      {course.description}
                    </p>
                  ) : null}

                  {/* Key Benefit Pill */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-medium">
                    <strong className="text-[var(--brand-text)] block mb-0.5 font-bold">Key Advantage:</strong>
                    {course.keyBenefit}
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-1.5 pt-1">
                    {course.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
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
