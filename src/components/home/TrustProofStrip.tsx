import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { Award, Users, CheckCircle2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

interface TrustMetricItem {
  id: string;
  value?: string | number;
  suffix?: string;
  isTextValue?: boolean;
  textValue?: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRUST_METRICS: TrustMetricItem[] = [
  {
    id: "legacy",
    value: CANONICAL_BUSINESS_CONFIG.legacy_years || 15,
    suffix: "+ Years",
    label: "OF ACADEMIC EXCELLENCE",
    sublabel: "Mentoring students in Mathura since 2011",
    icon: Award,
  },
  {
    id: "mentored",
    value: "5000",
    suffix: "+",
    label: "STUDENTS MENTORED",
    sublabel: "Personalised care & concept coaching",
    icon: Users,
  },
  {
    id: "qualified",
    value: "700",
    suffix: "+",
    label: "STUDENTS QUALIFIED",
    sublabel: "Proven selections across JEE & NEET",
    icon: CheckCircle2,
  },
  {
    id: "faculty",
    isTextValue: true,
    textValue: CANONICAL_BUSINESS_CONFIG.faculty_headline || "IITians & Doctors",
    label: "FACULTY",
    sublabel: "Director-led core classroom mentorship",
    icon: GraduationCap,
  },
];

/**
 * TrustProofStrip Component (Server-Side Rendered)
 *
 * Statically renders verified institutional proof metrics into initial HTML.
 * Guarantees Googlebot and all search crawlers immediately receive:
 * - 15+ Years of Academic Excellence
 * - 5000+ Students Mentored
 * - 700+ Students Qualified
 * - IITians & Doctors Faculty
 *
 * Eliminates client-side counter initialization at 0.
 */
export const TrustProofStrip: React.FC = () => {
  return (
    <section
      id="proof-band"
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
                        <span>{metric.value}</span>
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
