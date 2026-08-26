import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { NeetSubjectBlock } from "@/data/neet";
import { CheckCircle2 } from "lucide-react";

export interface NeetSubjectSystemProps {
  subjects: NeetSubjectBlock[];
}

export const NeetSubjectSystem: React.FC<NeetSubjectSystemProps> = ({ subjects }) => {
  return (
    <Section variant="surface" spacing="lg" id="subjects">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            SUBJECT SYSTEM
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            How We Teach Physics, Chemistry & Biology for NEET
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Every subject in medical entrance demands a customized learning technique. Here is how our faculty mentors structure each discipline.
          </Text>
        </div>

        {/* 3 Subject Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subjects.map((sub, idx) => (
            <div
              key={sub.subject}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-extrabold text-[var(--brand-primary)] text-base">
                    0{idx + 1}
                  </span>
                  <Badge variant={idx === 0 ? "primary" : idx === 1 ? "accent" : "gold"} size="sm">
                    {sub.subject.includes("Biology") ? "Biology" : sub.subject.includes("Chemistry") ? "Chemistry" : "Physics"}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-1">
                  {sub.subject}
                </h3>
                <h4 className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-4">
                  {sub.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {sub.description}
                </p>

                {/* Pedagogical Pillars */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Pedagogical Strategy
                  </span>
                  {sub.keyPillars.map((pillar, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>

                {/* Topics Covered */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Key Syllabus Clusters
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.topicsCovered.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
