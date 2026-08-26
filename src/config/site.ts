/**
 * Emprise Academy - Site & Brand Configuration
 * IIT-JEE | NEET-UG | Foundation Classes 8-10 (Mathura)
 * Established 2011
 */

export const siteConfig = {
  name: "Emprise Academy",
  shortName: "Emprise",
  tagline: "Premier Institute for IIT-JEE, NEET-UG & Foundation in Mathura",
  description:
    "Empowering future doctors and engineers with rigorous academic training, expert mentorship, and comprehensive test series since 2011 in Mathura.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://empriseacademy.com",
  ogImage: "/images/og-emprise.png",
  establishedYear: 2011,
  // Configurable excellence text (unverified data marked as pending confirmation)
  excellenceHighlight: "15+ Years of Academic Excellence",
  location: {
    city: "Mathura",
    state: "Uttar Pradesh",
    country: "India",
    addressPending: true, // Specific address to be configured in settings
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
    email: "info@empriseacademy.com", // verified placeholder to be configured via admin settings
    phone: "+91-XXXXXXXXXX", // placeholder marked for admin configuration
  },
} as const;

export type SiteConfig = typeof siteConfig;
