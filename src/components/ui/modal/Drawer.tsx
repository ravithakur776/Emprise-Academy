"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeStyles = {
  sm: "max-w-xs",
  md: "max-w-md",
  lg: "max-w-xl",
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = "right",
  size = "md",
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const isRight = position === "right";

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div className={cn("fixed inset-y-0 flex z-10", isRight ? "right-0" : "left-0")}>
        <div
          className={cn(
            "w-screen bg-white shadow-2xl flex flex-col h-full overflow-y-auto animate-fade-in border-slate-200",
            isRight ? "border-l" : "border-r",
            sizeStyles[size]
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
            {title && (
              <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                {title}
              </h3>
            )}
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};
