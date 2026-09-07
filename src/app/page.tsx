import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustIntroSection } from "@/components/home/TrustIntroSection";
import { CoursesGridSection } from "@/components/home/CoursesGridSection";
import { EtseFeatureSection } from "@/components/home/EtseFeatureSection";
import { WhyEmpriseSection } from "@/components/home/WhyEmpriseSection";
import { TheEmpriseSystemSection } from "@/components/home/TheEmpriseSystemSection";
import { DirectorsSection } from "@/components/home/DirectorsSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { LatestUpdatesSection } from "@/components/home/LatestUpdatesSection";
import { TestimonialsHomeSection } from "@/components/home/TestimonialsHomeSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CampusContactSection } from "@/components/home/CampusContactSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HomepageJsonLd } from "@/components/home/HomepageJsonLd";

export const metadata: Metadata = {
  title: "IIT-JEE & NEET Coaching in Mathura | Emprise Academy",
  description:
    "Emprise Academy is Mathura's premier coaching institute for IIT-JEE (Main & Advanced), NEET-UG, and Foundation (Classes 8–10). Established in 2011 with concept-based pedagogy, experienced mentors, and proven results.",
  keywords: [
    "IIT-JEE Coaching in Mathura",
    "NEET Coaching in Mathura",
    "JEE Main Coaching in Mathura",
    "JEE Advanced Coaching in Mathura",
    "Foundation Coaching in Mathura",
    "JEE Preparation in Mathura",
    "NEET Preparation in Mathura",
    "ETSE 2026",
    "Emprise Academy Mathura",
  ],
  alternates: {
    canonical: "https://empriseacademy.com",
  },
  openGraph: {
    title: "IIT-JEE & NEET Coaching in Mathura | Emprise Academy",
    description:
      "Established in 2011, Emprise Academy provides structured academic preparation, experienced faculty, and regular testing for IIT-JEE, NEET-UG, and Foundation in Mathura.",
    url: "https://empriseacademy.com",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIT-JEE & NEET Coaching in Mathura | Emprise Academy",
    description:
      "Premier coaching institute for IIT-JEE, NEET-UG, and Foundation Classes 8–10 in Mathura. Established in 2011.",
  },
};

export default function HomePage() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data for SEO */}
        <HomepageJsonLd />

        {/* Global Navigation Shell */}
        <Navbar />

        {/* Main Content Sections with Sophisticated Visual Rhythm */}
        <main className="flex-1">
          {/* 1. Large Hero Carousel Slider (Promotional Showcase) */}
          <HeroSlider />

          {/* 2. Trust & Introduction Section (Academic Excellence • Est. 2011) */}
          <TrustIntroSection />

          {/* 3. Meet the Directors: Academic Leadership (Light Neutral #F8FAFC) */}
          <DirectorsSection />

          {/* 4. 4-Column Responsive Courses Section (Light Neutral #F8FAFC) */}
          <CoursesGridSection />

          {/* 5. Dedicated ETSE 2026 Feature Section (Strong Blue Moment) */}
          <EtseFeatureSection />

          {/* 6. Why Students & Parents Choose Emprise (White Surface) */}
          <WhyEmpriseSection />

          {/* 7. The Emprise System: 8-Step Interactive Journey (Light Neutral #F8FAFC) */}
          <TheEmpriseSystemSection />

          {/* 8. Results & Verified Achievers (Light Neutral #F8FAFC) */}
          <ResultsSection />

          {/* 10. Life at Emprise: Gallery Preview (White Surface) */}
          <GalleryPreviewSection />

          {/* 11. Latest Updates & Notices (Light Neutral #F8FAFC) */}
          <LatestUpdatesSection />

          {/* 12. Student & Parent Testimonials (White Surface) */}
          <TestimonialsHomeSection />

          {/* 13. Accessible Accordion FAQs (White Surface) */}
          <FAQSection />

          {/* 14. Mathura Campus Contact & Location (Light Neutral #F8FAFC with Selective Blue Panel) */}
          <CampusContactSection />

          {/* 15. Final Decision CTA (Strong Blue Moment) */}
          <FinalCtaSection />
        </main>

        {/* Global Institutional Footer (Deep Institutional Blue #123E73) */}
        <Footer />

        {/* Mobile Fixed CTA Bar */}
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
