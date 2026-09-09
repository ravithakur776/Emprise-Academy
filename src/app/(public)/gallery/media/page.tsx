import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { MediaGalleryView } from "@/components/media/MediaGalleryView";

export const metadata: Metadata = {
  title: "Emprise Academy in the News | Media & Press Coverage",
  description:
    "Explore media coverage, press features, result highlights, student achievements, academic events and institutional moments from Emprise Academy.",
  alternates: {
    canonical: "https://empriseacademy.com/gallery/media",
  },
  openGraph: {
    title: "Emprise Academy in the News | Media & Press Coverage",
    description:
      "Explore media coverage, press features, result highlights, student achievements, academic events and institutional moments from Emprise Academy.",
    url: "https://empriseacademy.com/gallery/media",
    siteName: "Emprise Academy Mathura",
    type: "website",
  },
};

export default function MediaGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation Shell */}
      <Navbar />

      <main className="flex-1">
        <MediaGalleryView />
      </main>

      {/* Global Institutional Footer */}
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
