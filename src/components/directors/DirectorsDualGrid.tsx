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
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";

export const DirectorsDualGrid: React.FC = () => {
  const directors = getCanonicalDirectorsList();

  return (
    <Section variant="default" spacing="lg" id="leadership">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            FOUNDING DIRECTORS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            The Academic Leadership of Emprise Academy
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Combining international engineering rigor from the University of Derby (UK) with premier Indian competitive coaching experience.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {directors.map((dir, idx) => (
            <div
              key={dir.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:shadow-xl"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  idx === 0 ? "bg-[var(--brand-primary)]" : "bg-[var(--brand-accent)]"
                }`}
              />

              <div className="space-y-6">
                {/* Director Header: Photo Placeholder & Identity */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6">
                  <DirectorPhoto
                    photoUrl={dir.photoUrl}
                    name={dir.name}
                    designation={dir.designation}
                    aspectRatio="square"
                    className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 !rounded-2xl"
                  />

                  <div className="space-y-1">
                    <Badge variant={idx === 0 ? "primary" : "accent"} size="sm" className="mb-1">
                      {idx === 0 ? "Academic Entrepreneur" : "Mathematics Mentor"}
                    </Badge>
                    <h3 className="text-2xl font-bold text-[var(--brand-primary)] tracking-tight">
                      {dir.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--brand-accent)]">
                      {dir.designation}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dir.qualification} • {dir.institution}</span>
                    </p>
                  </div>
                </div>

                {/* Director Perspective Quote */}
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[var(--brand-accent)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{dir.quote}&rdquo;
                </div>

                {/* Verified Professional Background Highlights */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Professional Journey & Pedagogy
                  </span>
                  {dir.professionalJourney.slice(0, 3).map((item, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800">{item.companyOrContext}: </span>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/directors/${dir.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors group"
                >
                  <span>Read Full Profile →</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
