"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { KeyRound, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";

function ForgotPasswordContent() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      toast.error("Email Required", "Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/student/reset-password`,
      });

      if (error) throw new Error(error.message);

      setIsSubmitted(true);
      toast.success("Recovery Email Sent", "Check your inbox for password reset instructions.");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send reset link. Please contact support.");
      toast.error("Error", err.message || "Could not send password reset email.");
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
          Reset Portal Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Enter your registered email address and we will send you a secure password reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Check Your Email</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                We have dispatched a password recovery link to <strong>{email}</strong>. Please follow the instructions to set a new password.
              </p>
              <div className="pt-2">
                <Link href="/student/login">
                  <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <FormField label="Registered Email Address" required htmlFor="reset-email">
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="e.g. student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </FormField>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={isLoading}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Reset Link
                </Button>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/student/login"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[var(--brand-primary)]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <ToastProvider>
      <ForgotPasswordContent />
    </ToastProvider>
  );
}
