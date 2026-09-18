"use client";

import React, { useEffect, useState, useRef } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Award, Users, CheckCircle2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustMetricItem {
  id: string;
  targetNum: number;
  suffix: string;
  prefix?: string;
  isTextValue?: boolean;
  textValue?: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRUST_METRICS: TrustMetricItem[] = [
  {
    id: "legacy",
    targetNum: 15,
    suffix: "+ Years",
    label: "OF ACADEMIC LEGACY",
    sublabel: "Mentoring students in Mathura since 2011",
    icon: Award,
  },
  {
    id: "mentored",
    targetNum: 5000,
    suffix: "+",
    label: "STUDENTS MENTORED",
    sublabel: "Personalised care & concept coaching",
    icon: Users,
  },
  {
    id: "qualified",
    targetNum: 700,
    suffix: "+",
    label: "STUDENTS QUALIFIED",
    sublabel: "Proven selections across JEE & NEET",
    icon: CheckCircle2,
  },
  {
    id: "faculty",
    targetNum: 0,
    suffix: "",
    isTextValue: true,
    textValue: "IITians & Doctors",
    label: "FACULTY",
    sublabel: "Director-led core classroom mentorship",
    icon: GraduationCap,
  },
];

export const TrustProofStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    legacy: 0,
    mentored: 0,
    qualified: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts({
        legacy: 15,
        mentored: 5000,
        qualified: 700,
      });
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1400; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              legacy: Math.floor(easeProgress * 15),
              mentored: Math.floor(easeProgress * 5000),
              qualified: Math.floor(easeProgress * 700),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                legacy: 15,
                mentored: 5000,
                qualified: 700,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="proof-band"
      ref={sectionRef}
      aria-label="Verified Institutional Proof & Academic Track Record"
      className="w-full bg-[#123E73] text-white border-y border-blue-900/60 py-6 sm:py-7 relative overflow-hidden select-none shadow-md z-10"
    >
      {/* Subtle Ambient Radial Lighting for Depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <Container size="xl" className="relative z-10">
        {/* Connected Horizontal Composition: Desktop 4 in one row, Mobile 2x2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
          {TRUST_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const isCount = !metric.isTextValue;
            const countVal = counts[metric.id] ?? 0;

            return (
              <div
                key={metric.id}
                className={cn(
                  "py-4 sm:py-3 px-3 sm:px-6 flex items-center gap-3.5 sm:gap-4 transition-transform duration-200 hover:-translate-y-0.5",
                  idx % 2 === 0 ? "pr-3 sm:pr-6" : "pl-3 sm:pl-6",
                  idx >= 2 ? "pt-4 sm:pt-3" : ""
                )}
              >
                {/* Minimal Icon Container */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8A00] flex items-center justify-center shrink-0 shadow-2xs"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 text-[#FF8A00] stroke-[2.2]" />
                </div>

                {/* Metric Content */}
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight text-white leading-tight font-display">
                    {isCount ? (
                      <>
                        <span>{countVal}</span>
                        <span className="text-[#FF8A00]">{metric.suffix}</span>
                      </>
                    ) : (
                      <span>{metric.textValue}</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-amber-300/95 tracking-wider leading-tight mt-0.5 truncate uppercase">
                    {metric.label}
                  </div>
                  <p className="hidden md:block text-[11px] text-blue-100/75 leading-tight mt-1 truncate">
                    {metric.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
