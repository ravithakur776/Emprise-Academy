import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface ResultsJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
  storyArticle?: {
    headline: string;
    studentName: string;
    datePublished?: string;
  };
}

export const ResultsJsonLd: React.FC<ResultsJsonLdProps> = ({
  pageTitle = "Emprise Academy Results & Success Stories",
  description,
  url,
  breadcrumbs,
  storyArticle,
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

  const graphElements: any[] = [
    {
      "@type": "EducationalOrganization",
      name: business.academy_name,
      url: business.website_url,
      address: postalAddress,
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
  ];

  if (storyArticle) {
    graphElements.push({
      "@type": "Article",
      headline: storyArticle.headline,
      description: description,
      url: url,
      author: {
        "@type": "EducationalOrganization",
        name: business.academy_name,
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: business.academy_name,
        url: business.website_url,
      },
      about: {
        "@type": "Person",
        name: storyArticle.studentName,
      },
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graphElements,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
