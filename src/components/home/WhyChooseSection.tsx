import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA } from "@/data/homepage";
import {
  ShieldCheck,
  Brain,
  Users,
  FileCheck2,
  TrendingUp,
  HelpCircle,
  Award,
  GraduationCap,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[var(--brand-accent)]" />,
  BrainCircuit: <Brain className="w-6 h-6 text-blue-600" />,
  Users: <Users className="w-6 h-6 text-emerald-600" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-amber-600" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-purple-600" />,
  HelpCircle: <HelpCircle className="w-6 h-6 text-[var(--brand-accent)]" />,
  Award: <Award className="w-6 h-6 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-[var(--brand-primary)]" />,
};

export const WhyChooseSection: React.FC = () => {
  const { whyChoose } = HOMEPAGE_DATA;

  return (
    <Section variant="surface" spacing="lg">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            PEDAGOGICAL EXCELLENCE
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Why Choose Emprise Academy?
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            A disciplined, concept-driven environment built to transform student potential into competitive results in Mathura.
          </Text>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {iconMap[item.iconName] || <Award className="w-6 h-6 text-[var(--brand-primary)]" />}
                </div>
                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
