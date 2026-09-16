import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { HOMEPAGE_DATA, WhyEmpriseItem } from "@/data/homepage";
import {
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Library,
  HelpCircle,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Library,
  HelpCircle,
  HeartHandshake,
  Sparkles,
};

export const WhyEmpriseSection: React.FC = () => {
  const items: WhyEmpriseItem[] = HOMEPAGE_DATA.whyEmprise;

  return (
    <Section variant="default" spacing="lg" id="why-emprise" className="bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-10 sm:mb-14">
          <Badge variant="primary" size="md">
            THE EMPRISE ADVANTAGE
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#14213D] tracking-tight leading-[1.2] mt-3.5 sm:mt-4">
            <span className="inline-block">Trusted by Mathura’s Parents. </span>
            <span className="inline-block text-[#1769E0]">Proven by Results. </span>
            <span className="block mt-1 sm:mt-1.5 text-[#14213D]">Chosen for IIT-JEE &amp; NEET Success.</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed">
            Ten foundational pillars that create disciplined study habits, deeper conceptual clarity, and confident academic achievers in Mathura.
          </Text>
        </div>

        {/* 10 Differentiators Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {items.map((item) => {
            const Icon = iconMap[item.iconName] || Sparkles;

            return (
              <div
                key={item.number}
                className="group p-5 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[var(--brand-text-secondary)] mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
