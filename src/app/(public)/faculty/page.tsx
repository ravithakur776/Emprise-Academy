import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FacultyHero } from "@/components/faculty/FacultyHero";
import { FacultyDirectoryClient } from "@/components/faculty/FacultyDirectoryClient";
import { FacultySubjectStorytelling } from "@/components/faculty/FacultySubjectStorytelling";
import { FacultyJsonLd } from "@/components/faculty/FacultyJsonLd";
import { MAIN_FACULTY_DATA, FACULTY_DATA } from "@/data/faculty";
import { CheckCircle2, ShieldCheck, Trophy, ArrowRight, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_FACULTY_DATA.meta.title,
  description: MAIN_FACULTY_DATA.meta.description,
  keywords: [...MAIN_FACULTY_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_FACULTY_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_FACULTY_DATA.meta.title,
    description: MAIN_FACULTY_DATA.meta.description,
    url: MAIN_FACULTY_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function FacultyMainPage() {
  const { hero, mentorshipApproach } = MAIN_FACULTY_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <FacultyJsonLd
          name="Emprise Academy Faculty Mentors"
          jobTitle="Academic Faculty Team"
          description={MAIN_FACULTY_DATA.meta.description}
          url={MAIN_FACULTY_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Faculty", item: MAIN_FACULTY_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <FacultyHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Faculty Mentors" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Interactive Faculty Directory */}
          <FacultyDirectoryClient facultyList={FACULTY_DATA} />

          {/* 3. What Good Mentorship Means at Emprise Academy */}
          <Section variant="default" spacing="lg" id="mentorship-approach">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  CORE PEDAGOGY
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  {mentorshipApproach.heading}
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  {mentorshipApproach.subheading}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mentorshipApproach.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center mb-4">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 4. Subject Mentorship Storytelling */}
          <FacultySubjectStorytelling />

          {/* 5. Academic Gateway Cards */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Academic Leadership
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Meet the Directors Behind Emprise
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Learn about our founding directors Sushil Dagur and Rakesh Kumar (Univ. of Derby UK alumni).
                    </p>
                  </div>
                  <Link
                    href="/directors"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>View Directors&apos; Profiles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Academic Consultation
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Speak with Our Academic Mentors
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Visit our Mathura campus for a 1-on-1 consultation to evaluate your child&apos;s academic readiness.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Schedule Campus Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
