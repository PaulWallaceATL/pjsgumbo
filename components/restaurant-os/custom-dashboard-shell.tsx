"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CustomSetupForm } from "@/components/restaurant-os/custom-setup-form";
import { DemoShell } from "@/components/restaurant-os/demo-shell";
import { useCustomDashboard } from "@/components/restaurant-os/custom-dashboard-provider";

export function CustomDashboardShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, ready } = useCustomDashboard();
  const [fullscreen, setFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (searchParams.get("fullscreen") === "1") {
      setFullscreen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const exitFullscreen = useCallback(() => {
    setFullscreen(false);
    router.replace("/restaurant-os/custom");
  }, [router]);

  if (!ready) {
    return (
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="bg-muted h-96 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (!profile || showSettings) {
    return (
      <div className="container-px mx-auto max-w-4xl py-12">
        {profile ? (
          <Button
            type="button"
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => setShowSettings(false)}
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
        ) : null}
        <CustomSetupForm onComplete={() => setShowSettings(false)} />
      </div>
    );
  }

  const shell = (
    <DemoShell
      variant="custom"
      restaurantName={profile.restaurantName}
      city={profile.city}
      initialPresentation={fullscreen}
      onEditSetup={() => setShowSettings(true)}
    />
  );

  if (fullscreen) {
    return (
      <div className="bg-background fixed inset-0 z-50 flex flex-col overflow-hidden">
        <div className="ring-border/60 flex min-h-0 flex-1 flex-col overflow-hidden border shadow-2xl ring-1">
          {shell}
        </div>
        <div className="absolute top-3 right-3 z-10">
          <Button type="button" variant="outline" size="sm" onClick={exitFullscreen}>
            Exit full screen
          </Button>
        </div>
      </div>
    );
  }

  return shell;
}
