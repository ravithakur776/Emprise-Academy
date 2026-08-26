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
import { DirectorsHero } from "@/components/directors/DirectorsHero";
import { DirectorsDualGrid } from "@/components/directors/DirectorsDualGrid";
import { DirectorJsonLd } from "@/components/directors/DirectorJsonLd";
import { MAIN_DIRECTORS_DATA } from "@/data/directors";
import { ShieldCheck, Compass, Trophy, ArrowRight, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_DIRECTORS_DATA.meta.title,
  description: MAIN_DIRECTORS_DATA.meta.description,
  keywords: [...MAIN_DIRECTORS_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_DIRECTORS_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_DIRECTORS_DATA.meta.title,
    description: MAIN_DIRECTORS_DATA.meta.description,
    url: MAIN_DIRECTORS_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function DirectorsMainPage() {
  const { hero, leadershipSynergy, coreValues } = MAIN_DIRECTORS_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <DirectorJsonLd
          name="Sushil Dagur & Rakesh Kumar"
          jobTitle="Founding Directors"
          description={MAIN_DIRECTORS_DATA.meta.description}
          url={MAIN_DIRECTORS_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Directors", item: MAIN_DIRECTORS_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <DirectorsHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Academic Leadership" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Dual Director Profiles */}
          <DirectorsDualGrid />

          {/* 3. Leadership Synergy: Industrial Engineering Precision Meets Classroom Pedagogy */}
          <Section variant="surface" spacing="lg" id="leadership-synergy">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
                <div className="max-w-3xl space-y-2">
                  <Badge variant="gold" size="md">
                    LEADERSHIP SYNERGY
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {leadershipSynergy.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {leadershipSynergy.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leadershipSynergy.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                          <Compass className="w-5 h-5 text-[var(--brand-accent)] shrink-0" />
                          <span>{pillar.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* 4. Core Leadership Principles */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  CORE VALUES
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our Institutional Educational Commitments
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  The principles that shape every classroom lecture, test series, and student consultation at Emprise Academy.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center mb-4">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 5. Faculty & Programme Gateway Banner */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Faculty Mentors
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Meet Our Dedicated Subject Faculty
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Experienced subject specialists in Physics, Chemistry, Mathematics, and Biology who work with students daily.
                    </p>
                  </div>
                  <Link
                    href="/faculty"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>View Faculty Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Academic Programmes
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Explore Our 3 Core Academic Pillars
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      IIT-JEE, NEET-UG, and Foundation (Classes 8–10) programmes engineered with concept-first pedagogy in Mathura.
                    </p>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Explore All Academic Programmes</span>
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
