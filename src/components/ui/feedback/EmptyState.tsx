import React from "react";
import { cn } from "@/lib/utils";
import { FolderSearch, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-slate-300 rounded-2xl bg-white/70 max-w-lg mx-auto my-6",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[var(--brand-primary)] flex items-center justify-center mb-4 shadow-2xs">
        {icon || <FolderSearch className="w-7 h-7 opacity-70" />}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-primary)] mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[var(--brand-muted)] max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred while processing your request. Please try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-red-200 rounded-2xl bg-red-50/40 max-w-lg mx-auto my-6",
        className
      )}
      role="alert"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-100 text-[var(--brand-danger)] flex items-center justify-center mb-4 shadow-2xs">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-danger)] mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
