"use client";

import React from "react";
import Image from "next/image";
import { ResultArtwork } from "@/data/results-gallery";
import { Badge } from "@/components/ui/badge/Badge";
import { Maximize2, Award, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResultArtworkCardProps {
  item: ResultArtwork;
  onOpenLightbox: (item: ResultArtwork) => void;
  priority?: boolean;
}

export const ResultArtworkCard: React.FC<ResultArtworkCardProps> = ({
  item,
  onOpenLightbox,
  priority = false,
}) => {
  return (
    <article
      onClick={() => onOpenLightbox(item)}
      className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
      tabIndex={0}
      role="button"
      aria-label={`View result artwork: ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLightbox(item);
        }
      }}
    >
      {/* Featured Corner Badge */}
      {item.isFeatured && (
        <div className="absolute top-4 right-4 z-10 bg-amber-500 text-slate-950 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 tracking-wider">
          <Award className="w-3 h-3 text-slate-950" />
          Featured Result
        </div>
      )}

      {/* Primary Image Stage with object-contain */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 sm:p-5 flex items-center justify-center min-h-[380px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden border-b border-slate-100">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={item.displayImage}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="w-full max-h-[520px] object-contain rounded-xl shadow-xs group-hover:scale-[1.018] group-hover:shadow-md transition-all duration-300"
          />
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-lg backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <Maximize2 className="w-3.5 h-3.5" />
            Click to View Full Creative
          </span>
        </div>
      </div>

      {/* Editorial Card Footer */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-3 bg-white">
        <div>
          {/* Top Meta Chips */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge
              variant={
                item.category === "jee"
                  ? "primary"
                  : item.category === "neet"
                  ? "accent"
                  : item.category === "foundation"
                  ? "gold"
                  : "outline"
              }
              size="sm"
            >
              {item.examLabel}
            </Badge>

            {item.year && (
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Batch {item.year}
              </span>
            )}
          </div>

          {/* Heading */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
            {item.title}
          </h3>

          {/* Key Highlight */}
          <p className="text-xs sm:text-sm font-semibold text-amber-700 mt-1 flex items-center gap-1.5 line-clamp-1">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            {item.keyHighlight}
          </p>

          {/* Subtitle / Key Students */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors">
            View Full Result Artwork
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            High-Res Creative
          </span>
        </div>
      </div>
    </article>
  );
};
