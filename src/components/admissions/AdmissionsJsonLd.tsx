import React from "react";
import { AdmissionFaqItem } from "@/data/admissions";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface AdmissionsJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
  faqs?: readonly AdmissionFaqItem[];
}

export const AdmissionsJsonLd: React.FC<AdmissionsJsonLdProps> = ({
  pageTitle = "Admissions at Emprise Academy Mathura",
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

  const orgElement: Record<string, any> = {
    "@type": "EducationalOrganization",
    name: business.academy_name,
    url: business.website_url,
    address: postalAddress,
  };

  if (business.contact.phone_primary) {
    orgElement.telephone = business.contact.phone_primary;
  }

  const graphElements: any[] = [
    orgElement,
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
