import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { FileCheck, BarChart3, Target, RefreshCw } from "lucide-react";

export interface JeeTestingSectionProps {
  heading?: string;
  subheading?: string;
  tiers: readonly { title: string; desc: string }[];
}

const icons = [
  <FileCheck key="1" className="w-5 h-5 text-blue-600" />,
  <BarChart3 key="2" className="w-5 h-5 text-[var(--brand-accent)]" />,
  <Target key="3" className="w-5 h-5 text-purple-600" />,
  <RefreshCw key="4" className="w-5 h-5 text-emerald-600" />,
];

export const JeeTestingSection: React.FC<JeeTestingSectionProps> = ({
  heading = "Measure. Analyse. Improve.",
  subheading = "A continuous testing framework designed to replace exam anxiety with objective accuracy.",
  tiers,
}) => {
  return (
    <Section variant="surface" spacing="lg">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            TESTING & PERFORMANCE
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            {subheading}
          </Text>
        </div>

        {/* Testing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                  {tier.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
