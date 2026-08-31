import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface DirectorJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string | null;
  alumniOf?: string;
  knowsAbout?: string[];
  breadcrumbs: { name: string; item: string }[];
}

export const DirectorJsonLd: React.FC<DirectorJsonLdProps> = ({
  name,
  jobTitle,
  description,
  url,
  image,
  alumniOf = "University of Derby, England, U.K.",
  knowsAbout = ["IIT-JEE Coaching", "Mathematics", "Physics", "Engineering Education"],
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

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${business.website_url.replace(/\/$/, "")}${image.startsWith("/") ? "" : "/"}${image}`
    : undefined;

  const personNode: Record<string, any> = {
    "@type": "Person",
    name: name,
    jobTitle: jobTitle,
    description: description,
    url: url,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: alumniOf,
    },
    worksFor: {
      "@type": "EducationalOrganization",
      name: business.academy_name,
      url: business.website_url,
      address: postalAddress,
    },
    knowsAbout: knowsAbout,
  };

  if (imageUrl) {
    personNode.image = imageUrl;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
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
