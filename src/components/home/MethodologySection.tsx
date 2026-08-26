import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { ArrowRight, RotateCw } from "lucide-react";

export const MethodologySection: React.FC = () => {
  const { methodology } = HOMEPAGE_DATA;

  return (
    <Section variant="default" spacing="lg">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="accent" size="md">
            ACADEMIC PROCESS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {methodology.heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            {methodology.subheading}
          </Text>
        </div>

        {/* Stepped Cycle Cards (6 Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodology.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[var(--brand-accent)] transition-all duration-150 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] border border-orange-100 font-extrabold text-sm flex items-center justify-center shadow-2xs">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Stage {idx + 1} of 6
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-1">
                  {step.title}
                </h3>
                <h4 className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-3">
                  {step.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Disciplined Cycle</span>
                {idx < 5 ? (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                ) : (
                  <RotateCw className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
