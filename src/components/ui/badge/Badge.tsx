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
  primary: "bg-[var(--brand-primary)] text-white",
  secondary: "bg-slate-800 text-slate-100",
  accent: "bg-orange-50 text-[var(--brand-accent)] border border-orange-200/80 font-semibold",
  gold: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
  warning: "bg-amber-50 text-amber-700 border border-amber-200 font-medium",
  danger: "bg-red-50 text-red-700 border border-red-200 font-semibold",
  info: "bg-blue-50 text-blue-700 border border-blue-200 font-medium",
  muted: "bg-slate-100 text-slate-600 border border-slate-200",
  outline: "bg-transparent text-slate-700 border border-slate-300",
};

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-white",
  secondary: "bg-slate-300",
  accent: "bg-[var(--brand-accent)]",
  gold: "bg-[var(--brand-gold)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
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
        "inline-flex items-center gap-1.5 font-medium leading-none whitespace-nowrap",
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
  const norm = status.toUpperCase().trim();

  let variant: BadgeVariant = "muted";
  let dot = true;

  if (norm === "PUBLISHED" || norm === "QUALIFIED" || norm === "ACTIVE" || norm === "APPROVED" || norm === "CONVERTED") {
    variant = "success";
  } else if (norm === "REGISTERED" || norm === "ADMIT_CARD_GENERATED" || norm === "NEW") {
    variant = "accent";
  } else if (norm === "PENDING" || norm === "AWAITING" || norm === "CONTACTED" || norm === "INTERESTED") {
    variant = "warning";
  } else if (norm === "REVOKED" || norm === "REJECTED" || norm === "CANCELLED" || norm === "NOT_QUALIFIED" || norm === "LOST") {
    variant = "danger";
  } else if (norm === "DRAFT" || norm === "INACTIVE") {
    variant = "muted";
  }

  // Humanize status label
  const label = norm
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <Badge variant={variant} size={size} dot={dot} className={className}>
      {label}
    </Badge>
  );
};
