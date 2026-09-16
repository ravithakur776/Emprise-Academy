"use client";

import React, { useRef, useCallback } from "react";
import { AcademicStatItem } from "@/data/homepage";
import {
  Trophy,
  Target,
  Award,
  Users,
  CheckCircle2,
  Stethoscope,
  LucideIcon,
} from "lucide-react";

interface AcademicStatCardProps {
  stat: AcademicStatItem;
  className?: string;
}

const ICON_MAP: Record<AcademicStatItem["iconName"], LucideIcon> = {
  Trophy,
  Target,
  Award,
  Users,
  CheckCircle2,
  Stethoscope,
};

// Subtle styling palettes per card accent without making the card non-white
const ACCENT_STYLES: Record<
  AcademicStatItem["accent"],
  {
    topLine: string;
    iconBg: string;
    iconColor: string;
    glowRgba: string;
    hoverBorder: string;
  }
> = {
  blue: {
    topLine: "bg-[#1769E0]",
    iconBg: "bg-[#EEF5FF]",
    iconColor: "text-[#1769E0]",
    glowRgba: "rgba(23, 105, 224, 0.06)",
    hoverBorder: "hover:border-[#1769E0]/45",
  },
  gold: {
    topLine: "bg-gradient-to-r from-[#FF8A00] to-[#D97706]",
    iconBg: "bg-[#FFF7EB]",
    iconColor: "text-[#D97706]",
    glowRgba: "rgba(255, 138, 0, 0.06)",
    hoverBorder: "hover:border-[#D97706]/45",
  },
  success: {
    topLine: "bg-[#16A36A]",
    iconBg: "bg-[#E8F8F0]",
    iconColor: "text-[#16A36A]",
    glowRgba: "rgba(22, 163, 106, 0.06)",
    hoverBorder: "hover:border-[#16A36A]/45",
  },
  academic: {
    topLine: "bg-gradient-to-r from-[#1769E0] to-[#FF8A00]",
    iconBg: "bg-[#EEF5FF]",
    iconColor: "text-[#1769E0]",
    glowRgba: "rgba(23, 105, 224, 0.06)",
    hoverBorder: "hover:border-[#1769E0]/45",
  },
};

export const AcademicStatCard: React.FC<AcademicStatCardProps> = ({
  stat,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = ICON_MAP[stat.iconName] || Trophy;
  const accent = ACCENT_STYLES[stat.accent] || ACCENT_STYLES.blue;

  // Lightweight pointer tracking for subtle 3D tilt (max 3 degrees)
  // Operates purely via CSS variables with zero React re-renders
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Disable on coarse pointer (touch) or if user prefers reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalized coordinates between -1 and 1
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // Subtle restrained tilt: max ~2.8 degrees
    const rotateX = -deltaY * 2.8;
    const rotateY = deltaX * 2.8;

    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mx", `${x.toFixed(1)}px`);
    card.style.setProperty("--my", `${y.toFixed(1)}px`);
    card.style.setProperty("--ty", "-4px");
    card.style.setProperty("--glow-opacity", "1");
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    // Smoothly reset 3D variables
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--ty", "0px");
    card.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group/card relative rounded-[18px] bg-white border border-[#E3EAF3] p-5 sm:p-5.5 text-left flex flex-col justify-between overflow-hidden cursor-default select-none shadow-[0_1px_3px_0_rgba(11,39,72,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(18,62,115,0.09),0_4px_10px_-2px_rgba(18,62,115,0.04)] transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${accent.hoverBorder} ${className}`}
      style={{
        transform:
          "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--ty, 0px))",
      }}
    >
      {/* Subtle Top Accent Line */}
      <div
        className={`absolute top-0 left-5 right-5 h-[2.5px] rounded-full ${accent.topLine} opacity-80 group-hover/card:opacity-100 transition-opacity`}
        aria-hidden="true"
      />

      {/* Subtle Cursor-Following Radial Highlight (No neon, institutional refinement) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 motion-reduce:hidden"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background: `radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), ${accent.glowRgba}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Row: Index Badge & Icon */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        {/* Soft-Blue Editorial Index Marker */}
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#EEF5FF] text-[#1769E0] font-mono text-[11px] font-bold tracking-wider border border-[#D0E2FF]/60 shadow-[0_1px_2px_rgba(23,105,224,0.05)]">
          {stat.index}
        </span>

        {/* Subtle Icon Container */}
        <div
          className={`w-8 h-8 rounded-lg ${accent.iconBg} ${accent.iconColor} flex items-center justify-center transition-transform duration-300 group-hover/card:-translate-y-0.5 shadow-xs`}
          aria-hidden="true"
        >
          <IconComponent className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>

      {/* Content Area: Primary Number/Title -> Label -> Description */}
      <div className="mt-3.5 relative z-10 flex-1 flex flex-col justify-end">
        {/* Primary Statistic (Strongest Visual Emphasis) */}
        <div className="text-[22px] sm:text-[24px] xl:text-[25px] font-extrabold text-[#0B2748] tracking-tight leading-[1.15]">
          {stat.value}
        </div>

        {/* Short Secondary Label */}
        <h3 className="text-xs sm:text-[13px] font-bold text-[#14213D] mt-1.5 leading-snug tracking-tight">
          {stat.label}
        </h3>

        {/* 1-2 Line Descriptive Context */}
        <p className="text-[11.5px] sm:text-xs text-[#667085] mt-1.5 leading-[1.55] line-clamp-3">
          {stat.description}
        </p>
      </div>
    </article>
  );
};
