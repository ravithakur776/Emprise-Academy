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
import { ResultsShowcaseClient } from "@/components/results/ResultsShowcaseClient";
import { StudentTestimonialsSection } from "@/components/results/StudentTestimonialsSection";
import { ResultsJsonLd } from "@/components/results/ResultsJsonLd";
import { MAIN_RESULTS_DATA } from "@/data/results";
import { Trophy, GraduationCap, ArrowRight, ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Results That Speak For Themselves | Emprise Academy Mathura",
  description: "Explore authentic historical JEE Advanced, NEET, Foundation, and Board result creatives from Emprise Academy Mathura. Real students, verified achievements.",
  keywords: [...MAIN_RESULTS_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_RESULTS_DATA.meta.canonical,
  },
  openGraph: {
    title: "Results That Speak For Themselves | Emprise Academy Mathura",
    description: "Explore authentic historical JEE Advanced, NEET, Foundation, and Board result creatives from Emprise Academy Mathura.",
    url: MAIN_RESULTS_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function ResultsMainPage() {
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
          {/* Premium Results Showcase with Real Creatives, Galleries, Stories & Verification Gateway */}
          <ResultsShowcaseClient />

          {/* Authentic Student & Parent Testimonials */}
          <StudentTestimonialsSection />

          {/* 4. Programme Preparation Gateway */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white p-6 sm:p-10 border border-blue-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
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
