import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { GraduationCap, ArrowRight, BookOpen, Clock } from "lucide-react";

export const FacultyPreviewSection: React.FC = () => {
  const { facultyPreview } = HOMEPAGE_DATA;

  return (
    <Section variant="surface" spacing="lg" id="faculty">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="primary" size="md">
            EXPERT MENTORSHIP
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            Meet Our Faculty
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Experienced mentors guiding students through every stage of preparation with deep conceptual pedagogy and daily doubt resolution.
          </Text>
        </div>

        {/* Faculty Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {facultyPreview.map((faculty, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-200 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-[var(--brand-primary)]">
                  <GraduationCap className="w-7 h-7 opacity-70" />
                </div>

                <Badge variant="accent" size="sm" className="mb-2">
                  {faculty.subject} Department
                </Badge>

                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-1">
                  {faculty.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {faculty.role}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100 mb-4">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-muted)] shrink-0" />
                  <span>{faculty.experience}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Focus:</strong> {faculty.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="text-center pt-4">
          <Link href="/faculty">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Meet All Faculty Mentors
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
