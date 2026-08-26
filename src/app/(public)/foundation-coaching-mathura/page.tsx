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
import { FoundationHero } from "@/components/foundation/FoundationHero";
import { FoundationProgramsGrid } from "@/components/foundation/FoundationProgramsGrid";
import { FoundationSubjectSection } from "@/components/foundation/FoundationSubjectSection";
import { FoundationSchoolBalanceSection } from "@/components/foundation/FoundationSchoolBalanceSection";
import { FoundationReadinessSection } from "@/components/foundation/FoundationReadinessSection";
import { FoundationFaqSection } from "@/components/foundation/FoundationFaqSection";
import { FoundationCtaSection } from "@/components/foundation/FoundationCtaSection";
import { FoundationJsonLd } from "@/components/foundation/FoundationJsonLd";
import { MAIN_FOUNDATION_DATA } from "@/data/foundation";
import {
  CheckCircle2,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_FOUNDATION_DATA.meta.title,
  description: MAIN_FOUNDATION_DATA.meta.description,
  keywords: [...MAIN_FOUNDATION_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_FOUNDATION_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_FOUNDATION_DATA.meta.title,
    description: MAIN_FOUNDATION_DATA.meta.description,
    url: MAIN_FOUNDATION_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function MainFoundationPage() {
  const {
    hero,
    programCards,
    whyFoundationMatters,
    subjectFoundation,
    methodology,
    schoolPlusFoundation,
    readinessNotPressure,
    parentGuidance,
    faqs,
  } = MAIN_FOUNDATION_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured JSON-LD */}
        <FoundationJsonLd
          courseName="Foundation Coaching for Classes 8, 9 & 10 in Mathura"
          courseDescription={MAIN_FOUNDATION_DATA.meta.description}
          url={MAIN_FOUNDATION_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Foundation Coaching", item: MAIN_FOUNDATION_DATA.meta.canonical },
          ]}
        />

        {/* Global Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <FoundationHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Foundation Coaching" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.counsellingCta}
          />

          {/* 2. Three Core Foundation Programme Pathways */}
          <FoundationProgramsGrid programs={programCards} />

          {/* 3. Why Build Your Foundation Early? */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  CORE BENEFITS
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  {whyFoundationMatters.heading}
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  {whyFoundationMatters.subheading}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyFoundationMatters.points.map((item, idx) => (
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
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 4. Subject Foundation (Mathematics & Science) */}
          <FoundationSubjectSection subjects={subjectFoundation} />

          {/* 5. Foundation Methodology (Age-Appropriate 6 Steps) */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  LEARNING CYCLE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our 6-Step Foundation Learning Cycle
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Designed to encourage active thinking, healthy problem-solving habits, and lasting conceptual retention.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {methodology.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[var(--brand-accent)] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-9 h-9 rounded-lg bg-orange-50 text-[var(--brand-accent)] text-xs font-bold flex items-center justify-center mb-3">
                        {m.step}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 6. School Learning + Foundation = Stronger Academic Base */}
          <FoundationSchoolBalanceSection
            heading={schoolPlusFoundation.heading}
            subheading={schoolPlusFoundation.subheading}
            points={schoolPlusFoundation.points}
          />

          {/* 7. Foundation Is About Readiness, Not Premature Pressure */}
          <FoundationReadinessSection
            heading={readinessNotPressure.heading}
            subheading={readinessNotPressure.subheading}
            points={readinessNotPressure.points}
          />

          {/* 8. What Parents Should Look for in a Foundation Programme */}
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

          {/* 9. Senior Pathways Gateway Banner */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Senior Engineering Path
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      IIT-JEE Preparation (Classes 11, 12 & Dropper)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Explore our senior engineering entrance coaching with conceptual derivations and advanced testing.
                    </p>
                  </div>
                  <Link
                    href="/iit-jee-coaching-mathura"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Explore IIT-JEE Programmes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-orange-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Senior Medical Path
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      NEET-UG Preparation (Classes 11, 12 & Dropper)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Explore our senior medical entrance coaching with NCERT alignment and 720-mark mock test drills.
                    </p>
                  </div>
                  <Link
                    href="/neet-coaching-mathura"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Explore NEET-UG Programmes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 10. Frequently Asked Questions */}
          <FoundationFaqSection faqs={faqs} />

          {/* 11. Conversion Counselling Section */}
          <FoundationCtaSection defaultProgram="FOUNDATION" />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Bottom Conversion Bar */}
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
