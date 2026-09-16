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
import { HelpCircle, ArrowRight } from "lucide-react";

export const FAQSection: React.FC = () => {
  const faqs: HomepageFAQ[] = HOMEPAGE_DATA.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Section variant="default" spacing="lg" id="faq" className="bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Badge variant="primary" size="md">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
            Got Questions? <span className="text-[var(--brand-primary)]">We Have Answers.</span>
          </h2>
          <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
            Everything you need to know about our courses, ETSE scholarship exam, faculty mentorship, and campus admissions in Mathura.
          </Text>
        </div>

        {/* 13 Accordion Items (Centered 900–1000px width) */}
        <div className="max-w-4xl mx-auto space-y-3">
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

        {/* Need More Assistance Banner */}
        <div className="max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-[var(--brand-background)] border border-[var(--brand-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
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

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Contact Counsellor
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};
