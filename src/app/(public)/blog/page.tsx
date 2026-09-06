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
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Compass,
  GraduationCap,
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "JEE Strategy" | "NEET Preparation" | "Foundation Base" | "Study Tips" | "Exam Updates";
  publishDate: string;
  readTime: string;
  excerpt: string;
  author: string;
  highlights: string[];
}

const verifiedBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "physics-problem-solving-framework-jee",
    title: "How to Build Systematic Problem-Solving Discipline in JEE Physics",
    category: "JEE Strategy",
    publishDate: "August 2026",
    readTime: "5 min read",
    excerpt:
      "A step-by-step breakdown of how breaking derivations into first principles eliminates calculation errors in mechanics, electrodynamics, and modern physics.",
    author: "Academic Faculty",
    highlights: [
      "Why formula memorization fails in multi-concept JEE Advanced problems",
      "How to use Daily Practice Problems (DPPs) effectively",
      "Error analysis logbook method for mock tests",
    ],
  },
  {
    id: "post-2",
    slug: "ncert-mastery-neet-biology-chemistry",
    title: "The Line-by-Line NCERT Strategy for NEET-UG High Precision",
    category: "NEET Preparation",
    publishDate: "August 2026",
    readTime: "6 min read",
    excerpt:
      "Why 100% NCERT adherence in Biology and Inorganic Chemistry is the single most reliable foundation for scoring 650+ in NEET-UG.",
    author: "Medical Faculty Desk",
    highlights: [
      "Diagram-based recall exercises for botany and zoology",
      "High-yield reaction trends in organic chemistry",
      "Timed OMR test simulation practices",
    ],
  },
  {
    id: "post-3",
    slug: "foundation-classes-8-10-olympiads",
    title: "Early Academic Foundation: Why Classes 8, 9 & 10 Matter for Competitive Exams",
    category: "Foundation Base",
    publishDate: "July 2026",
    readTime: "4 min read",
    excerpt:
      "Building conceptual maturity, analytical reasoning, and Olympiad problem exposure early without creating academic pressure or school syllabus conflict.",
    author: "Foundation Program Mentor",
    highlights: [
      "Developing mental ability and logical deduction skills",
      "Seamless harmonization between CBSE board exams and competitive thinking",
      "Building confidence for Class 11 stream selection",
    ],
  },
  {
    id: "post-4",
    slug: "balancing-school-boards-jee-neet",
    title: "Balancing Class 12 Board Exams with JEE & NEET Entrance Preparation",
    category: "Study Tips",
    publishDate: "July 2026",
    readTime: "5 min read",
    excerpt:
      "A structured academic roadmap to ensure 90%+ in school board examinations while consistently advancing competitive mock test percentiles.",
    author: "Academic Directorate",
    highlights: [
      "Synchronizing textbook theory with objective speed drills",
      "Descriptive answer writing techniques for board examiners",
      "Weekly time-blocking template for school and coaching hours",
    ],
  },
  {
    id: "post-5",
    slug: "etse-2026-preparation-guide",
    title: "ETSE 2026 Syllabus Blueprint & Exam Strategy for Classes 7th to 10th",
    category: "Exam Updates",
    publishDate: "June 2026",
    readTime: "4 min read",
    excerpt:
      "Detailed insight into the Emprise Talent Search Examination pattern, scoring methodology, subject distribution, and merit scholarship criteria.",
    author: "Examination Office",
    highlights: [
      "Maths, Science & Mental Ability distribution",
      "How to access verified digital admit cards",
      "Scholarship slabs and post-exam academic diagnostics",
    ],
  },
];

const categories = [
  "All",
  "JEE Strategy",
  "NEET Preparation",
  "Foundation Base",
  "Study Tips",
  "Exam Updates",
] as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = verifiedBlogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation Shell */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#0D3B78] via-[#1769E0] to-[#0A2E63] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>ACADEMIC GUIDANCE & INSIGHTS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Blog & Study Resources
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Pedagogical insights, subject strategy breakdowns, board exam harmonization, and official examination updates from the Emprise Academy faculty.
            </p>
          </Container>
        </section>

        {/* Content Section */}
        <Section variant="default" spacing="lg">
          <Container size="xl">
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
                      activeCategory === cat
                        ? "bg-[var(--brand-primary)] text-white shadow-sm"
                        : "bg-white text-slate-600 border border-[var(--brand-border)] hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles & tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[var(--brand-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                />
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group p-6 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/50 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
                >
                  <div className="space-y-4">
                    {/* Header with Category & Read Time */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                        {post.category}
                      </span>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      {post.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer & Action */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.publishDate}</span>
                    </div>

                    <button
                      onClick={() => setActivePost(post)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] transition-colors cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Admissions & Guidance Banner */}
            <div className="mt-14 p-8 rounded-3xl bg-[var(--brand-surface-muted)] border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--brand-primary-dark)]">
                  Need Personalized Academic Mentorship?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)]">
                  Schedule a free 1-on-1 counseling session with our directors at the Mathura campus.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href="/contact">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Book Free Counseling
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Article Reading Modal */}
        {activePost && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActivePost(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 text-left relative animate-fade-in max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0D3B78] via-[#1769E0] to-[#0A2E63] text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/20 mb-3">
                  {activePost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-4 mt-3 text-xs text-blue-200">
                  <span>By {activePost.author}</span>
                  <span>•</span>
                  <span>{activePost.publishDate}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1">
                <p className="text-sm text-[var(--brand-text)] leading-relaxed font-medium">
                  {activePost.excerpt}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Core Academic Takeaways
                  </h4>
                  {activePost.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[var(--brand-primary-soft)] border border-blue-200 text-xs text-[var(--brand-primary-dark)]">
                  <strong>Academic Tip:</strong> Consistent daily problem-solving of 20–30 graded questions yields higher retention than sporadic weekend cramming.
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <Link href="/courses">
                  <Button variant="primary" size="sm">
                    Explore Courses
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={() => setActivePost(null)}>
                  Close
                </Button>
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
