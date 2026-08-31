"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { NavLink } from "@/components/ui/link/NavLink";
import { Drawer } from "@/components/ui/modal/Drawer";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { createClientBrowser } from "@/lib/supabase/client";
import {
  GraduationCap,
  Menu,
  ChevronDown,
  Sparkles,
  User,
  BookOpen,
  Trophy,
  LayoutDashboard,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClientBrowser();

    // Check initial auth session
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data?.user));
    });

    // Listen to live auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[var(--brand-border)] transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[var(--brand-primary)] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium">
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-[var(--brand-accent-light)] font-bold">
            <Sparkles className="w-3.5 h-3.5 shrink-0" /> {HOMEPAGE_DATA.announcement.badge}:
          </span>
          <span className="hidden sm:inline">{HOMEPAGE_DATA.announcement.text}</span>
          <span className="sm:hidden">Exam: 6 Sept 2026 • Classes 7th–10th • FREE</span>
          <Link
            href={HOMEPAGE_DATA.announcement.ctaHref}
            className="underline text-orange-200 hover:text-white font-semibold ml-1 shrink-0"
          >
            {HOMEPAGE_DATA.announcement.ctaText}
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <Container size="xl" className="flex items-center justify-between h-16 sm:h-20">
        {/* Logo & Brand Identity (Clicking Logo returns to /) */}
        <Link href="/" className="flex items-center gap-2 group select-none py-1" aria-label="Emprise Academy — Home">
          <EmpriseLogo size="md" priority className="group-hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop Navigation Links (with prominent Home link) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button
              className="inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 rounded-md text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface-muted)] transition-colors cursor-pointer"
              aria-expanded={isCoursesOpen}
            >
              <span>Courses</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-150", isCoursesOpen ? "rotate-180" : "")} />
            </button>

            {isCoursesOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-[var(--brand-border)] p-2 z-50 animate-fade-in">
                <Link
                  href="/iit-jee-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[var(--brand-primary)] block">IIT-JEE (Main & Adv)</span>
                    <span className="text-[11px] text-[var(--brand-muted)] block">Classes 11, 12 & Droppers</span>
                  </div>
                </Link>
                <Link
                  href="/neet-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[var(--brand-primary)] block">NEET (UG) Medical</span>
                    <span className="text-[11px] text-[var(--brand-muted)] block">Comprehensive Biology & Physics</span>
                  </div>
                </Link>
                <Link
                  href="/foundation-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[var(--brand-primary)] block">Foundation Program</span>
                    <span className="text-[11px] text-[var(--brand-muted)] block">Classes 8, 9 & 10 Olympiads</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/results">Results</NavLink>
          <NavLink href="/directors">Directors</NavLink>
          <NavLink href="/admissions">Admissions</NavLink>
          <NavLink href="/scholarship">Scholarship</NavLink>
          <NavLink href="/etse-2026">ETSE 2026</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/student/dashboard">
              <Button variant="outline" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4 text-[var(--brand-accent)]" />}>
                Student Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/student/login">
              <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
                Student Login
              </Button>
            </Link>
          )}
          <Link href="/etse-2026">
            <Button variant="primary" size="sm">
              Register for ETSE
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/etse-2026">
            <Button variant="primary" size="sm" className="text-xs h-10 px-3 font-bold">
              ETSE 2026
            </Button>
          </Link>
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile navigation menu"
            aria-expanded={isMobileOpen}
            className="w-11 h-11 rounded-xl border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-primary)] hover:bg-slate-50 active:bg-slate-100 cursor-pointer min-w-[44px] min-h-[44px]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Navigation Menu"
        position="right"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1 border-b border-[var(--brand-border)] pb-4">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/"
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/about")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              About Us
            </Link>
            <Link
              href="/iit-jee-coaching-mathura"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/iit-jee")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              IIT-JEE (Main & Advanced)
            </Link>
            <Link
              href="/neet-coaching-mathura"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/neet")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              NEET (UG) Medical
            </Link>
            <Link
              href="/foundation-coaching-mathura"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/foundation")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Foundation (Classes 8–10)
            </Link>
            <Link
              href="/results"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/results")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Results & Ranks
            </Link>
            <Link
              href="/directors"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/directors")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Meet Our Directors
            </Link>
            <Link
              href="/admissions"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/admissions")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Admission Process & Counselling
            </Link>
            <Link
              href="/scholarship"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname?.startsWith("/scholarship")
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Scholarship Slabs
            </Link>
            <Link
              href="/etse-2026"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-bold text-[var(--brand-accent)] bg-orange-50/60 rounded-lg"
            >
              ETSE 2026 Talent Search
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block p-2.5 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/contact"
                  ? "text-[var(--brand-accent)] bg-orange-50 font-bold"
                  : "text-[var(--brand-primary)] hover:bg-slate-50"
              )}
            >
              Contact Mathura Campus
            </Link>
          </div>

          <div className="space-y-2 pt-2">
            {isAuthenticated ? (
              <Link href="/student/dashboard" onClick={() => setIsMobileOpen(false)} className="block">
                <Button variant="outline" size="md" fullWidth leftIcon={<LayoutDashboard className="w-4 h-4 text-[var(--brand-accent)]" />}>
                  My Student Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/student/login" onClick={() => setIsMobileOpen(false)} className="block">
                <Button variant="outline" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
                  Student Portal Login
                </Button>
              </Link>
            )}
            <Link href="/etse-2026" onClick={() => setIsMobileOpen(false)} className="block">
              <Button variant="primary" size="md" fullWidth>
                Register for ETSE 2026
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
