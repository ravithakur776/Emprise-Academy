import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_ADMISSIONS_DATA } from "@/data/admissions";
import { ShieldCheck } from "lucide-react";

export const AdmissionsParentSection: React.FC = () => {
  const { parentGuidance } = MAIN_ADMISSIONS_DATA;

  return (
    <Section variant="default" spacing="lg" id="for-parents">
      <Container size="xl">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <Badge variant="gold" size="md">
              FOR PARENTS
            </Badge>
            <Heading as="h2" variant="h1" color="white">
              {parentGuidance.heading}
            </Heading>
            <Text variant="body-large" color="white" className="opacity-90">
              {parentGuidance.subheading}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parentGuidance.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--brand-accent)] shrink-0" />
                    <span>{pt.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
