import React from "react";
import { cn } from "@/lib/utils";

export type TextVariant =
  | "body-large"
  | "body"
  | "body-small"
  | "caption"
  | "eyebrow"
  | "label";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label" | "small";
  variant?: TextVariant;
  color?: "default" | "secondary" | "muted" | "accent" | "gold" | "white" | "inherit";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  "body-large": "text-lg sm:text-xl leading-relaxed",
  body: "text-base sm:text-base leading-relaxed",
  "body-small": "text-sm leading-normal",
  caption: "text-xs leading-normal tracking-wide",
  eyebrow: "text-xs uppercase font-bold tracking-wider",
  label: "text-sm font-medium leading-none",
};

const colorStyles: Record<NonNullable<TextProps["color"]>, string> = {
  default: "text-[var(--brand-text)]",
  secondary: "text-[var(--brand-text-secondary)]",
  muted: "text-[var(--brand-muted)]",
  accent: "text-[var(--brand-accent)]",
  gold: "text-[var(--brand-gold)]",
  white: "text-white",
  inherit: "text-inherit",
};

const weightStyles: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant = "body",
  color = "default",
  weight,
  align,
  className,
  children,
  ...props
}) => {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : align === "left" ? "text-left" : "";
  const weightClass = weight ? weightStyles[weight] : "";

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        weightClass,
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
