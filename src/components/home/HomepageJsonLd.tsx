import React from "react";
import { HOMEPAGE_DATA } from "@/data/homepage";

export const HomepageJsonLd: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "Emprise Academy",
    alternateName: "Emprise Academy Mathura",
    description:
      "Premier coaching institute in Mathura for IIT-JEE (Main & Advanced), NEET-UG, and Foundation (Classes 8-10). Established in 2011 with concept-based learning and expert mentorship.",
    url: "https://empriseacademy.com",
    logo: "https://empriseacademy.com/images/emprise-logo.png",
    foundingDate: "2011",
    telephone: HOMEPAGE_DATA.contactCampus.phoneDisplay,
    email: HOMEPAGE_DATA.contactCampus.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Academic Block",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coaching Programmes",
      itemListElement: [
        {
          "@type": "Course",
          name: "IIT-JEE Coaching (Main & Advanced)",
          description:
            "Comprehensive engineering entrance preparation for Class 11, 12, and Droppers in Mathura.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Emprise Academy",
          },
        },
        {
          "@type": "Course",
          name: "NEET-UG Medical Entrance Coaching",
          description:
            "NCERT-focused medical entrance coaching with physics, chemistry, and biology test series in Mathura.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Emprise Academy",
          },
        },
        {
          "@type": "Course",
          name: "Foundation Coaching (Classes 8, 9 & 10)",
          description:
            "Science and Mathematics conceptual foundation for Olympiads and early JEE/NEET competitive preparation.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Emprise Academy",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
