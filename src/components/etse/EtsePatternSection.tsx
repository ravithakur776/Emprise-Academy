import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { Clock, FileText, CheckCircle2, Award } from "lucide-react";

export const EtsePatternSection: React.FC = () => {
  const { testPattern } = MAIN_ETSE_DATA;

  return (
    <Section variant="surface" spacing="lg" id="pattern">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            EXAM STRUCTURE
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {testPattern.heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Standardized multi-subject evaluation engineered to test conceptual depth, scientific reasoning, and mathematical precision.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Key Parameters */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Exam Duration</span>
                  <span className="text-base font-bold text-[var(--brand-primary)]">
                    {testPattern.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Question Format</span>
                  <span className="text-base font-bold text-[var(--brand-primary)]">
                    {testPattern.totalQuestions}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Marking Policy</span>
                  <span className="text-xs font-semibold text-slate-700 block">
                    {testPattern.markingScheme}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Subject Breakdown Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testPattern.subjects.map((sub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                    Section 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[var(--brand-primary)] mb-4">
                    {sub.name}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <strong className="text-slate-900">{sub.questions} MCQs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Marks:</span>
                    <strong className="text-[var(--brand-primary)]">{sub.marks} Marks</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
