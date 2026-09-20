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
            "font-semibold",
            isJee ? "text-[#FFB049]" : "text-[#34D399]"
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
            isJee ? "text-[#60A5FA]" : "text-[#A7F3D0]"
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
          ? "bg-gradient-to-br from-[#0D2447] via-[#123668] to-[#0A1B36] text-white border border-blue-400/25 hover:border-[#FF8A00]/70 hover:shadow-2xl hover:shadow-blue-900/40"
          : "bg-gradient-to-br from-[#08291F] via-[#0E4435] to-[#051E17] text-white border border-emerald-400/25 hover:border-emerald-300/70 hover:shadow-2xl hover:shadow-emerald-950/50",
        "min-h-[440px] sm:min-h-[460px]",
        className
      )}
    >
      {/* Luminous Top Accent Bar */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r",
          isJee
            ? "from-blue-500 via-[#FF8A00] to-cyan-400"
            : "from-emerald-400 via-[#10B981] to-teal-300"
        )}
      />

      {/* Decorative Translucent Watermark Quote */}
      <Quote
        className={cn(
          "absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none -rotate-12 transition-transform duration-500 group-hover:scale-105",
          isJee ? "text-blue-400/[0.08]" : "text-emerald-400/[0.08]"
        )}
        aria-hidden="true"
      />

      {/* Ambient Inner Lighting */}
      <div
        className={cn(
          "absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none",
          isJee ? "bg-blue-400/15" : "bg-emerald-400/15"
        )}
      />

      <div className="relative z-10">
        {/* Top Header Row: Category Badge + Verification Seal + Story Index */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border",
                isJee
                  ? "bg-blue-500/20 text-blue-200 border-blue-400/30"
                  : "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
              )}
            >
              <Sparkles
                className={cn(
                  "w-3 h-3",
                  isJee ? "text-[#FF8A00]" : "text-emerald-300"
                )}
              />
              <span>{review.categoryLabel}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-slate-300 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Alum</span>
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/25 text-slate-300 border border-white/10">
            STORY {activeNumber}
          </span>
        </div>

        {/* Student Portrait & Name Card Block */}
        <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/10">
          {/* Illuminated Photo Frame */}
          <div
            className={cn(
              "relative p-0.5 rounded-full shadow-lg shrink-0",
              isJee
                ? "bg-gradient-to-tr from-[#1769E0] via-cyan-400 to-[#FF8A00]"
                : "bg-gradient-to-tr from-teal-400 via-emerald-400 to-amber-300"
            )}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-slate-800 border-2 border-[#0D2447] relative">
              {review.image ? (
                <Image
                  src={review.image}
                  alt={`Student photo of ${review.studentName}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-full"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-extrabold text-white text-base">
                  {initials}
                </div>
              )}
            </div>

            {/* Glowing Verified Dot */}
            <span
              className={cn(
                "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0A1B36] flex items-center justify-center text-[8px] font-bold text-white",
                isJee ? "bg-[#FF8A00]" : "bg-emerald-500"
              )}
              title="Verified Student"
            >
              ✓
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
              {review.studentName}
            </h3>
            <div className="mt-1">
              <span
                className={cn(
                  "inline-block text-[11px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md border",
                  isJee
                    ? "bg-[#FF8A00]/20 text-[#FFB049] border-[#FF8A00]/40"
                    : "bg-emerald-400/20 text-[#34D399] border-emerald-400/40"
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
              isJee ? "text-[#FF8A00]" : "text-emerald-400"
            )}
          />
          <p className="text-xs sm:text-[13.5px] text-slate-200 leading-relaxed line-clamp-4">
            &ldquo;{renderHighlightedText(review.paragraphs[0], isJee)}&rdquo;
          </p>

          {review.paragraphs.length > 1 && (
            <p className="text-[12px] text-slate-300/80 mt-2 line-clamp-2 italic">
              {review.paragraphs[1]}
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA Row: Read Full Story Trigger */}
      <div className="relative z-10 pt-4 mt-5 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenStory?.(review)}
          aria-label={`Read full review of ${review.studentName}`}
          className={cn(
            "min-h-[44px] px-3 -ml-3 flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg",
            isJee
              ? "text-blue-200 hover:text-white group-hover:text-[#FFB049]"
              : "text-emerald-200 hover:text-white group-hover:text-[#34D399]"
          )}
        >
          <span>Read Full Experience</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
          100% Verified
        </span>
      </div>
    </div>
  );
};
