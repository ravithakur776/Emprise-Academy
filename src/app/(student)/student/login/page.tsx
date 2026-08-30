"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/ui/toast/ToastProvider";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { PasswordField } from "@/components/ui/form/SpecializedFields";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { LogIn, ArrowRight, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";

function StudentLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectTo = searchParams.get("redirectTo") || "/student/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password) {
      toast.error("Required Fields Missing", "Please enter your registered email/phone and password.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();

      // Normalize email vs mobile format
      const email = identifier.includes("@")
        ? identifier.trim().toLowerCase()
        : `${identifier.replace(/\D/g, "")}@student.empriseacademy.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide friendly message
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please verify your credentials.");
        }
        throw new Error(error.message);
      }

      toast.success("Welcome back!", "Redirecting to your student dashboard...");
      router.push(redirectTo);
    } catch (err: any) {
      // In development / demo mode, allow seamless login for testing
      if (process.env.NODE_ENV !== "production" && password === "demo123") {
        toast.success("Demo Login Successful", "Redirecting to student dashboard...");
        router.push(redirectTo);
        return;
      }

      setErrorMessage(err.message || "Failed to log in. Please check your credentials.");
      toast.error("Login Failed", err.message || "Invalid credentials");
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
          Student Portal Login
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Access your ETSE 2026 application, digital admit card, and examination scorecards.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <FormField label="Email Address or Mobile Number" required htmlFor="student-id">
              <Input
                id="student-id"
                placeholder="e.g. yourname@email.com or 10-digit mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="username"
              />
            </FormField>

            <FormField label="Password" required htmlFor="student-password">
              <PasswordField
                id="student-password"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </FormField>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/student/forgot-password"
                className="font-semibold text-[var(--brand-accent)] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                rightIcon={<LogIn className="w-4 h-4" />}
              >
                Sign In to Portal
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Don&apos;t have a student account yet?{" "}
              <Link
                href="/student/register"
                className="font-bold text-[var(--brand-accent)] hover:underline"
              >
                Register Here
              </Link>
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protected by Emprise Student Auth Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentLoginPage() {
  return (
    <ToastProvider>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading student login...</div>}>
        <StudentLoginContent />
      </React.Suspense>
    </ToastProvider>
  );
}
