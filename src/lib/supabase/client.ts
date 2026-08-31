import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Creates or retrieves the singleton Supabase client for use in browser/client components.
 * Guarantees a single GoTrue auth listener and unified cookie storage in the browser runtime.
 */
export function createClientBrowser(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  if (typeof window === "undefined") {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return clientInstance;
}

export const createClient = createClientBrowser;
