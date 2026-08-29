import React from "react";
import { ScholarshipFaqItem } from "@/data/scholarship";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface ScholarshipJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
  faqs?: readonly ScholarshipFaqItem[];
}

export const ScholarshipJsonLd: React.FC<ScholarshipJsonLdProps> = ({
  pageTitle = "JEE & NEET Scholarship Programme | Emprise Academy",
  description,
  url,
  breadcrumbs,
  faqs,
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

  if (faqs && faqs.length > 0) {
    graphElements.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
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
