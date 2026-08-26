import React from "react";

export interface ResultsJsonLdProps {
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; item: string }[];
  storyArticle?: {
    headline: string;
    studentName: string;
    datePublished?: string;
  };
}

export const ResultsJsonLd: React.FC<ResultsJsonLdProps> = ({
  pageTitle = "Emprise Academy Results & Success Stories",
  description,
  url,
  breadcrumbs,
  storyArticle,
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

  if (storyArticle) {
    graphElements.push({
      "@type": "Article",
      headline: storyArticle.headline,
      description: description,
      url: url,
      author: {
        "@type": "EducationalOrganization",
        name: "Emprise Academy",
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
      },
      about: {
        "@type": "Person",
        name: storyArticle.studentName,
      },
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
