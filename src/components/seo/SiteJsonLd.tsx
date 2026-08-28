import React from "react";

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
  const orgSchema = {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "Emprise Academy",
    alternateName: "Emprise Academy Mathura",
    url: "https://empriseacademy.com",
    logo: "https://empriseacademy.com/images/emprise-logo.png",
    telephone: "+91-98765-43210",
    email: "admissions@empriseacademy.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Highway Crossing",
      addressLocality: "Mathura",
      addressRegion: "Uttar Pradesh",
      postalCode: "281001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.4924",
      longitude: "77.6737",
    },
    sameAs: [
      "https://www.facebook.com/empriseacademy",
      "https://www.instagram.com/empriseacademy",
      "https://www.youtube.com/@empriseacademy",
    ],
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
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "OnSite",
        location: {
          "@type": "Place",
          name: "Emprise Academy Mathura Campus",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mathura",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
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
        name: "Emprise Academy",
      },
      description: `${personDetails.qualification || ""} - ${personDetails.specialization || ""}`,
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
        name: "Emprise Academy",
        url: "https://empriseacademy.com",
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
