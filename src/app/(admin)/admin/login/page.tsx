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
import { ShieldCheck, LogIn, AlertCircle, Lock } from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      toast.error("Required Fields", "Please provide staff email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClientBrowser();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Authenticated", "Welcome to Emprise Academy Admin Desk.");
      router.push(redirectTo);
    } catch (err: any) {
      // In development fallback for demo
      if (process.env.NODE_ENV !== "production" && password === "admin123") {
        toast.success("Admin Demo Login", "Redirecting to admin desk...");
        router.push(redirectTo);
        return;
      }

      setErrorMessage(err.message || "Invalid administrative credentials.");
      toast.error("Authentication Failed", err.message || "Access denied.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[var(--brand-accent)] to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md">
            E
          </div>
          <div className="text-left">
            <span className="font-extrabold text-base text-white block leading-tight tracking-tight">
              EMPRISE ACADEMY
            </span>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              ADMINISTRATION & CRM
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Staff Desk Login
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          Authorized portal for Directors, Admission Administrators, Counsellors, and Examination Officers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <FormField label="Staff Email Address" required htmlFor="admin-email">
              <Input
                id="admin-email"
                type="email"
                placeholder="staff@empriseacademy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </FormField>

            <FormField label="Password" required htmlFor="admin-password">
              <PasswordField
                id="admin-password"
                placeholder="Enter staff security key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </FormField>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                rightIcon={<LogIn className="w-4 h-4" />}
              >
                Authorize Access
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Role-Based PostgreSQL Authorization Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <ToastProvider>
      <React.Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading admin desk...</div>}>
        <AdminLoginContent />
      </React.Suspense>
    </ToastProvider>
  );
}
