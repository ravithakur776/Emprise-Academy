import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  "aria-label": string; // Enforce accessible label
  icon: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] active:scale-95",
  secondary:
    "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-light)] active:scale-95",
  outline:
    "bg-transparent text-[var(--brand-primary)] border border-[var(--brand-border)] hover:bg-[var(--brand-surface-muted)] active:scale-95",
  ghost:
    "bg-transparent text-[var(--brand-primary)] hover:bg-[var(--brand-surface-muted)] active:scale-95",
  danger:
    "bg-red-50 text-[var(--brand-danger)] hover:bg-red-100 active:scale-95",
};

const sizeStyles = {
  sm: "w-8 h-8 rounded-md p-1.5",
  md: "w-10 h-10 rounded-lg p-2",
  lg: "w-12 h-12 rounded-xl p-2.5",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      isLoading = false,
      icon,
      disabled,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
