import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emprise Academy Mathura Gallery | Students & Campus",
  description:
    "Explore campus photos, classroom sessions, student achievement events, and academic life at Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/gallery",
  },
  openGraph: {
    title: "Emprise Academy Mathura Gallery | Students & Campus",
    description:
      "Explore campus photos, classroom sessions, student achievement events, and academic life at Emprise Academy Mathura.",
    url: "https://empriseacademy.com/gallery",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emprise Academy Mathura Gallery | Students & Campus",
    description:
      "Explore campus photos, classroom sessions, student achievement events, and academic life at Emprise Academy Mathura.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
