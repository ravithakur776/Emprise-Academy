import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_SCHOLARSHIP_DATA } from "@/data/scholarship";

export const ScholarshipProcessSection: React.FC = () => {
  const { process } = MAIN_SCHOLARSHIP_DATA;

  return (
    <Section variant="default" spacing="lg" id="process">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            STEP-BY-STEP WORKFLOW
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            How the Scholarship Process Works
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            A simple, transparent 6-step roadmap from initial evaluation to tuition fee concession confirmation.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[var(--brand-accent)] transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] text-xs font-bold flex items-center justify-center mb-4">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
