import React from "react";

export interface FacultyJsonLdProps {
  name?: string;
  jobTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
}

export const FacultyJsonLd: React.FC<FacultyJsonLdProps> = ({
  name = "Emprise Academy Faculty Team",
  jobTitle = "Academic Mentors",
  description,
  url,
  breadcrumbs,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: name,
        jobTitle: jobTitle,
        description: description,
        url: url,
        worksFor: {
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
