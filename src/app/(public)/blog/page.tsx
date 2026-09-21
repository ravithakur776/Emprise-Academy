"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Button } from "@/components/ui/button/Button";
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  X,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  OFFICIAL_BLOG_POSTS,
  BlogPost,
  BlogCategory,
} from "@/data/blog";

const FILTER_CATEGORIES = [
  "All",
  "IIT-JEE",
  "NEET-UG",
  "Foundation",
  "Institute Guidance",
] as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickPreviewPost, setQuickPreviewPost] = useState<BlogPost | null>(null);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return OFFICIAL_BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.highlights.some((h) => h.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured Lead Post (First featured post in the current filtered set or overall)
  const featuredPost = useMemo(() => {
    if (activeCategory === "All" && searchQuery === "") {
      return OFFICIAL_BLOG_POSTS.find((p) => p.featured) || OFFICIAL_BLOG_POSTS[0];
    }
    return null;
  }, [activeCategory, searchQuery]);

  // Secondary Posts (Excluding featured lead when on "All" view)
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  // Helper for category badge styling
  const getCategoryStyles = (category: BlogCategory) => {
    switch (category) {
      case "IIT-JEE":
        return "bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100";
      case "NEET-UG":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100";
      case "Foundation":
        return "bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100";
      case "Institute Guidance":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#0B2748] via-[#123E73] to-[#1769E0] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>ACADEMIC GUIDANCE & RESEARCH • {OFFICIAL_BLOG_POSTS.length} OFFICIAL GUIDES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Blog & Study Resources
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Pedagogical insights, subject strategy breakdowns, board exam harmonization, and competitive entrance blueprints authored directly by Emprise Academy Directors and Faculty.
            </p>
          </Container>
        </section>

        {/* Blog Content Section */}
        <Section variant="default" spacing="lg" className="bg-white">
          <Container size="xl">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--brand-border)]">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {FILTER_CATEGORIES.map((cat) => {
                  const count =
                    cat === "All"
                      ? OFFICIAL_BLOG_POSTS.length
                      : OFFICIAL_BLOG_POSTS.filter((p) => p.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
                        isActive
                          ? "bg-[#0B2748] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
                      )}
                    >
                      <span>{cat}</span>
                      <span
                        className={cn(
                          "px-1.5 py-0.2 rounded-md text-[10px]",
                          isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by topic, exam or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-[var(--brand-border)] bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-slate-900 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* FEATURED LEAD ARTICLE (Shown when no search/filters active) */}
            {featuredPost && (
              <div className="mb-10 sm:mb-12">
                <div className="group relative rounded-3xl bg-gradient-to-br from-[#0B2748] via-[#123E73] to-[#1769E0] text-white p-6 sm:p-10 shadow-lg overflow-hidden border border-blue-300/30 text-left">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/90 text-[#0B2748] shadow-xs">
                          <Sparkles className="w-3.5 h-3.5" /> Featured Guide
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
                          {featuredPost.category}
                        </span>
                        <span className="text-xs text-blue-200">
                          {featuredPost.readTime} • {featuredPost.publishDate}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        {featuredPost.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-normal">
                        {featuredPost.excerpt}
                      </p>

                      {/* Author Tag */}
                      <div className="pt-2 flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 shadow-xs bg-white shrink-0">
                          <Image
                            src={featuredPost.author.photoUrl}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            By {featuredPost.author.name}
                          </p>
                          <p className="text-[11px] text-blue-200">
                            {featuredPost.author.title}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <Button
                            variant="accent"
                            size="md"
                            className="font-bold shadow-md"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            Read Full Guide
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={() => setQuickPreviewPost(featuredPost)}
                          className="font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          Quick Takeaways
                        </Button>
                      </div>
                    </div>

                    {/* Key Stats Preview Card */}
                    {featuredPost.keyStats && (
                      <div className="w-full lg:w-80 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3.5 shrink-0 text-left">
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          Key Factsheet
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {featuredPost.keyStats.map((stat, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <p className="text-[10px] text-blue-200 uppercase font-semibold">
                                {stat.label}
                              </p>
                              <p className="text-sm sm:text-base font-extrabold text-white">
                                {stat.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-white/10 text-[11px] text-slate-200">
                          Verified data sourced from official NIRF and placement reports.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES GRID */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {gridPosts.map((post) => {
                  const catClass = getCategoryStyles(post.category);
                  return (
                    <article
                      key={post.id}
                      className="group p-6 sm:p-7 rounded-3xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/45 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Header: Category Badge & Read Time */}
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
                              catClass
                            )}
                          >
                            {post.category}
                          </span>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`} className="block">
                          <h3 className="text-base sm:text-lg font-bold text-[#0B2748] group-hover:text-[var(--brand-primary)] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Author Byline */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            <Image
                              src={post.author.photoUrl}
                              alt={post.author.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {post.author.name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {post.author.role}
                            </p>
                          </div>
                        </div>

                        {/* Key Highlights Bullet Preview */}
                        <div className="pt-3 border-t border-slate-100 space-y-1.5">
                          {post.highlights.slice(0, 2).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-[11px] text-slate-600"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1 leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setQuickPreviewPost(post)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          Quick View
                        </button>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:text-[#0B2748] transition-colors"
                        >
                          <span>Read Guide</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty Search State */
              <div className="py-16 text-center space-y-3 bg-slate-50 rounded-3xl border border-slate-200">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Articles Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No blog articles matched your search query &ldquo;{searchQuery}&rdquo;. Try clearing filters or searching for terms like &ldquo;IIT&rdquo;, &ldquo;NEET&rdquo;, or &ldquo;Foundation&rdquo;.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-2"
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Academic Mentorship Consultation Banner */}
            <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[var(--brand-surface-muted)] border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xs">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[var(--brand-primary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Free Diagnostic Consultation
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2748]">
                  Need Personalized Guidance for JEE or NEET 2026–27?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  Schedule a complimentary 1-on-1 counseling session with Director Rakesh Kumar and Director Sushil Dagur at our Mathura campus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto font-bold shadow-xs" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Book Free Counseling
                  </Button>
                </Link>
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto font-bold border border-slate-300">
                    Explore Batches
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Quick Preview Modal Dialog */}
        {quickPreviewPost && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setQuickPreviewPost(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 text-left relative animate-fade-in max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0B2748] via-[#123E73] to-[#1769E0] text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/20">
                    {quickPreviewPost.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickPreviewPost(null)}
                    className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {quickPreviewPost.title}
                </h2>

                <div className="flex items-center gap-3 mt-3 text-xs text-blue-200">
                  <span>By {quickPreviewPost.author.name}</span>
                  <span>•</span>
                  <span>{quickPreviewPost.publishDate}</span>
                  <span>•</span>
                  <span>{quickPreviewPost.readTime}</span>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1 text-slate-800">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {quickPreviewPost.excerpt}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Core Academic Takeaways
                  </h4>
                  {quickPreviewPost.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Key Stats if available */}
                {quickPreviewPost.keyStats && (
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {quickPreviewPost.keyStats.map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-0.5">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">{stat.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-[#0B2748]">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <Link href={`/blog/${quickPreviewPost.slug}`}>
                  <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Read Complete Full Article
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={() => setQuickPreviewPost(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Institutional Footer */}
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
