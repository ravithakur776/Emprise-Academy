"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Sparkles,
  Menu,
  ChevronDown,
  User,
  LayoutDashboard,
  ArrowRight,
  Phone,
  BookOpen,
  Trophy,
  GraduationCap,
  FileText,
  MessageSquareQuote,
  X,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Supabase Auth Session
  useEffect(() => {
    const supabase = createClientBrowser();

    // Check initial auth session
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data?.user));
    });

    // Listen to live auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-xs border-b border-[var(--brand-border)]"
          : "bg-white border-b border-[var(--brand-border)]"
      )}
    >
      {/* 1. TOP ANNOUNCEMENT BAR (Deep Institutional Blue #123E73) */}
      <div className="bg-[var(--brand-primary-dark)] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-blue-900/40 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Announcement Message & Badge */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="inline-flex items-center gap-1 text-[var(--brand-accent)] font-bold uppercase tracking-wider text-[10px] bg-white/10 px-2 py-0.5 rounded shrink-0 border border-white/15">
              <Sparkles className="w-3 h-3 text-[var(--brand-accent)]" /> ETSE 2026
            </span>
            <span className="hidden md:inline truncate">
              Emprise Talent Search Examination • Exam on 6 September 2026 • 100% Free Registration Open for Classes 7th to 10th
            </span>
            <span className="md:hidden truncate">
              Exam: 6 Sept 2026 • Classes 7th–10th • FREE
            </span>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href="/etse-2026#register"
              className="text-amber-300 hover:text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="tel:+917247889955"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-xs transition-colors"
            >
              <Phone className="w-3 h-3 text-[var(--brand-accent)]" />
              <span>+91 7247889955</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (Pure White Background) */}
      <Container size="xl" className="flex items-center justify-between h-18 sm:h-20 lg:h-22 gap-2">
        {/* LEFT: Official Emprise Academy Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none py-1.5 shrink-0"
          aria-label="Emprise Academy — Home"
        >
          <EmpriseLogo
            size="lg"
            priority
            imgClassName="h-11 sm:h-12 lg:h-14 w-auto"
            className="group-hover:opacity-95 transition-opacity"
          />
        </Link>

        {/* CENTER: EXACT NAVIGATION ORDER */}
        {/* Logo -> Home -> About -> Courses -> ETSE -> Results -> Gallery -> Blog -> Testimonials -> Contact */}
        <nav
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5"
          aria-label="Main Navigation"
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <Link
              href="/courses"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 rounded-md transition-colors",
                pathname?.startsWith("/courses") ||
                  pathname?.startsWith("/iit-jee") ||
                  pathname?.startsWith("/neet") ||
                  pathname?.startsWith("/foundation")
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-semibold"
                  : "text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]/50"
              )}
            >
              <span>Courses</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  isCoursesOpen ? "rotate-180" : ""
                )}
              />
            </Link>

            {isCoursesOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[var(--brand-border)] p-2 z-50 animate-fade-in">
                <Link
                  href="/iit-jee-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      IIT-JEE (Main + Advanced)
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      Classes 11, 12 & Droppers
                    </span>
                  </div>
                </Link>

                <Link
                  href="/neet-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      NEET-UG Medical
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      NCERT Mastery & Physics
                    </span>
                  </div>
                </Link>

                <Link
                  href="/foundation-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      Foundation Classes 8–10
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      Olympiads & Early Base
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/etse-2026">ETSE</NavLink>
          <NavLink href="/results">Results</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/testimonials">Testimonials</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT: DUAL ACTION BUTTON PAIR */}
        {/* [ Student Login / Dashboard ] [ Register for ETSE ] */}
        <div className="hidden lg:flex items-center gap-2 2xl:gap-2.5 shrink-0">
          {isAuthenticated ? (
            <Link href="/student/dashboard">
              <Button
                variant="secondary"
                size="md"
                className="font-semibold text-xs 2xl:text-sm px-3.5 2xl:px-4 h-10 border-blue-300 text-[var(--brand-primary)] bg-blue-50/60 hover:bg-[var(--brand-primary-soft)] transition-colors shadow-2xs"
                leftIcon={<LayoutDashboard className="w-4 h-4 text-[var(--brand-primary)]" />}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/student/login">
              <Button
                variant="secondary"
                size="md"
                className="font-semibold text-xs 2xl:text-sm px-3.5 2xl:px-4 h-10 border-[var(--brand-border)] text-[var(--brand-primary)] bg-white hover:bg-[var(--brand-primary-soft)] hover:border-blue-300 transition-colors shadow-2xs"
                leftIcon={<User className="w-4 h-4 text-[var(--brand-primary)]" />}
              >
                Student Login
              </Button>
            </Link>
          )}

          <Link href="/etse-2026#register">
            <Button
              variant="primary"
              size="md"
              className="font-bold text-xs 2xl:text-sm px-4 2xl:px-5 h-10 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.98]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Register for ETSE
            </Button>
          </Link>
        </div>

        {/* Mobile / Tablet Actions */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/etse-2026#register">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-bold px-3 h-9 sm:h-10 bg-[var(--brand-primary)] text-white shadow-xs"
            >
              Register ETSE
            </Button>
          </Link>

          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile navigation menu"
            aria-expanded={isMobileOpen}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-text)] hover:bg-slate-50 active:bg-slate-100 cursor-pointer min-w-[44px] min-h-[44px] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </Container>

      {/* 3. MOBILE NAVIGATION DRAWER */}
      <Drawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Emprise Academy"
        position="right"
      >
        <div className="flex flex-col gap-4 p-4 text-left">
          {/* Top Notice in Drawer */}
          <div className="p-3.5 rounded-2xl bg-[var(--brand-primary-soft)] border border-blue-200/80 space-y-2">
            <div className="text-xs font-bold text-[var(--brand-primary-dark)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>ETSE 2026 — 6 Sept 2026</span>
            </div>
            <p className="text-[11px] text-[var(--brand-text-secondary)]">
              100% Free scholarship registration open for Classes 7th to 10th.
            </p>
            <Link
              href="/etse-2026#register"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] hover:underline"
            >
              <span>Register for ETSE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* EXACT NAVIGATION ORDER (Mobile Drawer) */}
          <nav className="flex flex-col gap-1 border-b border-[var(--brand-border)] pb-4 text-sm font-semibold" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Home</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/about"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>About</span>
            </Link>

            <Link
              href="/courses"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname?.startsWith("/courses")
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Courses</span>
            </Link>

            <Link
              href="/etse-2026"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/etse-2026"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>ETSE</span>
            </Link>

            <Link
              href="/results"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/results"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Results</span>
            </Link>

            <Link
              href="/gallery"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/gallery"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Gallery</span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/blog"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Blog</span>
              </span>
            </Link>

            <Link
              href="/testimonials"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/testimonials"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-slate-400" />
                <span>Testimonials</span>
              </span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/contact"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* DUAL CTA PAIR IN MOBILE DRAWER */}
          <div className="pt-2 space-y-3">
            {isAuthenticated ? (
              <Link
                href="/student/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  className="font-bold border-blue-300 text-[var(--brand-primary)] bg-blue-50/80 shadow-xs min-h-[44px]"
                  leftIcon={<LayoutDashboard className="w-4 h-4" />}
                >
                  Student Dashboard
                </Button>
              </Link>
            ) : (
              <Link
                href="/student/login"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  className="font-bold border-[var(--brand-border)] text-[var(--brand-primary)] bg-white shadow-xs min-h-[44px]"
                  leftIcon={<User className="w-4 h-4" />}
                >
                  Student Login
                </Button>
              </Link>
            )}

            <Link
              href="/etse-2026#register"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full"
            >
              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="font-bold bg-[var(--brand-primary)] text-white shadow-md min-h-[44px]"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Register for ETSE
              </Button>
            </Link>

            <a
              href="tel:+917247889955"
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl min-h-[44px] transition-colors hover:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>Call Campus: +91 7247889955</span>
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
