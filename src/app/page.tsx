import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustNumbersStrip } from "@/components/home/TrustNumbersStrip";
import { CoreProgramsSection } from "@/components/home/CoreProgramsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { DirectorsSection } from "@/components/home/DirectorsSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { CampusEnvironmentSection } from "@/components/home/CampusEnvironmentSection";
import { ScholarshipSection } from "@/components/home/ScholarshipSection";
import { AdmissionsCounsellingSection } from "@/components/home/AdmissionsCounsellingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CampusContactSection } from "@/components/home/CampusContactSection";
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

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Trust Numbers Section */}
          <TrustNumbersStrip />

          {/* 3. Three Core Academic Programmes */}
          <CoreProgramsSection />

          {/* 4. Why Choose Emprise Academy */}
          <WhyChooseSection />

          {/* 5. Teaching Methodology Cycle */}
          <MethodologySection />

          {/* 6. Directors & Academic Leadership */}
          <DirectorsSection />

          {/* 7. Results Section */}
          <ResultsSection />

          {/* 8. Campus & Learning Environment */}
          <CampusEnvironmentSection />

          {/* 10. Scholarship Section */}
          <ScholarshipSection />

          {/* 11. Admissions & Counselling CTA Form */}
          <AdmissionsCounsellingSection />

          {/* 12. Frequently Asked Questions */}
          <FAQSection />

          {/* 13. Mathura Campus Contact & Directions */}
          <CampusContactSection />
        </main>

        {/* Institutional Footer */}
        <Footer />

        {/* Mobile Sticky Bottom Conversion Bar */}
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
