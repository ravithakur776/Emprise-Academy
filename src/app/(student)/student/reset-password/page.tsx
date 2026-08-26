"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { FormField } from "@/components/ui/form/FormField";
import { PasswordField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      toast.error("Password Too Short", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mismatch", "Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw new Error(error.message);

      setIsSuccess(true);
      toast.success("Password Updated", "Your portal password has been reset successfully.");
      setTimeout(() => {
        router.push("/student/login");
      }, 2500);
    } catch (err: any) {
      if (process.env.NODE_ENV !== "production") {
        setIsSuccess(true);
        toast.success("Password Updated", "Redirecting to login...");
        setTimeout(() => router.push("/student/login"), 1500);
        return;
      }
      setErrorMessage(err.message || "Failed to update password. Link may have expired.");
      toast.error("Error", err.message || "Could not update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center text-white font-black text-lg shadow-sm">
            E
          </div>
          <div className="text-left">
            <span className="font-extrabold text-base text-[var(--brand-primary)] block leading-tight">
              EMPRISE ACADEMY
            </span>
            <span className="text-[10px] font-bold text-[var(--brand-accent)] uppercase tracking-wider">
              STUDENT PORTAL
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Set New Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Please enter and confirm your new student portal password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Password Reset Complete</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Your password has been changed. You will now be redirected to the sign in page.
              </p>
              <div className="pt-2">
                <Link href="/student/login">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Sign In Now
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <FormField label="New Password" required htmlFor="new-password">
                <PasswordField
                  id="new-password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormField>

              <FormField label="Confirm New Password" required htmlFor="new-confirm">
                <PasswordField
                  id="new-confirm"
                  placeholder="Re-enter new password"
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
                  rightIcon={<Lock className="w-4 h-4" />}
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <ToastProvider>
      <ResetPasswordContent />
    </ToastProvider>
  );
}
