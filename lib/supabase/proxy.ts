import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { AUTH_ENABLED } from "@/lib/auth/config";
import { getSupabaseEnv, isSupabaseConfigured } from "./env";

/** Routes under the Restaurant OS that require an authenticated session. */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/inventory",
  "/recipes",
  "/os",
];
const AUTH_ROUTES = ["/login"];

/**
 * Refreshes the Supabase session cookie and performs an optimistic auth
 * redirect for protected routes. Authoritative role checks still happen in
 * Server Actions / layouts (see lib/auth).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!AUTH_ENABLED) {
    return response;
  }

  // Before Supabase is configured, don't block any routes.
  if (!isSupabaseConfigured()) {
    return response;
  }

  const { url, anonKey } = getSupabaseEnv();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

  if (isProtected && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
