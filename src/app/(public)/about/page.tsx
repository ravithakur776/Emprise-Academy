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
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { getCanonicalDirectorsList } from "@/data/directors";
import { getCoreProgramPillars } from "@/data/courses";
import { DirectorPhoto } from "@/components/directors/DirectorPhoto";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Clock,
  Compass,
  FileCheck,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Emprise Academy | IIT-JEE & NEET Coaching in Mathura",
  description:
    "Learn about Emprise Academy Mathura, established in 2011. Providing concept-first classroom coaching for IIT-JEE (Main & Advanced), NEET-UG, and Foundation (Classes 8–10) guided by University of Derby (UK) alumni.",
  keywords: [
    "About Emprise Academy",
    "Emprise Academy Mathura History",
    "IIT JEE Coaching Institute Mathura",
    "NEET Coaching Institute Mathura",
    "Sushil Dagur Director",
    "Rakesh Kumar Director",
    "Best Coaching in Mathura Est 2011",
  ],
  alternates: {
    canonical: "https://www.empriseacademy.com/about",
  },
  openGraph: {
    title: "About Emprise Academy | IIT-JEE & NEET Coaching in Mathura",
    description:
      "Established in 2011, Emprise Academy provides structured academic coaching for IIT-JEE, NEET-UG, and Foundation in Mathura.",
    url: "https://www.empriseacademy.com/about",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  const directors = getCanonicalDirectorsList();
  const pillars = getCoreProgramPillars();
  const business = CANONICAL_BUSINESS_CONFIG;

  const methodologySteps = [
    {
      step: "01",
      title: "Concept",
      subtitle: "First-Principles Derivation",
      description: "Focus on why formulas work through rigorous conceptual derivations rather than superficial memorization.",
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      step: "02",
      title: "Practice",
      subtitle: "Structured Problem Solving",
      description: "Graded question sets progressing systematically from fundamental applications to multi-concept synthesis.",
      icon: Target,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      step: "03",
      title: "Test",
      subtitle: "Diagnostic Assessments",
      description: "Regular chapter-wise, part-syllabus, and full-length simulated examinations mimicking official test environments.",
      icon: FileCheck,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      step: "04",
      title: "Analysis",
      subtitle: "Performance Feedback",
      description: "Detailed error classification and speed-accuracy audits to pinpoint specific conceptual and calculation gaps.",
      icon: TrendingUp,
      color: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
      step: "05",
      title: "Improvement",
      subtitle: "Targeted Doubt Resolution",
      description: "Dedicated 1-on-1 mentor doubt desks ensuring no misconception carries forward into subsequent chapters.",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      step: "06",
      title: "Revision",
      subtitle: "Cyclic Consolidation",
      description: "Structured periodic revision cycles and formula synthesis maps preventing memory fade over long preparation spans.",
      icon: RotateCcw,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    },
  ];

  const whyChoosePoints = [
    {
      title: "Concept-Based Learning",
      description: "Core emphasis on first-principles derivation, ensuring students solve novel and complex problems with clarity.",
      icon: BookOpen,
    },
    {
      title: "Personalised Mentorship",
      description: "Direct academic guidance from experienced leadership and senior faculty with accessible doubt resolution.",
      icon: Users,
    },
    {
      title: "Regular Testing",
      description: "Scheduled chapter-wise, cumulative, and full-syllabus assessments maintaining consistent examination temperament.",
      icon: FileCheck,
    },
    {
      title: "Performance Analysis",
      description: "Diagnostic progress reviews identifying subject-wise strengths, accuracy rates, and time-management bottlenecks.",
      icon: TrendingUp,
    },
    {
      title: "Doubt Resolution",
      description: "Daily interactive doubt desks and structured remedial sessions ensuring continuous conceptual clarity.",
      icon: CheckCircle2,
    },
    {
      title: "Academic Consistency",
      description: "Structured syllabus pacing, disciplined study routines, and complete synergy with school board requirements.",
      icon: Clock,
    },
  ];

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* SEO Structured Data */}
        <SiteJsonLd
          type="EducationalOrganization"
          pageTitle="About Emprise Academy | IIT-JEE & NEET Coaching in Mathura"
          description="Learn about Emprise Academy's history since 2011, academic pedagogy, and leadership excellence in Mathura."
          url="https://www.empriseacademy.com/about"
          breadcrumbs={[
            { name: "Home", item: "https://www.empriseacademy.com" },
            { name: "About Us", item: "https://www.empriseacademy.com/about" },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-slate-800">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <Container size="xl" className="relative z-10 space-y-6">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "About Us" },
                ]}
                className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
              />

              <div className="max-w-3xl space-y-4">
                <Badge variant="accent" size="sm">
                  ABOUT EMPRISE ACADEMY
                </Badge>

                <Heading
                  as="h1"
                  variant="display"
                  color="white"
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                >
                  Building Strong Foundations for Competitive Success
                </Heading>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  Established in 2011, Emprise Academy provides structured concept-first classroom coaching for IIT-JEE, NEET-UG, and Foundation (Classes 8–10) in Mathura.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5" /> Est. 2011 • 15+ Years in Mathura
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
                    <GraduationCap className="w-3.5 h-3.5" /> University of Derby (UK) Leadership
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. Our Story */}
          <Section variant="default" spacing="lg" id="our-story">
            <Container size="xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="primary" size="sm">
                      OUR IDENTITY & MISSION
                    </Badge>
                    <Heading as="h2" variant="h1">
                      Committed to Conceptual Depth Since 2011
                    </Heading>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    <p>
                      Emprise Academy was founded in <strong>2011</strong> in Mathura with a clear academic philosophy: competitive success in IIT-JEE and NEET-UG cannot be achieved through rote formula memorization. It requires deep conceptual clarity, mathematical deduction, and structured problem-solving habits.
                    </p>
                    <p>
                      Over the past <strong>15+ years</strong>, Emprise Academy has served as a dedicated academic home for hundreds of ambitious students across Mathura and surrounding regions. By combining national-standard curriculum rigor with personal mentor accessibility, we empower students to compete confidently at the All-India level while maintaining strong school board performance.
                    </p>
                    <p>
                      Our campus on Bhuteshwar Road is built around focused classroom spaces, systematic testing infrastructure, and daily doubt-solving desks that ensure no student is left behind in their academic journey.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-2xl font-extrabold text-[var(--brand-primary)] block">2011</span>
                      <span className="text-xs text-slate-500 font-medium">Established Year</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-2xl font-extrabold text-[var(--brand-accent)] block">15+</span>
                      <span className="text-xs text-slate-500 font-medium">Years of Excellence</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-2xl font-extrabold text-amber-600 block">3 Pillars</span>
                      <span className="text-xs text-slate-500 font-medium">JEE, NEET & Foundation</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white shadow-xl border border-slate-800 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                        OUR CORE VALUES
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        The Emprise Academic Standard
                      </h3>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-white block font-semibold">First-Principles Pedagogy</strong>
                          <span>Every formula and law is derived step-by-step to build lasting intuition.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-white block font-semibold">Uncompromised Discipline</strong>
                          <span>Daily practice routines, structured attendance, and regular performance reporting.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-white block font-semibold">Supportive Mentorship</strong>
                          <span>Personalized doubt desks without fear or hesitation in a healthy environment.</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700/80">
                      <Link href="/admissions#counselling">
                        <Button variant="primary" size="md" fullWidth>
                          Schedule Campus Visit →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* 3. What We Focus On (Three Academic Pillars) */}
          <Section variant="surface" spacing="lg" id="programmes">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <Badge variant="primary" size="md">
                  CORE ACADEMIC PILLARS
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  What We Focus On
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Structured classroom programs designed with dedicated curriculum pathways for each competitive milestone.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {pillars.map((pillar) => {
                  const isJEE = pillar.programmeId === "JEE";
                  const isNEET = pillar.programmeId === "NEET";

                  return (
                    <div
                      key={pillar.id}
                      className={cn(
                        "bg-white rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-xl relative overflow-hidden",
                        isJEE
                          ? "border-[var(--brand-primary)]/40 hover:border-[var(--brand-primary)]"
                          : isNEET
                          ? "border-[var(--brand-accent)]/40 hover:border-[var(--brand-accent)]"
                          : "border-amber-400/50 hover:border-amber-500"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0 left-0 right-0 h-2",
                          isJEE
                            ? "bg-[var(--brand-primary)]"
                            : isNEET
                            ? "bg-[var(--brand-accent)]"
                            : "bg-[var(--brand-gold)]"
                        )}
                      />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <Badge
                            variant={isJEE ? "primary" : isNEET ? "accent" : "gold"}
                            size="sm"
                          >
                            {pillar.badge}
                          </Badge>
                          <span className="text-xs font-semibold text-slate-500">
                            {pillar.targetClasses}
                          </span>
                        </div>

                        <h3 className="text-2xl font-extrabold text-[var(--brand-primary)] tracking-tight">
                          {pillar.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {pillar.description}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                            Key Highlights
                          </span>
                          {pillar.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2
                                className={cn(
                                  "w-3.5 h-3.5 shrink-0 mt-0.5",
                                  isJEE
                                    ? "text-blue-600"
                                    : isNEET
                                    ? "text-[var(--brand-accent)]"
                                    : "text-amber-600"
                                )}
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={pillar.ctaHref}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                        >
                          <span>Explore {pillar.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* 4. Our Academic Approach (6-Step Cycle) */}
          <Section variant="default" spacing="lg" id="methodology">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <Badge variant="primary" size="md">
                  PEDAGOGICAL FRAMEWORK
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our 6-Step Academic Methodology
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  A closed-loop academic system designed to turn initial conceptual curiosity into consistent high-percentile execution.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {methodologySteps.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.step}
                      className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center", m.color)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-extrabold text-slate-300 font-mono">
                          {m.step}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[var(--brand-primary)]">
                          {m.title}
                        </h4>
                        <span className="text-xs font-semibold text-[var(--brand-accent)] block mb-2">
                          {m.subtitle}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* 5. Academic Leadership */}
          <Section variant="surface" spacing="lg" id="directors">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <Badge variant="primary" size="md">
                  FOUNDING LEADERSHIP
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Guided by Experienced Academic Directors
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Meet the leaders steering curriculum rigor and mentorship at Emprise Academy Mathura.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {directors.map((director) => (
                  <div
                    key={director.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start hover:shadow-md transition-shadow"
                  >
                    <div className="w-40 sm:w-48 shrink-0">
                      <DirectorPhoto
                        photoUrl={director.photoUrl}
                        name={director.name}
                        designation={director.designation}
                        aspectRatio="portrait"
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-3 text-left flex-1">
                      <div>
                        <Badge variant="primary" size="sm" className="mb-1">
                          {director.designation}
                        </Badge>
                        <h3 className="text-xl font-extrabold text-[var(--brand-primary)]">
                          {director.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500">
                          {director.qualification} • {director.almaMater}
                        </p>
                      </div>

                      <blockquote className="text-xs italic text-slate-600 border-l-2 border-[var(--brand-accent)] pl-3 my-2">
                        &ldquo;{director.quote}&rdquo;
                      </blockquote>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {director.shortBio}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/directors/${director.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                        >
                          <span>Read Full Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link href="/directors">
                  <Button variant="outline" size="md">
                    Explore Leadership & Directors Page →
                  </Button>
                </Link>
              </div>
            </Container>
          </Section>

          {/* 6. Why Choose Emprise */}
          <Section variant="default" spacing="lg" id="why-emprise">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <Badge variant="primary" size="md">
                  THE EMPRISE ADVANTAGE
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Why Students & Parents Choose Emprise
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Six foundational pillars that make Emprise Academy Mathura&apos;s trusted academic partner for competitive entrance exams.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChoosePoints.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[var(--brand-primary)]/40 transition-colors space-y-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-[var(--brand-primary)]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* 7. Final Action CTA */}
          <Section variant="surface" spacing="lg">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-left max-w-2xl">
                  <Badge variant="gold" size="sm">
                    START YOUR ACADEMIC JOURNEY
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Experience Structured Academic Preparation in Mathura
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Speak with our academic mentors at our Mathura campus ({business.address.display_location}) to discuss syllabus roadmaps, batch eligibility, or merit scholarship testing.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <Link href="/admissions#counselling">
                    <Button variant="primary" size="md">
                      Book Free Counselling →
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                      Explore Programmes
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
