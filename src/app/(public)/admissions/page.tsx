import React, { Suspense } from "react";
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
import { AdmissionsHero } from "@/components/admissions/AdmissionsHero";
import { AdmissionsProgramsGrid } from "@/components/admissions/AdmissionsProgramsGrid";
import { AdmissionsProcessSection } from "@/components/admissions/AdmissionsProcessSection";
import { AdmissionsCounsellingForm } from "@/components/admissions/AdmissionsCounsellingForm";
import { AdmissionsParentSection } from "@/components/admissions/AdmissionsParentSection";
import { AdmissionsFaqSection } from "@/components/admissions/AdmissionsFaqSection";
import { AdmissionsJsonLd } from "@/components/admissions/AdmissionsJsonLd";
import { MAIN_ADMISSIONS_DATA } from "@/data/admissions";
import { Award, Trophy, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_ADMISSIONS_DATA.meta.title,
  description: MAIN_ADMISSIONS_DATA.meta.description,
  keywords: [...MAIN_ADMISSIONS_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_ADMISSIONS_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_ADMISSIONS_DATA.meta.title,
    description: MAIN_ADMISSIONS_DATA.meta.description,
    url: MAIN_ADMISSIONS_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AdmissionsPage() {
  const { hero, faqs } = MAIN_ADMISSIONS_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <AdmissionsJsonLd
          pageTitle="Admissions at Emprise Academy Mathura"
          description={MAIN_ADMISSIONS_DATA.meta.description}
          url={MAIN_ADMISSIONS_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Admissions", item: MAIN_ADMISSIONS_DATA.meta.canonical },
          ]}
          faqs={faqs}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Admissions Hero */}
          <AdmissionsHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Admissions" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Choose Your Target Programme */}
          <AdmissionsProgramsGrid />

          {/* 3. 6-Step Admission Journey */}
          <AdmissionsProcessSection />

          {/* 4. Book Free Academic Counselling (Form with Suspense) */}
          <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading admissions form...</div>}>
            <AdmissionsCounsellingForm />
          </Suspense>

          {/* 5. Scholarship & ETSE Relationship Gateway */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Fee Concessions & Merit Support
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Scholarship Opportunities
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Explore merit-based scholarship pathways based on school board marks or campus diagnostic tests.
                    </p>
                  </div>
                  <Link
                    href="/scholarship"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Explore Scholarship Programme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Annual Talent Search Test
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      ETSE 2026 Examination
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Appearing for the annual talent search exam? Registration is completely free for Classes 7th to 10th.
                    </p>
                  </div>
                  <Link
                    href="/etse-2026"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Visit ETSE 2026 Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. For Parents: Transparent Commitment */}
          <AdmissionsParentSection />

          {/* 7. Frequently Asked Questions */}
          <AdmissionsFaqSection />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
