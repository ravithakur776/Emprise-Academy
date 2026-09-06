"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  isActive,
  className,
  children,
  ...props
}) => {
  const pathname = usePathname();
  const active =
    isActive !== undefined
      ? isActive
      : href === "/"
      ? pathname === "/"
      : pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors duration-150 py-1.5 px-3 rounded-md",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]",
        active
          ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-semibold"
          : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]/50",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
