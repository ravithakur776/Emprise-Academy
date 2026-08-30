import React from "react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface SiteJsonLdProps {
  type?: "EducationalOrganization" | "Course" | "Person" | "Article" | "FAQPage";
  pageTitle?: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; item: string }[];
  courseDetails?: {
    courseName: string;
    description: string;
    targetExam: string;
    eligibleClasses: string;
  };
  personDetails?: {
    name: string;
    jobTitle: string;
    qualification?: string;
    specialization?: string;
    image?: string;
  };
  faqItems?: {
    question: string;
    answer: string;
  }[];
  articleDetails?: {
    headline: string;
    authorName?: string;
    datePublished?: string;
  };
}

export const SiteJsonLd: React.FC<SiteJsonLdProps> = ({
  type = "EducationalOrganization",
  pageTitle = "Emprise Academy",
  description,
  url,
  breadcrumbs = [],
  courseDetails,
  personDetails,
  faqItems,
  articleDetails,
}) => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const postalAddress: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: business.address.street_address,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postal_code,
    addressCountry: business.address.country_code,
  };

  const sameAs = [
    business.social.facebook,
    business.social.instagram,
    business.social.youtube,
  ].filter(Boolean) as string[];

  const orgSchema: Record<string, any> = {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: business.academy_name,
    alternateName: `${business.academy_name} Mathura`,
    url: business.website_url,
    logo: `${business.website_url}images/emprise-academy-logo.png`,
    telephone: business.contact.phone_primary,
    email: business.contact.email,
    address: postalAddress,
    sameAs,
  };

  const graph: any[] = [orgSchema];

  // Breadcrumb Schema
  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((bc, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: bc.name,
        item: bc.item,
      })),
    });
  }

  // Course Schema
  if (courseDetails) {
    graph.push({
      "@type": "Course",
      name: courseDetails.courseName,
      description: courseDetails.description,
      provider: {
        "@type": "EducationalOrganization",
        name: business.academy_name,
        url: business.website_url,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "OnSite",
        location: {
          "@type": "Place",
          name: `${business.academy_name} Mathura Campus`,
          address: postalAddress,
        },
      },
    });
  }

  // Person Schema
  if (personDetails) {
    graph.push({
      "@type": "Person",
      name: personDetails.name,
      jobTitle: personDetails.jobTitle,
      worksFor: {
        "@type": "EducationalOrganization",
        name: business.academy_name,
      },
      description: `${personDetails.qualification || ""} - ${personDetails.specialization || ""}`.trim(),
    });
  }

  // FAQ Schema
  if (faqItems && faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // Article Schema
  if (articleDetails) {
    graph.push({
      "@type": "Article",
      headline: articleDetails.headline,
      description,
      author: {
        "@type": "Person",
        name: articleDetails.authorName || "Academic Team, Emprise Academy",
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: business.academy_name,
        url: business.website_url,
      },
      datePublished: articleDetails.datePublished || new Date().toISOString(),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
