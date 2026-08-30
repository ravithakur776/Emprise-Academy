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
import {
  getCoreProgramPillars,
  getCoursesByProgramme,
  CanonicalCourseItem,
} from "@/data/courses";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import {
  BookOpen,
  GraduationCap,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Academic Courses & Programmes | Emprise Academy Mathura",
  description:
    "Explore structured classroom coaching programmes at Emprise Academy Mathura for IIT-JEE (Classes 11, 12 & Dropper), NEET-UG Medical Entrance, and Foundation (Classes 8–10).",
  keywords: [
    "Courses at Emprise Academy",
    "IIT JEE Coaching in Mathura",
    "NEET Coaching in Mathura",
    "Foundation Coaching in Mathura",
    "JEE Main and Advanced Batches",
    "Class 11 JEE Coaching",
    "Class 12 JEE Coaching",
    "NEET Dropper Batch Mathura",
  ],
  alternates: {
    canonical: "https://www.empriseacademy.com/courses",
  },
  openGraph: {
    title: "Academic Courses & Programmes | Emprise Academy Mathura",
    description:
      "Concept-first classroom preparation for IIT-JEE, NEET-UG, and Foundation (Classes 8–10) in Mathura. Established in 2011.",
    url: "https://www.empriseacademy.com/courses",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function CoursesPage() {
  const corePillars = getCoreProgramPillars();
  const jeeCourses = getCoursesByProgramme("JEE");
  const neetCourses = getCoursesByProgramme("NEET");
  const foundationCourses = getCoursesByProgramme("FOUNDATION");

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Course Directory Schema */}
        <SiteJsonLd
          type="EducationalOrganization"
          pageTitle="Academic Courses & Programmes | Emprise Academy Mathura"
          description="Explore structured classroom coaching programmes at Emprise Academy Mathura for IIT-JEE, NEET-UG, and Foundation (Classes 8–10)."
          url="https://www.empriseacademy.com/courses"
          breadcrumbs={[
            { name: "Home", item: "https://www.empriseacademy.com" },
            { name: "Courses", item: "https://www.empriseacademy.com/courses" },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Editorial Hero */}
          <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary)] via-[#0D2342] to-[#0A192F] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-slate-800">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

            <Container size="xl" className="relative z-10 space-y-6">
              <div className="text-slate-400">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Academic Courses" },
                  ]}
                  className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
                />
              </div>

              <div className="max-w-3xl space-y-4">
                <Badge variant="accent" size="sm">
                  ACADEMIC PILLARS & PROGRAMMES
                </Badge>

                <Heading
                  as="h1"
                  variant="display"
                  color="white"
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight"
                >
                  Courses & Academic Pathways
                </Heading>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  Three focused academic streams engineered with concept-first pedagogy, regular diagnostic assessment, and continuous mentor accessibility in Mathura.
                </p>
              </div>
            </Container>
          </section>

          {/* 2. Core Pillars Overview */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                <Badge variant="primary" size="md">
                  CORE STREAMS
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Our 3 Primary Academic Streams
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Choose your target examination pathway to explore class-specific curriculum structures.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {corePillars.map((pillar) => {
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

                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                          <BookOpen className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                          <span>{pillar.targetExams}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {pillar.description}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                            Academic Highlights
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
                          className={cn(
                            "inline-flex items-center gap-2 text-sm font-bold transition-colors group",
                            isJEE
                              ? "text-[var(--brand-primary)] hover:text-blue-700"
                              : isNEET
                              ? "text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]"
                              : "text-amber-700 hover:text-amber-800"
                          )}
                        >
                          <span>{pillar.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Section>

          {/* 3. Class-Wise Program Pathways */}
          <Section variant="surface" spacing="lg" id="program-breakdown">
            <Container size="xl" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <Badge variant="primary" size="md">
                  CLASS-WISE CURRICULUM
                </Badge>
                <Heading as="h2" variant="h1" align="center">
                  Comprehensive Program Breakdown
                </Heading>
                <Text variant="body-large" color="muted" align="center">
                  Explore curriculum objectives, core subjects, and focused pedagogy for each academic level.
                </Text>
              </div>

              {/* A. IIT-JEE Breakdown */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[var(--brand-primary)]">
                      IIT-JEE (Main & Advanced) Batches
                    </h3>
                    <p className="text-xs text-slate-500">
                      Engineering entrance programs covering Physics, Chemistry, and Advanced Mathematics
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {jeeCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* B. NEET-UG Breakdown */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[var(--brand-primary)]">
                      NEET-UG Medical Batches
                    </h3>
                    <p className="text-xs text-slate-500">
                      Medical entrance programs covering NCERT Physics, Chemistry, Botany, and Zoology
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {neetCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* C. Foundation Breakdown */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[var(--brand-primary)]">
                      Foundation (Classes 8, 9 & 10)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Junior scientific and mathematical development for school excellence and Olympiad readiness
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {foundationCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* 4. Admissions & Consultation CTA */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-left max-w-2xl">
                  <Badge variant="gold" size="sm">
                    ADMISSIONS & COUNSELLING
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Need Guidance on Choosing the Right Academic Programme?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Book a free, 1-on-1 academic consultation with our senior counsellors at our Mathura campus to assess syllabus requirements and customized preparation roadmaps.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <Link href="/admissions#counselling">
                    <Button variant="primary" size="md">
                      Book Free Counselling →
                    </Button>
                  </Link>
                  <Link href="/etse-2026">
                    <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                      Register for ETSE 2026
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

function CourseCard({ course }: { course: CanonicalCourseItem }) {
  const isJEE = course.programmeId === "JEE";
  const isNEET = course.programmeId === "NEET";

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge
            variant={isJEE ? "primary" : isNEET ? "accent" : "gold"}
            size="sm"
          >
            {course.targetClass}
          </Badge>
          <span className="text-[11px] font-semibold text-slate-500">
            {course.targetExam}
          </span>
        </div>

        <h4 className="text-lg font-bold text-[var(--brand-primary)]">
          {course.name}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Core Subjects */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Subjects Covered
          </span>
          <div className="flex flex-wrap gap-1">
            {course.subjects.map((sub, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Academic Focus Points */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Academic Focus
          </span>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
            {course.academicFocus.slice(0, 4).map((f, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={course.publicUrl}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
        >
          <span>Explore Programme</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
