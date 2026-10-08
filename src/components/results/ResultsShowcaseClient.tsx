"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Badge } from "@/components/ui/badge/Badge";
import { ResultArtwork, RESULTS_GALLERY } from "@/data/results-gallery";
import { RESULTS_DATA, ResultRecord } from "@/data/results-data";
import { ResultArtworkCard } from "./ResultArtworkCard";
import { ResultsLightbox } from "./ResultsLightbox";
import { BeyondTheRankSection } from "./BeyondTheRankSection";
import { ScorecardVerificationGateway } from "./ScorecardVerificationGateway";
import {
  Search,
  Award,
  GraduationCap,
  Calendar,
  CheckCircle2,
  X,
  FileQuestion,
  Building2,
  Trophy,
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

  const clearSearch = useCallback(() => {
    setSearchQuery("");
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

  // Filtered Foundation Items
  const filteredFoundation = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return foundationItems;
    return foundationItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keyHighlight.toLowerCase().includes(q) ||
        item.keyStudents.some((s) => s.toLowerCase().includes(q))
    );
  }, [foundationItems, searchQuery]);

  // Filtered Story Items
  const filteredStories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return storyItems;
    return storyItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keyHighlight.toLowerCase().includes(q) ||
        item.keyStudents.some((s) => s.toLowerCase().includes(q))
    );
  }, [storyItems, searchQuery]);

  // Global Search across verified student records in RESULTS_DATA
  const matchedStudentRecords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return RESULTS_DATA.filter((record) => {
      // Respect active category filter if not "all"
      if (activeCategory !== "all" && record.category !== activeCategory) {
        return false;
      }

      const matchName = record.studentName.toLowerCase().includes(q);
      const matchRank = record.rank ? String(record.rank).toLowerCase().includes(q) : false;
      const matchInst = record.institution ? record.institution.toLowerCase().includes(q) : false;
      const matchYear = record.year ? String(record.year).toLowerCase().includes(q) : false;
      const matchExam = record.examLabel.toLowerCase().includes(q);
      const matchDesc = record.description.toLowerCase().includes(q);
      const matchTags = record.tags ? record.tags.some((t) => t.toLowerCase().includes(q)) : false;

      return matchName || matchRank || matchInst || matchYear || matchExam || matchDesc || matchTags;
    });
  }, [searchQuery, activeCategory]);

  // Global Search across Artworks
  const matchedArtworks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return RESULTS_GALLERY.filter((item) => {
      // Respect active category filter if not "all"
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchHighlight = item.keyHighlight.toLowerCase().includes(q);
      const matchStudents = item.keyStudents.some((s) => s.toLowerCase().includes(q));
      const matchExam = item.examLabel.toLowerCase().includes(q);
      const matchYear = item.year ? String(item.year).toLowerCase().includes(q) : false;

      return matchTitle || matchSubtitle || matchHighlight || matchStudents || matchExam || matchYear;
    });
  }, [searchQuery, activeCategory]);

  // Total search matches count
  const totalSearchMatches = matchedStudentRecords.length + matchedArtworks.length;

  // Category labels mapping
  const categoryLabels: Record<string, string> = {
    all: "All Showcase",
    jee: "JEE Results",
    neet: "NEET Results",
    foundation: "Foundation & Boards",
    stories: "Student Stories",
    verify: "Verify Scorecard",
  };

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
    <div className="relative overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#132A52] to-slate-900 text-white pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-blue-900/40">
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

          {/* ========================================================= */}
          {/* SEARCH BAR (Clean spacing, icon alignment, no overlap)   */}
          {/* ========================================================= */}
          <div className="mt-10 sm:mt-12 max-w-2xl mx-auto px-4">
            <div className="relative flex items-center w-full shadow-2xl rounded-2xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, rank, institution, or year..."
                aria-label="Search results by student name, rank, institution, or year"
                className="w-full bg-slate-800/95 border border-slate-700/80 text-white placeholder:text-slate-400/90 text-sm sm:text-base pl-12 pr-16 py-3.5 sm:py-4 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* CATEGORY TABS (Zero clipping, wrap on desktop, scroll mobile) */}
          {/* ========================================================= */}
          <div className="w-full max-w-4xl mx-auto px-2 mt-6 sm:mt-8">
            <nav
              aria-label="Result categories"
              className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto sm:overflow-x-visible py-2 px-2 no-scrollbar scrollbar-none scroll-smooth touch-pan-x"
            >
              {[
                { id: "all", label: "Showcase" },
                { id: "jee", label: "JEE Results" },
                { id: "neet", label: "NEET Results" },
                { id: "foundation", label: "Foundation & Boards" },
                { id: "stories", label: "Student Stories" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                  }}
                  className={cn(
                    "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0",
                    activeCategory === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/30"
                      : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
                  )}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setActiveCategory("verify");
                  const el = document.getElementById("verify-scorecard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5",
                  activeCategory === "verify"
                    ? "bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30"
                    : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40"
                )}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verify Score
              </button>
            </nav>
          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* ACTIVE SEARCH RESULTS VIEW (when user types search query) */}
      {/* ========================================================= */}
      {searchQuery.trim().length > 0 ? (
        <section className="py-16 bg-slate-50 min-h-[500px]">
          <Container size="xl">
            {/* Search Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                  SEARCH FILTER ACTIVE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Results matching &ldquo;{searchQuery}&rdquo;
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Filtering across {categoryLabels[activeCategory] || "All"} &bull; Found {totalSearchMatches} result{totalSearchMatches === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Search
                </button>
              </div>
            </div>

            {/* Empty State when no results found */}
            {totalSearchMatches === 0 ? (
              <div className="text-center py-20 px-6 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-2xl mx-auto my-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <FileQuestion className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  We couldn&apos;t find any student results matching your search query in {categoryLabels[activeCategory]}. Try searching by student name, All India Rank, institution (e.g. &ldquo;IIT Bombay&rdquo;, &ldquo;AIIMS&rdquo;), or academic year.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={clearSearch}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
                  >
                    Clear Search
                  </button>
                  {activeCategory !== "all" && (
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition cursor-pointer"
                    >
                      Search All Categories
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* 1. Verified Individual Student Results Highlight Cards */}
                {matchedStudentRecords.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Verified Student Matches ({matchedStudentRecords.length})
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchedStudentRecords.map((student) => (
                        <div
                          key={student.id}
                          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <Badge
                                variant={
                                  student.category === "jee"
                                    ? "primary"
                                    : student.category === "neet"
                                    ? "accent"
                                    : "gold"
                                }
                                size="sm"
                              >
                                {student.examLabel}
                              </Badge>
                              {student.year && (
                                <span className="text-xs font-semibold text-slate-500">
                                  Batch {student.year}
                                </span>
                              )}
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 mb-1">
                              {student.studentName}
                            </h4>

                            {student.rank && (
                              <div className="inline-block bg-amber-50 text-amber-800 text-xs font-black px-2.5 py-1 rounded-md border border-amber-200/80 mb-2">
                                {student.rank}
                              </div>
                            )}

                            {student.institution && (
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
                                <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span>{student.institution}</span>
                              </div>
                            )}

                            <p className="text-xs text-slate-500 leading-relaxed">
                              {student.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Matched Creative Result Sheets */}
                {matchedArtworks.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Award className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Result Creative Sheets ({matchedArtworks.length})
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {matchedArtworks.map((item) => (
                        <ResultArtworkCard
                          key={item.id}
                          item={item}
                          onOpenLightbox={openLightbox}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>
      ) : (
        /* ========================================================= */
        /* STANDARD RESULTS PAGE CONTENT (Category-aware display)   */
        /* ========================================================= */
        <>
          {/* SECTION A: ANNUAL MASTER CREATIVES (Showcase default) */}
          {(activeCategory === "all" || activeCategory === "jee" || activeCategory === "neet") && (
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
          )}

          {/* SECTION B: JEE RESULTS SECTION */}
          {(activeCategory === "all" || activeCategory === "jee") && (
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
          )}

          {/* SECTION C: NEET RESULTS SECTION */}
          {(activeCategory === "all" || activeCategory === "neet") && (
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
          )}

          {/* SECTION D: FOUNDATION & BOARDS SECTION */}
          {(activeCategory === "all" || activeCategory === "foundation") && (
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
                  {filteredFoundation.map((item) => (
                    <ResultArtworkCard
                      key={item.id}
                      item={item}
                      onOpenLightbox={openLightbox}
                    />
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* SECTION E: BEYOND THE RANK (STUDENT STORIES & TESTIMONIALS) */}
          {(activeCategory === "all" || activeCategory === "stories") && (
            <BeyondTheRankSection
              stories={filteredStories}
              onOpenLightbox={openLightbox}
            />
          )}

          {/* SECTION F: SCORECARD VERIFICATION GATEWAY */}
          <ScorecardVerificationGateway />
        </>
      )}

      {/* ========================================================= */}
      {/* FULLSCREEN LIGHTBOX VIEWER                                */}
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
