import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_SCHOLARSHIP_DATA } from "@/data/scholarship";
import { GraduationCap, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export const ScholarshipEligibilitySection: React.FC = () => {
  const { eligibility } = MAIN_SCHOLARSHIP_DATA;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {eligibility.categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-[var(--brand-primary)] text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)]">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block mb-1">Eligible Students:</strong>
                    <span>{cat.eligibility}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100/80">
                    <strong className="text-[var(--brand-accent)] block mb-1">Evaluation Basis:</strong>
                    <span className="text-slate-700">{cat.criteria}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
