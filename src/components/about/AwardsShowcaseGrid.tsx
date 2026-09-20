"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AwardEntry } from "@/types/awards";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Building2,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Award as AwardIcon,
} from "lucide-react";

interface AwardsShowcaseGridProps {
  awards: AwardEntry[];
}

export const AwardsShowcaseGrid: React.FC<AwardsShowcaseGridProps> = ({ awards }) => {
  const [selectedAward, setSelectedAward] = useState<AwardEntry | null>(null);

  const currentIndex = selectedAward
    ? awards.findIndex((a) => a.id === selectedAward.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < awards.length - 1) {
      setSelectedAward(awards[currentIndex + 1]);
    } else {
      setSelectedAward(awards[0]);
    }
  }, [currentIndex, awards]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedAward(awards[currentIndex - 1]);
    } else {
      setSelectedAward(awards[awards.length - 1]);
    }
  }, [currentIndex, awards]);

  // Handle ESC and Arrow keys for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAward) return;
      if (e.key === "Escape") {
        setSelectedAward(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAward, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAward) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedAward]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((award) => (
          <div
            key={award.id}
            className="group relative bg-white rounded-3xl border border-[#E3EAF3] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Highlight Accent Strip */}
            <div className="h-1.5 w-full bg-linear-to-r from-[var(--brand-primary)] via-[#1769E0] to-[#FF8A00]" />

            <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[var(--brand-primary)] text-xs font-mono font-bold border border-blue-100">
                      <Trophy className="w-3 h-3 text-[#FF8A00]" />
                      AWARD {award.number}
                    </span>
                    {award.category ? (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        {award.category}
                      </span>
                    ) : null}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    {award.year}
                  </span>
                </div>

                {/* Award Photograph / Certificate Container */}
                {award.image ? (
                  <div
                    onClick={() => setSelectedAward(award)}
                    className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 cursor-pointer group/img shadow-2xs"
                    role="button"
                    tabIndex={0}
                    aria-label={`View full photograph of ${award.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedAward(award);
                      }
                    }}
                  >
                    <Image
                      src={award.image}
                      alt={award.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.04]",
                        award.imagePosition || "object-center"
                      )}
                      priority={award.id <= 2}
                    />

                    {/* Hover Zoom Prompt Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                      <span className="text-xs font-medium bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        Click to view high-res
                      </span>
                      <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Title & Institutional Details */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#14213D] leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                    {award.name}
                  </h3>

                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[var(--brand-primary)] flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{award.organization}</span>
                    </p>

                    {award.location ? (
                      <p className="text-slate-500 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{award.location}</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Citation & Official Description */}
                <p className="text-sm text-[#475467] leading-relaxed pt-1">
                  {award.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedAward(award)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:text-[#FF8A00] transition-colors py-1 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  View Full Photograph
                </button>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  Verified Archive #{award.number}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Resolution Certificate & Photograph Lightbox Modal */}
      {selectedAward ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="award-modal-title"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center text-white shrink-0">
                  <AwardIcon className="w-5 h-5 text-[#FF8A00]" />
                </div>
                <div className="truncate">
                  <h4 id="award-modal-title" className="text-base sm:text-lg font-bold text-white truncate">
                    {selectedAward.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {selectedAward.organization} • {selectedAward.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-slate-400 mr-2 hidden sm:inline">
                  {currentIndex + 1} of {awards.length}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 min-h-[280px] sm:min-h-[440px] max-h-[60vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <Image
                src={selectedAward.image}
                alt={selectedAward.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors cursor-pointer border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous award"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors cursor-pointer border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next award"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Citation Details */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[var(--brand-primary)]">
                  {selectedAward.organization}
                </span>
                {selectedAward.location ? (
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedAward.location}
                  </span>
                ) : null}
              </div>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                {selectedAward.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
