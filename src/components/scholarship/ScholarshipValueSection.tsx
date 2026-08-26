import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_SCHOLARSHIP_DATA } from "@/data/scholarship";

export const ScholarshipValueSection: React.FC = () => {
  const { valueProposition } = MAIN_SCHOLARSHIP_DATA;

  return (
    <Section variant="surface" spacing="lg" id="value-proposition">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            SCHOLARSHIP PHILOSOPHY
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {valueProposition.heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            {valueProposition.subheading}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProposition.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
