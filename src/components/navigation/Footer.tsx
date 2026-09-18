import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export const Footer: React.FC = () => {
  const business = CANONICAL_BUSINESS_CONFIG;
  const contact = HOMEPAGE_DATA.contactCampus;

  const phone = "+91 7247889955";
  const phoneSecondary = "+91 9634448800";
  const email = "info@empriseacademy.com";
  const hours = "10 AM – 7 PM";
  const directionsUrl = contact.directionsUrl;

  return (
    <footer className="bg-[var(--brand-primary-dark)] text-slate-300 border-t border-blue-900/50">
      {/* Main Institutional Footer Links */}
      <Container size="xl" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand Identity & Verified Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block select-none group"
              aria-label="Emprise Academy — Home"
            >
              <EmpriseLogo variant="on-dark" size="lg" className="group-hover:opacity-95 transition-opacity" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Empowering students in Mathura & Western UP for excellence in IIT-JEE (Main + Advanced), NEET-UG, and Foundation (Classes 8–10) with concept-based pedagogy and structured mentorship since 2011.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-3 py-1.5 rounded-md">
                ★ 15+ Years of Academic Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-md">
                Est. 2011 • Mathura
              </span>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={business.social.instagram || "https://instagram.com/empriseacademy"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Emprise Academy on Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--brand-primary)] hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-white/15 text-xs font-bold"
              >
                IG
              </a>
              <a
                href={business.social.facebook || "https://facebook.com/empriseacademy"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Emprise Academy on Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--brand-primary)] hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-white/15 text-xs font-bold"
              >
                FB
              </a>
              <a
                href={business.social.youtube || "https://youtube.com/@empriseacademy"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Emprise Academy on YouTube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-white/15 text-xs font-bold"
              >
                YT
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (EXACT SPECIFICATION) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--brand-accent)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[var(--brand-accent)] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/etse-2026" className="hover:text-[var(--brand-accent)] transition-colors">
                  ETSE
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[var(--brand-accent)] transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[var(--brand-accent)] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--brand-accent)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[var(--brand-accent)] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/student/login" className="hover:text-[var(--brand-accent)] transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--brand-accent)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programmes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Academic Streams
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/iit-jee-coaching-mathura" className="hover:text-[var(--brand-accent)] transition-colors">
                  IIT-JEE (Main + Advanced)
                </Link>
              </li>
              <li>
                <Link href="/neet-coaching-mathura" className="hover:text-[var(--brand-accent)] transition-colors">
                  NEET-UG Medical Entrance
                </Link>
              </li>
              <li>
                <Link href="/foundation-coaching-mathura" className="hover:text-[var(--brand-accent)] transition-colors">
                  Foundation (Classes 8, 9 & 10)
                </Link>
              </li>
              <li>
                <Link href="/scholarship" className="hover:text-[var(--brand-accent)] transition-colors">
                  Scholarship Programs
                </Link>
              </li>
              <li>
                <Link href="/directors" className="hover:text-[var(--brand-accent)] transition-colors">
                  Academic Leadership
                </Link>
              </li>
              <li>
                <Link href="/etse-2026#register" className="hover:text-[var(--brand-accent)] text-[var(--brand-accent)] font-semibold transition-colors">
                  Register for ETSE 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Coordinates */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Mathura Campus
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                <span>
                  Near Tera Tower, Bhuteshwar Road, Mathura, Uttar Pradesh, 281004
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="block hover:text-white font-semibold">
                    {phone}
                  </a>
                  <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="block hover:text-white text-slate-400">
                    {phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                <span>Working Hours: {hours}</span>
              </div>

              <div className="pt-1">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-accent-light)] hover:underline"
                >
                  <span>Get Campus Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Legal Copyright Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <Container size="xl" className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Emprise Academy. All rights reserved. Mathura, Uttar Pradesh.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="hover:text-slate-200 text-slate-500 transition-colors">
              Staff Portal
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export const MobileBottomCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[var(--brand-border)] p-3 lg:hidden shadow-lg pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="tel:+917247889955"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--brand-border)] bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[var(--brand-text)]"
        >
          <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
          <span>Call Now</span>
        </a>
        <Link
          href="/etse-2026#register"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-xs font-bold text-white shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Register ETSE</span>
        </Link>
      </div>
    </div>
  );
};
