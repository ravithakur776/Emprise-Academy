import React from "react";
import { cn } from "@/lib/utils";

export type HeadingVariant = "display" | "h1" | "h2" | "h3" | "h4";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  variant?: HeadingVariant;
  align?: "left" | "center" | "right";
  color?: "primary" | "accent" | "gold" | "white" | "inherit";
  children: React.ReactNode;
}

const variantStyles: Record<HeadingVariant, string> = {
  display:
    "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[var(--brand-primary)]",
  h1:
    "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-[var(--brand-primary)]",
  h2:
    "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.25] text-[var(--brand-primary)]",
  h3:
    "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.3] text-[var(--brand-primary)]",
  h4:
    "text-lg sm:text-xl font-semibold tracking-tight leading-[1.35] text-[var(--brand-primary)]",
};

const colorStyles: Record<NonNullable<HeadingProps["color"]>, string> = {
  primary: "text-[var(--brand-primary)]",
  accent: "text-[var(--brand-accent)]",
  gold: "text-[var(--brand-gold)]",
  white: "text-white",
  inherit: "text-inherit",
};

export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  variant = "h2",
  align = "left",
  color,
  className,
  children,
  ...props
}) => {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  const customColorClass = color ? colorStyles[color] : "";

  return (
    <Component
      className={cn(
        variantStyles[variant],
        alignClass,
        customColorClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
