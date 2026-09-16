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
import { AWARDS_DATA, hasVerifiedAwards } from "@/data/awards";
import { Trophy, Award, ShieldCheck, ArrowRight, Image as ImageIcon, Calendar, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Awards & Accolades | Emprise Academy Mathura",
  description:
    "Official institutional honors, felicitation milestones, and academic awards recognizing Emprise Academy's coaching excellence in Mathura since 2011.",
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
      "A dedicated space for Emprise Academy's awards, institutional honors, and recognition across 15+ years in Mathura.",
    url: "https://www.empriseacademy.com/about/awards",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AwardsPage() {
  const isVerified = hasVerifiedAwards();

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
          {/* 1. Dedicated Hero Header */}
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
                  DESTINATION 02 — HONORS & RECOGNITION
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
                  A dedicated space for Emprise Academy&apos;s institutional honors and recognition that reflect our academic journey across 15+ years in Mathura.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
                    <Trophy className="w-3.5 h-3.5" /> 7 Dedicated Award Entries Architecture
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Documentation Only
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. Awards Showcase / 7-Slot Content-Ready Layout */}
          <Section variant="default" spacing="lg" id="awards-showcase">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <Badge variant="primary" size="sm">
                  SEVEN AWARD ENTRIES ARCHITECTURE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Institutional Recognition Showcase
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Structured to feature verified photographs, certificates, awarding bodies, and milestones for each honor.
                </Text>
              </div>

              {isVerified ? (
                /* 2-Column Editorial Card Layout (active when real records are entered) */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {AWARDS_DATA.map((award) => (
                    <div
                      key={award.id}
                      className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E3EAF3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            AWARD {award.number}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                            <Calendar className="w-3 h-3" />
                            {award.year}
                          </span>
                        </div>

                        {award.image ? (
                          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={award.image}
                              alt={award.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        ) : null}

                        <div>
                          <h3 className="text-xl font-bold text-[#14213D] mb-1">
                            {award.name}
                          </h3>
                          <p className="text-xs font-semibold text-[var(--brand-primary)] flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {award.organization}
                          </p>
                        </div>

                        <p className="text-sm text-[#667085] leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Tasteful Editorial Placeholder State & 7-Entry Content-Ready Structure */
                <div className="space-y-12">
                  {/* Primary Editorial Notice */}
                  <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E3EAF3] shadow-xs p-8 sm:p-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center mx-auto">
                      <Award className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#14213D]">
                        Awards & Accolades Dedicated Space
                      </h3>
                      <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-xl mx-auto">
                        A dedicated space for Emprise Academy&apos;s awards and accolades. Award details and photographs will be added as official records are provided.
                      </p>
                    </div>
                  </div>

                  {/* 7 Content-Ready Architecture Slots (2-Column Editorial Grid) */}
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                          Layout Blueprint
                        </span>
                        <h4 className="text-lg font-bold text-[#14213D]">
                          7 Award Showcase Entries (Prepared Architecture)
                        </h4>
                      </div>
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        Awaiting verified official archive
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {AWARDS_DATA.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-6 rounded-2xl bg-white border border-dashed border-[#E3EAF3] flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                AWARD {slot.number}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                                Slot {slot.id} of 7
                              </span>
                            </div>

                            {/* Certificate/Photograph Placeholder Container */}
                            <div className="h-40 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                              <ImageIcon className="w-6 h-6 text-slate-300" />
                              <span className="text-xs font-medium text-slate-500">
                                Real Award Photograph / Certificate
                              </span>
                              <span className="text-[10px] text-slate-400">
                                Supports high-resolution certificate lightbox
                              </span>
                            </div>

                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-700 block">
                                Award Title & Organization
                              </span>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                Year • Awarding Body • Citation & Official Description
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                            <span>Status: Pending official upload</span>
                            <span className="font-mono text-slate-300">0{slot.id}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cross-Link Callout to Other Two About Destinations */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-[#E3EAF3] flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        EXPLORE ABOUT EMPRISE
                      </span>
                      <h4 className="text-base font-bold text-[#14213D]">
                        Explore Institutional Overview or Meet Our Academic Leadership
                      </h4>
                      <p className="text-xs text-[#667085]">
                        Discover the story behind Emprise Academy or explore the founding directors&apos; background.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <Link href="/about">
                        <Button variant="outline" size="sm">
                          01 Brief About Emprise
                        </Button>
                      </Link>
                      <Link href="/about/directors">
                        <Button
                          variant="primary"
                          size="sm"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          03 Directors Profile
                        </Button>
                      </Link>
                    </div>
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
