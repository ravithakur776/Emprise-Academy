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
import { ResultsHero } from "@/components/results/ResultsHero";
import { ResultsDirectoryClient } from "@/components/results/ResultsDirectoryClient";
import { StudentTestimonialsSection } from "@/components/results/StudentTestimonialsSection";
import { ResultsJsonLd } from "@/components/results/ResultsJsonLd";
import { MAIN_RESULTS_DATA, VERIFIED_RESULTS } from "@/data/results";
import { Trophy, GraduationCap, ArrowRight, ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_RESULTS_DATA.meta.title,
  description: MAIN_RESULTS_DATA.meta.description,
  keywords: [...MAIN_RESULTS_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_RESULTS_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_RESULTS_DATA.meta.title,
    description: MAIN_RESULTS_DATA.meta.description,
    url: MAIN_RESULTS_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function ResultsMainPage() {
  const { hero } = MAIN_RESULTS_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <ResultsJsonLd
          pageTitle="JEE & NEET Results – Emprise Academy Mathura"
          description={MAIN_RESULTS_DATA.meta.description}
          url={MAIN_RESULTS_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Results", item: MAIN_RESULTS_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <ResultsHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Verified Results" },
            ]}
            eyebrow={hero.eyebrow}
            h1={hero.h1}
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Interactive Selection Roster & Scorecard Verification */}
          <ResultsDirectoryClient resultsList={VERIFIED_RESULTS} />

          {/* 3. Authentic Student & Parent Testimonials */}
          <StudentTestimonialsSection />

          {/* 4. Programme Preparation Gateway */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <Badge variant="gold" size="sm">
                    START YOUR JOURNEY
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Want to Build Your Own Preparation Journey?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Explore our classroom programmes or speak directly with our academic directors at the Mathura campus.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link href="/iit-jee-coaching-mathura">
                    <Button variant="primary" size="sm">
                      Explore IIT-JEE
                    </Button>
                  </Link>
                  <Link href="/neet-coaching-mathura">
                    <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                      Explore NEET
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="text-amber-300 border-amber-400/30 hover:bg-white/10">
                      Book Counselling
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
