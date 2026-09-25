import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Share2,
  CheckCircle2,
  Quote,
  GraduationCap,
  BookOpen,
  ChevronRight,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import {
  OFFICIAL_BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  BlogPost,
} from "@/data/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return OFFICIAL_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Emprise Academy",
    };
  }

  const pageTitle = `${post.title} | Emprise Academy`;
  const pageDescription = post.excerpt;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      post.title,
      post.category,
      "Emprise Academy",
      "Mathura Coaching",
      "IIT JEE Guidance",
      "NEET Strategy",
      post.author.name,
    ],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://empriseacademy.com/blog/${post.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://empriseacademy.com/blog/${post.slug}`,
      siteName: "Emprise Academy",
      locale: "en_IN",
      type: "article",
      publishedTime: "2026-09-01T00:00:00.000Z",
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  // Category Theme Colors
  const isJee = post.category === "IIT-JEE";
  const isNeet = post.category === "NEET-UG";
  const isFoundation = post.category === "Foundation";

  const categoryBadgeClass = isJee
    ? "bg-blue-600/90 text-white border-blue-400/50"
    : isNeet
    ? "bg-emerald-600/90 text-white border-emerald-400/50"
    : "bg-amber-600/90 text-white border-amber-400/50";

  const accentColorClass = isJee
    ? "text-blue-600"
    : isNeet
    ? "text-emerald-600"
    : "text-amber-600";

  const targetCourseHref = isJee
    ? "/iit-jee-coaching-mathura"
    : isNeet
    ? "/neet-coaching-mathura"
    : isFoundation
    ? "/foundation-coaching-mathura"
    : "/courses";

  const targetCourseLabel = isJee
    ? "Explore JEE Coaching"
    : isNeet
    ? "Explore NEET Coaching"
    : isFoundation
    ? "Explore Foundation Classes"
    : "Explore All Courses";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://empriseacademy.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage
      ? post.coverImage.startsWith("http")
        ? post.coverImage
        : `https://empriseacademy.com${post.coverImage}`
      : "https://empriseacademy.com/brand/logo.png",
    datePublished: "2026-09-01T00:00:00+05:30",
    dateModified: "2026-09-01T00:00:00+05:30",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.title,
      worksFor: {
        "@type": "EducationalOrganization",
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
      },
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Emprise Academy",
      url: "https://empriseacademy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://empriseacademy.com/brand/logo.png",
      },
    },
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://empriseacademy.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://empriseacademy.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://empriseacademy.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Blog & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Article Hero Banner */}
        <section className="bg-gradient-to-b from-[#0B2748] via-[#123E73] to-[#1769E0] text-white py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <Container size="lg" className="relative z-10 text-left space-y-5">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-blue-200/90 font-medium">
              <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </Link>
              <span>/</span>
              <span className="text-amber-300 font-semibold">{post.category}</span>
            </div>

            {/* Category & Read Time Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${categoryBadgeClass}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {post.category}
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-200/90 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                <span>{post.readTime}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                <span>{post.publishDate}</span>
              </div>
            </div>

            {/* Article Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-sm sm:text-base lg:text-lg text-slate-200/95 font-normal max-w-3xl leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Author Byline Bar */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-sm bg-white shrink-0">
                  <Image
                    src={post.author.photoUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {post.author.name}
                    </span>
                    {post.author.slug && (
                      <Link
                        href={`/directors/${post.author.slug}`}
                        className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 hover:underline"
                      >
                        (View Director Profile)
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-blue-200">
                    {post.author.title}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300/80 italic">
                Official Academic Publication • Emprise Academy Mathura
              </div>
            </div>
          </Container>
        </section>

        {/* Article Body Section */}
        <Section variant="default" spacing="lg" className="bg-white">
          <Container size="lg">
            {/* Article Master Thumbnail Creative */}
            {post.coverImage && (
              <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 mb-10 bg-slate-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Key Stats Strip if Available */}
            {post.keyStats && post.keyStats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 p-5 rounded-2xl bg-[#EEF5FF]/60 border border-[#E3EAF3]">
                {post.keyStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-[#0B2748]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Core Executive Takeaways Box */}
            {post.highlights && post.highlights.length > 0 && (
              <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-slate-50 border-l-4 border-l-[var(--brand-primary)] border border-slate-200 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-[var(--brand-primary)]" />
                  <h2 className="text-base sm:text-lg font-bold text-[#0B2748]">
                    Key Article Takeaways
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {post.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Article Sections */}
            <article className="space-y-10 text-left text-slate-800">
              {post.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  {section.title && (
                    <h2
                      id={`section-${sIdx}`}
                      className={`font-extrabold text-[#0B2748] tracking-tight ${
                        section.level === 3
                          ? "text-lg sm:text-xl pt-2 border-b border-slate-100 pb-2"
                          : "text-xl sm:text-2xl sm:leading-snug pt-4"
                      }`}
                    >
                      {section.title}
                    </h2>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-3 pl-1">
                      {section.bulletPoints.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] shrink-0 mt-2" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Flow Steps / Roadmap Process */}
                  {section.flowSteps && section.flowSteps.length > 0 && (
                    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-100 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                        Strategic Execution Roadmap
                      </p>
                      <div className="space-y-2.5">
                        {section.flowSteps.map((step, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs">
                            <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {fIdx + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 pt-0.5">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formatted Data Table */}
                  {section.table && (
                    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
                      {section.table.caption && (
                        <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-[#0B2748]">
                          {section.table.caption}
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#0B2748] text-white">
                            <tr>
                              {section.table.headers.map((h, thIdx) => (
                                <th key={thIdx} className="px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`px-4 py-2.5 text-slate-700 ${cIdx === 0 ? "font-semibold text-slate-900" : ""}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div className={`my-5 p-4 sm:p-5 rounded-xl border ${
                      section.callout.variant === "warning"
                        ? "bg-amber-50/80 border-amber-200 text-amber-900"
                        : section.callout.variant === "tip"
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                        : "bg-blue-50/80 border-blue-200 text-blue-900"
                    }`}>
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                        {section.callout.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Director Quote Box */}
                  {section.quote && (
                    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2748] to-[#123E73] text-white shadow-md relative overflow-hidden">
                      <Quote className="w-10 h-10 text-white/15 absolute top-4 right-4" />
                      <p className="text-base sm:text-lg italic font-medium leading-relaxed mb-3">
                        &ldquo;{section.quote.text}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-amber-300">
                        — {section.quote.author}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </article>

            {/* Author Profile Card & Signature */}
            <div className="mt-14 pt-8 border-t border-slate-200 text-left">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-xs">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border border-slate-300 shadow-xs bg-white shrink-0">
                  <Image
                    src={post.author.photoUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2748]">
                      {post.author.name}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-[var(--brand-primary)] font-semibold">
                      Author
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-600">
                    {post.author.title} • {post.author.role}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    Providing direct pedagogical guidance, structured examination roadmaps, and conceptual academic training for competitive engineering and medical aspirants at Emprise Academy, Mathura.
                  </p>
                  {post.author.slug && (
                    <div className="pt-2">
                      <Link
                        href={`/directors/${post.author.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline"
                      >
                        <span>Read Full Leadership Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Counseling & Course Consultation Banner */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#0B2748] via-[#123E73] to-[#1769E0] text-white text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" /> Free 1-on-1 Academic Counseling
                </span>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                  Have Questions About {post.category} Preparation?
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Meet our academic directors and faculty at the Mathura campus for diagnostic counseling, syllabus review, and personalized batch planning.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link href={targetCourseHref} className="w-full sm:w-auto">
                  <Button variant="accent" size="md" className="w-full sm:w-auto font-bold shadow-md">
                    {targetCourseLabel}
                  </Button>
                </Link>
                <Link href="/results" className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto font-bold bg-white text-slate-900 hover:bg-slate-100">
                    Verified Results
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="md" className="w-full sm:w-auto font-bold text-white border-white/40 hover:bg-white/10">
                    Contact Mathura Campus
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-200 text-left">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2748] tracking-tight">
                      Related Articles & Resources
                    </h3>
                    <p className="text-xs text-slate-500">
                      Explore more academic strategy guides from our directorate
                    </p>
                  </div>
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-[var(--brand-primary)] hover:underline hidden sm:inline-flex items-center gap-1"
                  >
                    <span>View All {OFFICIAL_BLOG_POSTS.length} Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.id}
                      href={`/blog/${rPost.slug}`}
                      className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[var(--brand-primary)]/40 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[var(--brand-primary)]">
                            {rPost.category}
                          </span>
                          <span className="text-slate-400">{rPost.readTime}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B2748] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2 leading-snug">
                          {rPost.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {rPost.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[var(--brand-primary)]">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
