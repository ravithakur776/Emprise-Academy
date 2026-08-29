import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface FacultyJsonLdProps {
  name?: string;
  jobTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const FacultyJsonLd: React.FC<FacultyJsonLdProps> = ({
  name = "Emprise Academy Faculty Team",
  jobTitle = "Academic Mentors",
  description,
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
        "@type": "Person",
        name: name,
        jobTitle: jobTitle,
        description: description,
        url: url,
        worksFor: {
          "@type": "EducationalOrganization",
          name: business.academy_name,
          url: business.website_url,
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
