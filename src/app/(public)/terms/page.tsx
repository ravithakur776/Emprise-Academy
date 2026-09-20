import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Badge } from "@/components/ui/badge/Badge";
import { Breadcrumbs } from "@/components/ui/link/TextLink";
import {
  FileText,
  ShieldAlert,
  Scale,
  CreditCard,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Emprise Academy Mathura",
  description:
    "Official Terms & Conditions, Institutional Guidelines, Code of Conduct, and Refund & Cancellation Policy governing admissions and courses at Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Emprise Academy Mathura",
    description:
      "Official Terms & Conditions, Institutional Guidelines, and Refund & Cancellation Policy for Emprise Academy Mathura.",
    url: "https://empriseacademy.com/terms",
    siteName: "Emprise Academy",
    locale: "en_IN",
    type: "website",
  },
};

const TERMS_LIST = [
  {
    id: "01",
    title: "Admission Authority",
    text: "Emprise Academy reserves the right to deny admission where deemed necessary, subject to applicable law.",
  },
  {
    id: "02",
    title: "Candidate Eligibility & Examination Requirements",
    text: "Students/parents are responsible for confirming age, eligibility, domicile and examination requirements for JEE, NEET and other examinations. Emprise Academy shall not be responsible for incorrect information provided by the candidate.",
  },
  {
    id: "03",
    title: "Academic & Operational Adjustments",
    text: "Emprise Academy reserves the right to change faculty, study hours, batch timings, timetable and academic arrangements whenever required.",
  },
  {
    id: "04",
    title: "Accuracy of Information & Verification",
    text: "If any information provided by a candidate is found to be false or incorrect, admission may be cancelled without refund, subject to applicable law.",
  },
  {
    id: "05",
    title: "Campus Device & Mobile Phone Policy",
    text: "Mobile phones may be restricted/prohibited during classes and examinations. Violation may result in disciplinary action as per institute rules.",
  },
  {
    id: "06",
    title: "Institutional Discipline & Attendance",
    text: "Students must follow all discipline, attendance, examination and institutional rules.",
  },
  {
    id: "07",
    title: "Intellectual Property & Course Material Protection",
    text: "Study material, tests, videos, notes, logos and other content provided by Emprise Academy may not be copied, reproduced or commercially distributed without permission.",
  },
  {
    id: "08",
    title: "Academic Rigor & Outcome Disclaimer",
    text: "Admission does not guarantee any particular rank, marks, college, selection or career outcome.",
  },
  {
    id: "09",
    title: "Promotional Media & Testimonial Usage",
    text: "Registered/enrolled students' names, results, ranks, achievements, photographs and testimonials may be used by Emprise Academy for website, social media, advertisements, posters and other promotional purposes.",
  },
  {
    id: "10",
    title: "Course & Batch Transfers",
    text: "Any change of course/batch, if permitted, may be subject to applicable charges and seat availability.",
  },
  {
    id: "11",
    title: "Governing Law & Legal Jurisdiction",
    text: "For any legal dispute, applicable law and the jurisdiction of competent courts at Mathura, Uttar Pradesh, shall apply, subject to applicable law.",
  },
];

const REFUND_SLABS = [
  {
    period: "Within 7 days of registration",
    deduction: "₹10,000",
    status: "Applicable deduction",
  },
  {
    period: "Within 14 days",
    deduction: "₹15,000",
    status: "Applicable deduction",
  },
  {
    period: "Within 1 month",
    deduction: "₹25,000",
    status: "Applicable deduction",
  },
  {
    period: "After 1 month of registration or after course commencement",
    deduction: "No Refund",
    status: "Non-refundable",
    isNonRefundable: true,
  },
];

