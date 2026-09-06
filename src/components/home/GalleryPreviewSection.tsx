import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, GalleryItem } from "@/data/homepage";
import { Building2, BookOpen, Trophy, ArrowRight, GraduationCap } from "lucide-react";

export const GalleryPreviewSection: React.FC = () => {
  const items: GalleryItem[] = HOMEPAGE_DATA.galleryItems;

  return (
    <Section variant="default" spacing="lg" id="gallery-preview" className="bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="primary" size="md">
              CAMPUS & LEARNING ENVIRONMENT
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
              Life at <span className="text-[var(--brand-primary)]">Emprise Academy</span>
            </h2>
            <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
              Explore our smart classrooms, self-study library, examination halls, and academic activities in Mathura.
            </Text>
          </div>

          <div className="shrink-0">
            <Link href="/gallery">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>

        {/* Gallery Preview Grid (Clean White Type A Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((item, idx) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col"
            >
              {/* Graphic/Visual Box with Light Neutral Surface */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-br from-slate-50 to-blue-50/60 p-5 flex flex-col justify-between border-b border-slate-100 overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[var(--brand-primary)] px-2.5 py-1 rounded-md border border-[var(--brand-border)] shadow-2xs">
                    {item.category}
                  </span>

                  <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {idx % 3 === 0 && <Building2 className="w-4 h-4" />}
                    {idx % 3 === 1 && <BookOpen className="w-4 h-4" />}
                    {idx % 3 === 2 && <Trophy className="w-4 h-4" />}
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-base font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                  {item.caption}
                </p>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[var(--brand-primary)]">
                  <span className="text-slate-400 font-normal">Mathura Campus</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
