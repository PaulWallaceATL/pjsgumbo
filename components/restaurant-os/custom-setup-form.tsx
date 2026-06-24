"use client";

import { useRouter } from "next/navigation";
import { Building2, Soup, TrendingUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomDashboard } from "@/components/restaurant-os/custom-dashboard-provider";
import {
  DEFAULT_CUSTOM_PROFILE,
  profileFromForm,
  type CustomRestaurantProfile,
} from "@/lib/restaurant-os/custom-profile";

type CustomSetupFormProps = {
  compact?: boolean;
  onComplete?: () => void;
};

export function CustomSetupForm({ compact = false, onComplete }: CustomSetupFormProps) {
  const router = useRouter();
  const { setProfile } = useCustomDashboard();
  const [form, setForm] = useState<CustomRestaurantProfile>(DEFAULT_CUSTOM_PROFILE);

  function updateField<K extends keyof CustomRestaurantProfile>(
    key: K,
    value: CustomRestaurantProfile[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const profile = profileFromForm(form);
    setProfile(profile);
    onComplete?.();
    router.push("/restaurant-os/custom?fullscreen=1");
  }

  return (
    <Card className={compact ? "border-dashed shadow-none" : "shadow-lg"}>
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-xl">
          <Building2 className="text-primary size-5" />
          Build your dashboard
        </CardTitle>
        <CardDescription>
          Enter your restaurant details and we&apos;ll generate a live dashboard you can
          edit in full-screen mode.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant name</Label>
              <Input
                id="restaurantName"
                value={form.restaurantName}
                onChange={(e) => updateField("restaurantName", e.target.value)}
                placeholder="e.g. Bayou Kitchen"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisineType">Cuisine type</Label>
              <Input
                id="cuisineType"
                value={form.cuisineType}
                onChange={(e) => updateField("cuisineType", e.target.value)}
                placeholder="e.g. Cajun, Pizza, Thai"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Atlanta, GA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address (optional)</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="123 Main St"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="todaySales">Today&apos;s sales ($)</Label>
              <Input
                id="todaySales"
                type="number"
                min={0}
                value={form.todaySales}
                onChange={(e) => updateField("todaySales", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="todayOrders">Orders today</Label>
              <Input
                id="todayOrders"
                type="number"
                min={0}
                value={form.todayOrders}
                onChange={(e) => updateField("todayOrders", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foodCostPct">Food cost %</Label>
              <Input
                id="foodCostPct"
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={form.foodCostPct}
                onChange={(e) => updateField("foodCostPct", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laborPct">Labor %</Label>
              <Input
                id="laborPct"
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={form.laborPct}
                onChange={(e) => updateField("laborPct", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inventoryValue">Inventory value ($)</Label>
              <Input
                id="inventoryValue"
                type="number"
                min={0}
                value={form.inventoryValue}
                onChange={(e) => updateField("inventoryValue", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lowStockCount">Low stock items</Label>
              <Input
                id="lowStockCount"
                type="number"
                min={0}
                value={form.lowStockCount}
                onChange={(e) => updateField("lowStockCount", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waste7d">Waste last 7 days ($)</Label>
              <Input
                id="waste7d"
                type="number"
                min={0}
                value={form.waste7d}
                onChange={(e) => updateField("waste7d", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Soup className="size-4" />
              Top menu categories (sales $)
            </Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {form.categories.map((cat, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={cat.name}
                    onChange={(e) => {
                      const categories = [...form.categories];
                      categories[i] = { ...categories[i], name: e.target.value };
                      updateField("categories", categories);
                    }}
                    placeholder="Category name"
                  />
                  <Input
                    type="number"
                    min={0}
                    className="w-28 shrink-0"
                    value={cat.sales}
                    onChange={(e) => {
                      const categories = [...form.categories];
                      categories[i] = { ...categories[i], sales: Number(e.target.value) };
                      updateField("categories", categories);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="gap-2">
            <TrendingUp className="size-4" />
            Generate my dashboard
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function CustomSetupTeaser() {
  return (
    <section className="container-px mx-auto max-w-7xl py-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          Your restaurant
        </p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight">
          Try it with your own numbers
        </h2>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Fill out your kitchen details, launch a full-screen dashboard, and edit KPIs
          inline — no login required.
        </p>
      </div>
      <CustomSetupForm />
    </section>
  );
}
