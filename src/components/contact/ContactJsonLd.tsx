import React from "react";
import { MAIN_CONTACT_DATA } from "@/data/admissions";

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
  const { contactDetails } = MAIN_CONTACT_DATA;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://empriseacademy.com/#organization",
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
        telephone: contactDetails.phone,
        email: contactDetails.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contactDetails.address.line1,
          addressLocality: contactDetails.address.city,
          addressRegion: contactDetails.address.state,
          postalCode: contactDetails.address.pincode,
          addressCountry: contactDetails.address.country,
        },
      },
      {
        "@type": "LocalBusiness",
        name: "Emprise Academy - IIT-JEE & NEET Coaching",
        image: "https://empriseacademy.com/logo.png",
        telephone: contactDetails.phone,
        email: contactDetails.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contactDetails.address.line1,
          addressLocality: contactDetails.address.city,
          addressRegion: contactDetails.address.state,
          postalCode: contactDetails.address.pincode,
          addressCountry: contactDetails.address.country,
        },
        openingHours: "Mo-Su 09:00-19:00",
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
