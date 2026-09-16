import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { CheckCircle2, ArrowRight, Trophy } from "lucide-react";
import { AcademicStatCard } from "./AcademicStatCard";

export const TrustIntroSection: React.FC = () => {
  const { trustIntro } = HOMEPAGE_DATA;

  return (
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

          {/* Right Column: Premium 6-Card Academic Credentials & Statistics System */}
          <div className="xl:col-span-6 w-full">
            <div className="group/stats-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
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
  );
};
