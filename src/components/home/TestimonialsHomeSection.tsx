"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_REVIEWS, HomepageReviewItem } from "@/data/testimonials";
import { ReviewCard } from "./ReviewCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewCategory = "JEE" | "NEET";

export const TestimonialsHomeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("JEE");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reviews: HomepageReviewItem[] =
    activeCategory === "JEE" ? HOMEPAGE_REVIEWS.jee : HOMEPAGE_REVIEWS.neet;
  const totalReviews = reviews.length;

  const [itemsPerView, setItemsPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clone array to allow seamless horizontal sliding for multi-card viewports
  const extendedReviews = [...reviews, ...reviews];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Handle Category Switching
  const handleCategoryChange = (category: ReviewCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setCurrentIndex(0);
    }
  };

  // Autoplay Timer (5000ms, paused on hover/focus/reduced motion)
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;
    }

    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  return (
    <Section
      variant="default"
      spacing="lg"
      id="testimonials"
      className="bg-[var(--brand-background)] border-b border-[var(--brand-border)]/60"
    >
      <Container size="xl">
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
              className="text-sm sm:text-base"
            >
              Reflections from students and parents on classroom discipline, faculty dedication, and academic mentorship in Mathura.
            </Text>
          </div>

          <div className="shrink-0">
            <Link href="/testimonials">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>

        {/* Elegant Category Switcher */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            role="tablist"
            aria-label="Review Categories"
            className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E3EAF3] shadow-xs gap-1.5"
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
                "min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
                activeCategory === "JEE"
                  ? "bg-[var(--brand-primary)] text-white shadow-sm"
                  : "bg-white text-[#14213D] hover:bg-slate-50 border border-transparent"
              )}
            >
              JEE STUDENTS
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
                "min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
                activeCategory === "NEET"
                  ? "bg-[var(--brand-primary)] text-white shadow-sm"
                  : "bg-white text-[#14213D] hover:bg-slate-50 border border-transparent"
              )}
            >
              NEET STUDENTS
            </button>
          </div>
        </div>

        {/* Carousel Container */}
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
          className="relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] rounded-3xl"
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-350 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {extendedReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2.5 sm:px-3 flex"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls & Editorial Pagination */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#E3EAF3]/70">
          {/* Subtle Category Status */}
          <div className="text-xs font-bold uppercase tracking-widest text-[#667085] hidden sm:block">
            {activeCategory === "JEE" ? "Engineering Aspirants" : "Medical Aspirants"} • {totalReviews} Reviews
          </div>

          {/* Controls + 01 / 06 Editorial Counter */}
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full border border-[#E3EAF3] bg-white text-[#14213D] hover:bg-[var(--brand-primary-soft)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Editorial Counter Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E3EAF3] shadow-2xs">
              <span className="text-xs sm:text-sm font-extrabold font-mono text-[#14213D]">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-[#94A3B8]">/</span>
              <span className="text-xs sm:text-sm font-medium font-mono text-[#667085]">
                {String(totalReviews).padStart(2, "0")}
              </span>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-11 h-11 rounded-full border border-[#E3EAF3] bg-white text-[#14213D] hover:bg-[var(--brand-primary-soft)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Understated Progress Dots */}
          <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: totalReviews }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                  dotIdx === currentIndex
                    ? "w-6 bg-[var(--brand-primary)]"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
