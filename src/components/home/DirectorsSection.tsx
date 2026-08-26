import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { GraduationCap, Briefcase, Award, ArrowRight, Quote } from "lucide-react";

export const DirectorsSection: React.FC = () => {
  const { directors } = HOMEPAGE_DATA;

  return (
    <Section variant="surface" spacing="lg">
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

        {/* Directors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {directors.map((director) => (
            <div
              key={director.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Director Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-[var(--brand-primary)] shadow-2xs">
                    <GraduationCap className="w-8 h-8 opacity-70" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                      {director.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-1">
                      {director.role}
                    </p>
                    <div className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>{director.qualification} ({director.institution})</span>
                    </div>
                  </div>
                </div>

                {/* Professional Highlights */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    Key Credentials & Experience
                  </span>
                  {director.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Message Quote */}
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[var(--brand-accent)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  <Quote className="w-4 h-4 text-[var(--brand-accent)]/50 mb-1 inline mr-1" />
                  &ldquo;{director.messageSnippet}&rdquo;
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Full Directors Page */}
        <div className="text-center pt-4">
          <Link href="/directors">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Read Full Director Profiles & Academic Philosophy
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
