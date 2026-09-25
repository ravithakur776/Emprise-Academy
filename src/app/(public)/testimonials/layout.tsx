import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emprise Academy Student Reviews | JEE & NEET Mathura",
  description:
    "Read genuine reviews and testimonials from IIT-JEE, NEET-UG, and Foundation students and parents at Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/testimonials",
  },
  openGraph: {
    title: "Emprise Academy Student Reviews | JEE & NEET Mathura",
    description:
      "Read genuine reviews and testimonials from IIT-JEE, NEET-UG, and Foundation students and parents at Emprise Academy Mathura.",
    url: "https://empriseacademy.com/testimonials",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emprise Academy Student Reviews | JEE & NEET Mathura",
    description:
      "Read genuine reviews and testimonials from IIT-JEE, NEET-UG, and Foundation students and parents at Emprise Academy Mathura.",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
