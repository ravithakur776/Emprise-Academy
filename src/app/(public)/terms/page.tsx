import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";

export const metadata = {
  title: "Terms of Service | Emprise Academy Mathura",
  description:
    "Official terms and conditions governing website usage, admissions, entrance examinations, and academic enrolment at Emprise Academy.",
  alternates: {
    canonical: "https://empriseacademy.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <Container size="md" className="space-y-8">
          <div className="space-y-3">
            <Badge variant="muted" size="sm">
              ACADEMIC POLICIES
            </Badge>
            <Heading as="h1" variant="h1">
              Terms of Service & Enrolment
            </Heading>
            <Text variant="body" color="muted">
              Last updated: August 2026. Guidelines and terms governing usage of the Emprise Academy digital portal and entrance test registration.
            </Text>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm leading-relaxed text-slate-700">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By registering for the Emprise Talent Search Examination (ETSE), submitting admission inquiries, or accessing student accounts, candidates and guardians agree to comply with institutional academic regulations and examination protocols.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Examination Code of Conduct</h2>
              <p>
                Candidates appearing for ETSE or classroom test series must present a valid Admit Card at the designated examination venue. Any misrepresentation of academic class, identity, or examination malpractice shall lead to immediate cancellation of candidature and scholarship forfeiture.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Scholarships & Fee Structure</h2>
              <p>
                Scholarship percentages awarded through ETSE or diagnostic assessments apply specifically to tuition fees for configured classroom batches and are non-transferable.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Institutional Jurisdiction</h2>
              <p>
                All academic programs and institutional operations are governed under the jurisdiction of Mathura, Uttar Pradesh, India.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
