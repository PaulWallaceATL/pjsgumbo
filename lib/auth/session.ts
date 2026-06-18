import { redirect } from "next/navigation";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  hasPermission,
  isAtLeast,
  type Permission,
  type Role,
} from "./rbac";

export type AuthUser = {
  id: string;
  supabaseId: string;
  email: string;
  name: string | null;
  role: Role;
};

/**
 * Resolve the current application user (joining the Supabase auth session to
 * the local `User` record). Memoized per-request via React `cache`.
 * Returns null when not authenticated or Supabase isn't configured yet.
 */
/**
 * Demo user used only in non-production environments before Supabase is wired
 * up, so the Restaurant OS is explorable locally. In production with no
 * Supabase config this is skipped and protected routes redirect to /login.
 */
const DEV_OWNER: AuthUser = {
  id: "dev-owner",
  supabaseId: "dev-owner",
  email: "owner@pjsgumbo.com",
  name: "PJ Owner (Demo)",
  role: "OWNER",
};

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  if (!isSupabaseConfigured()) {
    return process.env.NODE_ENV === "production" ? null : DEV_OWNER;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { id: true, supabaseId: true, email: true, name: true, role: true },
  });

  if (!dbUser) return null;

  return dbUser as AuthUser;
});

/** Require an authenticated user or redirect to login. */
export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Require at least the given role, otherwise redirect. */
export async function requireRole(minimum: Role): Promise<AuthUser> {
  const user = await requireUser();
  if (!isAtLeast(user.role, minimum)) redirect("/dashboard");
  return user;
}

/** Require a specific permission, otherwise redirect. */
export async function requirePermission(
  permission: Permission,
): Promise<AuthUser> {
  const user = await requireUser();
  if (!hasPermission(user.role, permission)) redirect("/dashboard");
  return user;
}
