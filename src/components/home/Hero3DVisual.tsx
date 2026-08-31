"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Atom,
  Binary,
  Layers,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Hero3DVisual: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || window.innerWidth < 1024) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Soft tilt between -7deg and +7deg for smooth premium perspective
      const rotX = ((y - centerY) / centerY) * -7;
      const rotY = ((x - centerX) / centerX) * 7;

      setRotateX(rotX);
      setRotateY(rotY);
    },
    [isReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isReducedMotion && window.innerWidth >= 1024) {
      setIsHovered(true);
    }
  }, [isReducedMotion]);

  return (
    <div
      className="relative w-full py-4 [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Background Decorative Geometric Ambient Layer */}
      <div className="absolute -inset-4 bg-linear-to-tr from-[var(--brand-accent)]/15 via-blue-500/10 to-indigo-600/15 rounded-3xl blur-2xl pointer-events-none transform -translate-z-10" />

      {/* Floating 3D Background Mathematical / Physics Curves */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-orange-400/20 animate-pulse pointer-events-none hidden sm:block" />
      <div className="absolute -bottom-8 -left-6 w-32 h-32 rounded-full border border-blue-400/20 pointer-events-none hidden sm:block" />

      {/* Interactive 3D Perspective Card Frame */}
      <div
        ref={cardRef}
        className={cn(
          "relative rounded-3xl bg-linear-to-b from-slate-900/95 via-[#0D1F38]/95 to-[#071324]/98 border border-slate-700/80 p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out",
          "[transform-style:preserve-3d]"
        )}
        style={{
          transform:
            !isReducedMotion && isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
              : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(249, 115, 22, 0.15)"
            : "0 20px 35px -10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Subtle 3D Depth Grid Background */}
        <div
          className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
          style={{ transform: "translateZ(5px)" }}
        />

        {/* Floating Top Floating Metric Pill (Depth +45px) */}
        <div
          className="absolute -top-3.5 right-3 sm:right-6 px-2.5 sm:px-3.5 py-1 rounded-full bg-linear-to-r from-amber-500/90 to-orange-500/90 text-slate-950 text-[10px] sm:text-[11px] font-extrabold shadow-lg border border-amber-300/40 flex items-center gap-1.5 z-20 pointer-events-none"
          style={{
            transform: !isReducedMotion && isHovered ? "translateZ(45px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
          <span>ETSE 2026 Open</span>
        </div>

        {/* Card Header (Depth +20px) */}
        <div
          className="flex items-center justify-between border-b border-slate-700/60 pb-3 sm:pb-4 mb-4 sm:mb-6 relative z-10 gap-2"
          style={{
            transform: !isReducedMotion && isHovered ? "translateZ(20px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-[var(--brand-accent)] to-orange-600 text-white flex items-center justify-center shadow-md border border-orange-400/40 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight flex items-center gap-1.5">
                Emprise Academic System
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Mathura Campus • Est. 2011
              </p>
            </div>
          </div>

          <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-950/70 border border-amber-600/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg shadow-xs shrink-0">
            ★ 15+ Years
          </span>
        </div>

        {/* 3 Interactive Pedagogical Depth Tiles (Depth +30px) */}
        <div
          className="space-y-3.5 mb-6 text-xs text-slate-300 relative z-10"
          style={{
            transform: !isReducedMotion && isHovered ? "translateZ(30px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Tile 1: Concept-First */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:border-blue-400/30 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/20">
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Concept-First Pedagogy</span>
              <span className="text-slate-400 text-xs leading-relaxed">
                First-principles derivations built to solve complex JEE & NEET problems with clarity.
              </span>
            </div>
          </div>

          {/* Tile 2: Mentorship */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:border-amber-400/30 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/20">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Engineering & Medical Mentorship</span>
              <span className="text-slate-400 text-xs leading-relaxed">
                Guided by University of Derby (UK) alumni and Kota competitive coaching veterans.
              </span>
            </div>
          </div>

          {/* Tile 3: Diagnostic Testing */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:border-emerald-400/30 transition-colors shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Diagnostic Testing & Doubt Desks</span>
              <span className="text-slate-400 text-xs leading-relaxed">
                Weekly chapter assessments with individualized error rectification and progress audits.
              </span>
            </div>
          </div>
        </div>

        {/* Floating Bottom Metric Badge (Depth +40px) */}
        <div
          className="mb-4 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
          style={{
            transform: !isReducedMotion && isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Admissions Active for 2026–27</span>
          </div>
          <span className="text-amber-400 font-bold text-[11px]">Mathura Campus</span>
        </div>

        {/* Action Button (Depth +35px) */}
        <div
          className="pt-2 border-t border-slate-700/60"
          style={{
            transform: !isReducedMotion && isHovered ? "translateZ(35px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <a
            href="#counselling"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-[var(--brand-accent)] to-orange-600 hover:from-[var(--brand-accent-hover)] hover:to-orange-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-orange-500/25 cursor-pointer"
          >
            <span>Book Free Academic Counselling</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
