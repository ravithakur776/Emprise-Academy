import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Button } from "@/components/ui/button/Button";
import {
  SUSHIL_DAGUR_LEADERSHIP,
  RAKESH_KUMAR_LEADERSHIP,
  getCanonicalDirectorsList,
} from "@/data/directors";
import { DirectorLeadershipCard } from "./DirectorLeadershipCard";
import { ArrowRight } from "lucide-react";

export const DirectorsSection: React.FC = () => {
  // Ensure canonical directors registry sync
  const _canonical = getCanonicalDirectorsList();

  // Explicit, deterministic Left-to-Right leadership binding (Data-Level Lock)
  const directors = [
    { ...SUSHIL_DAGUR_LEADERSHIP, photoUrl: SUSHIL_DAGUR_LEADERSHIP.photoUrl },
    { ...RAKESH_KUMAR_LEADERSHIP, photoUrl: RAKESH_KUMAR_LEADERSHIP.photoUrl },
  ];

  return (
    <Section variant="default" spacing="lg" id="directors" className="bg-[#F8FAFC] border-y border-[var(--brand-border)]">
      <Container size="xl">
        {/* Section Header (No top badge, begins directly with main heading) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-11">
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#14213D] tracking-tight leading-[1.2]">
            Leadership Behind <span className="text-[#1769E0]">Success</span>
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#667085] leading-relaxed max-w-2xl mx-auto mt-3.5 sm:mt-4">
            Our vision, experience, and unwavering commitment empower students to turn their potential into proven success.
          </p>
        </div>

        {/* Dual Director Cards (50 / 50 Desktop Grid: Left: Sushil Dagur, Right: Rakesh Kumar, Stacked on Mobile) */}
        <div className="group/directors-grid grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {directors.map((director) => (
            <DirectorLeadershipCard
              key={director.id}
              director={{ ...director, photoUrl: director.photoUrl }}
              className="group-hover/directors-grid:opacity-[0.95] hover:!opacity-100"
            />
          ))}
        </div>

        {/* Explore Leadership CTA */}
        <div className="text-center">
          <Link href="/directors">
            <Button
              variant="secondary"
              size="md"
              className="font-bold border-[var(--brand-border)] hover:border-[var(--brand-primary)]/50 hover:bg-white text-[var(--brand-text)] shadow-2xs"
              rightIcon={<ArrowRight className="w-4 h-4 text-[var(--brand-primary)]" />}
            >
              Explore Complete Academic Leadership
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
