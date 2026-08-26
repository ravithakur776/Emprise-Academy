import React from "react";
import { MAIN_ETSE_DATA } from "@/data/etse";

export interface EtseJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const EtseJsonLd: React.FC<EtseJsonLdProps> = ({
  pageTitle = "ETSE 2026 – Emprise Talent Search Exam",
  description,
  url,
  breadcrumbs,
}) => {
  const { campaign, faqs } = MAIN_ETSE_DATA;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://empriseacademy.com/#organization",
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
        telephone: "+91 98765 43210",
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
        "@type": "Event",
        name: campaign.title,
        description: campaign.heroParagraph,
        startDate: campaign.examDateIso,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Emprise Academy Main Academic Block",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Main Academic Block",
            addressLocality: "Mathura",
            addressRegion: "Uttar Pradesh",
            postalCode: "281001",
            addressCountry: "IN",
          },
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: url,
          validFrom: "2026-01-01",
        },
        organizer: {
          "@type": "Organization",
          name: "Emprise Academy",
          url: "https://empriseacademy.com",
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
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
