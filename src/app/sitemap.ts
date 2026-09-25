import { MetadataRoute } from "next";
import { OFFICIAL_BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://empriseacademy.com";
  const lastModified = new Date();

  // Core verified, canonical indexable public pages
  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    // IIT-JEE Ecosystem
    { path: "/iit-jee-coaching-mathura", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/iit-jee-coaching-mathura/class-11", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/iit-jee-coaching-mathura/class-12", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/iit-jee-coaching-mathura/dropper", priority: 0.8, changeFrequency: "weekly" as const },
    // NEET-UG Ecosystem
    { path: "/neet-coaching-mathura", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/neet-coaching-mathura/class-11", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/neet-coaching-mathura/class-12", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/neet-coaching-mathura/dropper", priority: 0.8, changeFrequency: "weekly" as const },
    // Foundation Ecosystem
    { path: "/foundation-coaching-mathura", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/foundation-coaching-mathura/class-8", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/foundation-coaching-mathura/class-9", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/foundation-coaching-mathura/class-10", priority: 0.8, changeFrequency: "weekly" as const },
    // Academic Leadership
    { path: "/directors", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/directors/rakesh-kumar", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/directors/sushil-dagur", priority: 0.6, changeFrequency: "monthly" as const },
    // Results & Stories
    { path: "/results", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/results/atul-dagur-jee-advanced-2026", priority: 0.6, changeFrequency: "monthly" as const },
    // Admissions, Scholarship & ETSE
    { path: "/scholarship", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/admissions", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/etse-2026", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/courses", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" as const },
  ];

  // Canonical Blog Articles
  const blogRoutes = OFFICIAL_BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const allRoutes = [...coreRoutes, ...blogRoutes];

  return allRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
