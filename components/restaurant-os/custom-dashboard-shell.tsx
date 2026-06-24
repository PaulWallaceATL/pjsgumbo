"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Minimize2,
  Pencil,
  Save,
  Settings2,
} from "lucide-react";

import {
  CategorySalesChart,
  SalesTrendChart,
} from "@/components/os/dashboard-charts";
import { LazyChart } from "@/components/os/lazy-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSetupForm } from "@/components/restaurant-os/custom-setup-form";
import { useCustomDashboard } from "@/components/restaurant-os/custom-dashboard-provider";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/os/demo-data/dashboard";

function EditableKpiCard({
  kpi,
  onSave,
}: {
  kpi: Kpi;
  onSave: (label: string, value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(kpi.value);

  useEffect(() => {
    setDraft(kpi.value);
  }, [kpi.value]);

  function commit() {
    onSave(kpi.label, draft);
    setEditing(false);
  }

  return (
    <Card className="group relative border-dashed shadow-none transition-shadow hover:shadow-md">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            {kpi.label}
          </p>
          <button
            type="button"
            onClick={() => setEditing((e) => !e)}
            className="text-muted-foreground hover:text-foreground opacity-0 transition group-hover:opacity-100"
            aria-label={`Edit ${kpi.label}`}
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
        {editing ? (
          <div className="mt-2 flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="font-display h-9 text-lg font-bold"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
            />
            <Button type="button" size="sm" onClick={commit}>
              <Save className="size-3.5" />
            </Button>
          </div>
        ) : (
          <p className="font-display mt-1 text-2xl font-bold tabular-nums">{kpi.value}</p>
        )}
        {kpi.hint ? (
          <p className="text-muted-foreground mt-0.5 text-xs">{kpi.hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function CustomDashboardShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, kpis, salesTrend, categorySales, updateKpiValue, updateProfile, ready } =
    useCustomDashboard();
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
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="bg-muted/40 flex shrink-0 items-center gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-emerald-400/90" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold">{profile.restaurantName}</p>
          <p className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
            <MapPin className="size-3" />
            {profile.city}
            {profile.address ? ` · ${profile.address}` : ""}
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0">
          Custom mode
        </Badge>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Operations dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Click any KPI to edit. Changes save automatically.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowSettings(true)}
            >
              <Settings2 className="size-4" />
              Edit setup
            </Button>
            {!fullscreen ? (
              <Button
                type="button"
                size="sm"
                className="gap-2"
                onClick={() => setFullscreen(true)}
              >
                Full screen
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={exitFullscreen}
              >
                <Minimize2 className="size-4" />
                Exit full screen
              </Button>
            )}
            <Button asChild variant="ghost" size="sm">
              <Link href="/restaurant-os">PJ&apos;s demo</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.slice(0, 8).map((kpi) => (
            <EditableKpiCard key={kpi.label} kpi={kpi} onSave={updateKpiValue} />
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sales — Last 7 Days</CardTitle>
              <CardDescription>Generated from your daily sales input</CardDescription>
            </CardHeader>
            <CardContent>
              <LazyChart>
                <SalesTrendChart data={salesTrend} />
              </LazyChart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sales by Category</CardTitle>
              <CardDescription>Your menu mix</CardDescription>
            </CardHeader>
            <CardContent>
              <LazyChart>
                <CategorySalesChart data={categorySales} />
              </LazyChart>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Restaurant profile</CardTitle>
            <CardDescription>Quick edits to your setup info</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={profile.restaurantName}
                onChange={(e) => updateProfile({ restaurantName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-city">City</Label>
              <Input
                id="edit-city"
                value={profile.city}
                onChange={(e) => updateProfile({ city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cuisine">Cuisine</Label>
              <Input
                id="edit-cuisine"
                value={profile.cuisineType}
                onChange={(e) => updateProfile({ cuisineType: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="bg-background fixed inset-0 z-50 flex flex-col">
        <div className="ring-border/60 flex min-h-0 flex-1 flex-col overflow-hidden border shadow-2xl ring-1">
          {shell}
        </div>
      </div>
    );
  }

  return (
    <section className="container-px mx-auto max-w-7xl py-8">
      <div
        className={cn(
          "ring-border/60 overflow-hidden rounded-2xl border bg-card shadow-xl ring-1",
          "min-h-[80vh]",
        )}
      >
        {shell}
      </div>
    </section>
  );
}
