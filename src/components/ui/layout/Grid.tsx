import React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsSm?: 1 | 2 | 3 | 4 | 6 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 6 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

const gapStyles = {
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-6",
  lg: "gap-6 sm:gap-8",
  xl: "gap-8 sm:gap-12",
};

const colMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const colSmMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const colMdMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const colLgMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  gap = "md",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "grid",
        colMap[cols] || "grid-cols-1",
        colsSm ? colSmMap[colsSm] : "",
        colsMd ? colMdMap[colsMd] : "",
        colsLg ? colLgMap[colsLg] : "",
        gapStyles[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
