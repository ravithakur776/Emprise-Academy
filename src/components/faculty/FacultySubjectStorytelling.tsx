import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { FACULTY_SUBJECT_STORIES } from "@/data/faculty";
import { CheckCircle2, Zap, FlaskConical, Compass, Dna, Lightbulb } from "lucide-react";

const iconsMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-emerald-500" />,
  Compass: <Compass className="w-5 h-5 text-blue-500" />,
  Dna: <Dna className="w-5 h-5 text-rose-500" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-[var(--brand-accent)]" />,
};

export const FacultySubjectStorytelling: React.FC = () => {
  return (
    <Section variant="surface" spacing="lg" id="subject-faculties">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="accent" size="md">
            DEPARTMENTAL PEDAGOGY
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            How Our Subject Mentors Guide Students
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Tailored pedagogical strategies for Physics, Chemistry, Mathematics, Biology, and Foundation.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACULTY_SUBJECT_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {iconsMap[story.iconName] || <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--brand-primary)]">
                      {story.subject}
                    </h3>
                    <p className="text-[11px] text-[var(--brand-accent)] font-semibold">
                      {story.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {story.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Pedagogical Focus
                  </span>
                  {story.pedagogicalFocus.map((focus, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
