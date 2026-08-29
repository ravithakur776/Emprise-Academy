/**
 * CANONICAL BUSINESS CONFIGURATION — Emprise Academy
 * Single Source of Truth for all official institutional data.
 *
 * Status Classifications:
 * - VERIFIED_OFFICIAL: Confirmed institutional facts (Academy Name, Established 2011, Mathura, UP, Core Pillars).
 * - PENDING_CONFIGURATION: Fields that require official administrative input before rendering publicly.
 *
 * Public components MUST consume this configuration and hide optional unverified fields when null.
 */

export interface CanonicalBusinessConfig {
  academy_name: string;
  short_name: string;
  tagline: string | null;
  established_year: number;
  years_of_excellence: string;
  primary_positioning: string;
  secondary_pillar: string;
  website_url: string;

  address: {
    city: string;
    state: string;
    country: string;
    country_code: string;
    street_address: string | null;
    postal_code: string | null;
    display_location: string;
  };

  contact: {
    phone_primary: string | null;
    phone_secondary: string | null;
    whatsapp: string | null;
    email: string | null;
    google_maps_url: string | null;
    business_hours: string | null;
  };

  social: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
    linkedin: string | null;
  };

  etse: {
    name: string;
    short_name: string;
    exam_date: string;
    eligible_classes: readonly string[];
    fee: string;
    mode: string;
  };
}

export const CANONICAL_BUSINESS_CONFIG: CanonicalBusinessConfig = {
  academy_name: "Emprise Academy",
  short_name: "Emprise",
  tagline: null, // PENDING_CONFIGURATION — Do not render unverified marketing taglines
  established_year: 2011,
  years_of_excellence: "15+ Years of Academic Excellence", // Configurable brand statement
  primary_positioning: "IIT-JEE & NEET Coaching in Mathura",
  secondary_pillar: "Foundation Classes 8–10",
  website_url: "https://empriseacademy.com",

  address: {
    city: "Mathura",
    state: "Uttar Pradesh",
    country: "India",
    country_code: "IN",
    street_address: null, // PENDING_CONFIGURATION — Official campus street address not yet finalized
    postal_code: null, // PENDING_CONFIGURATION
    display_location: "Mathura, Uttar Pradesh",
  },

  contact: {
    phone_primary: null, // PENDING_CONFIGURATION — Official desk phone pending confirmation
    phone_secondary: null,
    whatsapp: null, // PENDING_CONFIGURATION — Official WhatsApp number pending confirmation
    email: null, // PENDING_CONFIGURATION — Official email address pending confirmation
    google_maps_url: null, // PENDING_CONFIGURATION — Official Google Maps link pending confirmation
    business_hours: null, // PENDING_CONFIGURATION — Official working hours pending confirmation
  },

  social: {
    instagram: null,
    facebook: null,
    youtube: null,
    linkedin: null,
  },

  etse: {
    name: "Emprise Talent Search Examination",
    short_name: "ETSE 2026",
    exam_date: "6 September 2026",
    eligible_classes: ["Class 7", "Class 8", "Class 9", "Class 10"] as const,
    fee: "FREE",
    mode: "Offline (Pen & Paper)",
  },
};
