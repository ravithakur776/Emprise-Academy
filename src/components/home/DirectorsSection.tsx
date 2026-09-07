import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { getCanonicalDirectorsList } from "@/data/directors";
import { DirectorPhoto } from "@/components/directors/DirectorPhoto";
import { GraduationCap, Briefcase, Award, ArrowRight, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const DirectorsSection: React.FC = () => {
  const directors = getCanonicalDirectorsList();

  return (
    <Section variant="default" spacing="lg" id="directors" className="bg-[#F8FAFC] border-y border-[var(--brand-border)]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="primary" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--brand-accent)]" />
              ACADEMIC LEADERSHIP
            </Badge>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2748] tracking-tight">
            Meet the <span className="text-[var(--brand-primary)]">Directors</span>
          </h2>

          <Text variant="body-large" color="secondary" className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Academic leadership built on engineering expertise, industry experience, and a deep commitment to student growth.
          </Text>
        </div>

        {/* Dual Director Cards (50 / 50 Desktop Grid, Stacked on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {directors.map((director) => (
            <div
              key={director.id}
              className={cn(
                "p-6 sm:p-8 rounded-3xl bg-white border border-[var(--brand-border)] shadow-xs transition-all duration-300 flex flex-col justify-between group text-left",
                "hover:-translate-y-1 hover:shadow-md hover:border-[var(--brand-primary)]/40"
              )}
            >
              <div className="space-y-5">
                {/* 1. Director Header: Photo, Name, Role Badge, Title & Education */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                  <div className="transition-transform duration-300 group-hover:scale-[1.02] shrink-0">
                    <DirectorPhoto
                      photoUrl={director.photoUrl}
                      name={director.name}
                      designation={director.designation}
                      aspectRatio="square"
                      className="w-20 h-20 sm:w-24 sm:h-24 !rounded-2xl shadow-xs border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] px-2.5 py-0.5 rounded-full border border-[var(--brand-primary)]/20">
                        Co-Founder & Director
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B2748] group-hover:text-[var(--brand-primary)] transition-colors leading-tight">
                      {director.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[var(--brand-accent)]">
                      {director.designation}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">
                        {director.qualification}, {director.institution}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Key Background Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-[var(--brand-border)]">
                  <span className="text-xs font-bold text-[#123E73] uppercase tracking-wider block">
                    KEY BACKGROUND HIGHLIGHTS
                  </span>

                  <div className="space-y-2">
                    {director.professionalJourney.slice(0, 3).map((item, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                        {pIdx === 0 && <GraduationCap className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />}
                        {pIdx === 1 && <Briefcase className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />}
                        {pIdx === 2 && <Award className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />}
                        <span>
                          <strong className="text-slate-900 font-semibold">{item.companyOrContext}</strong> — {item.roleSummary}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Leadership Quote Panel */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--brand-primary-soft)]/40 border-l-4 border-l-[var(--brand-primary)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  <Quote className="w-4 h-4 text-[var(--brand-primary)]/50 mb-1 inline mr-1.5 shrink-0 not-italic" />
                  &ldquo;{director.quote}&rdquo;
                </div>
              </div>

              {/* 4. Bottom Card Footer Row */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/directors/${director.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] group-hover:translate-x-0.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                >
                  <span>Read Full Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <span className="text-[11px] font-medium text-slate-400">
                  Mathura Campus
                </span>
              </div>
            </div>
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