const REFUND_POLICIES = [
  "Refund requests must be submitted in writing by the parent/guardian.",
  "Refund, where applicable, will be processed after verification through the original payment method or another appropriate method.",
  "Applicable payment gateway/banking charges may be deducted.",
  "No refund shall ordinarily be available after course commencement, subject to applicable law.",
  "No refund shall ordinarily be available where admission is cancelled due to disciplinary misconduct or false information, subject to applicable law.",
  "Nothing in these terms is intended to exclude any mandatory statutory or consumer right.",
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white pt-8 pb-14 sm:pt-12 sm:pb-16 border-b border-blue-900/40">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <Container size="lg" className="relative z-10 space-y-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Terms & Conditions" },
              ]}
              className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
            />

            <div className="max-w-3xl space-y-4">
              <Badge variant="accent" size="sm">
                LEGAL & INSTITUTIONAL POLICIES
              </Badge>

              <Heading
                as="h1"
                variant="display"
                color="white"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                Terms & Conditions
              </Heading>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Official terms of admission, academic code of conduct, intellectual property protection, and refund &amp; cancellation policies governing Emprise Academy Mathura.
              </p>
            </div>
          </Container>
        </section>

        {/* Main Content Area */}
        <section className="py-12 sm:py-16">
          <Container size="lg" className="space-y-12">
            {/* Section 1: Terms & Conditions List */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                <Scale className="w-5 h-5 text-[var(--brand-primary)]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#14213D]">
                  Institutional Terms &amp; Conditions
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {TERMS_LIST.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3EAF3] shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-4"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-xl bg-blue-50 text-[var(--brand-primary)] font-mono text-xs font-bold flex items-center justify-center border border-blue-100 mt-0.5">
                      {item.id}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#475467] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Refund & Cancellation Rules */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                <CreditCard className="w-5 h-5 text-[#FF8A00]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#14213D]">
                  Refund &amp; Cancellation Rules
                </h2>
              </div>

              {/* Deduction Table */}
              <div className="rounded-2xl bg-white border border-[#E3EAF3] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <th className="py-4 px-6">Cancellation Period</th>
                        <th className="py-4 px-6 text-right sm:text-left">Deduction Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {REFUND_SLABS.map((slab, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50/60 transition-colors ${
                            slab.isNonRefundable ? "bg-amber-50/40" : ""
                          }`}
                        >
                          <td className="py-4 px-6 font-medium text-[#14213D]">
                            {slab.period}
                          </td>
                          <td className="py-4 px-6 text-right sm:text-left font-bold">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${
                                slab.isNonRefundable
                                  ? "bg-rose-100 text-rose-800 border border-rose-200"
                                  : "bg-blue-50 text-[var(--brand-primary)] border border-blue-100"
                              }`}
                            >
                              {slab.deduction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Refund Policy Bullet Points */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E3EAF3] shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#FF8A00]" />
                  Important Guidelines on Refund Processing
                </h3>
                <ul className="space-y-3 text-sm text-[#475467]">
                  {REFUND_POLICIES.map((policy, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] mt-2 shrink-0" />
                      <span className="leading-relaxed">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Acceptance of Terms */}
            <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-blue-900 to-[#123E73] text-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF8A00] shrink-0 border border-white/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Acceptance of Terms &amp; Conditions
                </h3>
              </div>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed pl-1 sm:pl-13">
                By registering, making payment or enrolling in a course, the student and/or parent/guardian confirms that they have read, understood and accepted these Terms &amp; Conditions and the Refund Policy.
              </p>
            </div>

            {/* Inquiries & Institutional Support */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center justify-center sm:justify-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Need Assistance or Policy Clarification?
                </span>
                <h4 className="text-base font-bold text-[#14213D]">
                  Have Questions Regarding Admissions or Fee Regulations?
                </h4>
                <p className="text-xs text-[#667085]">
                  Our administration and admission counselling team is available at the Mathura campus.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold hover:bg-[#123E73] transition-colors shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Contact Administration
                </Link>
                <a
                  href="tel:+917247889955"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  +91 7247889955
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
