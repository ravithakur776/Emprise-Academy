import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { EtseHero } from "@/components/etse/EtseHero";
import { EtseBenefitsSection } from "@/components/etse/EtseBenefitsSection";
import { EtseEligibilitySection } from "@/components/etse/EtseEligibilitySection";
import { EtsePatternSection } from "@/components/etse/EtsePatternSection";
import { EtseProcessSection } from "@/components/etse/EtseProcessSection";
import { EtseRegistrationForm } from "@/components/etse/EtseRegistrationForm";
import { EtseScholarshipBridge } from "@/components/etse/EtseScholarshipBridge";
import { EtseFaqSection } from "@/components/etse/EtseFaqSection";
import { EtseJsonLd } from "@/components/etse/EtseJsonLd";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { GraduationCap, Trophy, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: MAIN_ETSE_DATA.meta.title,
  description: MAIN_ETSE_DATA.meta.description,
  keywords: [...MAIN_ETSE_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_ETSE_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_ETSE_DATA.meta.title,
    description: MAIN_ETSE_DATA.meta.description,
    url: MAIN_ETSE_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function ETSE2026Page() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <EtseJsonLd
          pageTitle={MAIN_ETSE_DATA.meta.title}
          description={MAIN_ETSE_DATA.meta.description}
          url={MAIN_ETSE_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "ETSE 2026", item: MAIN_ETSE_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. High-Impact Campaign Hero with Live Countdown */}
          <EtseHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "ETSE 2026" },
            ]}
          />

          {/* 2. Five High-Impact Benefits */}
          <EtseBenefitsSection />

          {/* 3. Who Can Participate (Eligibility by Class) */}
          <EtseEligibilitySection />

          {/* 4. Examination Pattern & Subject Breakdown */}
          <EtsePatternSection />

          {/* 5. Exam Lifecycle (6 Steps) */}
          <EtseProcessSection />

          {/* 6. Candidate Registration Form & Application Generator */}
          <EtseRegistrationForm />

          {/* 7. Scholarship Slabs Relationship Bridge */}
          <EtseScholarshipBridge />

          {/* 8. Programme Gateway Navigation */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Junior Academic Track
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Foundation Programmes (Classes 8, 9 & 10)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Build exceptional scientific aptitude and conceptual foundations early under senior Kota-experienced mentors in Mathura.
                    </p>
                  </div>
                  <Link
                    href="/foundation-coaching-mathura"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Explore Foundation Programmes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Senior Competitive Track
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      IIT-JEE & NEET-UG Target Batches
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Targeting top national engineering and medical ranks? Explore our 2-Year integrated senior classroom coaching.
                    </p>
                  </div>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>View Admissions Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 9. Frequently Asked Questions */}
          <EtseFaqSection />
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
