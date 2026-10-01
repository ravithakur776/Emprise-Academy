import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface ContactJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const ContactJsonLd: React.FC<ContactJsonLdProps> = ({
  pageTitle = "Contact Emprise Academy Mathura",
  description,
  url,
  breadcrumbs,
}) => {
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

  const orgSchema: Record<string, any> = {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${business.website_url}#organization`,
    name: business.academy_name,
    alternateName: `${business.academy_name} Mathura`,
    url: business.website_url,
    logo: `${business.website_url}images/emprise-academy-logo.png`,
    image: `${business.website_url}images/emprise-academy-building-campus.jpg`,
    telephone: business.contact.phone_primary,
    email: business.contact.email,
    foundingDate: `${business.founding_year}`,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.coordinates.latitude,
      longitude: business.address.coordinates.longitude,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.contact.phone_primary,
        contactType: "admissions and student counselling",
        areaServed: "IN",
        availableLanguage: ["Hindi", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: business.contact.phone_secondary,
        contactType: "student support and academic queries",
        areaServed: "IN",
        availableLanguage: ["Hindi", "English"],
      },
    ],
    sameAs,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema,
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: bc.name,
          item: bc.item,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
