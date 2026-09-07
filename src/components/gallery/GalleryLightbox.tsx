"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/data/gallery";

export interface GalleryLightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, prevImage, nextImage]);

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
      nextImage();
    } else if (diff < -45) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  if (!currentImg) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Emprise Academy full-screen image gallery"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md select-none animate-fade-in"
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
        {/* Position Counter */}
        <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider text-slate-200">
          {currentIndex + 1} / {images.length}
        </span>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close image viewer (Escape)"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Previous image (Left Arrow)"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Stage */}
      <div
        className="relative max-w-[92vw] max-h-[82vh] flex items-center justify-center p-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImg.src}
          alt={currentImg.alt}
          width={currentImg.width}
          height={currentImg.height}
          unoptimized
          priority
          quality={100}
          className="max-w-[92vw] max-h-[82vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Next image (Right Arrow)"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Subtle Tagline */}
      <div
        className="absolute bottom-3 sm:bottom-6 left-0 right-0 text-center pointer-events-none px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs text-slate-300/80 font-medium">
          Emprise Academy • Mathura Campus Archive
        </p>
      </div>
    </div>
  );
};
