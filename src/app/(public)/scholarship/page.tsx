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
import { ScholarshipHero } from "@/components/scholarship/ScholarshipHero";
import { ScholarshipValueSection } from "@/components/scholarship/ScholarshipValueSection";
import { ScholarshipEligibilitySection } from "@/components/scholarship/ScholarshipEligibilitySection";
import { ScholarshipTypesGrid } from "@/components/scholarship/ScholarshipTypesGrid";
import { ScholarshipProcessSection } from "@/components/scholarship/ScholarshipProcessSection";
import { ScholarshipEtseSection } from "@/components/scholarship/ScholarshipEtseSection";
import { ScholarshipParentSection } from "@/components/scholarship/ScholarshipParentSection";
import { ScholarshipFaqSection } from "@/components/scholarship/ScholarshipFaqSection";
import { ScholarshipCtaSection } from "@/components/scholarship/ScholarshipCtaSection";
import { ScholarshipJsonLd } from "@/components/scholarship/ScholarshipJsonLd";
import { MAIN_SCHOLARSHIP_DATA } from "@/data/scholarship";
import { GraduationCap, Trophy, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_SCHOLARSHIP_DATA.meta.title,
  description: MAIN_SCHOLARSHIP_DATA.meta.description,
  keywords: [...MAIN_SCHOLARSHIP_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_SCHOLARSHIP_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_SCHOLARSHIP_DATA.meta.title,
    description: MAIN_SCHOLARSHIP_DATA.meta.description,
    url: MAIN_SCHOLARSHIP_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function ScholarshipPage() {
  const { hero, faqs } = MAIN_SCHOLARSHIP_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <ScholarshipJsonLd
          pageTitle="JEE & NEET Scholarship Programme | Emprise Academy"
          description={MAIN_SCHOLARSHIP_DATA.meta.description}
          url={MAIN_SCHOLARSHIP_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Scholarship", item: MAIN_SCHOLARSHIP_DATA.meta.canonical },
          ]}
          faqs={faqs}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <ScholarshipHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Scholarship Programme" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Value Proposition (Why We Offer Merit Scholarships) */}
          <ScholarshipValueSection />

          {/* 3. Who Can Apply (Eligibility by Class & Stream) */}
          <ScholarshipEligibilitySection />

          {/* 4. Three Transparent Scholarship Pathways */}
          <ScholarshipTypesGrid />

          {/* 5. Step-by-Step Scholarship Process */}
          <ScholarshipProcessSection />

          {/* 6. Dedicated ETSE 2026 Annual Test Relationship Block */}
          <ScholarshipEtseSection />

          {/* 7. For Parents: Transparent Commitment */}
          <ScholarshipParentSection />

          {/* 8. Programme Gateway Navigation */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Senior Engineering Path
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      IIT-JEE Classroom Programmes
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      2-Year, 1-Year, and Dropper batches engineered with concept-first derivations and advanced test series.
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

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Senior Medical Path
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      NEET-UG Classroom Programmes
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Comprehensive medical entrance preparation with line-by-line NCERT mastery and 720-mark mock drills.
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

          {/* 9. Frequently Asked Questions */}
          <ScholarshipFaqSection />

          {/* 10. Think You're Eligible? Conversion Block */}
          <ScholarshipCtaSection />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
