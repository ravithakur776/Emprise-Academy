import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

/**
 * Creates a Supabase client for use in browser/client components.
 * Utilizes the public anon key.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const createClientBrowser = createClient;

