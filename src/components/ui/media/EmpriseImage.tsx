"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { ImageOff } from "lucide-react";

export interface EmpriseImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/4" | "3/2" | "auto";
  fallbackSrc?: string;
  alt: string; // Enforce alt attribute for accessibility
  className?: string;
  containerClassName?: string;
}

const aspectMap = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "1/1": "aspect-square",
  "3/4": "aspect-3/4",
  "3/2": "aspect-3/2",
  auto: "",
};

export const EmpriseImage: React.FC<EmpriseImageProps> = ({
  src,
  alt,
  aspectRatio = "auto",
  fallbackSrc,
  className,
  containerClassName,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-100 rounded-xl flex items-center justify-center",
        aspectMap[aspectRatio],
        containerClassName
      )}
    >
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-4 text-slate-400 text-xs">
          <ImageOff className="w-8 h-8 mb-1.5 opacity-60" />
          <span>Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (fallbackSrc && src !== fallbackSrc) {
              // try fallback
            } else {
              setHasError(true);
            }
            setIsLoading(false);
          }}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
