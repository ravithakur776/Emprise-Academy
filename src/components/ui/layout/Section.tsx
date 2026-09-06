import React from "react";
import { cn } from "@/lib/utils";

export type SectionVariant =
  | "default"
  | "surface"
  | "muted"
  | "navy-dark"
  | "deep-blue"
  | "gold-tint";

export type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-[var(--brand-background)] text-[var(--brand-text)]",
  surface: "bg-white text-[var(--brand-text)] border-y border-[var(--brand-border)]",
  muted: "bg-[var(--brand-surface-muted)] text-[var(--brand-text)]",
  "navy-dark": "bg-[var(--brand-primary-dark)] text-white",
  "deep-blue": "bg-gradient-to-br from-[#123E73] via-[#1769E0] to-[#0B2748] text-white",
  "gold-tint": "bg-amber-50/60 text-[var(--brand-text)] border-y border-amber-100",
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-24 lg:py-32",
};

export const Section: React.FC<SectionProps> = ({
  variant = "default",
  spacing = "md",
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn(
        "w-full relative",
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
