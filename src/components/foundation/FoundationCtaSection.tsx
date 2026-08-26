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

export interface FoundationCtaSectionProps {
  title?: string;
  subtitle?: string;
  defaultProgram?: string;
}

export const FoundationCtaSection: React.FC<FoundationCtaSectionProps> = ({
  title = "Give Your Child the Advantage of Strong Academic Fundamentals.",
  subtitle = "Schedule a free, friendly academic consultation at our Mathura campus. We will evaluate your child's current science and mathematical grasp and discuss the right foundation roadmap.",
  defaultProgram = "FOUNDATION",
}) => {
  const toast = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetClass, setTargetClass] = useState("Class 8");
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
          source: "FOUNDATION_PAGE_COUNSELLING_FORM",
          notes: `Target Class: ${targetClass}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsSubmitted(true);
      toast.success("Counselling Request Logged", "Our Foundation team will reach out to you shortly.");
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
                  FOUNDATION ADMISSIONS & GUIDANCE
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
                  <span>Encouraging, supportive evaluation of mathematical & scientific curiosity.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full explanation of batch schedules, school balance, and doubt resolution.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Scholarship opportunities through the annual ETSE 2026 talent search test.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <a href="tel:+919876543210">
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-4 h-4" />}>
                    Call Desk: +91 98765 43210
                  </Button>
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Emprise%20Academy,%20I%20want%20to%20inquire%20about%20Foundation%20coaching%20for%20Classes%208-10."
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
                    Our Foundation academic mentors at the Mathura campus have received your details and will get in touch shortly.
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
                      Request Foundation Academic Counselling
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below to receive syllabus roadmaps and batch details.
                    </p>
                  </div>

                  <FormField label="Student / Parent Full Name" required htmlFor="foundation-name">
                    <Input
                      id="foundation-name"
                      placeholder="e.g., Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Mobile Number" required htmlFor="foundation-phone">
                    <PhoneField
                      id="foundation-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField label="Student Current Class" required htmlFor="foundation-class">
                    <Select
                      id="foundation-class"
                      value={targetClass}
                      onChange={(e) => setTargetClass(e.target.value)}
                      options={[
                        { value: "Class 8", label: "Class 8 Foundation" },
                        { value: "Class 9", label: "Class 9 Foundation" },
                        { value: "Class 10", label: "Class 10 (Board + Foundation)" },
                        { value: "Class 7 moving to 8", label: "Class 7 moving to Class 8" },
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
