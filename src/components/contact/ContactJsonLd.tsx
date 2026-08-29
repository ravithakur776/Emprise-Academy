import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

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
  if (business.contact.email) {
    orgSchema.email = business.contact.email;
  }

  const localBusinessSchema: Record<string, any> = {
    "@type": "LocalBusiness",
    name: `${business.academy_name} - ${business.primary_positioning}`,
    image: `${business.website_url}/logo.png`,
    url: business.website_url,
    address: postalAddress,
  };

  if (business.contact.phone_primary) {
    localBusinessSchema.telephone = business.contact.phone_primary;
  }
  if (business.contact.email) {
    localBusinessSchema.email = business.contact.email;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema,
      localBusinessSchema,
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
