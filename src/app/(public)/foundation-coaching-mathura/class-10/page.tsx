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
import { FOUNDATION_CLASS_10_DATA } from "@/data/foundation";
import { CheckCircle2, Award, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: FOUNDATION_CLASS_10_DATA.meta.title,
  description: FOUNDATION_CLASS_10_DATA.meta.description,
  keywords: [...FOUNDATION_CLASS_10_DATA.meta.keywords],
  alternates: {
    canonical: FOUNDATION_CLASS_10_DATA.meta.canonical,
  },
  openGraph: {
    title: FOUNDATION_CLASS_10_DATA.meta.title,
    description: FOUNDATION_CLASS_10_DATA.meta.description,
    url: FOUNDATION_CLASS_10_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function Class10FoundationPage() {
  const { hero, transitionAdvantage, subjectDetails, faqs } = FOUNDATION_CLASS_10_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <FoundationJsonLd
          courseName="Class 10 Foundation Coaching in Mathura (Board + Foundation)"
          courseDescription={FOUNDATION_CLASS_10_DATA.meta.description}
          url={FOUNDATION_CLASS_10_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Foundation Coaching", item: "https://empriseacademy.com/foundation-coaching-mathura" },
            { name: "Class 10 Foundation", item: FOUNDATION_CLASS_10_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <FoundationHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Foundation", href: "/foundation-coaching-mathura" },
              { label: "Class 10 Board + Foundation" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
            statsBadge="Class 10 Board + Bridge Batch"
          />

          {/* 2. Preparing for the Next Academic Stage (Transition Advantage) */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  TRANSITION ADVANTAGE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Preparing for the Next Academic Stage
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  How Class 10 Foundation bridges secondary school board exams with the advanced conceptual demands of Class 11.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transitionAdvantage.map((item, idx) => (
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

          {/* 3. Class 10 Subject Details */}
          <Section variant="surface" spacing="lg" id="curriculum">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="accent" size="md">
                  CLASS 10 CURRICULUM
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Class 10 Subject Syllabus & Bridging Modules
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Comprehensive coverage of Board requirements with advanced conceptual depth in Mathematics and Science.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <Badge variant={idx % 2 === 0 ? "primary" : "accent"} size="sm">
                          Class 10
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

          {/* 4. Cross-Linking to Senior Programmes */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-[var(--brand-primary)]">
                    Planning for Senior Secondary Streams (Class 11)?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore our premier 2-year IIT-JEE (Engineering) and NEET-UG (Medical) programmes in Mathura.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/iit-jee-coaching-mathura/class-11">
                    <Button variant="outline" size="sm">
                      Explore Class 11 JEE &rarr;
                    </Button>
                  </Link>
                  <Link href="/neet-coaching-mathura/class-11">
                    <Button variant="outline" size="sm">
                      Explore Class 11 NEET &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 5. Class 10 FAQs */}
          <FoundationFaqSection
            heading="Class 10 Board + Foundation FAQs"
            subheading="Clear answers for Class 10 students and parents balancing Board examinations with future competitive preparation."
            faqs={faqs}
          />

          {/* 6. Class 10 Conversion CTA */}
          <FoundationCtaSection
            title="Ace Your Class 10 Boards & Build a Strong Bridge to Class 11"
            subtitle="Book a consultation at our Mathura campus to understand our Board mock series, science bridging modules, and batch schedules."
            defaultProgram="FOUNDATION"
          />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
