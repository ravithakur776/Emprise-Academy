import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "surface" | "muted" | "navy-dark" | "gold-tint";
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-[var(--brand-background)] text-[var(--brand-text)]",
  surface: "bg-[var(--brand-surface)] text-[var(--brand-text)] border-y border-[var(--brand-border)]",
  muted: "bg-[var(--brand-surface-muted)] text-[var(--brand-text)]",
  "navy-dark": "bg-[var(--brand-primary)] text-white",
  "gold-tint": "bg-amber-50/60 text-[var(--brand-text)] border-y border-amber-100",
};

const spacingStyles: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "py-0",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-28",
  xl: "py-20 sm:py-28 lg:py-36",
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
