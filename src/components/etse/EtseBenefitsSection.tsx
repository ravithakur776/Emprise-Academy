import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { Sparkles, Trophy, Target, Award, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

export const EtseBenefitsSection: React.FC = () => {
  const { benefits } = MAIN_ETSE_DATA;

  const icons = [
    <Sparkles key="1" className="w-5 h-5 text-[var(--brand-accent)]" />,
    <Target key="2" className="w-5 h-5 text-sky-600" />,
    <LineChart key="3" className="w-5 h-5 text-indigo-600" />,
    <Trophy key="4" className="w-5 h-5 text-amber-500" />,
    <Award key="5" className="w-5 h-5 text-emerald-600" />,
  ];

  return (
    <Section variant="surface" spacing="lg" id="benefits">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="accent" size="md">
            WHY APPEAR FOR ETSE 2026?
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Five High-Impact Academic Advantages
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            More than just an exam—ETSE 2026 is a comprehensive diagnostic milestone designed to sharpen competitive instincts and reward diligence.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className={cn(
                "p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all",
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  {benefit.badge && (
                    <Badge variant={idx === 3 ? "gold" : idx === 4 ? "primary" : "secondary"} size="sm">
                      {benefit.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
