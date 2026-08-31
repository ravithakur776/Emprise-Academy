import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

/**
 * Creates a privileged Supabase Admin client with the Service Role Key.
 *
 * CRITICAL SECURITY RULES:
 * 1. NEVER import or call this function in client components or browser bundles.
 * 2. ONLY use for trusted server-side jobs like batch Excel ingestion or super-admin audits.
 * 3. Bypasses Row Level Security (RLS).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseServiceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Server client cannot be initialized."
    );
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
