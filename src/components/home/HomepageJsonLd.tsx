import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { HOMEPAGE_DATA } from "@/data/homepage";

export const HomepageJsonLd: React.FC = () => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const postalAddress: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: business.address.street_address,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postal_code,
    addressCountry: business.address.country_code,
  };

  const sameAs = [
    business.social.facebook,
    business.social.instagram,
    business.social.youtube,
  ].filter(Boolean) as string[];

  // Single Authoritative Primary Business Entity
  const organizationSchema: Record<string, any> = {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${business.website_url}#organization`,
    name: business.academy_name,
    alternateName: `${business.academy_name} Mathura`,
    description:
      "Emprise Academy, established in 2011, provides IIT-JEE, NEET and Foundation coaching in Mathura with structured learning, experienced mentorship, regular testing and personalised academic support.",
    url: business.website_url,
    logo: `${business.website_url}images/emprise-academy-logo.png`,
    image: `${business.website_url}images/emprise-academy-building-campus.jpg`,
    foundingDate: String(business.established_year),
    telephone: [business.contact.phone_primary, business.contact.phone_secondary],
    email: business.contact.email,
    priceRange: "$$",
    address: postalAddress,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Primary Educational Services",
      itemListElement: [
        {
          "@type": "Course",
          name: "IIT-JEE Coaching (Main & Advanced)",
          description:
            "Comprehensive engineering entrance preparation for Class 11, 12, and Droppers in Mathura.",
          provider: {
            "@id": `${business.website_url}#organization`,
          },
        },
        {
          "@type": "Course",
          name: "NEET-UG Medical Entrance Coaching",
          description:
            "NCERT-focused medical entrance coaching with physics, chemistry, and biology test series in Mathura.",
          provider: {
            "@id": `${business.website_url}#organization`,
          },
        },
        {
          "@type": "Course",
          name: "Foundation Coaching (Classes 8, 9 & 10)",
          description:
            "Science and Mathematics conceptual foundation for Olympiads and early JEE/NEET competitive preparation.",
          provider: {
            "@id": `${business.website_url}#organization`,
          },
        },
        {
          "@type": "Service",
          name: "Digital Learning & Study Resources",
          description:
            "High-yield practice problem sheets, test analytics, and structured study resources for competitive aspirants.",
          provider: {
            "@id": `${business.website_url}#organization`,
          },
        },
      ],
    },
  };

  const websiteSchema: Record<string, any> = {
    "@type": "WebSite",
    "@id": `${business.website_url}#website`,
    name: business.academy_name,
    url: business.website_url,
    description:
      "Best IIT-JEE & NEET Coaching in Mathura. Structured preparation for JEE Main, Advanced, NEET, and Foundation Classes 8–10.",
    publisher: {
      "@id": `${business.website_url}#organization`,
    },
  };

  const faqSchema: Record<string, any> = {
    "@type": "FAQPage",
    "@id": `${business.website_url}#faq`,
    mainEntity: HOMEPAGE_DATA.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, faqSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
