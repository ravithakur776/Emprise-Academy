"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Newspaper } from "lucide-react";
import { MediaItem } from "@/data/media";

export interface MediaLightboxProps {
  isOpen: boolean;
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when switching images or closing
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  const prevItem = useCallback(() => {
    if (items.length === 0) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const nextItem = useCallback(() => {
    if (items.length === 0) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevItem();
      } else if (e.key === "ArrowRight") {
        nextItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, prevItem, nextItem]);

  // Mobile Touch / Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextItem();
    } else if (diff < -45) {
      prevItem();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Emprise Academy press coverage full-screen viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/92 backdrop-blur-md select-none animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <div
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Position Counter & Institutional Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider text-slate-200 shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-amber-300" />
            <span>PRESS COVERAGE</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider text-slate-200">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        {/* Action Controls: Zoom Toggle + Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? "Zoom out to normal view" : "Zoom in to read newspaper text"}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            title={isZoomed ? "Zoom out" : "Zoom in to read text"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close press coverage viewer (Escape)"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevItem();
        }}
        aria-label="Previous press coverage (Left Arrow)"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Stage */}
      <div
        className={`relative max-w-[94vw] max-h-[84vh] flex items-center justify-center p-2 z-10 transition-transform duration-200 overflow-auto ${
          isZoomed ? "scale-125 cursor-zoom-out" : "cursor-default"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isZoomed) setIsZoomed(false);
        }}
      >
        <Image
          src={currentItem.src}
          alt={currentItem.alt}
          width={currentItem.width}
          height={currentItem.height}
          unoptimized
          priority
          quality={100}
          className="max-w-[92vw] max-h-[82vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
        />
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextItem();
        }}
        aria-label="Next press coverage (Right Arrow)"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
