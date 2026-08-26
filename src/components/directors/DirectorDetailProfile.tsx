import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs } from "@/components/ui/link/TextLink";
import { DirectorFullProfile } from "@/data/directors";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Quote,
  CheckCircle2,
  Trophy,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface DirectorDetailProfileProps {
  director: DirectorFullProfile;
  siblingDirector: { name: string; slug: string; designation: string };
}

export const DirectorDetailProfile: React.FC<DirectorDetailProfileProps> = ({
  director,
  siblingDirector,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* 1. Editorial Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="xl" className="relative z-10 space-y-6">
          <div className="text-slate-400">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Directors", href: "/directors" },
                { label: director.name },
              ]}
              className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <Badge variant="accent" size="sm">
                DIRECTOR PROFILE
              </Badge>

              <Heading as="h1" variant="display" color="white" className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {director.name}
              </Heading>

              <p className="text-base sm:text-lg font-semibold text-[var(--brand-accent-light)]">
                {director.designation}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <GraduationCap className="w-4 h-4 text-[var(--brand-accent)]" />
                  <span>{director.qualification}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>{director.almaMater}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border-l-4 border-[var(--brand-accent)] text-xs sm:text-sm text-slate-200 italic leading-relaxed max-w-2xl mt-4">
                &ldquo;{director.quote}&rdquo;
              </div>
            </div>

            {/* Right: Avatar / Portrait Box */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-linear-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-24 h-24 text-[var(--brand-accent-light)] opacity-70" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Professional Journey Section */}
      <Section variant="default" spacing="lg">
        <Container size="xl">
          <div className="max-w-3xl mb-10 space-y-2">
            <Badge variant="primary" size="md">
              CAREER & BACKGROUND
            </Badge>
            <Heading as="h2" variant="h1">
              Professional Journey & Engineering Foundation
            </Heading>
            <Text variant="body-large" color="muted">
              A track record bridging international engineering discipline with premier Indian competitive coaching.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {director.professionalJourney.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[var(--brand-accent)] font-bold text-xs flex items-center justify-center mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--brand-primary)] mb-1">
                    {item.companyOrContext}
                  </h3>
                  <h4 className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                    {item.roleSummary}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Teaching Philosophy & Academic Experience */}
      <Section variant="surface" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Teaching Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="accent" size="sm" className="mb-2">
                  PEDAGOGICAL VALUES
                </Badge>
                <Heading as="h2" variant="h1">
                  Teaching Philosophy
                </Heading>
              </div>

              <div className="space-y-3">
                {director.teachingPhilosophy.map((phil, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{phil}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Academic Experience */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="primary" size="sm" className="mb-2">
                  ACADEMIC DOMAINS
                </Badge>
                <Heading as="h2" variant="h1">
                  Academic Experience & Focus
                </Heading>
              </div>

              <div className="space-y-4">
                {director.academicExperience.map((exp, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--brand-primary)] mb-1">
                      {exp.area}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Leadership Perspective & Vision */}
      <Section variant="default" spacing="lg">
        <Container size="xl">
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
            <div className="max-w-3xl space-y-2">
              <Badge variant="gold" size="md">
                DIRECTOR&apos;S PERSPECTIVE
              </Badge>
              <Heading as="h2" variant="h1" color="white">
                Vision for Students & Emprise Academy
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[var(--brand-accent)]" />
                  <span>Leadership Perspective</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {director.leadershipPerspective}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Vision for Students</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {director.visionForStudents}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-bold text-[var(--brand-accent-light)] uppercase tracking-wider block mb-3">
                Contribution to Emprise Academy
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {director.contributionToEmprise.map((contrib, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Courses Guided & Sibling Profile Link */}
      <Section variant="surface" spacing="md">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                Academic Programmes Guided
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {director.coursesTaughtOrGuided.map((course, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right shrink-0">
              <Link
                href={`/directors/${siblingDirector.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--brand-accent)] hover:underline"
              >
                <span>Read {siblingDirector.name}&apos;s Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
