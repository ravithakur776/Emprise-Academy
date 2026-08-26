"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { VERIFIED_TESTIMONIALS, VerifiedTestimonial } from "@/data/results";
import { Quote, GraduationCap, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const StudentTestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "STUDENT" | "PARENT">("ALL");

  const filteredTestimonials = VERIFIED_TESTIMONIALS.filter(
    (t) => activeTab === "ALL" || t.authorType === activeTab
  );

  return (
    <Section variant="surface" spacing="lg" id="testimonials">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="accent" size="md">
            AUTHENTIC EXPERIENCES
          </Badge>
          <Heading as="h2" variant="h1" align="center">
            What Students & Parents Say About Emprise
          </Heading>
          <Text variant="body-large" color="muted" align="center">
            Real feedback reflecting our classroom environment, faculty doubt support, and transparent communication.
          </Text>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            {[
              { id: "ALL", label: "All Testimonials" },
              { id: "STUDENT", label: "What Students Say" },
              { id: "PARENT", label: "What Parents Say" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeTab === tab.id
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={item.authorType === "STUDENT" ? "primary" : "gold"} size="sm">
                    {item.authorType === "STUDENT" ? "Student Experience" : "Parent Perspective"}
                  </Badge>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.examOrClass}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[var(--brand-accent)] text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  <Quote className="w-4 h-4 text-[var(--brand-accent)]/50 mb-1 inline mr-1" />
                  &ldquo;{item.quote}&rdquo;
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[var(--brand-primary)] shrink-0">
                  {item.authorType === "STUDENT" ? (
                    <GraduationCap className="w-5 h-5 opacity-70" />
                  ) : (
                    <Heart className="w-5 h-5 text-rose-500 opacity-80" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--brand-primary)]">
                    {item.authorName}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {item.verifiedContext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
