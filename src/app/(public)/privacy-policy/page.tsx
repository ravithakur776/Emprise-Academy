import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";

export const metadata = {
  title: "Privacy Policy | Emprise Academy Mathura",
  description:
    "Official privacy policy of Emprise Academy detailing student data protection, admissions enquiry handling, and test information confidentiality.",
  alternates: {
    canonical: "https://empriseacademy.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <Container size="md" className="space-y-8">
          <div className="space-y-3">
            <Badge variant="muted" size="sm">
              LEGAL & DATA PROTECTION
            </Badge>
            <Heading as="h1" variant="h1">
              Privacy Policy
            </Heading>
            <Text variant="body" color="muted">
              Last updated: August 2026. Emprise Academy ("we", "our", or "the Academy") is committed to safeguarding student and parent personal information.
            </Text>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm leading-relaxed text-slate-700">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                We collect personal information necessary to deliver educational services, process admissions, and conduct scholarship examinations (ETSE). This includes student and parent names, contact numbers, email addresses, current academic class, and school information provided during enquiries or registrations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Use of Information</h2>
              <p>
                Collected data is used solely for academic counseling, entrance test administration, admit card generation, result notifications, and internal academy communications. We do not sell or lease student contact details to third-party marketing entities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Examination & Result Privacy</h2>
              <p>
                Individual test scores and admit cards are stored securely in protected storage. Public verification tokens provide only candidate confirmation status without exposing sensitive personal identifiers such as home address or date of birth.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Contact & Inquiries</h2>
              <p>
                For privacy-related inquiries, please contact the administrative desk at{" "}
                <strong className="text-slate-900">admissions@empriseacademy.com</strong> or visit our Mathura campus during working hours.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
