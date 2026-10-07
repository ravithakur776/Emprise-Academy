/**
 * Emprise Academy - Site & Brand Configuration
 * IIT-JEE | NEET-UG | Foundation Classes 8-10 (Mathura)
 * Established 2011
 */

import { CANONICAL_BUSINESS_CONFIG } from "./business";

export const CANONICAL_SITE_URL = "https://empriseacademy.com";

/**
 * Returns the environment-aware site URL:
 * - In local development (next dev with NODE_ENV === 'development'), allows NEXT_PUBLIC_SITE_URL or localhost.
 * - In production builds and production runtime, ALWAYS enforces the canonical production domain
 *   (or a valid non-localhost HTTPS domain if explicitly configured).
 * - Production output NEVER exposes localhost, 127.0.0.1, or 0.0.0.0.
 */
export function getSiteUrl(): string {
  const isDev = process.env.NODE_ENV === "development";
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (isDev && envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (
    envUrl &&
    envUrl.startsWith("https://") &&
    !envUrl.includes("localhost") &&
    !envUrl.includes("127.0.0.1") &&
    !envUrl.includes("0.0.0.0")
  ) {
    return envUrl.replace(/\/$/, "");
  }

  return CANONICAL_SITE_URL;
}

export const siteConfig = {
  name: CANONICAL_BUSINESS_CONFIG.academy_name,
  shortName: CANONICAL_BUSINESS_CONFIG.short_name,
  tagline: "Premier Institute for IIT-JEE, NEET-UG & Foundation in Mathura",
  description:
    "Emprise Academy, established in 2011, provides IIT-JEE, NEET and Foundation coaching in Mathura with structured learning, experienced mentorship, regular testing and personalised academic support.",
  get url() {
    return getSiteUrl();
  },
  ogImage: "/images/og-emprise.png",
  establishedYear: CANONICAL_BUSINESS_CONFIG.established_year,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "G-FJGZCPVN5W",
  excellenceHighlight: CANONICAL_BUSINESS_CONFIG.years_of_excellence,
  academicLegacy: CANONICAL_BUSINESS_CONFIG.academic_legacy,
  studentsMentored: CANONICAL_BUSINESS_CONFIG.students_mentored,
  studentsQualified: CANONICAL_BUSINESS_CONFIG.students_qualified,
  location: {
    city: CANONICAL_BUSINESS_CONFIG.address.city,
    state: CANONICAL_BUSINESS_CONFIG.address.state,
    country: CANONICAL_BUSINESS_CONFIG.address.country,
    streetAddress: CANONICAL_BUSINESS_CONFIG.address.street_address,
    postalCode: CANONICAL_BUSINESS_CONFIG.address.postal_code,
    fullAddress: CANONICAL_BUSINESS_CONFIG.address.display_location,
    addressPending: false,
  },
  academicPillars: [
    {
      id: "iit-jee",
      title: "IIT-JEE (Main & Advanced)",
      description: "Rigorous engineering entrance coaching for 11th, 12th & Droppers",
    },
    {
      id: "neet-ug",
      title: "NEET-UG (Medical)",
      description: "Targeted medical entrance coaching with NCERT mastery and high-yield test series",
    },
    {
      id: "foundation",
      title: "Foundation (Classes 8, 9 & 10)",
      description: "Strong conceptual base for NTSE, Olympiads, and future competitive success",
    },
  ],
  links: {
    studentLogin: "/student/login",
    etseRegistration: "/etse-2026",
    resultsSearch: "/results",
    admitCardVerification: "/verify-admit-card",
    adminLogin: "/admin/login",
  },
  contact: {
    email: CANONICAL_BUSINESS_CONFIG.contact.email,
    phone: CANONICAL_BUSINESS_CONFIG.contact.phone_primary,
    phoneSecondary: CANONICAL_BUSINESS_CONFIG.contact.phone_secondary,
    phones: CANONICAL_BUSINESS_CONFIG.phones,
  },
} as const;

export type SiteConfig = typeof siteConfig;
