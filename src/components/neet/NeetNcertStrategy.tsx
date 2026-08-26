import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { BookOpen, CheckCircle2, FileText, Sparkles, Layers } from "lucide-react";

export interface NeetNcertStrategyProps {
  heading?: string;
  subheading?: string;
  points: readonly { title: string; desc: string }[];
}

export const NeetNcertStrategy: React.FC<NeetNcertStrategyProps> = ({
  heading = "NCERT as the Foundational Pillar",
  subheading = "A successful NEET preparation strategy must place NCERT at its core, particularly for Biology and Chemistry, while building analytical problem-solving depth for Physics.",
  points,
}) => {
  return (
    <Section variant="default" spacing="lg" id="ncert">
      <Container size="xl">
        <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <Badge variant="gold" size="md">
              NCERT ALIGNMENT
            </Badge>
            <Heading as="h2" variant="h1" color="white">
              {heading}
            </Heading>
            <Text variant="body-large" color="white" className="opacity-90">
              {subheading}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
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
