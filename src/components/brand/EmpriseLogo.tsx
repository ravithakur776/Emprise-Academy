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
  xs: { height: 24, width: 70 },
  sm: { height: 32, width: 93 },
  md: { height: 42, width: 122 },
  lg: { height: 52, width: 151 },
  xl: { height: 64, width: 186 },
  custom: { height: 42, width: 122 },
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
          "inline-flex items-center justify-center bg-white px-3 py-1.5 rounded-xl shadow-xs border border-white/20",
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
