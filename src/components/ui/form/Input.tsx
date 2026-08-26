import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, leftIcon, rightIcon, className, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none shrink-0">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-11 px-3.5 bg-white text-sm text-[var(--brand-text)] placeholder:text-slate-400 rounded-lg border transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            hasError
              ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
              : "border-[var(--brand-border)] hover:border-slate-300",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-slate-400 shrink-0">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder = "Select an option", hasError = false, className, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-11 pl-3.5 pr-10 bg-white text-sm text-[var(--brand-text)] rounded-lg border appearance-none transition-all duration-150 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            hasError
              ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
              : "border-[var(--brand-border)] hover:border-slate-300",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none shrink-0" />
      </div>
    );
  }
);
Select.displayName = "Select";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, className, disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full p-3.5 bg-white text-sm text-[var(--brand-text)] placeholder:text-slate-400 rounded-lg border transition-all duration-150 resize-y min-h-[90px]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
          "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
          hasError
            ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
            : "border-[var(--brand-border)] hover:border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, disabled, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex items-center gap-2.5 cursor-pointer text-sm select-none text-[var(--brand-text)]",
          disabled ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "w-4 h-4 rounded text-[var(--brand-accent)] border-[var(--brand-border)] focus:ring-[var(--brand-accent)] focus:ring-offset-1 cursor-pointer accent-[var(--brand-accent)]",
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <div className={cn("space-y-2.5", className)}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg border transition-all duration-150 cursor-pointer select-none",
            value === opt.value
              ? "border-[var(--brand-accent)] bg-orange-50/40"
              : "border-[var(--brand-border)] hover:border-slate-300 bg-white",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            disabled={disabled}
            onChange={() => onChange && onChange(opt.value)}
            className="w-4 h-4 mt-0.5 text-[var(--brand-accent)] border-[var(--brand-border)] focus:ring-[var(--brand-accent)] accent-[var(--brand-accent)] cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-[var(--brand-text)] block">
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-xs text-[var(--brand-muted)] block mt-0.5">
                {opt.description}
              </span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};
