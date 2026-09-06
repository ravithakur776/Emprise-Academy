import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { VERIFIED_TESTIMONIALS } from "@/data/results";
import { Star, Quote, CheckCircle2, ArrowRight } from "lucide-react";

export const TestimonialsHomeSection: React.FC = () => {
  // Show top 3 authentic testimonials on homepage
  const testimonials = VERIFIED_TESTIMONIALS.slice(0, 3);

  return (
    <Section variant="default" spacing="lg" id="testimonials" className="bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="primary" size="md">
              STUDENT & PARENT VOICES
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--brand-text)] tracking-tight">
              Real Experiences at <span className="text-[var(--brand-primary)]">Emprise</span>
            </h2>
            <Text variant="body-large" color="secondary" className="text-sm sm:text-base">
              Reflections from students and parents on classroom discipline, faculty dedication, and academic mentorship in Mathura.
            </Text>
          </div>

          <div className="shrink-0">
            <Link href="/testimonials">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Testimonials Grid (Type A Clean White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[var(--brand-border)] hover:border-[var(--brand-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-2.5 py-1 rounded-md border border-blue-200/60">
                    {item.authorType === "STUDENT" ? "Student" : "Parent"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--brand-text)] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--brand-text)]">
                    {item.authorName}
                  </h3>
                  <p className="text-[11px] text-[var(--brand-text-secondary)]">
                    {item.verifiedContext}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
