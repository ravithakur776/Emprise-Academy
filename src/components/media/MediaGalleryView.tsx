"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Sparkles, Newspaper, Maximize2, Award, Calendar, FileText } from "lucide-react";
import { OFFICIAL_MEDIA_ITEMS, FEATURED_MEDIA_ITEMS, MediaItem } from "@/data/media";
import { MediaLightbox } from "@/components/media/MediaLightbox";

export const MediaGalleryView: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Primary featured clipping (widest, highest-res rank report)
  const primaryFeatured = FEATURED_MEDIA_ITEMS[0];
  const supportingFeatured = FEATURED_MEDIA_ITEMS.slice(1, 5);

  return (
    <div>
      {/* 1. PAGE HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0B2748] via-[#123E73] to-[#1769E0] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
            <span>MEDIA • PRESS • COVERAGE</span>
          </div>

          {/* Main Page Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Emprise Academy in the News
          </h1>

          {/* Factual Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
            Explore media coverage, press features, result highlights, student achievements, academic events and institutional moments from Emprise Academy.
          </p>

          {/* Collection Status Pill */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-400/30 text-xs text-blue-100 font-medium">
              <Newspaper className="w-3.5 h-3.5 text-amber-400" />
              <span>{OFFICIAL_MEDIA_ITEMS.length} Verified Media Clippings & Press Records</span>
            </span>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED COVERAGE SECTION (Editorial Layout) */}
      <Section variant="default" spacing="lg" className="bg-[#F8FAFC] border-b border-[#E3EAF3]">
        <Container size="xl">
          {/* Section Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                <Award className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Featured Coverage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2748] tracking-tight">
                Top Press Highlights
              </h2>
              <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)]">
                Prominent newspaper scans and high-resolution media publications covering Emprise Academy achievements.
              </p>
            </div>

            <p className="text-xs text-[var(--brand-text-secondary)] font-medium hidden sm:block">
              Click any clipping to inspect in full resolution
            </p>
          </div>

          {/* Editorial Asymmetrical Layout: 1 Dominant Card + 4 Supporting Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Primary Dominant Card (7 Cols on Desktop) */}
            {primaryFeatured && (
              <div className="lg:col-span-7">
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(0)}
                  aria-label={`Open primary featured coverage: ${primaryFeatured.alt}`}
                  className="group relative w-full h-full min-h-[360px] sm:min-h-[460px] flex flex-col justify-between bg-white rounded-2xl border border-[#E3EAF3] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                >
                  {/* Top Bar Label */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                      <span className="text-xs font-bold tracking-wider text-[#0B2748] uppercase">
                        Lead Newspaper Feature
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-[var(--brand-primary)] border border-blue-100">
                      High-Res Scan
                    </span>
                  </div>

                  {/* Clipping Stage (Uncropped) */}
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50/70 overflow-hidden">
                    <Image
                      src={primaryFeatured.src}
                      alt={primaryFeatured.alt}
                      width={primaryFeatured.width}
                      height={primaryFeatured.height}
                      priority
                      className="max-h-[380px] w-auto h-auto object-contain rounded-xl border border-slate-200/80 shadow-xs transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-4 sm:p-4.5 bg-white border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold text-[#14213D] group-hover:text-[var(--brand-primary)] transition-colors">
                        Press Clipping 001
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-primary)]">
                      <span>Expand</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* 4 Supporting Feature Cards (5 Cols on Desktop in 2x2 Grid) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {supportingFeatured.map((item, idx) => {
                const actualIndex = idx + 1;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleOpenLightbox(actualIndex)}
                    aria-label={`Open supporting coverage ${actualIndex + 1}: ${item.alt}`}
                    className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#E3EAF3] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                  >
                    <div className="p-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase">
                        Press Feature {String(actualIndex + 1).padStart(2, "0")}
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--brand-primary)] transition-colors" />
                    </div>

                    <div className="flex-1 flex items-center justify-center p-3 sm:p-4 bg-slate-50/40 min-h-[150px] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        priority
                        className="max-h-[160px] w-auto h-auto object-contain rounded-lg border border-slate-200/60 shadow-2xs transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#14213D] truncate group-hover:text-[var(--brand-primary)] transition-colors">
                        Media Record #{actualIndex + 1}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {item.orientation}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. PRESS COVERAGE ARCHIVE SECTION (Refined Editorial Masonry) */}
      <Section variant="default" spacing="lg" className="bg-white">
        <Container size="xl">
          {/* Archive Header & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E3EAF3] pb-5 mb-8 sm:mb-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-[#0B2748] tracking-tight">
                  Press Coverage Archive
                </h2>
                <p className="text-xs text-[var(--brand-text-secondary)]">
                  Browse media moments featuring Emprise Academy, its students, achievements and academic activities.
                </p>
              </div>
            </div>

            {/* All Coverage Filter & Count Pill */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] border border-blue-200/80 text-xs font-bold tracking-wide">
                All Coverage ({OFFICIAL_MEDIA_ITEMS.length})
              </span>
            </div>
          </div>

          {/* Responsive Editorial Masonry Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [&>div]:mb-4 sm:[&>div]:mb-5">
            {OFFICIAL_MEDIA_ITEMS.map((item: MediaItem, idx: number) => {
              // For small source images (< 400px width), cap maximum container display width
              const isSmallSource = item.width < 400;

              return (
                <div key={item.id} className="break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(idx)}
                    aria-label={`Open press clipping ${idx + 1}: ${item.alt}`}
                    className="group relative block w-full bg-white border border-[#E3EAF3] rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                  >
                    {/* Card Media Preview Area (Preserves Natural Proportions & Avoids Aggressive Upscaling) */}
                    <div className="w-full flex items-center justify-center bg-slate-50/70 p-3 sm:p-4 overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        style={{
                          maxWidth: isSmallSource ? `${item.width}px` : "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                        className="rounded-lg border border-slate-200/60 shadow-2xs transition-transform duration-400 ease-out group-hover:scale-[1.02] block"
                      />
                    </div>

                    {/* Bottom Metadata & Expand Bar */}
                    <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[11px] font-bold text-[#14213D] group-hover:text-[var(--brand-primary)] transition-colors truncate">
                          Coverage #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 group-hover:text-[var(--brand-primary)] transition-colors shrink-0">
                        <span>View</span>
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Subtle Overlay with Hover Action */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-between p-3">
                      <span className="text-[10px] font-semibold text-white/95 drop-shadow-xs">
                        Scan #{idx + 1}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. FULL-SCREEN LIGHTBOX MODAL */}
      <MediaLightbox
        isOpen={lightboxOpen}
        items={OFFICIAL_MEDIA_ITEMS}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setCurrentIndex(newIndex)}
      />
    </div>
  );
};
