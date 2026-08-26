import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, ExternalLink } from "lucide-react";

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  color?: "primary" | "accent" | "muted" | "white";
  children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  isExternal = false,
  color = "accent",
  className,
  children,
  ...props
}) => {
  const colorMap = {
    primary: "text-[var(--brand-primary)] hover:underline",
    accent: "text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] hover:underline",
    muted: "text-[var(--brand-muted)] hover:text-[var(--brand-text)] hover:underline",
    white: "text-white/90 hover:text-white hover:underline",
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 font-medium transition-colors duration-150 cursor-pointer",
          colorMap[color],
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center font-medium transition-colors duration-150 cursor-pointer",
        colorMap[color],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export interface ArrowLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-all duration-150 cursor-pointer",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
    </Link>
  );
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs sm:text-sm text-[var(--brand-muted)]", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--brand-primary)] transition-colors duration-150 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? "font-semibold text-[var(--brand-primary)]" : "")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
