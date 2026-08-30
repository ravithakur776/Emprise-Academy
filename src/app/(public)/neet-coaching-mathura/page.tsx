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
import { NeetHero } from "@/components/neet/NeetHero";
import { NeetProgramsGrid } from "@/components/neet/NeetProgramsGrid";
import { NeetSubjectSystem } from "@/components/neet/NeetSubjectSystem";
import { NeetNcertStrategy } from "@/components/neet/NeetNcertStrategy";
import { NeetTestingSection } from "@/components/neet/NeetTestingSection";
import { NeetFaqSection } from "@/components/neet/NeetFaqSection";
import { NeetCtaSection } from "@/components/neet/NeetCtaSection";
import { NeetJsonLd } from "@/components/neet/NeetJsonLd";
import { MAIN_NEET_DATA } from "@/data/neet";
import {
  CheckCircle2,
  Stethoscope,
  Trophy,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Award,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_NEET_DATA.meta.title,
  description: MAIN_NEET_DATA.meta.description,
  keywords: [...MAIN_NEET_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_NEET_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_NEET_DATA.meta.title,
    description: MAIN_NEET_DATA.meta.description,
    url: MAIN_NEET_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function MainNeetPage() {
  const {
    hero,
    programCards,
    whoIsThisFor,
    subjectSystem,
    ncertStrategy,
    preparationSystem,
    testingSystem,
    parentGuidance,
    faqs,
  } = MAIN_NEET_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured JSON-LD */}
        <NeetJsonLd
          courseName="NEET-UG Coaching in Mathura"
          courseDescription={MAIN_NEET_DATA.meta.description}
          url={MAIN_NEET_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "NEET Coaching Mathura", item: MAIN_NEET_DATA.meta.canonical },
          ]}
        />

        {/* Global Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <NeetHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "NEET Coaching" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.counsellingCta}
          />

          {/* 2. Three Core NEET Programme Pathways */}
          <NeetProgramsGrid programs={programCards} />

          {/* 3. Who Is This Programme For? */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  TARGET AUDIENCE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Who Is the NEET-UG Programme For?
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Structured learning environments built for medical aspirants at distinct stages of senior secondary preparation.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whoIsThisFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center font-bold text-sm mb-4">
                        0{idx + 1}
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

          {/* 4. Subject System (Physics, Chemistry, Biology) */}
          <NeetSubjectSystem subjects={subjectSystem} />

          {/* 5. NCERT as the Foundational Pillar */}
          <NeetNcertStrategy
            heading={ncertStrategy.heading}
            subheading={ncertStrategy.subheading}
            points={ncertStrategy.points}
          />

          {/* 6. NEET Specific 6-Step Preparation System */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  PREPARATION RIGOR
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our 6-Step NEET Preparation Blueprint
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  A disciplined, evidence-led academic cycle engineered to convert textbook knowledge into high-speed exam accuracy.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preparationSystem.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[var(--brand-accent)] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-9 h-9 rounded-lg bg-orange-50 text-[var(--brand-accent)] text-xs font-bold flex items-center justify-center mb-3">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 7. Testing & Performance System ("Test. Analyse. Improve.") */}
          <NeetTestingSection
            heading={testingSystem.heading}
            subheading={testingSystem.subheading}
            tiers={testingSystem.tiers}
          />

          {/* 8. Parent Information Section */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
                <div className="max-w-3xl mb-8 space-y-2">
                  <Badge variant="gold" size="md">
                    FOR PARENTS
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {parentGuidance.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {parentGuidance.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {parentGuidance.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)]" />
                          <span>{pt.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* 9. Faculty & Results Gateway Banner */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Stethoscope className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Faculty Mentorship
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Academic Leadership & Mentorship
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Direct academic supervision, structured test series, and mentorship led by our founding directors.
                    </p>
                  </div>
                  <Link
                    href="/directors"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Meet Our Academic Directors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Verified Outcomes
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Authentic Medical Results & Selections
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Explore verified student scorecards and medical college admission records from Mathura.
                    </p>
                  </div>
                  <Link
                    href="/results"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>View Official Results Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 10. Frequently Asked Questions */}
          <NeetFaqSection faqs={faqs} />

          {/* 11. Conversion Counselling Section */}
          <NeetCtaSection defaultProgram="NEET_UG" />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Bottom Conversion Bar */}
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
