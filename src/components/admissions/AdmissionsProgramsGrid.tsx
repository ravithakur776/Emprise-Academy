import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_ADMISSIONS_DATA, AdmissionProgrammeChoice } from "@/data/admissions";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdmissionsProgramsGrid: React.FC = () => {
  const { programmeChoices } = MAIN_ADMISSIONS_DATA;

  return (
    <Section variant="surface" spacing="lg" id="programmes">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            ACADEMIC PATHWAYS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Choose Your Target Programme
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Specialized classroom streams designed for engineering, medical, and middle-school foundation excellence in Mathura.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programmeChoices.map((prog, idx) => (
            <div
              key={prog.id}
              className={cn(
                "flex flex-col justify-between bg-white rounded-3xl border-2 p-6 sm:p-8 transition-all duration-200 hover:shadow-xl relative overflow-hidden",
                idx === 0
                  ? "border-blue-300 hover:border-[var(--brand-primary)]"
                  : idx === 1
                  ? "border-orange-300 hover:border-[var(--brand-accent)]"
                  : "border-amber-300 hover:border-[var(--brand-gold)]"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-2",
                  idx === 0
                    ? "bg-[var(--brand-primary)]"
                    : idx === 1
                    ? "bg-[var(--brand-accent)]"
                    : "bg-[var(--brand-gold)]"
                )}
              />

              <div>
                <div className="flex items-center justify-between mb-4 pt-1">
                  <Badge variant={idx === 0 ? "primary" : idx === 1 ? "accent" : "gold"} size="sm">
                    {prog.badge}
                  </Badge>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)] tracking-tight mb-2">
                  {prog.title}
                </h3>

                <p className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-3">
                  Target: {prog.targetAudience}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {prog.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Key Features
                  </span>
                  {prog.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          idx === 0 ? "text-blue-600" : idx === 1 ? "text-orange-600" : "text-amber-600"
                        )}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--brand-accent)] hover:underline group"
                >
                  <span>{prog.ctaLabel}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
