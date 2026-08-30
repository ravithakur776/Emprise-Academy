import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { getCanonicalDirectorsList } from "@/data/directors";
import { DirectorPhoto } from "@/components/directors/DirectorPhoto";
import { GraduationCap, Briefcase, ArrowRight, Quote } from "lucide-react";

export const DirectorsSection: React.FC = () => {
  const directors = getCanonicalDirectorsList();

  return (
    <Section variant="surface" spacing="lg" id="directors">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="gold" size="md">
            ACADEMIC LEADERSHIP
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Meet the Directors
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Led by engineering graduates from the University of Derby (UK) with rich industrial experience at Ford & Rolls-Royce and extensive Kota coaching mentorship.
          </Text>
        </div>

        {/* Dual Director Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {directors.map((director, idx) => (
            <div
              key={director.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Director Header */}
                <div className="flex items-start gap-4">
                  <DirectorPhoto
                    photoUrl={director.photoUrl}
                    name={director.name}
                    designation={director.designation}
                    aspectRatio="square"
                    className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 !rounded-2xl"
                  />

                  <div className="space-y-1">
                    <Badge variant={idx === 0 ? "primary" : "accent"} size="sm" className="mb-0.5">
                      {idx === 0 ? "Founding Director" : "Mathematics Mentor"}
                    </Badge>
                    <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                      {director.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--brand-accent)]">
                      {director.designation}
                    </p>
                    <div className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>{director.qualification} ({director.institution})</span>
                    </div>
                  </div>
                </div>

                {/* Professional Highlights from Canonical Data */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Key Background Highlights
                  </span>
                  {director.professionalJourney.slice(0, 3).map((item, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">{item.companyOrContext}:</strong> {item.roleSummary}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Director Quote */}
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[var(--brand-accent)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  <Quote className="w-4 h-4 text-[var(--brand-accent)]/50 mb-1 inline mr-1" />
                  &ldquo;{director.quote}&rdquo;
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/directors/${director.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent)] hover:underline"
                >
                  <span>Read Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Main Directors Page */}
        <div className="text-center pt-4">
          <Link href="/directors">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Meet Our Directors →
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
