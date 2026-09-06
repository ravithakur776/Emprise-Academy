import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "gold"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] border border-blue-200/80 font-semibold",
  secondary: "bg-[var(--brand-primary-dark)] text-white font-medium",
  accent: "bg-orange-50 text-[var(--brand-accent)] border border-orange-200/80 font-semibold",
  gold: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
  warning: "bg-amber-50 text-amber-700 border border-amber-200 font-medium",
  danger: "bg-red-50 text-red-700 border border-red-200 font-semibold",
  info: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] border border-blue-200 font-medium",
  muted: "bg-slate-100 text-slate-600 border border-slate-200",
  outline: "bg-transparent text-slate-700 border border-slate-300",
};

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-[var(--brand-primary)]",
  secondary: "bg-white",
  accent: "bg-[var(--brand-accent)]",
  gold: "bg-[var(--brand-gold)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-[var(--brand-primary)]",
  muted: "bg-slate-400",
  outline: "bg-slate-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px] rounded",
  md: "px-2.5 py-1 text-xs rounded-md",
  lg: "px-3 py-1.5 text-sm rounded-lg",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "muted",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium select-none tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export interface StatusBadgeProps {
  status: string;
  size?: BadgeSize;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  className,
}) => {
  const normalized = status.toUpperCase().trim();

  let variant: BadgeVariant = "muted";

  if (["QUALIFIED", "CONFIRMED", "ACTIVE", "PUBLISHED", "PASS", "ENROLLED"].includes(normalized)) {
    variant = "success";
  } else if (["TOPPER", "AIR 1", "SCHOLARSHIP", "GOLD"].includes(normalized)) {
    variant = "gold";
  } else if (["PENDING", "IN_PROGRESS", "AWAITING", "UPCOMING"].includes(normalized)) {
    variant = "warning";
  } else if (["REJECTED", "FAILED", "CANCELLED", "INACTIVE"].includes(normalized)) {
    variant = "danger";
  } else if (["ETSE", "FEATURED", "EXAM"].includes(normalized)) {
    variant = "primary";
  }

  return (
    <Badge variant={variant} size={size} dot className={className}>
      {status}
    </Badge>
  );
};
