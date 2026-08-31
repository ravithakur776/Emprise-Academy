import React from "react";
import { GraduationCap, User } from "lucide-react";

export interface DirectorPhotoProps {
  photoUrl?: string | null;
  name: string;
  designation?: string;
  className?: string;
  aspectRatio?: "square" | "portrait";
  size?: "sm" | "md" | "lg" | "xl";
}

export const DirectorPhoto: React.FC<DirectorPhotoProps> = ({
  photoUrl,
  name,
  designation,
  className = "",
  aspectRatio = "portrait",
  size = "lg",
}) => {
  // Extract initials (e.g. "Sushil Dagur" -> "SD")
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[4/5]";

  const sizeClasses = {
    sm: "w-16 h-16 text-xs",
    md: "w-24 h-24 sm:w-28 sm:h-28 text-sm",
    lg: "w-full max-w-[280px] text-base",
    xl: "w-full max-w-[340px] text-lg",
  };

  if (photoUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border-2 border-slate-200 shadow-md ${aspectClass} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt={
            designation
              ? `${name} — ${designation} at Emprise Academy`
              : `${name} — Director at Emprise Academy`
          }
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  // Professional Branded Director Photo Placeholder
  return (
    <div
      role="img"
      aria-label={`Official photograph placeholder for ${name} — Director at Emprise Academy`}
      className={`relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-[var(--brand-primary)] to-[#0A192F] text-white border-2 border-slate-700/60 shadow-xl flex flex-col items-center justify-between p-6 sm:p-8 select-none ${aspectClass} ${className}`}
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-accent)]/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Badge: Institutional Identity */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-white/10 pb-2">
        <span className="flex items-center gap-1 text-[var(--brand-accent)]">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Emprise Leadership</span>
        </span>
        <span className="bg-white/10 px-2 py-0.5 rounded text-slate-300 font-mono text-[9px]">
          Official
        </span>
      </div>

      {/* Center Initials & Director Silhouette Avatar */}
      <div className="my-auto text-center space-y-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center mx-auto shadow-inner relative group">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {initials}
          </span>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center shadow-xs">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide block">
            {name}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium block">
            Director Photo
          </span>
        </div>
      </div>

      {/* Bottom Tag: Designation snippet */}
      <div className="w-full text-center pt-2 border-t border-white/10">
        <span className="text-[10px] text-amber-300/90 font-semibold tracking-wide block truncate">
          {designation || "Director • Emprise Academy"}
        </span>
      </div>
    </div>
  );
};
