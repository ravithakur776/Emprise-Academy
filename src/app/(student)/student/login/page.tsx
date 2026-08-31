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
import { resolveStudentLoginEmail, verifyStudentPortalAccess } from "@/services/auth.service";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { LogIn, ArrowRight, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";

function StudentLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder.supabase.co") &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder")
  );

  const rawRedirect = searchParams.get("redirectTo") || "/student/dashboard";
  let cleanRedirect = "/student/dashboard";
  if (rawRedirect.startsWith("/student") && !rawRedirect.startsWith("//") && !rawRedirect.includes("://")) {
    cleanRedirect = rawRedirect;
  }

  // If already authenticated, forward to dashboard
  React.useEffect(() => {
    const supabase = createClientBrowser();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        window.location.href = cleanRedirect;
      }
    });
  }, [cleanRedirect]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      toast.error("Required Fields Missing", "Please enter your registered email address and password.");
      return;
    }

    if (!isConfigured) {
      const configMsg = "Backend Authentication Not Configured: Supabase API URL and Anon Key are missing or unconfigured in .env.local. Please configure your live Supabase credentials to enable student login.";
      setErrorMessage(configMsg);
      toast.error("Configuration Required", "Supabase credentials are not configured in .env.local.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();

      if (process.env.NODE_ENV !== "production") {
        console.log("[AUTH_REQUEST_STARTED]", {
          step: "SIGN_IN_WITH_PASSWORD",
          endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
          method: "POST",
          email: cleanEmail,
        });
      }

      // 1. Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[AUTH_REQUEST_FAILED]", {
            step: "SIGN_IN_WITH_PASSWORD",
            errorName: String(error?.name || "AuthApiError"),
            errorMessage: String(error?.message || "Sign in failed"),
            status: (error as any)?.status || 400,
            errorCode: (error as any)?.code || undefined,
          });
        }

        const msgLower = (error.message || "").toLowerCase();
        if (
          msgLower.includes("failed to fetch") ||
          msgLower.includes("networkerror") ||
          msgLower.includes("fetch failed")
        ) {
          throw new Error("Unable to reach the authentication server. Please check your network connection or verify configuration.");
        }

        if (msgLower.includes("invalid login credentials")) {
          throw new Error("Invalid email or password. Please verify your credentials.");
        }
        if (msgLower.includes("email not confirmed")) {
          throw new Error("Your email address has not been confirmed yet. Please verify your inbox.");
        }
        throw new Error(error.message);
      }

      // 2. Verify Session & User
      if (!data.session || !data.user || !data.user.id) {
        throw new Error("Unable to establish your session. Please try again.");
      }

      if (process.env.NODE_ENV !== "production") {
        console.log("[AUTH_SESSION_ESTABLISHED]", {
          step: "VERIFY_PORTAL_ACCESS",
          userId: data.user.id,
        });
      }

      // 3. Verify student role and linked student profile
      const accessVerification = await verifyStudentPortalAccess(
        supabase,
        data.user.id,
        data.user.user_metadata
      );

      if (!accessVerification.isAllowed) {
        await supabase.auth.signOut();
        throw new Error(accessVerification.errorMessage || "Your student account is not fully configured. Please contact the academy.");
      }

      // 4. Success Toast & Navigation
      toast.success("Signed in successfully.");
      router.refresh();
      router.replace(cleanRedirect);
    } catch (err: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[AUTH_FLOW_ERROR]", {
          step: "student-login-flow",
          errorName: String(err?.name || "Error"),
          errorMessage: String(err?.message || err || "Authentication flow failed"),
          errorCode: (err as any)?.code || undefined,
          status: (err as any)?.status || undefined,
        });
      }

      const msgLower = (err?.message || "").toLowerCase();
      let msg = err?.message || "Failed to log in. Please check your credentials.";

      if (
        msgLower.includes("failed to fetch") ||
        msgLower.includes("networkerror") ||
        msgLower.includes("fetch failed")
      ) {
        msg = "Unable to reach the authentication server. Please check your network connection or verify configuration.";
      }

      setErrorMessage(msg);
      toast.error("Login Failed", msg);
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
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {!isConfigured && process.env.NODE_ENV !== "production" && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-semibold">Supabase Backend Unconfigured</p>
                <p className="mt-0.5 text-[11px] text-amber-700 leading-relaxed">
                  Real authentication requires configuring <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code>. See <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">docs/SUPABASE_SETUP.md</code> for setup instructions.
                </p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <FormField label="Registered Email Address" required htmlFor="student-email">
              <Input
                id="student-email"
                type="email"
                placeholder="e.g. student@empriseacademy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username email"
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
