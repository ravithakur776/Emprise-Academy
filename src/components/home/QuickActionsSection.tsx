import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { HOMEPAGE_DATA, QuickActionItem } from "@/data/homepage";
import {
  Trophy,
  GraduationCap,
  User,
  Award,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  Trophy: Trophy,
  GraduationCap: GraduationCap,
  User: User,
  Award: Award,
  PhoneCall: PhoneCall,
};

export const QuickActionsSection: React.FC = () => {
  const actions: QuickActionItem[] = HOMEPAGE_DATA.quickActions;

  return (
    <section className="relative pt-6 sm:pt-8 pb-8 sm:pb-12 bg-white sm:bg-transparent">
      <Container size="xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {actions.map((action) => {
            const Icon = iconMap[action.iconName as keyof typeof iconMap] || Trophy;

            return (
              <Link
                key={action.id}
                href={action.href}
                className={cn(
                  "group relative p-4 sm:p-5 rounded-2xl bg-white border border-[var(--brand-border)] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between overflow-hidden",
                  action.highlight
                    ? "border-[var(--brand-primary)]/40 ring-1 ring-[var(--brand-primary)]/20"
                    : "hover:border-[var(--brand-primary)]/40"
                )}
              >
                {/* Accent Top Bar on Highlight */}
                {action.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-accent)]" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors shrink-0",
                      action.highlight
                        ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
                        : "bg-slate-100 text-slate-700 group-hover:bg-[var(--brand-primary-soft)] group-hover:text-[var(--brand-primary)]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[var(--brand-primary)] uppercase tracking-wider">
                    {action.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors flex items-center justify-between">
                    <span>{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[var(--brand-primary)] shrink-0" />
                  </h3>
                  <p className="text-[11px] text-[var(--brand-text-secondary)] mt-0.5 truncate">
                    {action.sublabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
