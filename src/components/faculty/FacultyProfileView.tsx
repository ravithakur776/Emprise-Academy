import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs } from "@/components/ui/link/TextLink";
import { FacultyProfile } from "@/data/faculty";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export interface FacultyProfileViewProps {
  faculty: FacultyProfile;
}

export const FacultyProfileView: React.FC<FacultyProfileViewProps> = ({ faculty }) => {
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
                { label: "Faculty", href: "/faculty" },
                { label: faculty.name },
              ]}
              className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <Badge variant="accent" size="sm">
                FACULTY MENTOR PROFILE
              </Badge>

              <Heading as="h1" variant="display" color="white" className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {faculty.name}
              </Heading>

              <p className="text-base sm:text-lg font-semibold text-[var(--brand-accent-light)]">
                {faculty.designation}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <GraduationCap className="w-4 h-4 text-[var(--brand-accent)]" />
                  <span>{faculty.qualification}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>{faculty.experienceText}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Badge variant="gold" size="sm">
                    {faculty.subject} Specialist
                  </Badge>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mt-3">
                {faculty.bio}
              </p>
            </div>

            {/* Right: Avatar Box */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-linear-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-24 h-24 text-[var(--brand-accent-light)] opacity-70" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Teaching Approach & Subject Expertise */}
      <Section variant="default" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Teaching Approach */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="primary" size="sm" className="mb-2">
                  CLASSROOM PEDAGOGY
                </Badge>
                <Heading as="h2" variant="h1">
                  Teaching Approach
                </Heading>
              </div>

              <div className="space-y-3">
                {faculty.teachingApproach.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Subject Expertise */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="accent" size="sm" className="mb-2">
                  AREAS OF SPECIALISATION
                </Badge>
                <Heading as="h2" variant="h1">
                  Subject Expertise & Topics
                </Heading>
              </div>

              <div className="space-y-3">
                {faculty.subjectExpertise.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                    <BookOpen className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Academic Support & Courses Taught */}
      <Section variant="surface" spacing="lg">
        <Container size="xl">
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
            <div className="max-w-3xl space-y-2">
              <Badge variant="gold" size="md">
                STUDENT SUPPORT
              </Badge>
              <Heading as="h2" variant="h1" color="white">
                Academic Support & Courses Guided
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[var(--brand-accent)]" />
                  <span>Student Support System</span>
                </h3>
                <div className="space-y-2 pt-2">
                  {faculty.academicSupport.map((sup, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sup}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Programmes Taught</span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {faculty.coursesTaught.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-lg"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Link back to Directory */}
      <Section variant="default" spacing="md">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div>
              <h4 className="text-base font-bold text-[var(--brand-primary)]">
                Looking for Other Subject Faculty Mentors?
              </h4>
              <p className="text-xs text-slate-500">
                Explore our full department directory across Physics, Chemistry, Mathematics, Biology, and Foundation.
              </p>
            </div>
            <Link href="/faculty">
              <Button variant="outline" size="sm">
                View Full Faculty Directory &rarr;
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
};
