import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

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

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: business.academy_name,
    alternateName: `${business.academy_name} Mathura`,
    description:
      "Premier coaching institute in Mathura for IIT-JEE (Main & Advanced), NEET-UG, and Foundation (Classes 8-10). Established in 2011 with concept-based learning and expert mentorship.",
    url: business.website_url,
    logo: `${business.website_url}images/emprise-logo.png`,
    foundingDate: String(business.established_year),
    telephone: business.contact.phone_primary,
    email: business.contact.email,
    address: postalAddress,
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coaching Programmes",
      itemListElement: [
        {
          "@type": "Course",
          name: "IIT-JEE Coaching (Main & Advanced)",
          description:
            "Comprehensive engineering entrance preparation for Class 11, 12, and Droppers in Mathura.",
          provider: {
            "@type": "EducationalOrganization",
            name: business.academy_name,
          },
        },
        {
          "@type": "Course",
          name: "NEET-UG Medical Entrance Coaching",
          description:
            "NCERT-focused medical entrance coaching with physics, chemistry, and biology test series in Mathura.",
          provider: {
            "@type": "EducationalOrganization",
            name: business.academy_name,
          },
        },
        {
          "@type": "Course",
          name: "Foundation Coaching (Classes 8, 9 & 10)",
          description:
            "Science and Mathematics conceptual foundation for Olympiads and early JEE/NEET competitive preparation.",
          provider: {
            "@type": "EducationalOrganization",
            name: business.academy_name,
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
