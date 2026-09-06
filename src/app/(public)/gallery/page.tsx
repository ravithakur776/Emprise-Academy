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
import { HOMEPAGE_DATA, GalleryItem } from "@/data/homepage";
import {
  Image as ImageIcon,
  Building2,
  BookOpen,
  Trophy,
  Users,
  Sparkles,
  X,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const allGalleryItems: GalleryItem[] = [
  ...HOMEPAGE_DATA.galleryItems,
  {
    id: "gal-7",
    title: "Physics & Chemistry Demonstration Lab",
    category: "Campus",
    caption: "Practical experimental demonstration spaces for visual learning and conceptual clarity.",
    aspect: "landscape",
  },
  {
    id: "gal-8",
    title: "Class 11 Foundation Batch in Session",
    category: "Classrooms",
    caption: "Engaged students taking down critical derivations and problem notes.",
    aspect: "landscape",
  },
  {
    id: "gal-9",
    title: "Annual Merit Felicitation Ceremony",
    category: "Events",
    caption: "Honoring top rankers of JEE and NEET with trophies and merit scholarships.",
    aspect: "landscape",
  },
  {
    id: "gal-10",
    title: "Peer Group Discussions & DPP Solving",
    category: "Students",
    caption: "Collaborative study culture in our dedicated campus library.",
    aspect: "landscape",
  },
  {
    id: "gal-11",
    title: "Director Mentorship & Strategy Clinic",
    category: "Activities",
    caption: "Personalized academic counselling and performance tracking sessions.",
    aspect: "landscape",
  },
  {
    id: "gal-12",
    title: "Mathura Campus Admissions & Reception Desk",
    category: "Campus",
    caption: "Welcoming parents and aspirants for batch admissions and course counselling.",
    aspect: "landscape",
  },
];

const categories = ["All", "Campus", "Classrooms", "Events", "Students", "Activities"] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? allGalleryItems
      : allGalleryItems.filter((item) => item.category === activeCategory);

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
              <ImageIcon className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>OFFICIAL CAMPUS ARCHIVE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Campus & Academic Gallery
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
              A visual glimpse into our classrooms, library facilities, examination sessions, and student life at Emprise Academy Mathura.
            </p>
          </Container>
        </section>

        {/* Gallery Content Section */}
        <Section variant="default" spacing="lg">
          <Container size="xl">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none",
                    activeCategory === cat
                      ? "bg-[var(--brand-primary)] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-[var(--brand-border)] hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedItem(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/50 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col cursor-pointer"
                >
                  <div className="relative h-56 bg-gradient-to-br from-[#0D3B78] via-[#1769E0] to-[#0A2E63] p-6 flex flex-col justify-between text-white overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-accent)]/15 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/20">
                        {item.category}
                      </span>

                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                        {item.category === "Campus" && <Building2 className="w-4 h-4" />}
                        {item.category === "Classrooms" && <BookOpen className="w-4 h-4" />}
                        {item.category === "Events" && <Trophy className="w-4 h-4" />}
                        {item.category === "Students" && <Users className="w-4 h-4" />}
                        {item.category === "Activities" && <Sparkles className="w-4 h-4" />}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                      {item.caption}
                    </p>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[var(--brand-primary)]">
                      <span>Mathura Campus</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Click to View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Campus Visit Banner */}
            <div className="mt-14 p-8 rounded-3xl bg-[var(--brand-surface-muted)] border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--brand-primary-dark)]">
                  Experience Our Campus in Person
                </h3>
                <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)]">
                  Visit our admissions office near Tera Tower, Bhuteshwar Road, Mathura for guided classroom tours.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href="/contact">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Plan a Campus Visit
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 text-left relative animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[#0D3B78] via-[#1769E0] to-[#0A2E63] p-8 flex flex-col justify-between text-white">
                <button
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-white border border-white/20 self-start">
                  {selectedItem.category}
                </span>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--brand-accent)]" /> Emprise Academy, Bhuteshwar Road, Mathura
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-sm text-[var(--brand-text)] leading-relaxed">
                  {selectedItem.caption}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Official Institutional Facility</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
