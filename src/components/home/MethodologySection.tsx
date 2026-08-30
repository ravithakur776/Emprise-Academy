import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { ArrowRight, RotateCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const MethodologySection: React.FC = () => {
  const { methodology } = HOMEPAGE_DATA;

  return (
    <Section variant="surface" spacing="lg">
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

        {/* 3D Stepped Cycle Cards (6 Stages) with Progressive Depth Connection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodology.steps.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs transition-all duration-300 flex flex-col justify-between relative overflow-hidden group",
                "hover:-translate-y-2 hover:shadow-xl hover:border-orange-300"
              )}
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-orange-50 to-amber-100/80 text-[var(--brand-accent)] border border-orange-200 font-extrabold text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {step.stepNumber}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Step {idx + 1} of 6
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-1 group-hover:text-[var(--brand-accent)] transition-colors">
                  {step.title}
                </h3>
                <h4 className="text-xs font-bold text-[var(--brand-accent)] uppercase tracking-wider mb-3">
                  {step.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span className="group-hover:text-slate-600 transition-colors">Disciplined Cycle</span>
                {idx < 5 ? (
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--brand-accent)] group-hover:translate-x-1 transition-all" />
                ) : (
                  <RotateCw className="w-4 h-4 text-[var(--brand-accent)] group-hover:rotate-180 transition-transform duration-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
