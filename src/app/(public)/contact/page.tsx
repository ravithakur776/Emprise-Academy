import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactDetailsCard } from "@/components/contact/ContactDetailsCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactJsonLd } from "@/components/contact/ContactJsonLd";
import { MAIN_CONTACT_DATA } from "@/data/admissions";

export const metadata: Metadata = {
  title: MAIN_CONTACT_DATA.meta.title,
  description: MAIN_CONTACT_DATA.meta.description,
  keywords: [...MAIN_CONTACT_DATA.meta.keywords],
  alternates: {
    canonical: MAIN_CONTACT_DATA.meta.canonical,
  },
  openGraph: {
    title: MAIN_CONTACT_DATA.meta.title,
    description: MAIN_CONTACT_DATA.meta.description,
    url: MAIN_CONTACT_DATA.meta.canonical,
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
        {/* Structured Data */}
        <ContactJsonLd
          pageTitle="Contact Emprise Academy Mathura"
          description={MAIN_CONTACT_DATA.meta.description}
          url={MAIN_CONTACT_DATA.meta.canonical}
          breadcrumbs={[
            { name: "Home", item: "https://empriseacademy.com" },
            { name: "Contact", item: MAIN_CONTACT_DATA.meta.canonical },
          ]}
        />

        <Navbar />

        <main className="flex-1">
          {/* 1. Contact Hero */}
          <ContactHero
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Contact Us" },
            ]}
          />

          {/* 2. Main Contact Grid */}
          <Section variant="default" spacing="lg">
            <Container size="xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Campus Details & Maps */}
                <div className="lg:col-span-6">
                  <ContactDetailsCard />
                </div>

                {/* Right Column: Enquiry Form */}
                <div className="lg:col-span-6">
                  <ContactForm />
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
        <MobileBottomCTA />
      </div>
    </ToastProvider>
  );
}
