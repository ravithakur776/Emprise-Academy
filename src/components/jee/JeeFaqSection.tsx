"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { JeeFaqItem } from "@/data/jee";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface JeeFaqSectionProps {
  heading?: string;
  subheading?: string;
  faqs: readonly JeeFaqItem[];
}

export const JeeFaqSection: React.FC<JeeFaqSectionProps> = ({
  heading = "IIT-JEE Frequently Asked Questions",
  subheading = "Clear, factual answers for students and parents exploring engineering entrance preparation at Emprise Academy.",
  faqs,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <Section variant="default" spacing="lg" id="faqs">
      <Container size="md">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="primary" size="md">
            QUESTIONS & ANSWERS
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            {heading}
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            {subheading}
          </Text>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className={cn(
                  "border rounded-2xl bg-white transition-all overflow-hidden",
                  isOpen
                    ? "border-[var(--brand-accent)] shadow-xs"
                    : "border-slate-200/80 hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[var(--brand-primary)]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen ? "rotate-180 text-[var(--brand-accent)]" : ""
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--brand-accent)] hover:underline"
          >
            <span>Have more questions about our Mathura campus? Speak with our admissions desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
};
