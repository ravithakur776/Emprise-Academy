import { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/student",
          "/student/",
          "/api",
          "/api/",
          "/verify-admit-card",
          "/verify-admit-card/",
          "/verify-result",
          "/verify-result/",
          "/_next/",
        ],
      },
      {
        userAgent: "Meta-ExternalAgent",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
