/**
 * Production Environment Configuration & Startup Validator
 * Emprise Academy Digital Platform
 */

import { z } from "zod";

const envSchema = z.object({
  // Public client-exposed variables
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .default("https://empriseacademy.com"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid Supabase endpoint")
    .default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(10, "NEXT_PUBLIC_SUPABASE_ANON_KEY must be configured")
    .default("placeholder-anon-key"),

  // Server-only private secrets
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(10, "SUPABASE_SERVICE_ROLE_KEY is required for server administration")
    .optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): {
  isValid: boolean;
  errors: string[];
  config: EnvConfig;
} {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    const errorMessages = result.error.issues.map(
      (issue) => `[CONFIG ERROR] ${issue.path.join(".")}: ${issue.message}`
    );
    return {
      isValid: false,
      errors: errorMessages,
      config: envSchema.parse({}), // Fallback safe defaults
    };
  }

  return {
    isValid: true,
    errors: [],
    config: result.data,
  };
}

export const validatedEnv = validateEnv();
