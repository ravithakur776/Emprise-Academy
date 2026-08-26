import React from "react";

export interface NeetJsonLdProps {
  courseName: string;
  courseDescription: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const NeetJsonLd: React.FC<NeetJsonLdProps> = ({
  courseName,
  courseDescription,
  url,
  breadcrumbs,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: courseName,
        description: courseDescription,
        url: url,
        provider: {
          "@type": "EducationalOrganization",
          name: "Emprise Academy",
          sameAs: "https://empriseacademy.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Main Academic Block",
            addressLocality: "Mathura",
            addressRegion: "Uttar Pradesh",
            postalCode: "281001",
            addressCountry: "IN",
          },
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
