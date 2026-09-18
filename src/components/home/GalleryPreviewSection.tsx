"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  GalleryImage,
  OFFICIAL_GALLERY_IMAGES,
  HOMEPAGE_MARQUEE_ROW_1,
  HOMEPAGE_MARQUEE_ROW_2,
} from "@/data/gallery";
import { GalleryMarqueeRow } from "@/components/gallery/GalleryMarqueeRow";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

export const GalleryPreviewSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (img: GalleryImage) => {
    const idx = OFFICIAL_GALLERY_IMAGES.findIndex((item) => item.id === img.id);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <Section
      variant="default"
      spacing="lg"
      id="gallery"
      className="bg-[#EEF5FF]/60 border-y border-[#E3EAF3] overflow-hidden"
    >
      {/* Anchor compatibility for existing #gallery-preview links */}
      <div id="gallery-preview" className="scroll-mt-24" />
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--brand-accent)]" />
                CAMPUS • MEDIA • MEMORIES
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2748] tracking-tight">
              Gallery
            </h2>

            <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] font-normal leading-relaxed">
              Explore the moments, stories and achievements of Emprise Academy.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/gallery">
              <Button
                variant="secondary"
                size="md"
                className="font-bold border-[var(--brand-border)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary-soft)] text-[var(--brand-text)]"
                rightIcon={<ArrowRight className="w-4 h-4 text-[var(--brand-primary)]" />}
              >
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Two-Row Seamless Continuous Horizontal Marquee */}
      <div className="w-full space-y-3 sm:space-y-4">
        {/* ROW 1: Continuous Motion (Left to Right) */}
        <GalleryMarqueeRow
          images={HOMEPAGE_MARQUEE_ROW_1}
          direction="right"
          onImageClick={handleImageClick}
        />

        {/* ROW 2: Continuous Motion (Right to Left) */}
        <GalleryMarqueeRow
          images={HOMEPAGE_MARQUEE_ROW_2}
          direction="left"
          onImageClick={handleImageClick}
        />
      </div>

      {/* Bottom Center Secondary Button */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link href="/gallery">
          <Button
            variant="outline"
            size="md"
            className="font-semibold text-slate-700 hover:text-[var(--brand-primary)] border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 hover:bg-slate-50 transition-all shadow-2xs"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All 59 Campus Moments →
          </Button>
        </Link>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={OFFICIAL_GALLERY_IMAGES}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </Section>
  );
};
