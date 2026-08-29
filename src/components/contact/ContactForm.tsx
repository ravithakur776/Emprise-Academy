"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select, Textarea } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { Send, UserCheck, AlertCircle } from "lucide-react";

export const ContactForm: React.FC = () => {
  const toast = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentClass, setCurrentClass] = useState("Class 11");
  const [courseInterest, setCourseInterest] = useState("IIT-JEE");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || phone.length < 10) {
      toast.error("Incomplete Details", "Please provide your full name and 10-digit mobile number.");
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
          email: email.trim() || null,
          class: currentClass,
          courseInterest: courseInterest,
          message: message.trim() || null,
          source: "CONTACT",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setReferenceNumber(data.data?.enquiryReferenceNumber || "ENQ-2026-RECORDED");
      setIsSubmitted(true);
      toast.success("Enquiry Logged", "We have received your message and will reach out shortly.");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again or visit our Mathura campus.");
      toast.error("Submission Failed", "Could not send your enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
      {isSubmitted ? (
        <div className="text-center py-8 space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <UserCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Message Received
            </span>
            <h3 className="text-2xl font-bold text-[var(--brand-primary)]">
              Thank You, {fullName}!
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto space-y-1.5 text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">Enquiry Reference:</span>
              <span className="font-bold text-[var(--brand-primary)]">{referenceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Stream Interest:</span>
              <span className="font-bold text-slate-800">{courseInterest}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Our campus admissions desk has registered your query. A counsellor will contact you shortly during working hours.
          </p>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSubmitted(false);
                setFullName("");
                setPhone("");
                setMessage("");
              }}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <h3 className="text-lg font-bold text-[var(--brand-primary)]">
              Send an Academic Enquiry
            </h3>
            <p className="text-xs text-slate-500">
              Leave your contact details and our team will get back to you with syllabus details and batch timings.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <FormField label="Full Name" required htmlFor="contact-name">
            <Input
              id="contact-name"
              placeholder="e.g. Ramesh Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Mobile Number" required htmlFor="contact-phone">
              <PhoneField
                id="contact-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Email Address (Optional)" htmlFor="contact-email">
              <Input
                id="contact-email"
                type="email"
                placeholder="e.g. ramesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Interested Programme" required htmlFor="contact-course">
              <Select
                id="contact-course"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                options={[
                  { value: "IIT-JEE", label: "IIT-JEE Engineering" },
                  { value: "NEET-UG", label: "NEET-UG Medical" },
                  { value: "FOUNDATION", label: "Foundation (8–10)" },
                  { value: "SCHOLARSHIP", label: "Scholarship Slabs" },
                ]}
              />
            </FormField>

            <FormField label="Current Class" required htmlFor="contact-class">
              <Select
                id="contact-class"
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

          <FormField label="Your Message / Query" htmlFor="contact-message">
            <Textarea
              id="contact-message"
              placeholder="e.g. Inquiring about upcoming batch start dates, test schedules..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormField>

          <p className="text-[11px] text-slate-400">
            By submitting this enquiry, you agree to be contacted by Emprise Academy regarding your academic goals.
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
              Submit Message
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
