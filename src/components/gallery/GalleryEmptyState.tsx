"use client";

import React from "react";
import { Newspaper, PlayCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GalleryCategory } from "@/data/gallery";

interface GalleryEmptyStateProps {
  category: Exclude<GalleryCategory, "photo">;
  className?: string;
}

export const GalleryEmptyState: React.FC<GalleryEmptyStateProps> = ({
  category,
  className,
}) => {
  const isMedia = category === "media";

  return (
    <div
      role="tabpanel"
      id={`gallery-panel-${category}`}
      aria-labelledby={`gallery-tab-${category}`}
      className={cn(
        "rounded-2xl bg-white border border-[#E3EAF3] shadow-xs p-8 sm:p-12 text-center max-w-xl mx-auto my-6 sm:my-8 transition-all duration-300",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-2xs">
        {isMedia ? (
          <Newspaper className="w-7 h-7 text-[#1769E0]" />
        ) : (
          <PlayCircle className="w-7 h-7 text-[#1769E0]" />
        )}
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-[#123E73] uppercase tracking-wider mb-2.5">
        <Sparkles className="w-3 h-3 text-[#FF8A00]" />
        <span>Official Archive</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2748] tracking-tight">
        {isMedia ? "Media Gallery" : "Video Gallery"}
      </h3>

      <p className="text-sm sm:text-base text-[#667085] mt-2 leading-relaxed max-w-md mx-auto">
        {isMedia
          ? "Media features and publications will appear here."
          : "Academy videos and event highlights will appear here."}
      </p>

      <p className="text-xs text-slate-400 mt-3 italic">
        {isMedia
          ? "Press coverage, newspaper features, and institutional announcements are added as publications are released."
          : "Campus walkthroughs, academic seminars, and student achievement features are updated as productions are finalized."}
      </p>
    </div>
  );
};
