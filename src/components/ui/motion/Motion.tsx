import React from "react";
import { cn } from "@/lib/utils";

export interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
  children: React.ReactNode;
}

export const FadeUp: React.FC<MotionProps> = ({
  delayMs = 0,
  className,
  children,
  style,
  ...props
}) => {
  return (
    <div
      className={cn("animate-fade-in transition-transform duration-300", className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export const FadeIn: React.FC<MotionProps> = ({
  delayMs = 0,
  className,
  children,
  style,
  ...props
}) => {
  return (
    <div
      className={cn("animate-fade-in", className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export const SlideIn: React.FC<MotionProps> = ({
  delayMs = 0,
  className,
  children,
  style,
  ...props
}) => {
  return (
    <div
      className={cn("animate-slide-down", className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export const HoverLift: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const StaggerContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
};
