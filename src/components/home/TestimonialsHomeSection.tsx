"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_REVIEWS, HomepageReviewItem } from "@/data/testimonials";
import { ReviewCard, renderHighlightedText } from "./ReviewCard";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewCategory = "JEE" | "NEET";

export const TestimonialsHomeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("JEE");
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] =
    useState<HomepageReviewItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reviews: HomepageReviewItem[] =
    activeCategory === "JEE" ? HOMEPAGE_REVIEWS.jee : HOMEPAGE_REVIEWS.neet;
  const totalReviews = reviews.length;

  const handleNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Handle Category Switching
  const handleCategoryChange = (category: ReviewCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setStartIndex(0);
    }
  };

  // Autoplay Timer (5.5s) with pause on hover/focus/touch/reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;
    }

    if (isPaused || selectedStory !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, selectedStory, handleNext]);

  // Keyboard accessibility for Story Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStory) {
        setSelectedStory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStory]);

  // Calculate story progress percentage
  const progressPercent = ((startIndex + 1) / totalReviews) * 100;

  // Calculate the 3 visible reviews in circular sequence
  const visibleIndices = [
    startIndex,
    (startIndex + 1) % totalReviews,
    (startIndex + 2) % totalReviews,
  ];

  return (
    <Section
      variant="default"
      spacing="lg"
      id="testimonials"
      className="bg-[#EEF5FF] border-y border-[#D8E4F2] relative overflow-hidden select-none py-16 sm:py-20 lg:py-24"
    >
      {/* Restrained Academic Background Pattern & Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1769E0_1px,transparent_1px)] [background-size:24px_24px]" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="primary" size="md">
              STUDENT & PARENT VOICES
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
              Real Experiences at{" "}
              <span className="text-[var(--brand-primary)]">Emprise</span>
            </h2>
            <Text
              variant="body-large"
              color="secondary"
              className="text-sm sm:text-base text-[#475569]"
            >
              Reflections from students and parents on classroom discipline, faculty dedication, and academic mentorship in Mathura.
            </Text>
          </div>

          <div className="shrink-0">
            <Link href="/testimonials">
              <Button
                variant="secondary"
                size="md"
                className="bg-white border-[#D8E4F2] text-[#14213D] hover:bg-blue-50 font-bold shadow-xs"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            role="tablist"
            aria-label="Review Categories"
            className="inline-flex p-1.5 rounded-2xl bg-white border border-[#D8E4F2] shadow-xs gap-1.5"
          >
            <button
              type="button"
              role="tab"
              id="tab-jee"
              aria-selected={activeCategory === "JEE"}
              aria-controls="panel-reviews"
              tabIndex={0}
              onClick={() => handleCategoryChange("JEE")}
              className={cn(
                "relative min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]",
                activeCategory === "JEE"
                  ? "bg-[#1769E0] text-white shadow-sm"
                  : "bg-white text-[#14213D] hover:bg-[#EEF5FF] border border-transparent"
              )}
            >
              <span>JEE STUDENTS</span>
              {activeCategory === "JEE" && (
                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#FF8A00] rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>

            <button
              type="button"
              role="tab"
              id="tab-neet"
              aria-selected={activeCategory === "NEET"}
              aria-controls="panel-reviews"
              tabIndex={0}
              onClick={() => handleCategoryChange("NEET")}
              className={cn(
                "relative min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]",
                activeCategory === "NEET"
                  ? "bg-[#0E4435] text-white shadow-sm"
                  : "bg-white text-[#14213D] hover:bg-[#EEF5FF] border border-transparent"
              )}
            >
              <span>NEET STUDENTS</span>
              {activeCategory === "NEET" && (
                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#10B981] rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Interactive 3-Card Carousel Grid Container */}
        <div
          id="panel-reviews"
          role="region"
          aria-label="Student Reviews Carousel"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              handlePrev();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              handleNext();
            }
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0] rounded-3xl"
        >
          {/* Multi-Card Grid: 1 on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {visibleIndices.map((idx, pos) => {
              const review = reviews[idx];
              return (
                <div
                  key={`${activeCategory}-${review.id}-${pos}`}
                  className={cn(
                    "flex flex-col h-full",
                    pos === 2 ? "hidden lg:flex" : "",
                    pos === 1 ? "hidden md:flex" : ""
                  )}
                >
                  <ReviewCard
                    review={review}
                    activeNumber={String(idx + 1).padStart(2, "0")}
                    onOpenStory={(rev) => setSelectedStory(rev)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls, Counter & Horizontal Progress Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#D8E4F2]">
          {/* Subtle Category Status */}
          <div className="text-xs font-bold uppercase tracking-widest text-[#667085] hidden sm:block">
            {activeCategory === "JEE" ? "Engineering Aspirants" : "Medical Aspirants"} • {totalReviews} Student Reviews
          </div>

          {/* Center: Horizontal Progress Bar + 01 / 06 Counter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D8E4F2] shadow-2xs">
              <span className="text-xs sm:text-sm font-extrabold font-mono text-[#14213D]">
                {String(startIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-[#94A3B8]">/</span>
              <span className="text-xs sm:text-sm font-medium font-mono text-[#667085]">
                {String(totalReviews).padStart(2, "0")}
              </span>
            </div>

            {/* Horizontal Progress Line */}
            <div className="w-32 sm:w-48 h-2 bg-slate-200/80 rounded-full overflow-hidden relative">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out relative",
                  activeCategory === "JEE" ? "bg-[#1769E0]" : "bg-[#0E4435]"
                )}
                style={{ width: `${progressPercent}%` }}
              >
                {/* Accent Endpoint Dot */}
                <span
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
                    activeCategory === "JEE" ? "bg-[#FF8A00]" : "bg-[#10B981]"
                  )}
                />
              </div>
            </div>

            {/* Direct Jump Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {reviews.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  type="button"
                  onClick={() => setStartIndex(dotIdx)}
                  aria-label={`Go to review ${dotIdx + 1}`}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer",
                    dotIdx === startIndex
                      ? activeCategory === "JEE"
                        ? "bg-[#1769E0] scale-125 ring-2 ring-blue-200"
                        : "bg-[#0E4435] scale-125 ring-2 ring-emerald-200"
                      : "bg-slate-300 hover:bg-slate-400"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right: Circular Navigation Buttons (44x44px min touch target) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-11 h-11 min-h-[44px] rounded-full border border-[#D8E4F2] bg-white text-[#14213D] hover:bg-[#1769E0] hover:text-white hover:border-[#1769E0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-11 h-11 min-h-[44px] rounded-full border border-[#D8E4F2] bg-white text-[#14213D] hover:bg-[#1769E0] hover:text-white hover:border-[#1769E0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Accessible Full Story Modal Dialog */}
      {selectedStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-student-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className={cn(
              "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 text-left shadow-2xl border select-text",
              selectedStory.category === "JEE"
                ? "bg-gradient-to-br from-[#F0F6FF] via-[#E8F1FC] to-[#FFFFFF] text-slate-800 border-blue-200"
                : "bg-gradient-to-br from-[#F0FDF4] via-[#E6F8ED] to-[#FFFFFF] text-slate-800 border-emerald-200"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStory(null)}
              aria-label="Close story dialog"
              className="absolute top-5 right-5 w-10 h-10 min-h-[40px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Photo + Student Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200/80 pr-12">
              <div
                className={cn(
                  "p-0.5 rounded-full shrink-0 shadow-sm",
                  selectedStory.category === "JEE"
                    ? "bg-gradient-to-tr from-[#1769E0] to-[#FF8A00]"
                    : "bg-gradient-to-tr from-teal-400 to-amber-300"
                )}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-xs">
                  {selectedStory.image ? (
                    <Image
                      src={selectedStory.image}
                      alt={selectedStory.studentName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-700 text-lg">
                      {selectedStory.studentName[0]}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border shadow-2xs",
                      selectedStory.category === "JEE"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    )}
                  >
                    {selectedStory.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Classroom Alum</span>
                  </span>
                </div>

                <h3
                  id="modal-student-name"
                  className={cn(
                    "text-xl sm:text-2xl font-extrabold tracking-tight",
                    selectedStory.category === "JEE"
                      ? "text-[#14213D]"
                      : "text-[#064E3B]"
                  )}
                >
                  {selectedStory.studentName}
                </h3>

                <p
                  className={cn(
                    "text-xs sm:text-sm font-bold uppercase tracking-wider mt-0.5",
                    selectedStory.category === "JEE"
                      ? "text-[#B45309]"
                      : "text-[#047857]"
                  )}
                >
                  {selectedStory.institution}
                </p>
              </div>
            </div>

            {/* Full Story Content */}
            <div className="space-y-4 text-sm sm:text-base text-[#1E293B] leading-relaxed">
              <Quote
                className={cn(
                  "w-7 h-7 mb-2",
                  selectedStory.category === "JEE"
                    ? "text-[#FF8A00]"
                    : "text-emerald-600"
                )}
              />
              {selectedStory.paragraphs.map((para, pIdx) => (
                <p key={`full-para-${pIdx}`} className="leading-relaxed">
                  {renderHighlightedText(
                    para,
                    selectedStory.category === "JEE"
                  )}
                </p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Verified Emprise Academy Classroom Student</span>
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border shadow-2xs",
                  selectedStory.category === "JEE"
                    ? "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-200"
                    : "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-200"
                )}
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
