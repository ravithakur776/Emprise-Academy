import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_SCHOLARSHIP_DATA, ScholarshipTypeItem } from "@/data/scholarship";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScholarshipTypesGrid: React.FC = () => {
  const { scholarshipTypes } = MAIN_SCHOLARSHIP_DATA;

  return (
    <Section variant="surface" spacing="lg" id="scholarship-types">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="accent" size="md">
            SCHOLARSHIP PATHWAYS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Three Transparent Scholarship Pathways
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Structured routes designed to recognize competitive test performance, school board excellence, and academic aptitude.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {scholarshipTypes.map((type, idx) => (
            <div
              key={type.id}
              className={cn(
                "flex flex-col justify-between bg-white rounded-3xl border-2 p-6 sm:p-8 transition-all duration-200 hover:shadow-xl relative overflow-hidden",
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
                <div className="flex items-center justify-between mb-4 pt-1">
                  <Badge variant={idx === 0 ? "gold" : idx === 1 ? "primary" : "accent"} size="sm">
                    {type.badge}
                  </Badge>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Pathway 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-primary)] tracking-tight mb-2">
                  {type.title}
                </h3>

                <p className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-3">
                  Target: {type.targetAudience}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {type.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-6 text-xs text-slate-700">
                  <strong className="text-slate-900 block mb-1">Evaluation Method:</strong>
                  <span>{type.evaluationMethod}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Key Features
                  </span>
                  {type.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          idx === 0 ? "text-amber-600" : idx === 1 ? "text-blue-600" : "text-orange-600"
                        )}
                      />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="#counselling"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                >
                  <span>Inquire for This Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
