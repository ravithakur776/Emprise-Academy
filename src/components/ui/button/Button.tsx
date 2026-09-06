import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "gold";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] active:scale-[0.98] shadow-xs hover:shadow-sm font-semibold border border-transparent",
  secondary:
    "bg-white text-[var(--brand-primary)] border border-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)] hover:border-[var(--brand-primary-hover)] active:scale-[0.98] shadow-2xs font-semibold",
  tertiary:
    "bg-transparent text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)] hover:text-[var(--brand-primary-hover)] active:scale-[0.98] font-semibold border border-transparent",
  accent:
    "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] shadow-sm font-semibold border border-transparent",
  outline:
    "bg-transparent text-[var(--brand-primary)] border border-[var(--brand-border)] hover:bg-[var(--brand-primary-soft)] hover:border-[var(--brand-primary)] active:scale-[0.98] font-medium",
  ghost:
    "bg-transparent text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)] active:scale-[0.98] font-medium border border-transparent",
  danger:
    "bg-[var(--brand-danger)] text-white hover:bg-red-700 active:scale-[0.98] font-semibold border border-transparent",
  success:
    "bg-[var(--brand-success)] text-white hover:bg-emerald-700 active:scale-[0.98] font-semibold border border-transparent",
  gold:
    "bg-[var(--brand-gold)] text-white hover:bg-amber-700 active:scale-[0.98] font-semibold border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 sm:h-13 px-6 sm:px-7 text-sm sm:text-base rounded-xl gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
