"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { Badge } from "@/components/ui/badge/Badge";
import { ResultArtwork } from "@/data/results-gallery";
import { Maximize2, BookOpen, Quote, ArrowRight } from "lucide-react";

export interface BeyondTheRankSectionProps {
  stories: ResultArtwork[];
  onOpenLightbox: (item: ResultArtwork) => void;
}

export const BeyondTheRankSection: React.FC<BeyondTheRankSectionProps> = ({
  stories,
  onOpenLightbox,
}) => {
  if (stories.length === 0) return null;

  return (
    <section id="stories" className="py-20 bg-slate-900 text-white scroll-mt-24">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="gold" size="sm" className="bg-amber-400/20 text-amber-300 border border-amber-400/30">
            TRANSFORMATIVE JOURNEYS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Beyond The Rank
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Real handwritten reflections and inspiring student stories. Discover how disciplined classroom mentorship and dedicated faculty guidance turned aspirations into national top ranks.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              onClick={() => onOpenLightbox(story)}
              className="group cursor-pointer bg-slate-800/80 rounded-3xl border border-slate-700/80 hover:border-amber-400/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
              tabIndex={0}
              role="button"
              aria-label={`View student story artwork: ${story.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenLightbox(story);
                }
              }}
            >
              {/* Image Frame */}
              <div className="relative bg-slate-950 p-4 sm:p-6 flex items-center justify-center min-h-[420px] sm:min-h-[500px] border-b border-slate-700/60 overflow-hidden">
                <Image
                  src={story.displayImage}
                  alt={story.alt}
                  width={story.width}
                  height={story.height}
                  loading="lazy"
                  className="w-full max-h-[480px] object-contain rounded-xl group-hover:scale-[1.015] transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-xl border border-slate-700">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Read Full Story & Letter
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {story.examLabel}
                    </span>
                    {story.year && (
                      <span className="text-xs text-slate-400 font-medium">
                        Batch {story.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {story.title}
                  </h3>

                  <p className="text-sm font-semibold text-amber-400 mt-1 line-clamp-1">
                    {story.keyHighlight}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors">
                    Click to Open Handwritten Creative
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Authentic Archive
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
