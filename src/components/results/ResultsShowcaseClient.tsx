"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/form/Input";
import { ResultArtwork, RESULTS_GALLERY } from "@/data/results-gallery";
import { ResultArtworkCard } from "./ResultArtworkCard";
import { ResultsLightbox } from "./ResultsLightbox";
import { BeyondTheRankSection } from "./BeyondTheRankSection";
import { ScorecardVerificationGateway } from "./ScorecardVerificationGateway";
import {
  Trophy,
  Search,
  Sparkles,
  Award,
  GraduationCap,
  BookOpen,
  Filter,
  Maximize2,
  Calendar,
  Layers,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ResultsShowcaseClient: React.FC = () => {
  // Navigation & Filter States
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [jeeYearFilter, setJeeYearFilter] = useState<string>("ALL");
  const [neetYearFilter, setNeetYearFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeArtwork, setActiveArtwork] = useState<ResultArtwork | null>(null);

  // Featured Spotlight Tab (JEE vs NEET)
  const [featuredTab, setFeaturedTab] = useState<"jee" | "neet">("jee");

  const openLightbox = useCallback((item: ResultArtwork) => {
    setActiveArtwork(item);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Split gallery by categories
  const jeeItems = useMemo(
    () => RESULTS_GALLERY.filter((item) => item.category === "jee"),
    []
  );
  const neetItems = useMemo(
    () => RESULTS_GALLERY.filter((item) => item.category === "neet"),
    []
  );
  const foundationItems = useMemo(
    () => RESULTS_GALLERY.filter((item) => item.category === "foundation"),
    []
  );
  const storyItems = useMemo(
    () => RESULTS_GALLERY.filter((item) => item.category === "stories"),
    []
  );

  // Dynamic Year filters based on source data
  const jeeYears = useMemo(() => {
    return ["ALL", "2025", "2024", "2023", "2022", "2021", "Archive"];
  }, []);

  const neetYears = useMemo(() => {
    return ["ALL", "2025", "2024", "2023", "2022", "2020", "Archive"];
  }, []);

  // Filtered JEE Items
  const filteredJee = useMemo(() => {
    return jeeItems.filter((item) => {
      const matchYear =
        jeeYearFilter === "ALL" ||
        (jeeYearFilter === "Archive"
          ? !item.year || item.year < 2021
          : String(item.year) === jeeYearFilter);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keyHighlight.toLowerCase().includes(q) ||
        item.keyStudents.some((s) => s.toLowerCase().includes(q));

      return matchYear && matchSearch;
    });
  }, [jeeItems, jeeYearFilter, searchQuery]);

  // Filtered NEET Items
  const filteredNeet = useMemo(() => {
    return neetItems.filter((item) => {
      const matchYear =
        neetYearFilter === "ALL" ||
        (neetYearFilter === "Archive"
          ? !item.year || item.year < 2020
          : String(item.year) === neetYearFilter);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keyHighlight.toLowerCase().includes(q) ||
        item.keyStudents.some((s) => s.toLowerCase().includes(q));

      return matchYear && matchSearch;
    });
  }, [neetItems, neetYearFilter, searchQuery]);

  // Featured Master Results for Spotlight (2025, 2024, 2023, 2022)
  const featuredJeeList = useMemo(
    () => jeeItems.filter((it) => it.isFeatured),
    [jeeItems]
  );
  const featuredNeetList = useMemo(
    () => neetItems.filter((it) => it.isFeatured),
    [neetItems]
  );

  return (
    <div className="relative">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#132A52] to-slate-900 text-white pt-24 pb-20 sm:pt-28 sm:pb-24 border-b border-blue-900/40">
        {/* Subtle Background Glow Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <Container size="xl" className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-5">
            <Badge
              variant="gold"
              size="md"
              className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-4 py-1.5 uppercase font-bold tracking-widest text-xs"
            >
              STUDENT ACHIEVEMENTS
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Results That Speak For Themselves
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Real students. Real achievements. Years of disciplined preparation and academic excellence in Mathura.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block text-2xl font-black text-amber-400">AIR 404</span>
                <span className="text-xs text-slate-300">IIT Bombay (JEE Adv)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block text-2xl font-black text-emerald-400">AIR 458</span>
                <span className="text-xs text-slate-300">AIIMS Raebareli (NEET)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block text-2xl font-black text-amber-400">99.4%</span>
                <span className="text-xs text-slate-300">CBSE All India 3rd</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block text-2xl font-black text-emerald-400">AIR 7</span>
                <span className="text-xs text-slate-300">Maths Olympiad (RMO)</span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Navigation */}
          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {/* Live Search */}
            <div className="relative">
              <Input
                placeholder="Search by student name, rank, institution, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5 text-slate-400" />}
                className="w-full bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 text-sm sm:text-base py-3 sm:py-3.5 px-4 rounded-2xl shadow-xl focus:border-blue-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Navigation Bar */}
            <nav
              aria-label="Result categories"
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar"
            >
              {[
                { id: "all", label: "All Showcase" },
                { id: "jee", label: "JEE Results" },
                { id: "neet", label: "NEET Results" },
                { id: "foundation", label: "Foundation & Boards" },
                { id: "stories", label: "Student Stories" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    if (tab.id !== "all") {
                      const el = document.getElementById(tab.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer",
                    activeCategory === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
                  )}
                >
                  {tab.label}
                </button>
              ))}

              <a
                href="#verify-scorecard"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verify Scorecard
              </a>
            </nav>
          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 2. FEATURED RESULTS SPOTLIGHT                             */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="accent" size="sm" className="mb-2">
                ANNUAL MASTER CREATIVES
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Annual Results
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Official verified annual result sheets celebrating consecutive years of top ranks.
              </p>
            </div>

            {/* Featured Tab Switcher */}
            <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-2xl self-start md:self-auto">
              <button
                onClick={() => setFeaturedTab("jee")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  featuredTab === "jee"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                JEE Master Creatives
              </button>
              <button
                onClick={() => setFeaturedTab("neet")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  featuredTab === "neet"
                    ? "bg-white text-emerald-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Award className="w-4 h-4 text-emerald-600" />
                NEET Master Creatives
              </button>
            </div>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(featuredTab === "jee" ? featuredJeeList : featuredNeetList).map(
              (item, idx) => (
                <ResultArtworkCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={openLightbox}
                  priority={idx < 2}
                />
              )
            )}
          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 3. JEE RESULTS SECTION                                    */}
      {/* ========================================================= */}
      <section id="jee" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-24">
        <Container size="xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-700 uppercase mb-2">
                <GraduationCap className="w-4 h-4" />
                ENGINEERING ENTRANCE ACHIEVEMENTS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                JEE Results
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Celebrating students who turned disciplined preparation into exceptional achievements across IITs, IIPE, and NITs.
              </p>
            </div>

            {/* Year Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Year:
              </span>
              {jeeYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setJeeYearFilter(yr)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap",
                    jeeYearFilter === yr
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  )}
                >
                  {yr === "ALL" ? "All Years" : yr}
                </button>
              ))}
            </div>
          </div>

          {/* JEE Results Gallery Grid */}
          {filteredJee.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-sm text-slate-500">No JEE results match the selected filter criteria.</p>
              <button
                onClick={() => {
                  setJeeYearFilter("ALL");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredJee.map((item) => (
                <ResultArtworkCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 4. NEET RESULTS SECTION                                   */}
      {/* ========================================================= */}
      <section id="neet" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 scroll-mt-24">
        <Container size="xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-700 uppercase mb-2">
                <Award className="w-4 h-4" />
                MEDICAL ENTRANCE EXCELLENCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                NEET Results
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Celebrating dedication, discipline and achievement in medical entrance preparation across AIIMS, KGMU, and Government Medical Colleges.
              </p>
            </div>

            {/* Year Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Year:
              </span>
              {neetYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setNeetYearFilter(yr)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap",
                    neetYearFilter === yr
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                  )}
                >
                  {yr === "ALL" ? "All Years" : yr}
                </button>
              ))}
            </div>
          </div>

          {/* NEET Results Gallery Grid */}
          {filteredNeet.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-sm text-slate-500">No NEET results match the selected filter criteria.</p>
              <button
                onClick={() => {
                  setNeetYearFilter("ALL");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNeet.map((item) => (
                <ResultArtworkCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 5. FOUNDATION & ACADEMIC ACHIEVEMENTS                     */}
      {/* ========================================================= */}
      <section id="foundation" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-24">
        <Container size="xl">
          <div className="max-w-3xl mb-12">
            <Badge variant="gold" size="sm" className="mb-2">
              FOUNDATION & BOARDS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Foundation & Academic Achievements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Early conceptual rigor demonstrated in CBSE Class 10 Board exams, National Talent Search Examination (NTSE), and Regional Mathematics Olympiads (RMO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {foundationItems.map((item) => (
              <ResultArtworkCard
                key={item.id}
                item={item}
                onOpenLightbox={openLightbox}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 6. BEYOND THE RANK (STUDENT STORIES & TESTIMONIALS)       */}
      {/* ========================================================= */}
      <BeyondTheRankSection
        stories={storyItems}
        onOpenLightbox={openLightbox}
      />

      {/* ========================================================= */}
      {/* 7. OFFICIAL SCORECARD VERIFICATION GATEWAY               */}
      {/* ========================================================= */}
      <ScorecardVerificationGateway />

      {/* ========================================================= */}
      {/* 8. FULLSCREEN LIGHTBOX VIEWER                             */}
      {/* ========================================================= */}
      <ResultsLightbox
        isOpen={lightboxOpen}
        activeItem={activeArtwork}
        items={RESULTS_GALLERY}
        onClose={closeLightbox}
        onSelect={setActiveArtwork}
      />
    </div>
  );
};
