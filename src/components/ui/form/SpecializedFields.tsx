import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X, Upload, Calendar as CalendarIcon } from "lucide-react";

export interface PhoneFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
}

export const PhoneField = React.forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ hasError = false, className, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <div className="absolute left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500 pointer-events-none shrink-0 border-r border-slate-200 pr-2.5">
          <span>🇮🇳</span>
          <span>+91</span>
        </div>
        <input
          ref={ref}
          type="tel"
          maxLength={10}
          placeholder="10-digit mobile number"
          disabled={disabled}
          className={cn(
            "w-full h-11 pl-20 pr-3.5 bg-white text-sm text-[var(--brand-text)] placeholder:text-slate-400 rounded-lg border transition-all duration-150 tracking-wider",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            hasError
              ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
              : "border-[var(--brand-border)] hover:border-slate-300",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
PhoneField.displayName = "PhoneField";

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ hasError = false, className, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center w-full">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={cn(
          "w-full h-11 pl-3.5 pr-11 bg-white text-sm text-[var(--brand-text)] placeholder:text-slate-400 rounded-lg border transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
          "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
          hasError
            ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
            : "border-[var(--brand-border)] hover:border-slate-300",
          className
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
});
PasswordField.displayName = "PasswordField";

export interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchField = React.forwardRef<
  HTMLInputElement,
  SearchFieldProps
>(({ value, onClear, className, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
      <input
        ref={ref}
        type="search"
        value={value}
        className={cn(
          "w-full h-11 pl-10 pr-10 bg-white text-sm text-[var(--brand-text)] placeholder:text-slate-400 rounded-lg border border-[var(--brand-border)] transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] hover:border-slate-300",
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
});
SearchField.displayName = "SearchField";

export interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
}

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ hasError = false, className, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          ref={ref}
          type="date"
          disabled={disabled}
          className={cn(
            "w-full h-11 pl-10 pr-3.5 bg-white text-sm text-[var(--brand-text)] rounded-lg border transition-all duration-150 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            hasError
              ? "border-[var(--brand-danger)] focus:ring-red-100 focus:border-[var(--brand-danger)]"
              : "border-[var(--brand-border)] hover:border-slate-300",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
DateField.displayName = "DateField";

export interface OTPFieldProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  hasError?: boolean;
  disabled?: boolean;
}

export const OTPField: React.FC<OTPFieldProps> = ({
  length = 6,
  value,
  onChange,
  hasError = false,
  disabled = false,
}) => {
  const handleChange = (index: number, digit: string) => {
    const cleanDigit = digit.replace(/\D/g, "").slice(-1);
    const otpArray = value.padEnd(length, " ").split("");
    otpArray[index] = cleanDigit || " ";
    const newOtp = otpArray.join("").trim();
    onChange(newOtp);

    // Auto-focus next input
    if (cleanDigit && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          id={`otp-input-${idx}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          disabled={disabled}
          value={value[idx] || ""}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={cn(
            "w-10 h-12 sm:w-12 sm:h-14 text-center font-bold text-lg sm:text-xl rounded-lg border bg-white text-[var(--brand-primary)] transition-all",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)]",
            hasError
              ? "border-[var(--brand-danger)]"
              : "border-[var(--brand-border)] hover:border-slate-300",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          aria-label={`Digit ${idx + 1} of ${length}`}
        />
      ))}
    </div>
  );
};

export interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  file?: File | null;
  onFileSelect: (file: File | null) => void;
  hasError?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSizeMB = 5,
  label = "Upload file (PDF, PNG, JPG up to 5MB)",
  file,
  onFileSelect,
  hasError = false,
}) => {
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-150 cursor-pointer bg-slate-50/60 hover:bg-slate-50",
        hasError ? "border-red-400 bg-red-50/20" : "border-slate-300 hover:border-[var(--brand-accent)]"
      )}
      onClick={() => document.getElementById("emprise-file-upload")?.click()}
    >
      <input
        id="emprise-file-upload"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0] || null;
          onFileSelect(selected);
        }}
      />
      <Upload className="w-8 h-8 text-[var(--brand-accent)] mx-auto mb-2 opacity-80" />
      {file ? (
        <div>
          <p className="text-sm font-bold text-[var(--brand-primary)]">{file.name}</p>
          <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold text-[var(--brand-primary)]">{label}</p>
          <p className="text-xs text-slate-400 mt-1">Drag and drop or click to browse</p>
        </div>
      )}
    </div>
  );
};
