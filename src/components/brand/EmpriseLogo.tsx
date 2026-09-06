import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface EmpriseLogoProps {
  variant?: "default" | "on-dark" | "compact" | "pdf";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
}

const sizeMap = {
  xs: { height: 28, width: 81 },
  sm: { height: 38, width: 110 },
  md: { height: 50, width: 145 },
  lg: { height: 62, width: 180 },
  xl: { height: 76, width: 221 },
  custom: { height: 62, width: 180 },
};

export const EmpriseLogo: React.FC<EmpriseLogoProps> = ({
  variant = "default",
  size = "md",
  className,
  imgClassName,
  priority = false,
  alt = "Emprise Academy",
}) => {
  const { width, height } = sizeMap[size];
  const isOnDark = variant === "on-dark";

  const imageElement = (
    <Image
      src="/images/emprise-academy-logo.png"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn(
        "h-auto object-contain select-none transition-transform duration-200",
        imgClassName
      )}
      style={{
        aspectRatio: "1024 / 352",
        width: size === "custom" ? undefined : `${width}px`,
      }}
    />
  );

  if (isOnDark) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center bg-white px-3.5 py-2 rounded-xl shadow-xs border border-white/20",
          className
        )}
      >
        {imageElement}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center shrink-0", className)}>
      {imageElement}
    </div>
  );
};
