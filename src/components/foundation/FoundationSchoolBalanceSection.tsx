import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Scale, CheckCircle2 } from "lucide-react";

export interface FoundationSchoolBalanceProps {
  heading?: string;
  subheading?: string;
  points: readonly { title: string; desc: string }[];
}

export const FoundationSchoolBalanceSection: React.FC<FoundationSchoolBalanceProps> = ({
  heading = "School Learning + Foundation = Stronger Academic Base",
  subheading = "Foundation coaching at Emprise Academy complements school education by adding conceptual depth and analytical problem solving without overloading the student.",
  points,
}) => {
  return (
    <Section variant="default" spacing="lg" id="school-balance">
      <Container size="xl">
        <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <Badge variant="gold" size="md">
              ACADEMIC HARMONY
            </Badge>
            <Heading as="h2" variant="h1" color="white">
              {heading}
            </Heading>
            <Text variant="body-large" color="white" className="opacity-90">
              {subheading}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
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
