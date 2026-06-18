import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <LoginForm next={next ?? "/dashboard"} configured={isSupabaseConfigured()} />
    </div>
  );
}
