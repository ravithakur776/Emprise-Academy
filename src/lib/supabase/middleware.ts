import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do not run code between createServerClient and supabase.auth.getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Protect Admin Area
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirectTo", path);
      return NextResponse.redirect(url);
    }
  }

  // Protect Student Area
  if (
    path.startsWith("/student") &&
    !path.startsWith("/student/login") &&
    !path.startsWith("/student/register") &&
    !path.startsWith("/student/forgot-password") &&
    !path.startsWith("/student/reset-password")
  ) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/student/login";
      url.searchParams.set("redirectTo", path);
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
