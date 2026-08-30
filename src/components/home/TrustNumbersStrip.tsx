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
    <section className="bg-linear-to-b from-white via-slate-50/50 to-white border-b border-[var(--brand-border)] py-8 sm:py-12 relative z-20">
      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustMetrics.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative overflow-hidden group",
                "bg-white border-slate-200/90 shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-300/80 hover:bg-linear-to-b hover:from-white hover:to-orange-50/20"
              )}
            >
              {/* Subtle Ambient Rim Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  {stat.isVerified ? "Verified Track Record" : "Institutional Record"}
                </span>
                <div className="w-9 h-9 rounded-xl bg-slate-100/80 group-hover:bg-white flex items-center justify-center shadow-xs transition-colors">
                  {statIcons[idx]}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--brand-primary)] tracking-tight mb-1 group-hover:text-[var(--brand-accent)] transition-colors">
                  {stat.value}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
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
