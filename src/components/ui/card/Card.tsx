import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "bordered" | "interactive" | "dark" | "gold";
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  default:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border border-[var(--brand-border)] shadow-xs rounded-xl",
  surface:
    "bg-[var(--brand-surface-muted)] text-[var(--brand-text)] border border-[var(--brand-border)] rounded-xl",
  bordered:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border-2 border-[var(--brand-border)] rounded-xl",
  interactive:
    "bg-[var(--brand-surface)] text-[var(--brand-text)] border border-[var(--brand-border)] shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 cursor-pointer rounded-xl hover:-translate-y-0.5",
  dark:
    "bg-[var(--brand-primary)] text-white border border-slate-800 shadow-md rounded-xl",
  gold:
    "bg-amber-50/40 text-[var(--brand-text)] border border-amber-200/80 shadow-xs rounded-xl",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const Card: React.FC<CardProps> = ({
  variant = "default",
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
        "text-lg sm:text-xl font-bold tracking-tight text-inherit",
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
      className={cn("text-xs sm:text-sm text-[var(--brand-muted)]", className)}
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
    <div className={cn("w-full text-sm", className)} {...props}>
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
      className={cn("flex items-center justify-between mt-4 pt-4 border-t border-[var(--brand-border)]", className)}
      {...props}
    >
      {children}
    </div>
  );
};
