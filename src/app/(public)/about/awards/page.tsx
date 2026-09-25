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
import { AwardsShowcaseGrid } from "@/components/about/AwardsShowcaseGrid";
import { Trophy, Award, ShieldCheck, ArrowRight, Image as ImageIcon } from "lucide-react";

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
    "Avantika Acharya Shiromani Samman",
    "Times of India Best Coaching Award",
    "Golden Star Award",
    "Raj Bhavan Education Summit",
  ],
  alternates: {
    canonical: "https://empriseacademy.com/about/awards",
  },
  openGraph: {
    title: "Awards & Accolades | Emprise Academy Mathura",
    description:
      "A dedicated space for Emprise Academy's awards, institutional honors, and recognition across 15+ years in Mathura.",
    url: "https://empriseacademy.com/about/awards",
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
          url="https://empriseacademy.com/about/awards"
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "About Us", item: "https://empriseacademy.com/about" },
            { name: "Awards & Accolades", item: "https://empriseacademy.com/about/awards" },
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
                    <Trophy className="w-3.5 h-3.5" /> 8 Verified Academic & Institutional Honors
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Documentation & Archives
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. Awards Showcase Layout */}
          <Section variant="default" spacing="lg" id="awards-showcase">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <Badge variant="primary" size="sm">
                  8 VERIFIED INSTITUTIONAL AWARDS
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Institutional Recognition Showcase
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Official felicitations and awards honoring Emprise Academy&apos;s academic excellence, teaching pedagogy, and leadership across 15+ years.
                </Text>
              </div>

              {isVerified ? (
                /* Interactive 2-Column Showcase Grid with Lightbox Modal */
                <AwardsShowcaseGrid awards={AWARDS_DATA} />
              ) : (
                /* Tasteful Editorial Placeholder State (Awaiting Uploads) */
                <div className="space-y-12">
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
                              Slot {slot.id} of 8
                            </span>
                          </div>
                          <div className="h-40 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                            <ImageIcon className="w-6 h-6 text-slate-300" />
                            <span className="text-xs font-medium text-slate-500">
                              Real Award Photograph / Certificate
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
            </Container>
          </Section>
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
