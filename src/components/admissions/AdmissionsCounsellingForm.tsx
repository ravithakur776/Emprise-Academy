"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select, Textarea } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { useToast } from "@/components/ui/toast/ToastProvider";
import {
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  UserCheck,
  Calendar,
  AlertCircle,
  Building2,
} from "lucide-react";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";

export interface AdmissionsCounsellingFormProps {
  initialProgramme?: "JEE" | "NEET" | "FOUNDATION" | "GENERAL";
}

export const AdmissionsCounsellingForm: React.FC<AdmissionsCounsellingFormProps> = ({
  initialProgramme = "JEE",
}) => {
  const searchParams = useSearchParams();
  const toast = useToast();

  // Form Fields
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentClass, setCurrentClass] = useState("Class 11");
  const [school, setSchool] = useState("");
  const [programme, setProgramme] = useState(initialProgramme);
  const [targetExam, setTargetExam] = useState("JEE Main & Advanced");
  const [preferredMode, setPreferredMode] = useState<"IN_PERSON" | "PHONE" | "WHATSAPP">("IN_PERSON");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prepopulate from URL params if present
  useEffect(() => {
    const progParam = searchParams.get("programme") || searchParams.get("course");
    if (progParam) {
      const upper = progParam.toUpperCase();
      if (upper.includes("JEE")) setProgramme("JEE");
      else if (upper.includes("NEET")) setProgramme("NEET");
      else if (upper.includes("FOUNDATION")) setProgramme("FOUNDATION");
    }
  }, [searchParams]);

  // Adjust target exam options based on programme
  useEffect(() => {
    if (programme === "JEE") {
      setTargetExam("JEE Main & Advanced");
    } else if (programme === "NEET") {
      setTargetExam("NEET-UG Medical");
    } else if (programme === "FOUNDATION") {
      setTargetExam("Foundation / Future JEE & NEET");
    }
  }, [programme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!studentName.trim() || phone.length < 10) {
      toast.error("Required Fields Missing", "Please enter a valid student name and 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture UTM parameters from URL
      const utmSource = searchParams.get("utm_source") || null;
      const utmMedium = searchParams.get("utm_medium") || null;
      const utmCampaign = searchParams.get("utm_campaign") || null;
      const utmContent = searchParams.get("utm_content") || null;
      const utmTerm = searchParams.get("utm_term") || null;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim(),
          parentName: parentName.trim() || null,
          phone: phone.trim(),
          email: email.trim() || null,
          class: currentClass,
          school: school.trim() || null,
          courseInterest: programme,
          targetExam: targetExam,
          preferredMode: preferredMode,
          preferredDate: preferredDate || null,
          message: message.trim() || null,
          source: "ADMISSIONS",
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setReferenceNumber(data.data?.enquiryReferenceNumber || "ENQ-2026-RECORDED");
      setIsDuplicate(data.data?.isExisting || false);
      setIsSubmitted(true);
      toast.success("Enquiry Logged", "Your academic consultation request has been registered.");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again or visit our campus.");
      toast.error("Submission Error", "Could not submit enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section variant="surface" spacing="lg" id="counselling">
      <Container size="xl">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Guidance & Direct Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge variant="accent" size="md" className="mb-3">
                  ACADEMIC COUNSELLING DESK
                </Badge>
                <Heading as="h2" variant="h1">
                  Book Free Academic Counselling
                </Heading>
              </div>

              <Text variant="body-large" color="muted" className="leading-relaxed">
                Meet one-on-one with our senior academic mentors at our Mathura campus or schedule a telephonic consultation. We evaluate your current academic level, discuss stream requirements, and help choose the right batch.
              </Text>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Personalized roadmap for IIT-JEE, NEET-UG, or Foundation.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Comprehensive review of batch timings, fee slabs, and study materials.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% transparent guidance with zero mandatory admission commitments.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-[var(--brand-primary)]">
                  <Building2 className="w-4 h-4 text-[var(--brand-accent)]" />
                  <span>Campus Location</span>
                </div>
                <p>{CANONICAL_BUSINESS_CONFIG.address.display_location}</p>
                <p className="text-slate-500">In-person guidance available at our Mathura campus ({CANONICAL_BUSINESS_CONFIG.contact.business_hours}).</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
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
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Counselling Form */}
            <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <UserCheck className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      {isDuplicate ? "Enquiry Updated" : "Enquiry Successfully Registered"}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--brand-primary)]">
                      Thank You, {studentName}!
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 max-w-md mx-auto space-y-2 text-left">
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400">Reference Number:</span>
                      <span className="font-bold text-[var(--brand-primary)]">{referenceNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400">Selected Programme:</span>
                      <span className="font-bold text-slate-800">{programme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Preferred Mode:</span>
                      <span className="font-bold text-slate-800">
                        {preferredMode === "IN_PERSON" ? "In-Person (Campus)" : preferredMode === "WHATSAPP" ? "WhatsApp" : "Phone Call"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Our academic counselling team at the Mathura campus will review your details and connect with you shortly.
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsSubmitted(false);
                        setStudentName("");
                        setPhone("");
                      }}
                    >
                      Submit Another Consultation Request
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                      Admissions & Counselling Form
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the details below to receive batch timelines, fee schedules, and academic roadmaps.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Student Full Name" required htmlFor="adm-student-name">
                      <Input
                        id="adm-student-name"
                        placeholder="e.g. Rahul Sharma"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Parent / Guardian Name" htmlFor="adm-parent-name">
                      <Input
                        id="adm-parent-name"
                        placeholder="e.g. Rajesh Sharma"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Mobile Number" required htmlFor="adm-phone">
                      <PhoneField
                        id="adm-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Email Address (Optional)" htmlFor="adm-email">
                      <Input
                        id="adm-email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Target Programme" required htmlFor="adm-programme">
                      <Select
                        id="adm-programme"
                        value={programme}
                        onChange={(e) => setProgramme(e.target.value as any)}
                        options={[
                          { value: "JEE", label: "IIT-JEE (Main & Advanced)" },
                          { value: "NEET", label: "NEET-UG (Medical)" },
                          { value: "FOUNDATION", label: "Foundation (Classes 8, 9 & 10)" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Current Class / Status" required htmlFor="adm-class">
                      <Select
                        id="adm-class"
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        options={[
                          { value: "Class 8", label: "Class 8" },
                          { value: "Class 9", label: "Class 9" },
                          { value: "Class 10", label: "Class 10" },
                          { value: "Class 11", label: "Class 11" },
                          { value: "Class 12", label: "Class 12" },
                          { value: "12th Pass / Dropper", label: "12th Pass / Dropper" },
                        ]}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Preferred Counselling Mode" required htmlFor="adm-mode">
                      <Select
                        id="adm-mode"
                        value={preferredMode}
                        onChange={(e) => setPreferredMode(e.target.value as any)}
                        options={[
                          { value: "IN_PERSON", label: "In-Person (Mathura Campus)" },
                          { value: "PHONE", label: "Telephonic Call" },
                          { value: "WHATSAPP", label: "WhatsApp Consultation" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Current School / City (Optional)" htmlFor="adm-school">
                      <Input
                        id="adm-school"
                        placeholder="e.g. DPS Mathura / Mathura"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <FormField label="Questions / Specific Academic Concerns (Optional)" htmlFor="adm-message">
                    <Textarea
                      id="adm-message"
                      placeholder="e.g. Inquiring about dropper batch schedules, scholarship criteria, hostel guidance..."
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormField>

                  <p className="text-[11px] text-slate-400">
                    By submitting this form, you agree to be contacted by Emprise Academy regarding your academic enquiry.
                  </p>

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
