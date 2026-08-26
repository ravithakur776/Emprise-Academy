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
import { NeetFaqSection } from "@/components/neet/NeetFaqSection";
import { NeetCtaSection } from "@/components/neet/NeetCtaSection";
import { NeetJsonLd } from "@/components/neet/NeetJsonLd";
import { NEET_DROPPER_DATA } from "@/data/neet";
import { ShieldCheck, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: NEET_DROPPER_DATA.meta.title,
  description: NEET_DROPPER_DATA.meta.description,
  keywords: [...NEET_DROPPER_DATA.meta.keywords],
  alternates: {
    canonical: NEET_DROPPER_DATA.meta.canonical,
  },
  openGraph: {
    title: NEET_DROPPER_DATA.meta.title,
    description: NEET_DROPPER_DATA.meta.description,
    url: NEET_DROPPER_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function DropperNeetPage() {
  const { hero, whoShouldDrop, diagnosisFramework, parentGuidance, faqs } = NEET_DROPPER_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <NeetJsonLd
          courseName="NEET Dropper Coaching in Mathura (1-Year Intensive Target Batch)"
          courseDescription={NEET_DROPPER_DATA.meta.description}
          url={NEET_DROPPER_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "NEET Coaching", item: "https://empriseacademy.com/neet-coaching-mathura" },
            { name: "NEET Dropper Coaching", item: NEET_DROPPER_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <NeetHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "NEET Coaching", href: "/neet-coaching-mathura" },
              { label: "Dropper / Target Batch" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
            statsBadge="1-Year Full-Time Medical Target"
          />

          {/* 2. Who Should Consider a NEET Drop Year? */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  OBJECTIVE READINESS
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  {whoShouldDrop.heading}
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  {whoShouldDrop.subheading}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whoShouldDrop.profiles.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center mb-4">
                        0{idx + 1}
                      </span>
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

          {/* 3. Diagnostic & Remedial Preparation Blueprint */}
          <Section variant="surface" spacing="lg" id="blueprint">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  DIAGNOSTIC BLUEPRINT
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our 4-Stage Medical Dropper Transformation Framework
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  We don&apos;t just repeat the syllabus. We diagnose specific reasons for lost marks in Physics, Chemistry, and NCERT Biology and replace them with surgical accuracy.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {diagnosisFramework.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-10 h-10 rounded-xl bg-slate-100 text-[var(--brand-primary)] font-bold text-sm flex items-center justify-center mb-4">
                        {step.step}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 4. Strengthen Your NCERT Preparation in the Drop Year */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-orange-200 shadow-xs">
                <div className="max-w-3xl mb-8 space-y-2">
                  <Badge variant="accent" size="md">
                    NCERT MASTERY
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--brand-primary)]">
                    Strengthen Your NCERT Preparation in the Drop Year
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Most repeating students know the broad theory but lose marks in tricky assertion-reason questions, minor footnote facts, or diagrammatic labels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span>Line-by-Line Re-Reading</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Re-evaluating every chapter with active annotation to ensure complete recall of scientific terminology and physiological mechanisms.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span>Statement-Based MCQs</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Heavy practice of multi-statement, matching, and assertion-reason questions that test deep comprehension rather than surface memory.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span>Dedicated Mistake Journal</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Documenting every test error in a personal log to ensure wrong options and calculation slips are never repeated on exam day.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* 5. Parent Guidance for the Drop Year */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
                <div className="max-w-3xl mb-8 space-y-2">
                  <Badge variant="gold" size="md">
                    PARENT GUIDANCE
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {parentGuidance.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {parentGuidance.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {parentGuidance.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
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

          {/* 6. Cross-Linking to Other Medical Batches */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-[var(--brand-primary)]">
                    Looking for High School Medical Batches?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore our Class 11 2-year medical foundation batch or Class 12 1-year integrated batch in Mathura.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/neet-coaching-mathura/class-11">
                    <Button variant="outline" size="sm">
                      View Class 11 Batch &rarr;
                    </Button>
                  </Link>
                  <Link href="/neet-coaching-mathura/class-12">
                    <Button variant="outline" size="sm">
                      View Class 12 Batch &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 7. Dropper FAQs */}
          <NeetFaqSection
            heading="NEET Dropper Batch FAQs"
            subheading="Honest answers to common questions about taking a drop year for medical entrance."
            faqs={faqs}
          />

          {/* 8. Dropper Conversion CTA */}
          <NeetCtaSection
            title="Schedule an In-Depth Medical Diagnostic Consultation"
            subtitle="Meet our medical faculty mentors at the Mathura campus for a confidential diagnostic review of your previous NEET attempt and discuss our 1-year target roadmap."
            defaultProgram="NEET_UG"
          />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
