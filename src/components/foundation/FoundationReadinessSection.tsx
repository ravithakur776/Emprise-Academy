import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { ShieldCheck, Heart, Sparkles, Smile } from "lucide-react";

export interface FoundationReadinessProps {
  heading?: string;
  subheading?: string;
  points: readonly { title: string; desc: string }[];
}

export const FoundationReadinessSection: React.FC<FoundationReadinessProps> = ({
  heading = "Foundation Is About Readiness, Not Premature Pressure",
  subheading = "We firmly believe that young students in Classes 8–10 should not be subjected to high-stress competitive environments. Learning must remain age-appropriate, encouraging, and intellectually joyful.",
  points,
}) => {
  return (
    <Section variant="surface" spacing="lg" id="readiness">
      <Container size="xl">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-orange-200/80 shadow-xs">
          <div className="max-w-3xl mb-8 space-y-2">
            <Badge variant="accent" size="md">
              CORE PHILOSOPHY
            </Badge>
            <Heading as="h2" variant="h1">
              {heading}
            </Heading>
            <Text variant="body-large" color="muted">
              {subheading}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                    <span>{pt.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
