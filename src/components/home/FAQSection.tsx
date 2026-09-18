"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, HomepageFAQ } from "@/data/homepage";
import { FAQAccordionItem } from "./FAQAccordionItem";
import { HelpCircle, ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export const FAQSection: React.FC = () => {
  const faqs: HomepageFAQ[] = HOMEPAGE_DATA.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Section variant="default" spacing="lg" id="faqs" className="bg-[#EEF5FF]/50 border-y border-[var(--brand-border)] select-none">
      {/* Anchor compatibility for existing #faq links */}
      <div id="faq" className="scroll-mt-24" />
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky Editorial Context & Counsellor Card (~40% width) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 text-left">
            <div className="space-y-3.5">
              <Badge variant="primary" size="md">
                FREQUENTLY ASKED QUESTIONS
              </Badge>

              <h2 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-[var(--brand-text)] tracking-tight leading-[1.2]">
                Got Questions? <span className="text-[var(--brand-primary)]">We Have Answers.</span>
              </h2>

              <p className="text-sm sm:text-base font-bold text-[#14213D] leading-snug">
                Questions Parents Actually Ask
              </p>

              <Text variant="body-large" color="secondary" className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Everything you need to know about our courses, ETSE scholarship exam, faculty mentorship, and campus admissions in Mathura.
              </Text>
            </div>

            {/* Need More Assistance Floating Panel */}
            <div className="p-6 rounded-3xl bg-white border border-[#D8E4F2] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--brand-text)]">
                    Still have questions?
                  </h3>
                  <p className="text-xs text-[var(--brand-text-secondary)]">
                    Talk directly with our academic counsellors at the Mathura campus.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs text-[#667085] flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Free Guidance
                </span>

                <Link href="/contact">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Contact Counsellor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 13-Question Single-Open Accordion (~60% width) */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => (
              <FAQAccordionItem
                key={faq.id || idx}
                faq={faq}
                index={idx}
                isOpen={openIndex === idx}
                onToggle={() => toggle(idx)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
