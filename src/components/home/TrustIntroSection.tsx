import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { CheckCircle2, ArrowRight, Trophy } from "lucide-react";
import { AcademicStatCard } from "./AcademicStatCard";
import { TrustProofStrip } from "./TrustProofStrip";

export const TrustIntroSection: React.FC = () => {
  const { trustIntro } = HOMEPAGE_DATA;

  return (
    <>
      {/* 04. Dedicated Full-Width Deep-Blue Trust & Proof Strip */}
      <TrustProofStrip />

      {/* 05. Academic Introduction & Visual Storytelling Section */}
      <Section variant="default" spacing="lg" id="about-intro" className="bg-white">
      <Container size="xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="xl:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <Badge variant="primary" size="md">
                ACADEMIC EXCELLENCE • EST. 2011
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0B2748] tracking-tight leading-[1.2]">
                The Leader in{" "}
                <span className="text-[var(--brand-primary)]">
                  IIT-JEE, NEET &amp; Foundation
                </span>{" "}
                Coaching in Mathura
              </h2>
            </div>

            {/* Approved Two-Paragraph Narrative */}
            <div className="space-y-4 sm:space-y-4.5 text-[#667085] text-base sm:text-[17px] lg:text-[18px] leading-[1.7] sm:leading-[1.75]">
              <p>
                Since 2011, Emprise Academy has been transforming aspirations into achievements and shaping the careers of thousands of students in Mathura. Over the years, the academy has earned a strong reputation as{" "}
                <span className="font-semibold text-[#0B2748]">
                  one of the leading IIT-JEE and NEET coaching institutes in Mathura
                </span>{" "}
                and a trusted name for competitive examination preparation.
              </p>
              <p>
                Over the years, Emprise Academy has built a strong and structured culture of{" "}
                <span className="font-semibold text-[#0B2748]">
                  academic excellence, competitive preparation, and personalised student care
                </span>
                . With an experienced team of{" "}
                <span className="font-semibold text-[#0B2748]">
                  IITians and Doctors
                </span>
                , the academy focuses on conceptual clarity, disciplined learning, individual attention, and consistent performance improvement.
              </p>
            </div>

            {/* Core Institutional Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Director-Led Classrooms & Mentorship</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Small Batches for 100% Doubt Coverage</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <Trophy className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Outstanding IIT-JEE &amp; NEET Results in Mathura</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--brand-text)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Board Excellence Synchronized with JEE/NEET</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <Link href="/about">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Emprise
                </Button>
              </Link>
              <Link href="#directors">
                <Button variant="secondary" size="md">
                  Meet Directors
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Storytelling Collage + Supporting Academic Credentials */}
          <div className="xl:col-span-6 w-full space-y-5">
            {/* Photographic Storytelling Composition */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E3EAF3] bg-gradient-to-br from-[#EEF5FF] via-white to-slate-50 p-3 sm:p-4 shadow-sm select-none">
              {/* Restrained Brand Geometry */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1769E0]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF8A00]/5 rounded-full blur-2xl pointer-events-none" />

              {/* Asymmetric Dual-Photo Composition */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">
                {/* Primary Academy Campus & Building Photograph */}
                <div className="sm:col-span-8 relative h-52 sm:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200/70 bg-slate-100 group">
                  <img
                    src="/images/emprise-academy-building-campus.jpg"
                    alt="Emprise Academy Mathura — Modern Coaching Campus and Academic Infrastructure at Bhuteshwar Road"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123E73]/85 via-[#123E73]/20 to-transparent" />

                  {/* Campus Location Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-xs text-[11px] font-bold text-[#123E73]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse" />
                    <span>Bhuteshwar Road Campus</span>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      Academic Campus
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow-xs truncate">
                      Modern Learning &amp; Competitive Preparation Infrastructure
                    </h3>
                  </div>
                </div>

                {/* Secondary Photo & Academic Legacy Card */}
                <div className="sm:col-span-4 flex flex-col gap-3">
                  {/* Secondary Student Mentorship & Community Photo */}
                  <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden shadow-xs border border-slate-200/70 bg-slate-100 group">
                    <img
                      src="/images/emprise-student-mentorship-group.jpg"
                      alt="Emprise Academy Mathura — Students and faculty celebration and mentorship"
                      className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123E73]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide">
                      Interactive Care
                    </span>
                  </div>

                  {/* 15+ Years Legacy Photo Card (Campus Reception & Counselling) */}
                  <div className="relative flex-1 min-h-[120px] sm:min-h-0 rounded-xl overflow-hidden shadow-xs border border-slate-200/70 bg-slate-900 group">
                    <img
                      src="/images/emprise-academy-reception-counselling.jpg"
                      alt="Emprise Academy Mathura — Campus Reception, Admissions and Student Counselling Center"
                      className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/95 via-[#0B2545]/55 to-[#0B2545]/20 group-hover:from-[#0B2545]/90 transition-colors" />

                    {/* Top Pill: Campus Facility Badge */}
                    <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-[9px] font-semibold text-white/95 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                      <span>Campus Reception</span>
                    </div>

                    {/* Bottom Legacy Content */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 z-10">
                      <div className="text-xl sm:text-2xl font-black text-[#FF8A00] leading-none drop-shadow-xs">
                        15+ Years
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white mt-1 leading-tight drop-shadow-xs">
                        Legacy in Mathura
                      </div>
                      <div className="text-[9px] text-blue-100/85 mt-0.5 drop-shadow-2xs">
                        Since 2011 • Trusted Mentors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting 6-Card Academic Credentials & Statistics System */}
            <div className="group/stats-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
              {trustIntro.stats.map((stat) => (
                <AcademicStatCard
                  key={stat.index}
                  stat={stat}
                  className="group-hover/stats-grid:opacity-[0.94] hover:!opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
      </Section>
    </>
  );
};
