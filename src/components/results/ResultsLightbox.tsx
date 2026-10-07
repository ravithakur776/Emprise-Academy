"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ResultArtwork } from "@/data/results-gallery";
import { X, ChevronLeft, ChevronRight, Maximize2, Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge/Badge";

export interface ResultsLightboxProps {
  isOpen: boolean;
  activeItem: ResultArtwork | null;
  items: ResultArtwork[];
  onClose: () => void;
  onSelect: (item: ResultArtwork) => void;
}

export const ResultsLightbox: React.FC<ResultsLightboxProps> = ({
  isOpen,
  activeItem,
  items,
  onClose,
  onSelect,
}) => {
  const touchStartX = useRef<number | null>(null);

  const currentIndex = activeItem
    ? items.findIndex((it) => it.id === activeItem.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else if (items.length > 0) {
      onSelect(items[items.length - 1]);
    }
  }, [currentIndex, items, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else if (items.length > 0) {
      onSelect(items[0]);
    }
  }, [currentIndex, items, onSelect]);

  // Keyboard navigation (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!isOpen || !activeItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Result Artwork Fullscreen Viewer"
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 transition-all duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Controls */}
      <div
        className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            RESULT {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-slate-300 border-slate-700">
            {activeItem.examLabel}
          </Badge>
          {activeItem.year && (
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Batch {activeItem.year}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Close fullscreen result viewer"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center border border-slate-700 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center my-2 max-h-[78vh] sm:max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous result artwork"
          className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center border border-slate-700 shadow-xl transition cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Full Artwork Image */}
        <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-3">
          <Image
            src={activeItem.fullImage}
            alt={activeItem.alt}
            width={activeItem.width}
            height={activeItem.height}
            priority
            className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-[94vw] object-contain rounded-xl shadow-2xl transition-transform duration-200"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next result artwork"
          className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center border border-slate-700 shadow-xl transition cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        className="w-full max-w-4xl mx-auto text-center px-4 py-2 bg-slate-900/70 border border-slate-800/80 rounded-2xl backdrop-blur-sm z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="text-left">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
              {activeItem.title}
            </h3>
            <p className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mt-0.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {activeItem.keyHighlight}
            </p>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block text-right max-w-md line-clamp-1">
            {activeItem.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
