"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA, LatestUpdateItem } from "@/data/homepage";
import { ArrowRight, Bell, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const LatestUpdatesSection: React.FC = () => {
  const updates: LatestUpdateItem[] = HOMEPAGE_DATA.latestUpdates;

  return (
    <section
      id="updates"
      aria-label="Official Institutional Notices and Bulletins"
      className="w-full bg-[#F8FAFC] py-14 sm:py-18 lg:py-20 border-y border-[var(--brand-border)] select-none"
    >
      {/* Anchor compatibility for existing #latest-updates links */}
      <div id="latest-updates" className="scroll-mt-24" />
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                <Bell className="w-3.5 h-3.5 mr-1 text-[var(--brand-accent)]" />
                OFFICIAL NOTICES &amp; BULLETINS
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight leading-tight">
              Latest From <span className="text-[#1769E0]">Emprise</span>
            </h2>

            <p className="text-sm sm:text-base text-[#667085] font-normal leading-relaxed">
              Official academic notifications, examination schedules, and admission notices from the Mathura campus.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/etse-2026"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1769E0] hover:text-[#123E73] transition-colors group"
            >
              <span>View All Academy Announcements</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Compact Institutional Newsroom Feed */}
        <div className="rounded-3xl bg-white border border-[#E3EAF3] shadow-xs divide-y divide-slate-100 overflow-hidden">
          {updates.map((update, idx) => {
            // Format date badge
            const isDateNumber = update.date.includes("27 Sep");
            const topDate = isDateNumber ? "27 SEP" : update.date.split(" ")[0] || "NOTICE";
            const bottomDate = isDateNumber ? "2026" : update.date.split(" ").slice(1).join(" ") || "UPDATE";

            return (
              <Link
                key={update.id || idx}
                href={update.href}
                className="group p-5 sm:p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:bg-slate-50/80 transition-colors text-left"
              >
                {/* Left: Date Badge + Content */}
                <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
                  {/* High-Visibility Date Block */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#123E73] to-[#0B2748] text-white flex flex-col items-center justify-center shrink-0 shadow-xs border border-blue-900/40 group-hover:from-[#1769E0] group-hover:to-[#123E73] transition-colors">
                    <span className="text-xs sm:text-sm font-black tracking-wider text-amber-300 font-mono">
                      {topDate}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-200 mt-0.5 tracking-tight uppercase">
                      {bottomDate}
                    </span>
                  </div>

                  {/* Headline & Preview */}
                  <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1769E0] bg-[#EEF5FF] px-2.5 py-0.5 rounded-md border border-blue-200/60 font-mono">
                        {update.category}
                      </span>
                      {update.isImportant && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          <span>Important</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#14213D] group-hover:text-[#1769E0] transition-colors leading-snug">
                      {update.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#667085] leading-relaxed line-clamp-2 sm:line-clamp-1">
                      {update.preview}
                    </p>
                  </div>
                </div>

                {/* Right: Read Notice Arrow Action */}
                <div className="flex items-center gap-2 shrink-0 md:pl-4 self-end md:self-center">
                  <span className="text-xs font-bold text-[#1769E0] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                    Read Notice
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#1769E0] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
