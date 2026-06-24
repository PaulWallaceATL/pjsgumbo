"use client";

import { useRouter } from "next/navigation";
import {
  Building2,
  Calculator,
  Package,
  Receipt,
  Soup,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomDashboard } from "@/components/restaurant-os/custom-dashboard-provider";
import {
  buildDemoAutofillProfile,
  DEFAULT_CUSTOM_PROFILE,
  profileFromForm,
  type CustomRestaurantProfile,
} from "@/lib/restaurant-os/custom-profile";

type CustomSetupFormProps = {
  compact?: boolean;
  onComplete?: () => void;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 1,
  min = 0,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

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

  function handleAutofill() {
    const demo = buildDemoAutofillProfile();
    setForm({
      ...demo,
      categories: demo.categories.map((c) => ({ ...c })),
    });
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="font-display flex items-center gap-2 text-xl">
              <Building2 className="text-primary size-5" />
              Build your dashboard
            </CardTitle>
            <CardDescription className="mt-1.5">
              Enter your restaurant details across all 11 OS modules — or autofill
              PJ&apos;s full demo data — then launch the complete dashboard.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-2"
            onClick={handleAutofill}
          >
            <Sparkles className="size-4" />
            Autofill demo data
          </Button>
        </div>
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

          <Accordion type="multiple" defaultValue={["operations", "bookkeeping"]} className="w-full">
            <AccordionItem value="operations">
              <AccordionTrigger className="gap-2 text-sm">
                <TrendingUp className="text-primary size-4 shrink-0" />
                Operations dashboard
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-4">
                  <NumberField
                    id="todaySales"
                    label="Today's sales ($)"
                    value={form.todaySales}
                    onChange={(n) => updateField("todaySales", n)}
                  />
                  <NumberField
                    id="todayOrders"
                    label="Orders today"
                    value={form.todayOrders}
                    onChange={(n) => updateField("todayOrders", n)}
                  />
                  <NumberField
                    id="foodCostPct"
                    label="Food cost %"
                    value={form.foodCostPct}
                    step={0.1}
                    onChange={(n) => updateField("foodCostPct", n)}
                  />
                  <NumberField
                    id="laborPct"
                    label="Labor %"
                    value={form.laborPct}
                    step={0.1}
                    onChange={(n) => updateField("laborPct", n)}
                  />
                  <NumberField
                    id="primeCostPct"
                    label="Prime cost %"
                    value={form.primeCostPct}
                    step={0.1}
                    onChange={(n) => updateField("primeCostPct", n)}
                  />
                  <NumberField
                    id="inventoryValue"
                    label="Inventory value ($)"
                    value={form.inventoryValue}
                    onChange={(n) => updateField("inventoryValue", n)}
                  />
                  <NumberField
                    id="lowStockCount"
                    label="Low stock items"
                    value={form.lowStockCount}
                    onChange={(n) => updateField("lowStockCount", n)}
                  />
                  <NumberField
                    id="waste7d"
                    label="Waste last 7 days ($)"
                    value={form.waste7d}
                    onChange={(n) => updateField("waste7d", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bookkeeping">
              <AccordionTrigger className="gap-2 text-sm">
                <Receipt className="text-primary size-4 shrink-0" />
                Bookkeeping
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-4">
                  <NumberField
                    id="posTicketsToday"
                    label="POS tickets today"
                    value={form.posTicketsToday}
                    onChange={(n) => updateField("posTicketsToday", n)}
                  />
                  <NumberField
                    id="monthlyExpenses"
                    label="Monthly expenses ($)"
                    value={form.monthlyExpenses}
                    onChange={(n) => updateField("monthlyExpenses", n)}
                  />
                  <NumberField
                    id="bankBalance"
                    label="Bank balance ($)"
                    value={form.bankBalance}
                    onChange={(n) => updateField("bankBalance", n)}
                  />
                  <NumberField
                    id="unmatchedDeposits"
                    label="Unmatched deposits"
                    value={form.unmatchedDeposits}
                    onChange={(n) => updateField("unmatchedDeposits", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payroll">
              <AccordionTrigger className="gap-2 text-sm">
                <Users className="text-primary size-4 shrink-0" />
                Payroll & labor
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="employeeCount"
                    label="Employees on payroll"
                    value={form.employeeCount}
                    onChange={(n) => updateField("employeeCount", n)}
                  />
                  <NumberField
                    id="weeklyPayrollTotal"
                    label="Weekly payroll ($)"
                    value={form.weeklyPayrollTotal}
                    onChange={(n) => updateField("weeklyPayrollTotal", n)}
                  />
                  <NumberField
                    id="laborHoursWeek"
                    label="Labor hours (week)"
                    value={form.laborHoursWeek}
                    onChange={(n) => updateField("laborHoursWeek", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tax">
              <AccordionTrigger className="gap-2 text-sm">
                <Calculator className="text-primary size-4 shrink-0" />
                Tax compliance
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="salesTaxRate"
                    label="Sales tax rate (%)"
                    value={form.salesTaxRate}
                    step={0.1}
                    onChange={(n) => updateField("salesTaxRate", n)}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="nextTaxDeadline">Next tax deadline</Label>
                    <Input
                      id="nextTaxDeadline"
                      value={form.nextTaxDeadline}
                      onChange={(e) => updateField("nextTaxDeadline", e.target.value)}
                      placeholder="Payroll tax deposit — Jun 28"
                    />
                  </div>
                  <NumberField
                    id="openTaxFilings"
                    label="Open tax filings"
                    value={form.openTaxFilings}
                    onChange={(n) => updateField("openTaxFilings", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="inventory">
              <AccordionTrigger className="gap-2 text-sm">
                <Package className="text-primary size-4 shrink-0" />
                Inventory & cost
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2">
                  <NumberField
                    id="inventorySkuCount"
                    label="Total SKUs tracked"
                    value={form.inventorySkuCount}
                    onChange={(n) => updateField("inventorySkuCount", n)}
                  />
                  <NumberField
                    id="criticalStockCount"
                    label="Critical stock items"
                    value={form.criticalStockCount}
                    onChange={(n) => updateField("criticalStockCount", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="orders">
              <AccordionTrigger className="gap-2 text-sm">
                <Truck className="text-primary size-4 shrink-0" />
                Orders & delivery
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-4">
                  <NumberField
                    id="activeOrders"
                    label="Active orders"
                    value={form.activeOrders}
                    onChange={(n) => updateField("activeOrders", n)}
                  />
                  <NumberField
                    id="deliveryZoneCount"
                    label="Delivery zones"
                    value={form.deliveryZoneCount}
                    onChange={(n) => updateField("deliveryZoneCount", n)}
                  />
                  <NumberField
                    id="avgDeliveryTicket"
                    label="Avg delivery ticket ($)"
                    value={form.avgDeliveryTicket}
                    onChange={(n) => updateField("avgDeliveryTicket", n)}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="topOrderChannel">Top order channel</Label>
                    <Input
                      id="topOrderChannel"
                      value={form.topOrderChannel}
                      onChange={(e) => updateField("topOrderChannel", e.target.value)}
                      placeholder="DoorDash"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="production">
              <AccordionTrigger className="gap-2 text-sm">
                <Soup className="text-primary size-4 shrink-0" />
                Production & prep
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2">
                  <NumberField
                    id="prepTasksToday"
                    label="Prep tasks today"
                    value={form.prepTasksToday}
                    onChange={(n) => updateField("prepTasksToday", n)}
                  />
                  <NumberField
                    id="batchesThisWeek"
                    label="Batches this week"
                    value={form.batchesThisWeek}
                    onChange={(n) => updateField("batchesThisWeek", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="financial">
              <AccordionTrigger className="gap-2 text-sm">
                <TrendingUp className="text-primary size-4 shrink-0" />
                Financial reporting
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2">
                  <NumberField
                    id="monthlyRevenue"
                    label="Monthly revenue ($)"
                    value={form.monthlyRevenue}
                    onChange={(n) => updateField("monthlyRevenue", n)}
                  />
                  <NumberField
                    id="netIncomeYtd"
                    label="Net income YTD ($)"
                    value={form.netIncomeYtd}
                    onChange={(n) => updateField("netIncomeYtd", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cashflow">
              <AccordionTrigger className="gap-2 text-sm">
                <Wallet className="text-primary size-4 shrink-0" />
                Cash flow
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="cashOnHand"
                    label="Cash on hand ($)"
                    value={form.cashOnHand}
                    onChange={(n) => updateField("cashOnHand", n)}
                  />
                  <NumberField
                    id="netCashFlow30d"
                    label="Net cash flow (30d) ($)"
                    value={form.netCashFlow30d}
                    onChange={(n) => updateField("netCashFlow30d", n)}
                  />
                  <NumberField
                    id="vendorPaymentsDue"
                    label="Vendor payments due"
                    value={form.vendorPaymentsDue}
                    onChange={(n) => updateField("vendorPaymentsDue", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="budgeting">
              <AccordionTrigger className="gap-2 text-sm">
                <Calculator className="text-primary size-4 shrink-0" />
                Budgeting
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pb-2 sm:grid-cols-2">
                  <NumberField
                    id="projectedMonthlySales"
                    label="Projected monthly sales ($)"
                    value={form.projectedMonthlySales}
                    onChange={(n) => updateField("projectedMonthlySales", n)}
                  />
                  <NumberField
                    id="seasonalLiftPct"
                    label="Seasonal lift (%)"
                    value={form.seasonalLiftPct}
                    step={0.1}
                    onChange={(n) => updateField("seasonalLiftPct", n)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories">
              <AccordionTrigger className="gap-2 text-sm">
                <Soup className="text-primary size-4 shrink-0" />
                Menu categories (sales $)
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 pb-2 sm:grid-cols-2">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
          Fill out details across all 11 OS modules, launch the full interactive
          dashboard, and edit your setup anytime — no login required.
        </p>
      </div>
      <CustomSetupForm />
    </section>
  );
}
