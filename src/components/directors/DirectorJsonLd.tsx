import React from "react";

export interface DirectorJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  alumniOf?: string;
  knowsAbout?: string[];
  breadcrumbs: { name: string; item: string }[];
}

export const DirectorJsonLd: React.FC<DirectorJsonLdProps> = ({
  name,
  jobTitle,
  description,
  url,
  alumniOf = "University of Derby, England, U.K.",
  knowsAbout = ["IIT-JEE Coaching", "Mathematics", "Physics", "Engineering Education"],
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
        alumniOf: {
          "@type": "EducationalOrganization",
          name: alumniOf,
        },
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
        knowsAbout: knowsAbout,
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
