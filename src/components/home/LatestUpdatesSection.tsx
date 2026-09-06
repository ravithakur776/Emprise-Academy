import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { HOMEPAGE_DATA, LatestUpdateItem } from "@/data/homepage";
import { Calendar, ArrowRight } from "lucide-react";

export const LatestUpdatesSection: React.FC = () => {
  const updates: LatestUpdateItem[] = HOMEPAGE_DATA.latestUpdates;

  return (
    <Section variant="default" spacing="lg" id="latest-updates" className="bg-[var(--brand-background)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            OFFICIAL NOTICES & BULLETINS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            Official <span className="text-[var(--brand-primary)]">Latest Updates</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            Keep track of official examination schedules, admission dates, and academic notifications in Mathura.
          </Text>
        </div>

        {/* Updates 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((update) => (
            <div
              key={update.id}
              className="p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Header with Date & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                    {update.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{update.date}</span>
                  </div>
                </div>

                {/* Title & Preview */}
                <div>
                  <h3 className="text-base font-bold text-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-xs text-[var(--brand-text-secondary)] mt-2 leading-relaxed">
                    {update.preview}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href={update.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] transition-colors group"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
