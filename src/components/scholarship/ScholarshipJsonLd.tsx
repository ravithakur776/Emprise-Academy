import React from "react";
import { ScholarshipFaqItem } from "@/data/scholarship";

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
  const graphElements: any[] = [
    {
      "@type": "EducationalOrganization",
      name: "Emprise Academy",
      url: "https://empriseacademy.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Academic Block",
        addressLocality: "Mathura",
        addressRegion: "Uttar Pradesh",
        postalCode: "281001",
        addressCountry: "IN",
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
