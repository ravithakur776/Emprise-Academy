"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { PhoneField, PasswordField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { verifyStudentPortalAccess } from "@/services/auth.service";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { UserPlus, AlertCircle, ShieldCheck } from "lucide-react";

function StudentRegisterContent() {
  const router = useRouter();
  const toast = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentClass, setCurrentClass] = useState("Class 8");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/\D/g, "");

    if (!fullName.trim() || cleanPhone.length < 10 || !password) {
      toast.error("Required Fields Missing", "Please provide full name, 10-digit phone number, and password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password Too Short", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password Mismatch", "Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();

      const userEmail = email.trim()
        ? email.trim().toLowerCase()
        : `${cleanPhone}@student.empriseacademy.com`;

      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: cleanPhone,
            current_class: currentClass,
            role: "STUDENT",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        await verifyStudentPortalAccess(supabase, data.user.id, {
          full_name: fullName.trim(),
          phone: cleanPhone,
          current_class: currentClass,
          role: "STUDENT",
        });
      }

      toast.success("Account Created", "Your student portal account has been created.");
      router.refresh();
      router.replace("/student/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create account. Please contact admissions support.");
      toast.error("Registration Error", err.message || "Could not complete registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-block select-none" aria-label="Emprise Academy — Home">
          <EmpriseLogo size="lg" />
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Student Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Register to view your ETSE 2026 application status, admit cards, and test scorecards.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <FormField label="Student Full Name" required htmlFor="reg-name">
              <Input
                id="reg-name"
                placeholder="e.g. Aarav Verma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Mobile Number" required htmlFor="reg-phone">
                <PhoneField
                  id="reg-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </FormField>

              <FormField label="Current Class" required htmlFor="reg-class">
                <Select
                  id="reg-class"
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                  options={[
                    { value: "Class 7", label: "Class 7" },
                    { value: "Class 8", label: "Class 8" },
                    { value: "Class 9", label: "Class 9" },
                    { value: "Class 10", label: "Class 10" },
                    { value: "Class 11", label: "Class 11" },
                    { value: "Class 12", label: "Class 12" },
                    { value: "Dropper", label: "Dropper" },
                  ]}
                />
              </FormField>
            </div>

            <FormField label="Email Address (Optional)" htmlFor="reg-email">
              <Input
                id="reg-email"
                type="email"
                placeholder="e.g. student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Create Password" required htmlFor="reg-password">
              <PasswordField
                id="reg-password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Confirm Password" required htmlFor="reg-confirm">
              <PasswordField
                id="reg-confirm"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormField>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                rightIcon={<UserPlus className="w-4 h-4" />}
              >
                Create Account & Go to Dashboard
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/student/login"
                className="font-bold text-[var(--brand-accent)] hover:underline"
              >
                Sign In
              </Link>
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Isolated student credentials managed securely</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentRegisterPage() {
  return (
    <ToastProvider>
      <StudentRegisterContent />
    </ToastProvider>
  );
}
