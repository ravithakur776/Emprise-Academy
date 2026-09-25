import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emprise Academy Blog | JEE, NEET & Foundation Guidance",
  description:
    "Expert articles, preparation roadmaps, examination analysis, and academic advice for IIT-JEE, NEET-UG, and Foundation students from Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/blog",
  },
  openGraph: {
    title: "Emprise Academy Blog | JEE, NEET & Foundation Guidance",
    description:
      "Expert articles, preparation roadmaps, examination analysis, and academic advice for IIT-JEE, NEET-UG, and Foundation students from Emprise Academy Mathura.",
    url: "https://empriseacademy.com/blog",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emprise Academy Blog | JEE, NEET & Foundation Guidance",
    description:
      "Expert articles, preparation roadmaps, examination analysis, and academic advice for IIT-JEE, NEET-UG, and Foundation students from Emprise Academy Mathura.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
