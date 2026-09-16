"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Building2, Trophy, Users, ArrowRight } from "lucide-react";
import { ABOUT_NAV_HEADER, ABOUT_MENU_ITEMS, AboutMenuItem } from "@/data/aboutNav";

const ABOUT_ICONS = {
  Building2,
  Trophy,
  Users,
};

export interface AboutDropdownItemProps {
  item: AboutMenuItem;
  onItemClick?: () => void;
}

export const AboutDropdownItem: React.FC<AboutDropdownItemProps> = ({
  item,
  onItemClick,
}) => {
  const pathname = usePathname();
  const Icon = ABOUT_ICONS[item.iconName];

  // Destination active check
  const isTargetActive =
    item.href === "/about"
      ? pathname === "/about"
      : pathname === item.href || pathname?.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onItemClick}
      className={cn(
        "group flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 text-left outline-hidden select-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
        isTargetActive
          ? "bg-[#EEF5FF] border-[#B8D5FA] shadow-2xs"
          : "bg-white border-transparent hover:bg-[#EEF5FF] hover:border-[#E3EAF3]"
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-150",
          isTargetActive
            ? "bg-[var(--brand-primary)] text-white"
            : "bg-[#EEF5FF] text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-[var(--brand-primary)] transition-colors shrink-0">
              {item.number}
            </span>
            <span
              className={cn(
                "text-xs sm:text-[13px] font-bold truncate transition-colors duration-150",
                isTargetActive
                  ? "text-[var(--brand-primary)]"
                  : "text-[#14213D] group-hover:text-[var(--brand-primary)]"
              )}
            >
              {item.title}
            </span>
          </div>

          <ArrowRight
            className={cn(
              "w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--brand-primary)] shrink-0 transition-transform duration-150",
              "group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            )}
          />
        </div>

        <p className="text-[11px] leading-relaxed text-[#667085] line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
};

export interface AboutDropdownProps {
  isOpen: boolean;
  onItemClick?: () => void;
  className?: string;
}

export const AboutDropdown: React.FC<AboutDropdownProps> = ({
  isOpen,
  onItemClick,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="menu"
      aria-label="About Menu"
      className={cn(
        "absolute top-full left-0 pt-2 z-50",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        "motion-reduce:animate-none",
        className
      )}
    >
      <div className="w-[360px] sm:w-[380px] bg-white rounded-2xl shadow-xl border border-[#E3EAF3] p-3.5 relative overflow-hidden">
        {/* Subtle decorative top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[var(--brand-primary)] via-blue-400 to-[var(--brand-accent)]" />

        {/* Dropdown Header */}
        <div className="px-2 pt-1.5 pb-2.5 mb-1.5 border-b border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--brand-primary)] block">
            {ABOUT_NAV_HEADER.title}
          </span>
          <p className="text-[11px] text-[#667085] leading-snug">
            {ABOUT_NAV_HEADER.subtitle}
          </p>
        </div>

        {/* 3 Dropdown Items */}
        <div className="flex flex-col gap-1">
          {ABOUT_MENU_ITEMS.map((item) => (
            <AboutDropdownItem
              key={item.id}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
