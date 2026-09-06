import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { getCanonicalDirectorsList } from "@/data/directors";
import { DirectorPhoto } from "@/components/directors/DirectorPhoto";
import { GraduationCap, Briefcase, ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const DirectorsSection: React.FC = () => {
  const directors = getCanonicalDirectorsList();

  return (
    <Section variant="default" spacing="lg" id="directors" className="bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            ACADEMIC LEADERSHIP
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            Meet the <span className="text-[var(--brand-primary)]">Directors</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            Academic Excellence. Global Exposure. 15+ Years of Teaching & Mentorship.
          </Text>
        </div>

        {/* Dual Director Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {directors.map((director, idx) => (
            <div
              key={director.id}
              className={cn(
                "p-6 sm:p-8 rounded-3xl bg-white border border-[var(--brand-border)] shadow-xs transition-all duration-300 flex flex-col justify-between group",
                "hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-primary)]/40"
              )}
            >
              <div className="space-y-5 text-left">
                {/* Director Header */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
                    <DirectorPhoto
                      photoUrl={director.photoUrl}
                      name={director.name}
                      designation={director.designation}
                      aspectRatio="square"
                      className="w-20 h-20 sm:w-24 sm:h-24 !rounded-2xl shadow-sm border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <Badge variant={idx === 0 ? "primary" : "accent"} size="sm" className="mb-0.5">
                      {idx === 0 ? "Founding Director" : "Mathematics Mentor"}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {director.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--brand-accent)]">
                      {director.designation}
                    </p>
                    <div className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>{director.qualification} ({director.institution})</span>
                    </div>
                  </div>
                </div>

                {/* Professional Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[var(--brand-primary-dark)] uppercase tracking-wider block">
                    Key Background Highlights
                  </span>
                  {director.professionalJourney.slice(0, 3).map((item, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">{item.companyOrContext}:</strong> {item.roleSummary}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Director Quote */}
                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-l-[var(--brand-primary)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  <Quote className="w-4 h-4 text-[var(--brand-primary)]/40 mb-1 inline mr-1" />
                  &ldquo;{director.quote}&rdquo;
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/directors/${director.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[11px] text-slate-400">Mathura Campus Faculty</span>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Leadership CTA */}
        <div className="text-center">
          <Link href="/directors">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Complete Academic Leadership
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
