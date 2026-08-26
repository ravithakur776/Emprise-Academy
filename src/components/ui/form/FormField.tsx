import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  className,
  children,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-xs sm:text-sm font-semibold text-[var(--brand-primary)] flex items-center gap-1 cursor-pointer select-none"
        >
          <span>{label}</span>
          {required && <span className="text-[var(--brand-danger)]" aria-hidden="true">*</span>}
        </label>
      )}

      <div>{children}</div>

      {error ? (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          role="alert"
          className="inline-flex items-center gap-1 text-xs text-[var(--brand-danger)] font-medium mt-0.5 animate-fade-in"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p
          id={htmlFor ? `${htmlFor}-helper` : undefined}
          className="text-xs text-[var(--brand-muted)] mt-0.5"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
