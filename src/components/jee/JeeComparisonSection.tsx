import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { CheckCircle2, Zap, Trophy } from "lucide-react";

export interface JeeComparisonProps {
  data: {
    main: { title: string; focusAreas: readonly string[] };
    advanced: { title: string; focusAreas: readonly string[] };
  };
}

export const JeeComparisonSection: React.FC<JeeComparisonProps> = ({ data }) => {
  return (
    <Section variant="default" spacing="lg">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="accent" size="md">
            EXAM DYNAMICS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            JEE Main vs JEE Advanced: Understanding the Dual Challenge
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Both examinations test the same broad syllabus, but they require radically different psychological stamina, problem-solving depth, and time management.
          </Text>
        </div>

        {/* Dual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* JEE Main Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-blue-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                    {data.main.title}
                  </h3>
                  <p className="text-xs text-[var(--brand-muted)]">Speed, Accuracy & Breadth</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                JEE Main determines entrance into NITs, IIITs, CFTIs, and acts as the eligibility screening for JEE Advanced. It rewards swift formula recall, sharp arithmetic accuracy, and comprehensive syllabus coverage.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                  Emprise Preparation Focus
                </span>
                {data.main.focusAreas.map((area, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* JEE Advanced Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-orange-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                    {data.advanced.title}
                  </h3>
                  <p className="text-xs text-[var(--brand-muted)]">Depth, Synthesis & Analytical Rigor</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                JEE Advanced tests the student&apos;s ability to solve unfamiliar, multi-step problem formulations where concepts from two or three separate chapters are combined into a single question.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                  Emprise Preparation Focus
                </span>
                {data.advanced.focusAreas.map((area, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
