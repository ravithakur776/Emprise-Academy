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
import { FoundationFaqSection } from "@/components/foundation/FoundationFaqSection";
import { FoundationCtaSection } from "@/components/foundation/FoundationCtaSection";
import { FoundationJsonLd } from "@/components/foundation/FoundationJsonLd";
import { FOUNDATION_CLASS_8_DATA } from "@/data/foundation";
import { CheckCircle2, Lightbulb, Compass, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: FOUNDATION_CLASS_8_DATA.meta.title,
  description: FOUNDATION_CLASS_8_DATA.meta.description,
  keywords: [...FOUNDATION_CLASS_8_DATA.meta.keywords],
  alternates: {
    canonical: FOUNDATION_CLASS_8_DATA.meta.canonical,
  },
  openGraph: {
    title: FOUNDATION_CLASS_8_DATA.meta.title,
    description: FOUNDATION_CLASS_8_DATA.meta.description,
    url: FOUNDATION_CLASS_8_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function Class8FoundationPage() {
  const { hero, whyClass8Matters, subjectDetails, faqs } = FOUNDATION_CLASS_8_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <FoundationJsonLd
          courseName="Class 8 Foundation Coaching in Mathura"
          courseDescription={FOUNDATION_CLASS_8_DATA.meta.description}
          url={FOUNDATION_CLASS_8_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Foundation Coaching", item: "https://empriseacademy.com/foundation-coaching-mathura" },
            { name: "Class 8 Foundation", item: FOUNDATION_CLASS_8_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <FoundationHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Foundation", href: "/foundation-coaching-mathura" },
              { label: "Class 8 Foundation" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
            statsBadge="Class 8 Foundation Batch"
          />

          {/* 2. Why Class 8 is a Great Time to Strengthen Fundamentals */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  EARLY CURIOSITY ADVANTAGE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Why Strengthen Academic Fundamentals in Class 8?
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Building strong learning habits and conceptual confidence before the academic jump to high school.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyClass8Matters.map((item, idx) => (
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

          {/* 3. Class 8 Subject Details */}
          <Section variant="surface" spacing="lg" id="curriculum">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  CLASS 8 CURRICULUM
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Class 8 Learning Structure & Topics
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Age-appropriate modules designed to build mathematical fluency, scientific inquiry, and logical reasoning.
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
                        <Badge variant={idx === 0 ? "gold" : idx === 1 ? "primary" : "accent"} size="sm">
                          Class 8
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

          {/* 4. Cross-Linking to Other Foundation Batches */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-[var(--brand-primary)]">
                    Looking for High School Foundation Batches?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore our Class 9 analytical foundation batch or Class 10 Board + Foundation batch in Mathura.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/foundation-coaching-mathura/class-9">
                    <Button variant="outline" size="sm">
                      View Class 9 Batch &rarr;
                    </Button>
                  </Link>
                  <Link href="/foundation-coaching-mathura/class-10">
                    <Button variant="outline" size="sm">
                      View Class 10 Batch &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 5. Class 8 FAQs */}
          <FoundationFaqSection
            heading="Class 8 Foundation FAQs"
            subheading="Common questions from parents exploring academic enrichment for Class 8."
            faqs={faqs}
          />

          {/* 6. Class 8 Conversion CTA */}
          <FoundationCtaSection
            title="Start Your Child's Academic Foundation in Class 8"
            subtitle="Book a friendly consultation at our Mathura campus to understand curriculum pacing, study materials, and Class 8 batch schedules."
            defaultProgram="FOUNDATION"
          />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
