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
import { JeeHero } from "@/components/jee/JeeHero";
import { JeeProgramsGrid } from "@/components/jee/JeeProgramsGrid";
import { JeeSubjectArchitecture } from "@/components/jee/JeeSubjectArchitecture";
import { JeeComparisonSection } from "@/components/jee/JeeComparisonSection";
import { JeeTestingSection } from "@/components/jee/JeeTestingSection";
import { JeeFaqSection } from "@/components/jee/JeeFaqSection";
import { JeeCtaSection } from "@/components/jee/JeeCtaSection";
import { JeeJsonLd } from "@/components/jee/JeeJsonLd";
import { MAIN_JEE_DATA } from "@/data/jee";
import {
  CheckCircle2,
  Users,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Brain,
  HelpCircle,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_JEE_DATA.meta.title,
  description: MAIN_JEE_DATA.meta.description,
  keywords: [...MAIN_JEE_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_JEE_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_JEE_DATA.meta.title,
    description: MAIN_JEE_DATA.meta.description,
    url: MAIN_JEE_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function MainJeePage() {
  const { hero, programCards, whoIsThisFor, subjectArchitecture, jeeMainVsAdvanced, methodology, testingSystem, parentGuidance, faqs } = MAIN_JEE_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured JSON-LD */}
        <JeeJsonLd
          courseName="IIT-JEE Coaching in Mathura (Main & Advanced)"
          courseDescription={MAIN_JEE_DATA.meta.description}
          url={MAIN_JEE_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "IIT-JEE Coaching Mathura", item: MAIN_JEE_DATA.meta.canonical },
          ]}
        />

        {/* Global Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <JeeHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "IIT-JEE Coaching" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.counsellingCta}
          />

          {/* 2. Three Core JEE Programme Pathways */}
          <JeeProgramsGrid programs={programCards} />

          {/* 3. Who Is This Programme For? */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  TARGET AUDIENCE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Who Is the IIT-JEE Programme For?
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Structured learning environments built for students at distinct stages of engineering entrance preparation.
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

          {/* 4. Subject Architecture (Physics, Chemistry, Maths) */}
          <JeeSubjectArchitecture subjects={subjectArchitecture} />

          {/* 5. JEE Main vs JEE Advanced Comparison */}
          <JeeComparisonSection data={jeeMainVsAdvanced} />

          {/* 6. JEE Specific Teaching Methodology */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  JEE PEDAGOGY
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our IIT-JEE Teaching Methodology
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  A continuous 6-stage cycle engineered to eliminate accumulated backlogs and develop competitive accuracy.
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

          {/* 7. Testing & Performance System ("Measure. Analyse. Improve.") */}
          <JeeTestingSection
            heading={testingSystem.heading}
            subheading={testingSystem.subheading}
            tiers={testingSystem.tiers}
          />

          {/* 8. Parent Guidance Section */}
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
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
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
                      <GraduationCap className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Faculty Mentorship
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Meet Our Experienced JEE Mentors
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Guided by University of Derby engineering alumni and veteran faculty specializing in Physics, Chemistry, and Advanced Mathematics.
                    </p>
                  </div>
                  <Link href="/faculty" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline">
                    <span>Meet Our JEE Faculty Mentors</span>
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
                      Authentic JEE Results & Selections
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Explore verified student rank archives and scorecard verification for JEE Main, JEE Advanced, and ETSE talent search tests.
                    </p>
                  </div>
                  <Link href="/results" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline">
                    <span>View Official Results Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 10. Frequently Asked Questions */}
          <JeeFaqSection faqs={faqs} />

          {/* 11. Conversion Counselling Section */}
          <JeeCtaSection defaultProgram="IIT_JEE" />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Bottom Conversion Bar */}
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
