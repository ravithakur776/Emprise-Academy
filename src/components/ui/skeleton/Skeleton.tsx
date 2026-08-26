import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-slate-200/80 rounded-md animate-pulse-glow",
        className
      )}
      {...props}
    />
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
      <Skeleton className="h-7 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <div className="pt-4 border-t border-slate-100 flex justify-between">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
  rows = 5,
  columns = 5,
  className,
}) => {
  return (
    <div className={cn("w-full border border-slate-200 rounded-xl bg-white overflow-hidden p-4 space-y-3", className)}>
      <div className="flex gap-4 pb-3 border-b border-slate-100">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1 rounded" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 py-2">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const FormSkeleton: React.FC<{ fields?: number; className?: string }> = ({
  fields = 4,
  className,
}) => {
  return (
    <div className={cn("space-y-4 p-6 bg-white border border-slate-200 rounded-xl", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-11 w-full rounded-lg mt-6" />
    </div>
  );
};

export const PageSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 py-12 space-y-8 animate-fade-in", className)}>
      <div className="space-y-3">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-12 w-3/4 sm:w-1/2 rounded" />
        <Skeleton className="h-5 w-2/3 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};
