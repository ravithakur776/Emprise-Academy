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
import { JeeFaqSection } from "@/components/jee/JeeFaqSection";
import { JeeCtaSection } from "@/components/jee/JeeCtaSection";
import { JeeJsonLd } from "@/components/jee/JeeJsonLd";
import { JEE_CLASS_12_DATA } from "@/data/jee";
import { CheckCircle2, BookOpen, Clock, ArrowRight, ShieldCheck, Target, Zap, RotateCw } from "lucide-react";

export const metadata: Metadata = {
  title: JEE_CLASS_12_DATA.meta.title,
  description: JEE_CLASS_12_DATA.meta.description,
  keywords: [...JEE_CLASS_12_DATA.meta.keywords],
  alternates: {
    canonical: JEE_CLASS_12_DATA.meta.canonical,
  },
  openGraph: {
    title: JEE_CLASS_12_DATA.meta.title,
    description: JEE_CLASS_12_DATA.meta.description,
    url: JEE_CLASS_12_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function Class12JeePage() {
  const { hero, corePriorities, boardJeeBalance, faqs } = JEE_CLASS_12_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <JeeJsonLd
          courseName="JEE Coaching for Class 12 (1-Year Integrated Programme)"
          courseDescription={JEE_CLASS_12_DATA.meta.description}
          url={JEE_CLASS_12_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "IIT-JEE", item: "https://empriseacademy.com/iit-jee-coaching-mathura" },
            { name: "Class 12 JEE", item: JEE_CLASS_12_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <JeeHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "IIT-JEE Coaching", href: "/iit-jee-coaching-mathura" },
              { label: "Class 12 Programme" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
            statsBadge="1-Year Target + Board Sync"
          />

          {/* 2. Four Core Priorities for Class 12 */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  STRATEGIC EXECUTION
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Core Academic Priorities in Class 12
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Balancing high-stakes board examinations with high-speed JEE Main accuracy and JEE Advanced analytical depth.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {corePriorities.map((item, idx) => (
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

          {/* 3. Board + JEE Balancing Strategy */}
          <Section variant="surface" spacing="lg" id="strategy">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
                <div className="max-w-3xl mb-8 space-y-2">
                  <Badge variant="gold" size="md">
                    DUAL EXCELLENCE
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {boardJeeBalance.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {boardJeeBalance.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {boardJeeBalance.strategies.map((strat, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                          <span>{strat.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {strat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* 4. Revision & Backlog Elimination Timeline */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  REVISION SYSTEM
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Structured Class 11 Backlog & Revision Pipeline
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  We don&apos;t wait until the last month to revise. Class 11 revision runs concurrently with Class 12 topics.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                    Phase 1 • April–October
                  </span>
                  <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">
                    Class 12 Completion + Weekend Class 11 Revisit
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Complete all Class 12 chapters in Physics, Chemistry, and Mathematics while dedicating weekend sessions to high-yield Class 11 Mechanics and General Organic Chemistry.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                    Phase 2 • November–December
                  </span>
                  <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">
                    Full-Syllabus PYQs & JEE Main Mock Drills
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Solving 15 years of authentic JEE Main papers in timed 3-hour computer-based testing environments to sharpen speed, accuracy, and negative mark avoidance.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-1">
                    Phase 3 • January–May
                  </span>
                  <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">
                    Board Exam Support + JEE Advanced Masterclasses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Coordinated subjective board revision alongside high-difficulty JEE Advanced problem-solving workshops and multi-concept problem synthesis.
                  </p>
                </div>
              </div>
            </Container>
          </Section>

          {/* 5. Cross-Linking to Other Batches */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-[var(--brand-primary)]">
                    Exploring Other JEE Programme Pathways?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore our Class 11 2-year foundation batch or 1-year dedicated Dropper batch in Mathura.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/iit-jee-coaching-mathura/class-11">
                    <Button variant="outline" size="sm">
                      View Class 11 Batch &rarr;
                    </Button>
                  </Link>
                  <Link href="/iit-jee-coaching-mathura/dropper">
                    <Button variant="outline" size="sm">
                      View Dropper Batch &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. Class 12 FAQs */}
          <JeeFaqSection
            heading="Class 12 IIT-JEE FAQs"
            subheading="Clear answers for Class 12 students and parents balancing boards and competitive examinations."
            faqs={faqs}
          />

          {/* 7. Class 12 Conversion CTA */}
          <JeeCtaSection
            title="Accelerate Your Class 12 JEE Preparation in Mathura"
            subtitle="Schedule a free academic roadmap consultation with our mentors to plan syllabus completion, revision, and board balance."
            defaultProgram="IIT_JEE"
          />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
