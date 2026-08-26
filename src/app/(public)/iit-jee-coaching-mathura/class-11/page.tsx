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
import { JEE_CLASS_11_DATA } from "@/data/jee";
import { CheckCircle2, BookOpen, Clock, ArrowRight, ShieldCheck, Scale, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: JEE_CLASS_11_DATA.meta.title,
  description: JEE_CLASS_11_DATA.meta.description,
  keywords: [...JEE_CLASS_11_DATA.meta.keywords],
  alternates: {
    canonical: JEE_CLASS_11_DATA.meta.canonical,
  },
  openGraph: {
    title: JEE_CLASS_11_DATA.meta.title,
    description: JEE_CLASS_11_DATA.meta.description,
    url: JEE_CLASS_11_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function Class11JeePage() {
  const { hero, whyStartInClass11, subjectDetails, schoolJeeBalance, faqs } = JEE_CLASS_11_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <JeeJsonLd
          courseName="JEE Coaching for Class 11 (2-Year Integrated Programme)"
          courseDescription={JEE_CLASS_11_DATA.meta.description}
          url={JEE_CLASS_11_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "IIT-JEE", item: "https://empriseacademy.com/iit-jee-coaching-mathura" },
            { name: "Class 11 JEE", item: JEE_CLASS_11_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <JeeHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "IIT-JEE Coaching", href: "/iit-jee-coaching-mathura" },
              { label: "Class 11 Programme" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
            statsBadge="2-Year Integrated Batch"
          />

          {/* 2. Why Start JEE Preparation in Class 11? */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  EARLY FOUNDATION ADVANTAGE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Why Begin Your JEE Preparation in Class 11?
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Building your conceptual base early gives you the runway to master advanced mechanics, calculus, and physical chemistry without panic.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyStartInClass11.map((item, idx) => (
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

          {/* 3. Class 11 Subject Architecture */}
          <Section variant="surface" spacing="lg" id="syllabus">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  CLASS 11 CURRICULUM
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Class 11 Subject Focus & Topic Clusters
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  A balanced curriculum designed to establish fundamental analytical discipline in Physics, Chemistry, and Mathematics.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {subjectDetails.map((sub, idx) => (
                  <div
                    key={sub.subject}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-[var(--brand-primary)] text-sm">
                          0{idx + 1}
                        </span>
                        <Badge variant={idx === 0 ? "primary" : idx === 1 ? "accent" : "gold"} size="sm">
                          Class 11
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--brand-primary)] mb-1">
                        {sub.subject}
                      </h3>
                      <h4 className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-wider mb-4">
                        {sub.focus}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {sub.desc}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                          Core Topics Covered
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.topics.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 4. Balancing School & JEE Preparation */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
                <div className="max-w-3xl mb-8 space-y-2">
                  <Badge variant="gold" size="md">
                    ACADEMIC HARMONY
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {schoolJeeBalance.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {schoolJeeBalance.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {schoolJeeBalance.points.map((pt, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                          <Scale className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
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

          {/* 5. Navigation Links to Other JEE Batches */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-[var(--brand-primary)]">
                    Exploring Other JEE Programme Pathways?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore our Class 12 integrated batch or 1-year dedicated Dropper batch in Mathura.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/iit-jee-coaching-mathura/class-12">
                    <Button variant="outline" size="sm">
                      View Class 12 Batch &rarr;
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

          {/* 6. Class 11 FAQs */}
          <JeeFaqSection
            heading="Class 11 IIT-JEE FAQs"
            subheading="Common questions from parents and students transitioning into Class 11."
            faqs={faqs}
          />

          {/* 7. Class 11 Conversion CTA */}
          <JeeCtaSection
            title="Start Your 2-Year JEE Journey With Emprise Academy"
            subtitle="Book a personal counselling session at our Mathura campus to understand syllabus planning, study material, and Class 11 batch timings."
            defaultProgram="IIT_JEE"
          />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
