"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, type SignInState } from "@/lib/auth/actions";

export function LoginForm({
  next,
  configured,
}: {
  next: string;
  configured: boolean;
}) {
  const [state, formAction, pending] = useActionState<SignInState, FormData>(
    signIn,
    null,
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <Image
          src="/brand/pjs-logo.png"
          alt="PJ's Gumbo"
          width={72}
          height={72}
          className="size-16 rounded-full object-contain"
          priority
        />
        <CardTitle className="mt-2 text-2xl">PJ&apos;s Restaurant OS</CardTitle>
        <CardDescription>Sign in to manage your kitchen</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@pjsgumbo.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          {state?.error ? (
            <p className="text-destructive text-sm">{state.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          {!configured ? (
            <p className="text-muted-foreground text-center text-xs">
              Demo mode: Supabase isn&apos;t configured, so any credentials open
              the dashboard.
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
