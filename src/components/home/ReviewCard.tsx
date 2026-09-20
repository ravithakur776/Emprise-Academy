"use client";

import React from "react";
import Image from "next/image";
import { HomepageReviewItem } from "@/data/testimonials";
import { Quote, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Important achievement and institution milestones to highlight
const ACHIEVEMENT_PHRASES = [
  "IIT-BOMBAY",
  "IIT Bombay",
  "IIT-DHANBAD",
  "IIT Dhanbad",
  "IIT-GUWAHATI",
  "IIT Guwahati",
  "IIT-KANPUR",
  "IIT Kanpur",
  "IIT-DELHI",
  "IIT Delhi",
  "AIIMS-RAEBARELI",
  "AIIMS Rae Bareli",
  "AIIMS-GORAKHPUR",
  "AIIMS Gorakhpur",
  "AIIMS-JODHPUR",
  "AIIMS Jodhpur",
  "GMC-ETAH",
  "GMC-Etah",
  "GMC-SAHARANPUR",
  "GMC-Saharanpur",
  "AIR-59 IN AIIMS",
  "becoming a doctor",
  "MBBS",
];

// Academic mentorship & pedagogy phrases to highlight
const PEDAGOGY_PHRASES = [
  "personal attention",
  "test series",
  "doubt-solving",
  "Foundation Course",
  "Foundation Programme",
  "IIT-JEE journey",
  "NEET preparation",
  "study environment",
  "disciplined atmosphere",
  "regular test series",
  "structured academic system",
  "Director’s teaching style",
  "quality test papers",
  "faculty support",
  "study material",
  "DPPs",
];

// Regex matching all target phrases with word boundary protection
const HIGHLIGHT_REGEX = new RegExp(
  `(${[...ACHIEVEMENT_PHRASES, ...PEDAGOGY_PHRASES]
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join("|")})`,
  "gi"
);

/**
 * Safely wraps approved testimonial phrases in approved brand colors without altering text content.
 */
export const renderHighlightedText = (
  text: string,
  isJee: boolean = true
): React.ReactNode[] => {
  const parts = text.split(HIGHLIGHT_REGEX);
  return parts.map((part, index) => {
    const isAchievement = ACHIEVEMENT_PHRASES.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase()
    );
    if (isAchievement) {
      return (
        <span
          key={index}
          className={cn(
            "font-bold",
            isJee ? "text-[#D97706]" : "text-[#059669]"
          )}
        >
          {part}
        </span>
      );
    }
    const isPedagogy = PEDAGOGY_PHRASES.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase()
    );
    if (isPedagogy) {
      return (
        <span
          key={index}
          className={cn(
            "font-semibold",
            isJee ? "text-[#1D4ED8]" : "text-[#0F766E]"
          )}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

interface ReviewCardProps {
  review: HomepageReviewItem;
  activeNumber?: string;
  onOpenStory?: (review: HomepageReviewItem) => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  activeNumber = "01",
  onOpenStory,
  className,
}) => {
  const isJee = review.category === "JEE";

  // Initials fallback
  const initials = review.studentName
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left h-full select-none overflow-hidden transition-all duration-300 group",
        isJee
          ? "bg-gradient-to-br from-[#F0F6FF] via-[#E8F1FC] to-[#F8FAFC] text-slate-800 border border-blue-200/90 hover:border-[#1769E0] hover:shadow-xl hover:shadow-blue-500/10"
          : "bg-gradient-to-br from-[#F0FDF4] via-[#E6F8ED] to-[#F7FCF9] text-slate-800 border border-emerald-200/90 hover:border-[#10B981] hover:shadow-xl hover:shadow-emerald-500/10",
        "min-h-[440px] sm:min-h-[460px]",
        className
      )}
    >
      {/* Luminous Top Accent Bar */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r",
          isJee
            ? "from-blue-500 via-[#FF8A00] to-cyan-500"
            : "from-emerald-500 via-[#10B981] to-teal-400"
        )}
      />

      {/* Decorative Translucent Watermark Quote */}
      <Quote
        className={cn(
          "absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none -rotate-12 transition-transform duration-500 group-hover:scale-105",
          isJee ? "text-blue-500/[0.06]" : "text-emerald-500/[0.06]"
        )}
        aria-hidden="true"
      />

      {/* Ambient Inner Lighting */}
      <div
        className={cn(
          "absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none",
          isJee ? "bg-blue-300/25" : "bg-emerald-300/25"
        )}
      />

      <div className="relative z-10">
        {/* Top Header Row: Category Badge + Verification Seal + Story Index */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs",
                isJee
                  ? "bg-blue-100 text-blue-800 border-blue-200"
                  : "bg-emerald-100 text-emerald-800 border-emerald-200"
              )}
            >
              <Sparkles
                className={cn(
                  "w-3 h-3",
                  isJee ? "text-[#FF8A00]" : "text-emerald-600"
                )}
              />
              <span>{review.categoryLabel}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[10px] font-semibold text-slate-600 border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Alum</span>
            </span>
          </div>

          <span
            className={cn(
              "text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border shadow-2xs",
              isJee
                ? "bg-white text-blue-900 border-blue-200"
                : "bg-white text-emerald-900 border-emerald-200"
            )}
          >
            STORY {activeNumber}
          </span>
        </div>

        {/* Student Portrait & Name Card Block — Centered & Symmetrical */}
        <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-slate-200/80">
          {/* Illuminated Centered Photo Frame */}
          <div
            className={cn(
              "relative p-0.5 rounded-full shadow-sm shrink-0 mb-3",
              isJee
                ? "bg-gradient-to-tr from-[#1769E0] via-cyan-400 to-[#FF8A00]"
                : "bg-gradient-to-tr from-teal-400 via-emerald-400 to-amber-300"
            )}
          >
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden bg-slate-100 border-2 border-white relative shadow-xs flex items-center justify-center">
              {review.image ? (
                <Image
                  src={review.image}
                  alt={`Student photo of ${review.studentName}`}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover object-center rounded-full"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-extrabold text-slate-700 text-base">
                  {initials}
                </div>
              )}
            </div>

            {/* Glowing Verified Dot */}
            <span
              className={cn(
                "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-xs",
                isJee ? "bg-[#FF8A00]" : "bg-emerald-500"
              )}
              title="Verified Student"
            >
              ✓
            </span>
          </div>

          <div className="w-full">
            <h3
              className={cn(
                "text-base sm:text-lg font-extrabold tracking-tight truncate",
                isJee ? "text-[#14213D]" : "text-[#064E3B]"
              )}
            >
              {review.studentName}
            </h3>
            <div className="mt-1 flex justify-center">
              <span
                className={cn(
                  "inline-block text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-md border",
                  isJee
                    ? "bg-amber-100/70 text-[#B45309] border-amber-300/80"
                    : "bg-emerald-100/70 text-[#047857] border-emerald-300/80"
                )}
              >
                {review.institution}
              </span>
            </div>
          </div>
        </div>

        {/* Testimonial Quote with phrase highlighting */}
        <div className="relative">
          <Quote
            className={cn(
              "w-5 h-5 mb-2",
              isJee ? "text-[#FF8A00]" : "text-emerald-600"
            )}
          />
          <p className="text-xs sm:text-[13.5px] text-[#1E293B] leading-relaxed line-clamp-4">
            &ldquo;{renderHighlightedText(review.paragraphs[0], isJee)}&rdquo;
          </p>

          {review.paragraphs.length > 1 && (
            <p className="text-[12px] text-slate-500 mt-2 line-clamp-2 italic">
              {review.paragraphs[1]}
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA Row: Read Full Story Trigger */}
      <div className="relative z-10 pt-4 mt-5 border-t border-slate-200/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenStory?.(review)}
          aria-label={`Read full review of ${review.studentName}`}
          className={cn(
            "min-h-[44px] px-3 -ml-3 flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg",
            isJee
              ? "text-[var(--brand-primary)] hover:text-[#D97706] group-hover:text-[#D97706]"
              : "text-emerald-700 hover:text-emerald-900 group-hover:text-emerald-800"
          )}
        >
          <span>Read Full Experience</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-semibold">
          100% Verified
        </span>
      </div>
    </div>
  );
};
