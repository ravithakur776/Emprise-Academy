/**
 * CANONICAL BUSINESS CONFIGURATION — Emprise Academy
 * Single Source of Truth for all official institutional data.
 *
 * Official verified data provided for Phase 5.2B.
 */

export interface CanonicalBusinessConfig {
  academy_name: string;
  short_name: string;
  tagline: string | null;
  established_year: number;
  years_of_excellence: string;
  years_of_excellence_enabled: boolean;
  primary_positioning: string;
  secondary_pillar: string;
  website_url: string;
  logo_url: string;

  address: {
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    country_code: string;
    display_location: string;
    short_location: string;
  };

  contact: {
    phone_primary: string;
    phone_primary_tel: string;
    phone_secondary: string;
    phone_secondary_tel: string;
    whatsapp: string;
    whatsapp_link: string;
    email: string;
    email_mailto: string;
    google_maps_url: string;
    business_hours: string;
  };

  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: null;
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
  tagline: null, // N/A — Official Tagline is not provided. Do NOT render unverified taglines.
  established_year: 2011,
  years_of_excellence: "15+ Years of Academic Excellence",
  years_of_excellence_enabled: true,
  primary_positioning: "IIT-JEE & NEET Coaching in Mathura",
  secondary_pillar: "Foundation Classes 8–10",
  website_url: "https://www.empriseacademy.com/",
  logo_url: "/images/emprise-academy-logo.png",

  address: {
    street_address: "Near Tera Tower, Bhuteshwar Road",
    city: "Mathura",
    state: "Uttar Pradesh",
    postal_code: "281004",
    country: "India",
    country_code: "IN",
    display_location: "Near Tera Tower, Bhuteshwar Road, Mathura, Uttar Pradesh - 281004",
    short_location: "Near Tera Tower, Bhuteshwar Road, Mathura",
  },

  contact: {
    phone_primary: "+91 7247889955",
    phone_primary_tel: "tel:+917247889955",
    phone_secondary: "+91 9634448800",
    phone_secondary_tel: "tel:+919634448800",
    whatsapp: "+91 7247889955",
    whatsapp_link: "https://wa.me/917247889955?text=Hello%20Emprise%20Academy,%20I%20want%20to%20inquire%20about%20admissions.",
    email: "info@empriseacademy.com",
    email_mailto: "mailto:info@empriseacademy.com",
    google_maps_url: "https://maps.app.goo.gl/P3E6GLnWqrdZfNcn7",
    business_hours: "9AM to 7PM",
  },

  social: {
    instagram: "https://www.instagram.com/empriseacademy/",
    facebook: "https://www.facebook.com/EmpriseAcademy",
    youtube: "https://youtube.com/@emprisemathura?si=mQONprDb6PzOAGuB",
    linkedin: null, // N/A — No LinkedIn profile provided.
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
