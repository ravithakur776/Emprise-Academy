import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs } from "@/components/ui/link/TextLink";
import { StudentSuccessStory } from "@/data/results";
import {
  Trophy,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Compass,
  Quote,
  ShieldCheck,
} from "lucide-react";

export interface ResultStoryViewProps {
  story: StudentSuccessStory;
}

export const ResultStoryView: React.FC<ResultStoryViewProps> = ({ story }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="xl" className="relative z-10 space-y-6">
          <div className="text-slate-400">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Results", href: "/results" },
                { label: story.studentName },
              ]}
              className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Headline & Ranks */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-amber-300 border border-white/10 font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>Verified Success Story</span>
              </div>

              <Heading as="h1" variant="display" color="white" className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {story.headline}
              </Heading>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {story.airRank && (
                  <div className="bg-amber-500 text-slate-900 font-extrabold px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 shadow-xs">
                    <span>All India Rank: #{story.airRank}</span>
                  </div>
                )}
                <div className="bg-white/10 text-white font-semibold px-3 py-1.5 rounded-lg text-xs border border-white/10">
                  {story.examLabel}
                </div>
                <div className="bg-white/10 text-white font-semibold px-3 py-1.5 rounded-lg text-xs border border-white/10 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>{story.collegeAllotted}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl pt-2">
                {story.achievementSummary}
              </p>
            </div>

            {/* Right: Badge / Portrait */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-linear-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center shadow-2xl p-6 text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {story.studentName}
                </h3>
                <p className="text-[11px] text-amber-300 font-semibold">
                  {story.courseOrBranch}
                </p>
                <p className="text-[10px] text-slate-400">
                  Batch {story.academicYear} • Mathura
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Preparation Journey */}
      <Section variant="default" spacing="lg">
        <Container size="xl">
          <div className="max-w-3xl mb-10 space-y-2">
            <Badge variant="primary" size="md">
              PREPARATION ROADMAP
            </Badge>
            <Heading as="h2" variant="h1">
              How the Preparation Was Structured
            </Heading>
            <Text variant="body-large" color="muted">
              Step-by-step academic stages that turned foundational concepts into national examination ranks.
            </Text>
          </div>

          <div className="space-y-6">
            {story.preparationJourney.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--brand-primary)]">
                    {step.phase}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Student, Parent & Faculty Perspectives */}
      <Section variant="surface" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Experience */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                <h3 className="text-base font-bold text-[var(--brand-primary)]">
                  Student&apos;s Experience
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[var(--brand-accent)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{story.studentExperience}&rdquo;
              </div>
            </div>

            {/* Parent / Faculty Perspective */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[var(--brand-primary)]">
                  Faculty & Parent Perspective
                </h3>
              </div>
              {story.facultyPerspective && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Faculty Review:</strong> {story.facultyPerspective}
                </p>
              )}
              {story.parentPerspective && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  <strong className="text-slate-800">Parent Feedback:</strong> {story.parentPerspective}
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Key Learnings & Programme Gateway */}
      <Section variant="default" spacing="lg">
        <Container size="xl">
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
            <div className="max-w-3xl space-y-2">
              <Badge variant="gold" size="md">
                KEY ADVICE FOR ASPIRANTS
              </Badge>
              <Heading as="h2" variant="h1" color="white">
                Key Takeaways from This Journey
              </Heading>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {story.keyLearnings.map((learn, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-xs text-slate-300 leading-relaxed">{learn}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Preparing for the same academic goal?</span>
                <span className="text-sm font-bold text-white">{story.programmeLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <Link href={story.programmeSlug}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore {story.examLabel} Programme
                  </Button>
                </Link>
                <Link href="/results">
                  <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                    View All Results
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
