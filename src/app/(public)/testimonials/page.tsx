"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { VERIFIED_TESTIMONIALS, VerifiedTestimonial } from "@/data/results";
import {
  MessageSquareQuote,
  Star,
  Quote,
  CheckCircle2,
  GraduationCap,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "ALL", label: "All Testimonials" },
  { id: "STUDENT", label: "Student Stories" },
  { id: "PARENT", label: "Parent Perspectives" },
  { id: "JEE", label: "IIT-JEE" },
  { id: "NEET", label: "NEET-UG" },
] as const;

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filtered = VERIFIED_TESTIMONIALS.filter((t) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "STUDENT") return t.authorType === "STUDENT";
    if (activeCategory === "PARENT") return t.authorType === "PARENT";
    if (activeCategory === "JEE") return t.examOrClass.includes("JEE");
    if (activeCategory === "NEET") return t.examOrClass.includes("NEET");
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#0D3B78] via-[#1769E0] to-[#0A2E63] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider">
              <MessageSquareQuote className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>COMMUNITY TRUST & REVIEWS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Student & Parent Testimonials
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Real reflections on conceptual teaching, director mentorship, small batch attention, and examination results in Mathura.
            </p>
          </Container>
        </section>

        {/* Content Section */}
        <Section variant="default" spacing="lg">
          <Container size="xl">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none",
                    activeCategory === cat.id
                      ? "bg-[var(--brand-primary)] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-[var(--brand-border)] hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Stars & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                        {item.authorType === "STUDENT" ? "Student" : "Parent"}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-blue-100 absolute -top-2 -left-1 -z-0 opacity-60" />
                      <p className="text-xs sm:text-sm text-[var(--brand-text)] leading-relaxed italic relative z-10 pt-1">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--brand-text)]">
                        {item.authorName}
                      </h4>
                      <p className="text-[11px] text-[var(--brand-text-secondary)]">
                        {item.verifiedContext}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Share Feedback / Admissions CTA */}
            <div className="mt-14 p-8 rounded-3xl bg-[var(--brand-surface-muted)] border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--brand-primary-dark)]">
                  Join Our Growing Community of Achievers
                </h3>
                <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)]">
                  Enroll in IIT-JEE, NEET-UG, or Foundation programs at Emprise Academy Mathura.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href="/contact">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Connect with Admissions
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* Global Footer */}
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
