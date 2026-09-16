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
import { Breadcrumbs } from "@/components/ui/link/TextLink";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { AWARD_RECORDS, hasAwardsData } from "@/data/awards";
import { Trophy, Award, Sparkles, Clock, ArrowRight, ShieldCheck, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Awards & Accolades | Emprise Academy Mathura",
  description:
    "Institutional honors, felicitation milestones, and academic awards recognizing Emprise Academy's competitive coaching excellence in Mathura since 2011.",
  keywords: [
    "Emprise Academy Awards",
    "Emprise Academy Accolades",
    "Mathura Coaching Institute Recognition",
    "Academic Felicitation Mathura",
    "IIT JEE NEET Coaching Awards",
  ],
  alternates: {
    canonical: "https://www.empriseacademy.com/about/awards",
  },
  openGraph: {
    title: "Awards & Accolades | Emprise Academy Mathura",
    description:
      "Institutional honors and academic achievements reflecting 15+ years of coaching excellence at Emprise Academy Mathura.",
    url: "https://www.empriseacademy.com/about/awards",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AwardsPage() {
  const hasAwards = hasAwardsData();

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* SEO Structured Data */}
        <SiteJsonLd
          type="EducationalOrganization"
          pageTitle="Awards & Accolades | Emprise Academy Mathura"
          description="Explore the recognition, awards, and institutional accolades of Emprise Academy Mathura."
          url="https://www.empriseacademy.com/about/awards"
          breadcrumbs={[
            { name: "Home", item: "https://www.empriseacademy.com" },
            { name: "About Us", item: "https://www.empriseacademy.com/about" },
            { name: "Awards & Accolades", item: "https://www.empriseacademy.com/about/awards" },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-blue-900/40">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <Container size="xl" className="relative z-10 space-y-6">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Awards & Accolades" },
                ]}
                className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
              />

              <div className="max-w-3xl space-y-4">
                <Badge variant="accent" size="sm">
                  INSTITUTIONAL HONORS
                </Badge>

                <Heading
                  as="h1"
                  variant="display"
                  color="white"
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                >
                  Awards & Accolades
                </Heading>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  Recognition that reflects Emprise Academy&apos;s academic journey, pedagogical rigor, and student success across 15+ years in Mathura.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
                    <Trophy className="w-3.5 h-3.5" /> 7 Verified Milestone Awards
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Academic Archive
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. Awards Showcase / Ready Archive State */}
          <Section variant="default" spacing="lg" id="awards-archive">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <Badge variant="primary" size="sm">
                  OFFICIAL RECOGNITION ARCHIVE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Honoring 15+ Years of Educational Impact
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Each accolade stands as a testament to the dedication of our faculty, the discipline of our students, and the trust of parents.
                </Text>
              </div>

              {hasAwards ? (
                /* Future layout for 7 awards */
                <div className="space-y-8">
                  {AWARD_RECORDS.map((award) => (
                    <div
                      key={award.id}
                      className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E3EAF3] shadow-xs flex flex-col md:flex-row gap-6 items-start"
                    >
                      <div className="w-full md:w-48 shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                          {award.number} • {award.year}
                        </span>
                        <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                          {award.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {award.awardingOrganization}
                        </p>
                      </div>
                      <div className="flex-1 space-y-3">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Clean, authentic placeholder/empty state without fabricated data */
                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E3EAF3] shadow-sm p-8 sm:p-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#14213D]">
                      Official Awards Archive in Compilation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-lg mx-auto">
                      Official verified documentation and high-resolution certificates for Emprise Academy&apos;s 7 institutional awards and regional academic honors are currently being prepared for this showcase.
                    </p>
                  </div>

                  {/* Architecture preview skeleton */}
                  <div className="pt-4 border-t border-slate-100 text-left space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                      Upcoming Showcase Architecture
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <Clock className="w-4 h-4 text-[var(--brand-primary)] mx-auto mb-1" />
                        <span className="font-semibold text-slate-700 block">Chronological</span>
                        <span className="text-[11px] text-slate-500">Year-wise timeline</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <span className="font-semibold text-slate-700 block">Accredited</span>
                        <span className="text-[11px] text-slate-500">Awarding bodies</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <FileText className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                        <span className="font-semibold text-slate-700 block">Certificates</span>
                        <span className="text-[11px] text-slate-500">Verified photos</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link href="/about">
                      <Button variant="outline" size="sm">
                        ← Back to About Emprise
                      </Button>
                    </Link>
                    <Link href="/about#directors">
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Meet the Directors
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </Container>
          </Section>
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
