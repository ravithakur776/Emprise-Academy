"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { NavLink } from "@/components/ui/link/NavLink";
import { Drawer } from "@/components/ui/modal/Drawer";
import { HOMEPAGE_DATA } from "@/data/homepage";
import {
  GraduationCap,
  Menu,
  ChevronDown,
  Sparkles,
  User,
  BookOpen,
  Trophy,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

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
        {/* Logo & Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-slate-700/50">
            <GraduationCap className="w-6 h-6 text-[var(--brand-accent)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--brand-primary)] leading-tight">
              EMPRISE <span className="text-[var(--brand-accent)]">ACADEMY</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--brand-muted)] tracking-wider uppercase">
              IIT-JEE • NEET • Foundation • Mathura
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[var(--brand-border)] p-2 mt-1 animate-slide-down z-50">
                <Link
                  href="/iit-jee-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[var(--brand-primary)] block">IIT-JEE Program</span>
                    <span className="text-[11px] text-[var(--brand-muted)] block">Classes 11, 12 & Droppers</span>
                  </div>
                </Link>
                <Link
                  href="/neet-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-orange-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-orange-50 text-[var(--brand-accent)] flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[var(--brand-primary)] block">NEET-UG Program</span>
                    <span className="text-[11px] text-[var(--brand-muted)] block">Medical Entrance Training</span>
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
          <NavLink href="/admissions">Admissions</NavLink>
          <NavLink href="/scholarship">Scholarship</NavLink>
          <NavLink href="/etse-2026">ETSE 2026</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/student/login">
            <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
              Student Login
            </Button>
          </Link>
          <Link href="/etse-2026">
            <Button variant="primary" size="sm">
              Register for ETSE
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/etse-2026">
            <Button variant="primary" size="sm" className="text-xs h-9 px-3">
              ETSE 2026
            </Button>
          </Link>
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile navigation menu"
            className="w-10 h-10 rounded-lg border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-primary)] hover:bg-slate-50 cursor-pointer"
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
        <div className="flex flex-col gap-4">
          <div className="space-y-1 pb-4 border-b border-slate-100">
            <Link
              href="/about"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              About Emprise
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              Academic Courses (JEE / NEET / Foundation)
            </Link>
            <Link
              href="/results"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              Results & Ranks
            </Link>
            <Link
              href="/directors"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              Meet Our Directors
            </Link>
            <Link
              href="/admissions"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              Admission Process & Counselling
            </Link>
            <Link
              href="/scholarship"
              onClick={() => setIsMobileOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
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
              className="block p-2.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-slate-50 rounded-lg"
            >
              Contact Mathura Campus
            </Link>
          </div>

          <div className="space-y-2 pt-2">
            <Link href="/student/login" onClick={() => setIsMobileOpen(false)} className="block">
              <Button variant="outline" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
                Student Portal Login
              </Button>
            </Link>
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
