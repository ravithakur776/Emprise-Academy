import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_ETSE_DATA } from "@/data/etse";

export const EtseEligibilitySection: React.FC = () => {
  const { eligibility } = MAIN_ETSE_DATA;

  return (
    <Section variant="default" spacing="lg" id="eligibility">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            ELIGIBILITY CRITERIA
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {eligibility.heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            {eligibility.subheading}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eligibility.classes.map((cls, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[var(--brand-accent)] transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center font-extrabold text-lg mb-4">
                  {cls.classLevel.replace("Class ", "")}th
                </div>

                <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-1">
                  {cls.classLevel} Students
                </h3>

                <p className="text-xs font-semibold text-[var(--brand-accent)] mb-3">
                  {cls.target}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cls.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
