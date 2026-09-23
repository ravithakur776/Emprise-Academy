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
  Heart,
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
              {categories.map((cat) => {
                let count = 0;
                if (cat.id === "ALL") count = VERIFIED_TESTIMONIALS.length;
                else if (cat.id === "STUDENT") count = VERIFIED_TESTIMONIALS.filter((t) => t.authorType === "STUDENT").length;
                else if (cat.id === "PARENT") count = VERIFIED_TESTIMONIALS.filter((t) => t.authorType === "PARENT").length;
                else if (cat.id === "JEE") count = VERIFIED_TESTIMONIALS.filter((t) => t.examOrClass.includes("JEE")).length;
                else if (cat.id === "NEET") count = VERIFIED_TESTIMONIALS.filter((t) => t.examOrClass.includes("NEET")).length;

                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none",
                      isActive
                        ? "bg-[#0B2545] text-white shadow-sm"
                        : "bg-white text-slate-600 border border-[var(--brand-border)] hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded-md text-[10px]",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => {
                const isParent = item.authorType === "PARENT";

                return (
                  <div
                    key={item.id}
                    className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-[var(--brand-primary)]/40 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left relative overflow-hidden group"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Stars & Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isParent ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/70">
                              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                              <span>Parent</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/70">
                              <GraduationCap className="w-3 h-3 text-blue-500" />
                              <span>Student</span>
                            </span>
                          )}

                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                            {item.examOrClass}
                          </span>
                        </div>
                      </div>

                      {/* Quote Text */}
                      <div className="relative pt-1">
                        <Quote className="w-8 h-8 text-blue-100 absolute -top-2 -left-1 -z-0 opacity-50 pointer-events-none" />
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative z-10">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Author Meta */}
                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                            isParent
                              ? "bg-rose-50 border-rose-200 text-rose-600"
                              : "bg-blue-50 border-blue-200 text-blue-600"
                          )}
                        >
                          {isParent ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            <GraduationCap className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#0B2545] truncate">
                            {item.authorName}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate" title={item.verifiedContext}>
                            {item.verifiedContext}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                      </span>
                    </div>
                  </div>
                );
              })}
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
