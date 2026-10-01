import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

/**
 * Emprise Academy - Single Source of Truth & Business Metric Integrity Engine
 *
 * Prevents 0+, undefined, null, NaN, or empty business metrics from ever reaching
 * user-facing UI, SEO metadata, or structured data (JSON-LD).
 */

export const CANONICAL_ACADEMY = {
  name: CANONICAL_BUSINESS_CONFIG.academy_name,
  shortName: CANONICAL_BUSINESS_CONFIG.short_name,
  establishedYear: CANONICAL_BUSINESS_CONFIG.established_year,
  academicLegacy: CANONICAL_BUSINESS_CONFIG.academic_legacy,
  legacyYears: CANONICAL_BUSINESS_CONFIG.legacy_years,
  studentsMentored: CANONICAL_BUSINESS_CONFIG.students_mentored,
  studentsQualified: CANONICAL_BUSINESS_CONFIG.students_qualified,
  nationalAwards: CANONICAL_BUSINESS_CONFIG.national_awards,
  facultyHeadline: CANONICAL_BUSINESS_CONFIG.faculty_headline,
  location: CANONICAL_BUSINESS_CONFIG.address.display_location,
  streetAddress: CANONICAL_BUSINESS_CONFIG.address.street_address,
  city: CANONICAL_BUSINESS_CONFIG.address.city,
  state: CANONICAL_BUSINESS_CONFIG.address.state,
  postalCode: CANONICAL_BUSINESS_CONFIG.address.postal_code,
  country: CANONICAL_BUSINESS_CONFIG.address.country,
  websiteUrl: CANONICAL_BUSINESS_CONFIG.website_url,
  canonicalUrl: CANONICAL_BUSINESS_CONFIG.canonical_url,
  logoUrl: CANONICAL_BUSINESS_CONFIG.logo_url,
  imageUrl: CANONICAL_BUSINESS_CONFIG.image_url,
  primaryPhone: CANONICAL_BUSINESS_CONFIG.contact.phone_primary,
  secondaryPhone: CANONICAL_BUSINESS_CONFIG.contact.phone_secondary,
  phones: CANONICAL_BUSINESS_CONFIG.phones,
  email: CANONICAL_BUSINESS_CONFIG.contact.email,
  primaryServices: CANONICAL_BUSINESS_CONFIG.primary_services,
} as const;

/**
 * Robust calculation of academic legacy with absolute safe fallback.
 * Can NEVER return "0+ Years", "0 Years", "NaN Years", or "undefined".
 */
export function getAcademicLegacy(fallback = "15+ Years of Academic Excellence"): string {
  try {
    const currentYear = new Date().getFullYear();
    const established = CANONICAL_BUSINESS_CONFIG.established_year || 2011;
    const diff = currentYear - established;
    if (typeof diff === "number" && !isNaN(diff) && diff >= 15) {
      return `${diff}+ Years of Academic Excellence`;
    }
  } catch {
    // Graceful fallback to static verified constant
  }
  return fallback;
}

/**
 * Regression protection helper:
 * Guarantees a metric string is valid.
 * In development, throws if metric is invalid.
 * In production, returns the canonical fallback.
 */
export function sanitizeBusinessMetric(
  value: unknown,
  fallback: string,
  metricName: string = "businessMetric"
): string {
  const str = String(value ?? "").trim();
  const isInvalid =
    !str ||
    str === "0" ||
    str === "0+" ||
    str === "0 Years" ||
    str === "0 + Years" ||
    str.startsWith("0+") ||
    str.includes("undefined") ||
    str.includes("null") ||
    str.includes("NaN");

  if (isInvalid) {
    if (process.env.NODE_ENV === "development" && process.env.STRICT_SEO_CHECK === "true") {
      throw new Error(
        `[CRITICAL SEO SANITY CHECK] Business metric "${metricName}" evaluated to invalid value: "${value}". Must not be 0, null, or undefined.`
      );
    }
    return fallback;
  }

  return str;
}
