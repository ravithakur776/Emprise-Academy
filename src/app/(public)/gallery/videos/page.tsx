import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Button } from "@/components/ui/button/Button";
import { Sparkles, ArrowLeft } from "lucide-react";
import { GalleryEmptyState } from "@/components/gallery/GalleryEmptyState";

export const metadata: Metadata = {
  title: "Video Gallery | Emprise Academy Mathura",
  description:
    "Campus walkthroughs, academic seminars, student stories, and event video archives for Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/gallery/videos",
  },
};

export default function VideoGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation Shell */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="bg-gradient-to-b from-[#0B2748] via-[#123E73] to-[#1769E0] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>CAMPUS • MEDIA • MEMORIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Video Gallery
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Campus walkthroughs, academic seminars, student stories, and event video archives.
            </p>
          </Container>
        </section>

        {/* Content Section */}
        <Section variant="default" spacing="lg" className="bg-white">
          <Container size="xl">
            <div className="py-6 sm:py-10">
              <GalleryEmptyState category="video" />

              <div className="mt-8 flex justify-center">
                <Link href="/gallery">
                  <Button
                    variant="outline"
                    size="md"
                    className="font-semibold text-slate-700 hover:text-[var(--brand-primary)] border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 hover:bg-slate-50 transition-all shadow-2xs"
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back to Photo Gallery
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* Global Institutional Footer */}
      <Footer />

      {/* Mobile Fixed CTA Bar */}
      <MobileBottomCTA />
    </div>
  );
}
