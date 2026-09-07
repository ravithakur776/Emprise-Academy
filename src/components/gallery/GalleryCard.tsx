"use client";

import React from "react";
import Image from "next/image";
import { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

export interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
  priority?: boolean;
  className?: string;
  heightClass?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  onClick,
  priority = false,
  className,
  heightClass = "h-48 sm:h-56 lg:h-64",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open photograph: ${image.alt}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-white border border-[var(--brand-border)] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] shrink-0",
        heightClass,
        className
      )}
      style={{
        aspectRatio: `${image.aspectRatio}`,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] block"
      />

      {/* Subtle hover gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};
