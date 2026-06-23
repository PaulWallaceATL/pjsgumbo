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
import { AUTH_ENABLED } from "./config";

export type AuthUser = {
  id: string;
  supabaseId: string;
  email: string;
  name: string | null;
  role: Role;
};

/** Flip to `true` when Supabase auth is wired up. */
export { AUTH_ENABLED } from "./config";

const GUEST_USER: AuthUser = {
  id: "guest",
  supabaseId: "guest",
  email: "kitchen@pjsgumbo.com",
  name: "Kitchen Team",
  role: "OWNER",
};

/**
 * Resolve the current application user (joining the Supabase auth session to
 * the local `User` record). Memoized per-request via React `cache`.
 * When auth is disabled, returns a guest user so the OS is fully accessible.
 */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  if (!AUTH_ENABLED) return GUEST_USER;

  if (!isSupabaseConfigured()) {
    return process.env.NODE_ENV === "production" ? null : GUEST_USER;
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
  if (!AUTH_ENABLED) return GUEST_USER;

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
