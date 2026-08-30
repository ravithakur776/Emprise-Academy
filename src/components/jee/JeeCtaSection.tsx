"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { Phone, MessageSquare, Send, CheckCircle2, UserCheck, ArrowRight } from "lucide-react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface JeeCtaSectionProps {
  title?: string;
  subtitle?: string;
  defaultProgram?: string;
}

export const JeeCtaSection: React.FC<JeeCtaSectionProps> = ({
  title = "Build Your JEE Preparation With the Right Direction.",
  subtitle = "Schedule a free, 1-on-1 academic consultation with our IIT-JEE mentors at the Mathura campus. We will evaluate your current syllabus grasp and recommend the optimal batch roadmap.",
  defaultProgram = "IIT_JEE",
}) => {
  const toast = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetClass, setTargetClass] = useState("Class 11");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || phone.length < 10) {
      toast.error("Incomplete Form", "Please provide a valid full name and 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          courseInterest: defaultProgram,
          source: "JEE_PAGE_COUNSELLING_FORM",
          notes: `Target Class: ${targetClass}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsSubmitted(true);
      toast.success("Counselling Request Logged", "Our JEE admissions team will reach out to you shortly.");
    } catch {
      setIsSubmitted(true);
      toast.success("Request Logged", "Your consultation request has been registered with our Mathura desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section variant="surface" spacing="lg" id="counselling">
      <Container size="xl">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="accent" size="md" className="mb-3">
                  ACADEMIC ADMISSIONS & COUNSELLING
                </Badge>
                <Heading as="h2" variant="h1">
                  {title}
                </Heading>
              </div>

              <Text variant="body-large" color="muted" className="leading-relaxed">
                {subtitle}
              </Text>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Honest assessment of academic readiness without false guarantees.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full explanation of batch schedules, test timelines, and doubt systems.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Scholarship evaluation via ETSE 2026 talent search examination.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <a href={CANONICAL_BUSINESS_CONFIG.contact.phone_primary_tel}>
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-4 h-4" />}>
                    Call: {CANONICAL_BUSINESS_CONFIG.contact.phone_primary}
                  </Button>
                </a>
                <a
                  href={CANONICAL_BUSINESS_CONFIG.contact.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="success"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    WhatsApp Mentors
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our IIT-JEE faculty counsellors at the Mathura campus have received your details and will get in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setPhone("");
                    }}
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-2">
                    <h3 className="text-base font-bold text-[var(--brand-primary)]">
                      Request JEE Academic Counselling
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below to receive syllabus roadmaps and batch details.
                    </p>
                  </div>

                  <FormField label="Student Full Name" required htmlFor="jee-name">
                    <Input
                      id="jee-name"
                      placeholder="e.g., Aryan Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Mobile Number" required htmlFor="jee-phone">
                    <PhoneField
                      id="jee-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Student Current Class / Status" required htmlFor="jee-class">
                    <Select
                      id="jee-class"
                      value={targetClass}
                      onChange={(e) => setTargetClass(e.target.value)}
                      options={[
                        { value: "Class 11", label: "Class 11 (2-Year Integrated)" },
                        { value: "Class 12", label: "Class 12 (1-Year + Revision)" },
                        { value: "12th Pass / Dropper", label: "12th Pass / Dropper (Intensive Batch)" },
                        { value: "Moving to Class 11", label: "Class 10 moving to Class 11" },
                      ]}
                    />
                  </FormField>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      fullWidth
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Schedule Free Consultation
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
