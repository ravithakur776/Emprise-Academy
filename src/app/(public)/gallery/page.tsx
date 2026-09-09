"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Sparkles, Maximize2, Camera } from "lucide-react";
import { OFFICIAL_GALLERY_IMAGES, GalleryImage } from "@/data/gallery";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation Shell */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero Header (Clean Deep Institutional Visual) */}
        <section className="bg-gradient-to-b from-[#0B2748] via-[#123E73] to-[#1769E0] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>CAMPUS • MEDIA • MEMORIES • {OFFICIAL_GALLERY_IMAGES.length} PHOTOGRAPHS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Life at Emprise Academy
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Explore moments from Emprise Academy — achievements, events, students, campus life and memorable occasions.
            </p>
          </Container>
        </section>

        {/* Gallery Content Section (Direct Photo Gallery Display) */}
        <Section variant="default" spacing="lg" className="bg-white">
          <Container size="xl">
            {/* Photo Gallery Sub-Header & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--brand-border)] pb-5 mb-8 sm:mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B2748] tracking-tight">
                    Photo Gallery
                  </h2>
                  <p className="text-xs text-[var(--brand-text-secondary)]">
                    Showing all {OFFICIAL_GALLERY_IMAGES.length} verified campus photographs
                  </p>
                </div>
              </div>

              <p className="text-xs text-[var(--brand-text-secondary)] hidden sm:block font-medium">
                Click any photograph to view in full resolution
              </p>
            </div>

            {/* Masonry Responsive Layout Preserving Exact Native Aspect Ratios */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [&>div]:mb-4 sm:[&>div]:mb-5">
              {OFFICIAL_GALLERY_IMAGES.map((img: GalleryImage, idx: number) => (
                <div
                  key={img.id}
                  className="break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(idx)}
                    aria-label={`Open photo ${idx + 1}: ${img.alt}`}
                    className="group relative block w-full overflow-hidden rounded-2xl bg-slate-50 border border-[var(--brand-border)] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                    style={{
                      aspectRatio: `${img.aspectRatio}`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      priority={idx < 8}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] block"
                    />

                    {/* Subtle Overlay with Hover Action */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                      <span className="text-[11px] font-semibold text-white/90 drop-shadow-xs">
                        Photo {idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-xs">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      {/* Full-Screen Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={OFFICIAL_GALLERY_IMAGES}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />

      {/* Global Institutional Footer */}
      <Footer />

      {/* Mobile Fixed CTA Bar */}
      <MobileBottomCTA />
    </div>
  );
}
