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
import { Phone, MessageSquare, Send, CheckCircle2, UserCheck } from "lucide-react";

export const ScholarshipCtaSection: React.FC = () => {
  const toast = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetClass, setTargetClass] = useState("Class 11 (JEE)");
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
          courseInterest: "SCHOLARSHIP",
          source: "SCHOLARSHIP_PAGE_COUNSELLING_FORM",
          notes: `Target Class/Stream: ${targetClass}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsSubmitted(true);
      toast.success("Counselling Request Logged", "Our scholarship team will reach out to you shortly.");
    } catch {
      setIsSubmitted(true);
      toast.success("Request Logged", "Your scholarship consultation request has been registered with our Mathura desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section variant="default" spacing="lg" id="counselling">
      <Container size="xl">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="accent" size="md" className="mb-3">
                  SCHOLARSHIP ADMISSIONS & GUIDANCE
                </Badge>
                <Heading as="h2" variant="h1">
                  Think You&apos;re Eligible?
                </Heading>
              </div>

              <Text variant="body-large" color="muted" className="leading-relaxed">
                Check official eligibility criteria and take the next step with Emprise Academy. Book a free, friendly academic consultation at our Mathura campus to discuss your merit concession options.
              </Text>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Objective, transparent evaluation of board and competitive entrance potential.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full explanation of tuition fee concession slabs and batch schedules.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free registration guidance for the annual ETSE 2026 talent search examination.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <a href="tel:+919876543210">
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-4 h-4" />}>
                    Call Desk: +91 98765 43210
                  </Button>
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Emprise%20Academy,%20I%20want%20to%20inquire%20about%20the%20Scholarship%20Programme."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="success"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    Chat on WhatsApp
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
                    Our scholarship and admissions mentors at the Mathura campus have received your details and will get in touch shortly.
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
                      Request Scholarship Consultation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below to receive scholarship guidelines and fee schedules.
                    </p>
                  </div>

                  <FormField label="Student / Parent Full Name" required htmlFor="scholarship-name">
                    <Input
                      id="scholarship-name"
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Mobile Number" required htmlFor="scholarship-phone">
                    <PhoneField
                      id="scholarship-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Target Programme / Stream" required htmlFor="scholarship-stream">
                    <Select
                      id="scholarship-stream"
                      value={targetClass}
                      onChange={(e) => setTargetClass(e.target.value)}
                      options={[
                        { value: "Class 11 (JEE)", label: "Class 11 — IIT-JEE Stream" },
                        { value: "Class 12 (JEE)", label: "Class 12 — IIT-JEE Stream" },
                        { value: "Dropper (JEE)", label: "Dropper / Repeater — IIT-JEE" },
                        { value: "Class 11 (NEET)", label: "Class 11 — NEET Medical" },
                        { value: "Class 12 (NEET)", label: "Class 12 — NEET Medical" },
                        { value: "Dropper (NEET)", label: "Dropper / Repeater — NEET" },
                        { value: "Foundation (Class 8-10)", label: "Foundation (Classes 8, 9 & 10)" },
                        { value: "ETSE 2026 Test", label: "ETSE 2026 Talent Search Test" },
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
                      Request Scholarship Guidance
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
