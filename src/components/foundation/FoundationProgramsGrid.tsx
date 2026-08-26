import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { FoundationProgramCard } from "@/data/foundation";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FoundationProgramsGridProps {
  programs: FoundationProgramCard[];
}

export const FoundationProgramsGrid: React.FC<FoundationProgramsGridProps> = ({ programs }) => {
  return (
    <Section variant="default" spacing="lg" id="programmes">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            AGE-APPROPRIATE ENRICHMENT
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Foundation Programmes for Classes 8, 9 & 10
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Carefully crafted learning pathways designed to build mathematical confidence, scientific curiosity, and academic discipline.
          </Text>
        </div>

        {/* 3 Programme Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id}
              className={cn(
                "flex flex-col justify-between bg-white rounded-2xl border-2 p-6 sm:p-8 transition-all duration-200 hover:shadow-xl relative overflow-hidden",
                idx === 0
                  ? "border-amber-300 hover:border-[var(--brand-gold)]"
                  : idx === 1
                  ? "border-blue-300 hover:border-[var(--brand-primary)]"
                  : "border-orange-300 hover:border-[var(--brand-accent)]"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-2",
                  idx === 0
                    ? "bg-[var(--brand-gold)]"
                    : idx === 1
                    ? "bg-[var(--brand-primary)]"
                    : "bg-[var(--brand-accent)]"
                )}
              />

              <div>
                {/* Header Tag & Duration */}
                <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                  <Badge variant={idx === 0 ? "gold" : idx === 1 ? "primary" : "accent"} size="sm">
                    {prog.badge}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-[var(--brand-muted)] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{prog.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)] tracking-tight mb-2">
                  {prog.title}
                </h3>

                {/* Objective */}
                <p className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-3">
                  Objective: {prog.objective}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {prog.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Programme Highlights
                  </span>
                  {prog.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          idx === 0 ? "text-amber-600" : idx === 1 ? "text-blue-600" : "text-orange-600"
                        )}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors group"
                >
                  <span>Explore Detailed Syllabus & Curriculum</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
