import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface NeetJsonLdProps {
  courseName: string;
  courseDescription: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const NeetJsonLd: React.FC<NeetJsonLdProps> = ({
  courseName,
  courseDescription,
  url,
  breadcrumbs,
}) => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const postalAddress: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    addressCountry: business.address.country_code,
  };

  if (business.address.street_address) {
    postalAddress.streetAddress = business.address.street_address;
  }
  if (business.address.postal_code) {
    postalAddress.postalCode = business.address.postal_code;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: courseName,
        description: courseDescription,
        url: url,
        provider: {
          "@type": "EducationalOrganization",
          name: business.academy_name,
          sameAs: business.website_url,
          address: postalAddress,
        },
      },
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
