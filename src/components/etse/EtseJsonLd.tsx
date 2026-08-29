import React from "react";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

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

  const orgSchema: Record<string, any> = {
    "@type": "EducationalOrganization",
    "@id": `${business.website_url}/#organization`,
    name: business.academy_name,
    url: business.website_url,
    address: postalAddress,
  };

  if (business.contact.phone_primary) {
    orgSchema.telephone = business.contact.phone_primary;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema,
      {
        "@type": "Event",
        name: campaign.title,
        description: campaign.heroParagraph,
        startDate: campaign.examDateIso,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: `${business.academy_name} Campus`,
          address: postalAddress,
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
          name: business.academy_name,
          url: business.website_url,
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
