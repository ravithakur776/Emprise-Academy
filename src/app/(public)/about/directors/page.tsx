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
import { DirectorsHero } from "@/components/directors/DirectorsHero";
import { DirectorsDualGrid } from "@/components/directors/DirectorsDualGrid";
import { DirectorJsonLd } from "@/components/directors/DirectorJsonLd";
import { MAIN_DIRECTORS_DATA } from "@/data/directors";
import { Compass, GraduationCap, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Directors & Academic Leadership | Emprise Academy Mathura",
  description:
    "Meet founding directors Sushil Dagur (Ford UK alumnus, Physics) and Rakesh Kumar (Rolls-Royce Limited UK alumnus, Mathematics) leading Emprise Academy in Mathura.",
  keywords: [
    ...MAIN_DIRECTORS_DATA.meta.keywords,
    "Emprise Academy Directors",
    "Sushil Dagur Physics Mathura",
    "Rakesh Kumar Mathematics Mathura",
  ],
  alternates: {
    canonical: "https://empriseacademy.com/about/directors",
  },
  openGraph: {
    title: "Directors & Academic Leadership | Emprise Academy Mathura",
    description:
      "Meet the academic leadership behind Emprise Academy: Sushil Dagur and Rakesh Kumar, bringing UK engineering precision to IIT-JEE & NEET coaching in Mathura.",
    url: "https://empriseacademy.com/about/directors",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutDirectorsPage() {
  const { hero, leadershipSynergy, coreValues } = MAIN_DIRECTORS_DATA;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <DirectorJsonLd
          name="Sushil Dagur & Rakesh Kumar"
          jobTitle="Founding Directors"
          description={MAIN_DIRECTORS_DATA.meta.description}
          url="https://empriseacademy.com/about/directors"
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "About Us", item: "https://empriseacademy.com/about" },
            { name: "Directors", item: "https://empriseacademy.com/about/directors" },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <DirectorsHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Directors" },
            ]}
            eyebrow="DESTINATION 03 — ACADEMIC LEADERSHIP"
            h1="Leadership Behind Success"
            subheading={hero.subheading}
            paragraph={hero.paragraph}
            primaryCta={hero.primaryCta}
            secondaryCta={hero.secondaryCta}
          />

          {/* 2. Dual Director Profiles (Sushil Dagur & Rakesh Kumar) */}
          <DirectorsDualGrid />

          {/* 3. Leadership Synergy */}
          <Section variant="surface" spacing="lg" id="leadership-synergy">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white p-6 sm:p-10 lg:p-12 border border-blue-900/40 shadow-xl space-y-8">
                <div className="max-w-3xl space-y-2">
                  <Badge variant="gold" size="md">
                    LEADERSHIP SYNERGY
                  </Badge>
                  <Heading as="h2" variant="h1" color="white">
                    {leadershipSynergy.heading}
                  </Heading>
                  <Text variant="body-large" color="white" className="opacity-90">
                    {leadershipSynergy.subheading}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leadershipSynergy.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                          <Compass className="w-5 h-5 text-[var(--brand-accent)] shrink-0" />
                          <span>{pillar.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* 4. Core Leadership Principles */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <Badge variant="primary" size="md">
                  CORE VALUES
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our Institutional Educational Commitments
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  The principles that shape every classroom lecture, test series, and student consultation at Emprise Academy.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--brand-accent)] font-bold text-sm flex items-center justify-center mb-4">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-[var(--brand-primary)] mb-2">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 5. Cross-Link Callout to Other Two About Destinations */}
          <Section variant="surface" spacing="md">
            <Container size="xl">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E3EAF3] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center lg:text-left max-w-2xl">
                  <Badge variant="primary" size="sm">
                    EXPLORE ABOUT EMPRISE
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#14213D]">
                    Discover Our Institutional Story & Verified Honors
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    Explore the complete 15+ year journey, pedagogy, and campus culture of Emprise Academy, or visit our dedicated awards archive.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <Link href="/about">
                    <Button variant="primary" size="md">
                      01 Brief About Emprise
                    </Button>
                  </Link>
                  <Link href="/about/awards">
                    <Button variant="outline" size="md">
                      02 Awards & Accolades
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. Admissions & Mentorship Gateway Banner */}
          <Section variant="default" spacing="md">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Admissions & Mentorship
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      Direct Academic Counselling & Roadmap
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Schedule a 1-on-1 academic consultation with our senior counsellors and mentors at our Mathura campus.
                    </p>
                  </div>
                  <Link
                    href="/admissions#counselling"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                  >
                    <span>Book Free Counselling Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        Merit Scholarships
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-2">
                      ETSE 2026 Scholarship Testing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      Up to 100% tuition scholarships for aspiring engineers and doctors through our annual talent examination.
                    </p>
                  </div>
                  <Link
                    href="/etse-2026#register"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline"
                  >
                    <span>Register for ETSE 2026</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
