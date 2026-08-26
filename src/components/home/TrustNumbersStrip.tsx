import React from "react";
import { Container } from "@/components/ui/layout/Container";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { ShieldCheck, Award, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const statIcons = [
  <ShieldCheck key="1" className="w-5 h-5 text-[var(--brand-accent)]" />,
  <Trophy key="2" className="w-5 h-5 text-amber-500" />,
  <Users key="3" className="w-5 h-5 text-blue-500" />,
  <Award key="4" className="w-5 h-5 text-emerald-500" />,
];

export const TrustNumbersStrip: React.FC = () => {
  const { trustMetrics } = HOMEPAGE_DATA;

  return (
    <section className="bg-white border-b border-[var(--brand-border)] py-8 sm:py-10">
      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustMetrics.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 sm:p-5 rounded-xl border transition-all duration-150 flex flex-col justify-between",
                stat.isVerified
                  ? "bg-slate-50/70 border-slate-200/80 hover:border-orange-200 hover:bg-orange-50/20"
                  : "bg-slate-50/40 border-dashed border-slate-200"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--brand-muted)]">
                  {stat.isVerified ? "Verified Track Record" : "Institutional Record"}
                </span>
                {statIcons[idx]}
              </div>

              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-primary)] tracking-tight mb-1">
                  {stat.value}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-[var(--brand-muted)] mt-1">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
