import React from "react";
import { cn } from "@/lib/utils";

export type CardVariant =
  | "standard"
  | "featured"
  | "promotional"
  | "default"
  | "surface"
  | "bordered"
  | "interactive"
  | "dark"
  | "gold";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  standard:
    "bg-white text-[var(--brand-text)] border border-[var(--brand-border)] shadow-xs rounded-2xl",
  featured:
    "bg-white text-[var(--brand-text)] border border-blue-300 ring-1 ring-blue-100 shadow-sm rounded-2xl",
  promotional:
    "bg-gradient-to-br from-[#123E73] via-[#1769E0] to-[#0B2748] text-white border border-blue-900/40 shadow-xl rounded-3xl",
  default:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border border-[var(--brand-border)] shadow-xs rounded-2xl",
  surface:
    "bg-[var(--brand-surface-muted)] text-[var(--brand-text)] border border-[var(--brand-border)] rounded-2xl",
  bordered:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border-2 border-[var(--brand-border)] rounded-2xl",
  interactive:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border border-[var(--brand-border)] shadow-xs hover:shadow-md hover:border-[var(--brand-primary)]/40 hover:bg-white transition-all duration-200 cursor-pointer rounded-2xl hover:-translate-y-0.5",
  dark:
    "bg-[var(--brand-primary-dark)] text-white border border-blue-900/40 shadow-md rounded-2xl",
  gold:
    "bg-amber-50/40 text-[var(--brand-text)] border border-amber-200/80 shadow-xs rounded-2xl",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3.5 sm:p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const Card: React.FC<CardProps> = ({
  variant = "standard",
  padding = "md",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-bold text-[var(--brand-text)] tracking-tight leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, children, ...props }) => {
  return (
    <p
      className={cn("text-xs sm:text-sm text-[var(--brand-text-secondary)] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("mt-4 pt-4 border-t border-[var(--brand-border)] flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
};
