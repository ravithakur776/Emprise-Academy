import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { ArrowLink } from "@/components/ui/link/TextLink";
import { HOMEPAGE_DATA, CoreProgram } from "@/data/homepage";
import { CheckCircle2, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const CoreProgramsSection: React.FC = () => {
  const { corePrograms } = HOMEPAGE_DATA;

  return (
    <Section variant="default" spacing="lg" id="courses">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            ACADEMIC PILLARS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Our Core Academic Programmes
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Structured classroom coaching programs designed for students in Mathura targeting India&apos;s premier engineering and medical entrance examinations.
          </Text>
        </div>

        {/* Three Large Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {corePrograms.map((prog) => {
            const isJEE = prog.id === "iit-jee";
            const isNEET = prog.id === "neet-ug";

            return (
              <div
                key={prog.id}
                className={cn(
                  "flex flex-col justify-between bg-white rounded-2xl border-2 p-6 sm:p-8 transition-all duration-200 hover:shadow-xl relative overflow-hidden",
                  isJEE
                    ? "border-[var(--brand-primary)]/40 hover:border-[var(--brand-primary)]"
                    : isNEET
                    ? "border-[var(--brand-accent)]/40 hover:border-[var(--brand-accent)]"
                    : "border-amber-400/50 hover:border-amber-500"
                )}
              >
                {/* Top Accent Bar */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-2",
                    isJEE
                      ? "bg-[var(--brand-primary)]"
                      : isNEET
                      ? "bg-[var(--brand-accent)]"
                      : "bg-[var(--brand-gold)]"
                  )}
                />

                <div>
                  {/* Badge & Target Classes */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <Badge
                      variant={isJEE ? "primary" : isNEET ? "accent" : "gold"}
                      size="sm"
                    >
                      {prog.badge}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      {prog.targetClasses}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)] tracking-tight mb-2">
                    {prog.title}
                  </h3>

                  {/* Target Exam Tag */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md mb-4 border border-slate-200/60">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span>{prog.targetExams}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                    <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                      Curriculum Highlights
                    </span>
                    {prog.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4 shrink-0 mt-0.5",
                            isJEE
                              ? "text-blue-600"
                              : isNEET
                              ? "text-[var(--brand-accent)]"
                              : "text-amber-600"
                          )}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={prog.ctaHref}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-bold transition-colors group",
                      isJEE
                        ? "text-[var(--brand-primary)] hover:text-blue-700"
                        : isNEET
                        ? "text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]"
                        : "text-amber-700 hover:text-amber-800"
                    )}
                  >
                    <span>{prog.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href="#counselling"
                    className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
