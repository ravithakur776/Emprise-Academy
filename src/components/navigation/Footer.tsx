import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { VERIFIED_BRAND_DATA } from "@/data/brand";
import { HOMEPAGE_DATA } from "@/data/homepage";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--brand-primary)] text-slate-300 border-t border-slate-800">
      {/* Main Footer Links */}
      <Container size="xl" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent)] text-white flex items-center justify-center shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  EMPRISE <span className="text-[var(--brand-accent)]">ACADEMY</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Established {VERIFIED_BRAND_DATA.yearEstablished} • Mathura
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students in Mathura & Western UP for excellence in IIT-JEE, NEET-UG, and Foundation (Classes 8–10) with concept-based pedagogy and structured mentorship since 2011.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-3 py-1.5 rounded-md">
                ★ 15+ Years of Academic Excellence
              </span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Academic Pillars</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/iit-jee-coaching-mathura" className="hover:text-[var(--brand-accent)] transition-colors">
                  IIT-JEE (Main + Advanced)
                </Link>
              </li>
              <li>
                <Link href="/courses#neet-ug" className="hover:text-[var(--brand-accent)] transition-colors">
                  NEET-UG Medical Entrance
                </Link>
              </li>
              <li>
                <Link href="/courses#foundation" className="hover:text-[var(--brand-accent)] transition-colors">
                  Foundation (Classes 8, 9 & 10)
                </Link>
              </li>
              <li>
                <Link href="/courses#droppers" className="hover:text-[var(--brand-accent)] transition-colors">
                  Repeater & Target Batches
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Admissions & Exams</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/etse-2026" className="text-[var(--brand-accent)] font-semibold hover:underline">
                  ETSE 2026 Registration
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[var(--brand-accent)] transition-colors">
                  Results & Scorecards
                </Link>
              </li>
              <li>
                <Link href="/directors" className="hover:text-[var(--brand-accent)] transition-colors">
                  Meet the Directors
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-[var(--brand-accent)] transition-colors">
                  Faculty Mentors
                </Link>
              </li>
              <li>
                <Link href="/scholarship" className="hover:text-[var(--brand-accent)] transition-colors">
                  Scholarship Programme
                </Link>
              </li>
              <li>
                <Link href="/student/login" className="hover:text-[var(--brand-accent)] transition-colors">
                  Student Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mathura Campus Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Campus Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                <span>{HOMEPAGE_DATA.contactCampus.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                <a href={HOMEPAGE_DATA.contactCampus.phoneHref} className="hover:text-white transition-colors">
                  {HOMEPAGE_DATA.contactCampus.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                <a href={`mailto:${HOMEPAGE_DATA.contactCampus.email}`} className="hover:text-white transition-colors">
                  {HOMEPAGE_DATA.contactCampus.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                <span>{HOMEPAGE_DATA.contactCampus.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2011–{new Date().getFullYear()} Emprise Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Terms of Admission
            </Link>
            <a
              href={HOMEPAGE_DATA.contactCampus.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>Google Maps Directions</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export const MobileBottomCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[var(--brand-border)] p-2.5 shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={HOMEPAGE_DATA.contactCampus.phoneHref}
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 text-[var(--brand-primary)] border border-slate-200 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[var(--brand-primary)] mb-0.5" />
          <span className="text-[11px] font-bold">Call Campus</span>
        </a>
        <a
          href={HOMEPAGE_DATA.admissionsCta.whatsappAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 active:scale-95 transition-transform"
        >
          <span className="text-xs mb-0.5">💬</span>
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>
        <Link
          href="/etse-2026"
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-[var(--brand-accent)] text-white font-bold active:scale-95 transition-transform shadow-xs"
        >
          <span className="text-[11px] font-extrabold uppercase">ETSE 2026</span>
          <span className="text-[9px] opacity-90">Apply Free</span>
        </Link>
      </div>
    </div>
  );
};
