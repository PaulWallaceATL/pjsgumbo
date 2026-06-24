"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DemoModuleNav } from "@/components/restaurant-os/demo-module-nav";
import { DemoShellContext } from "@/components/restaurant-os/demo-context";
import { MODULE_META } from "@/lib/restaurant-os/data";
import { cn } from "@/lib/utils";

function ModuleSkeleton() {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
      <Skeleton className="h-[280px] w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

const DynamicOperations = dynamic(
  () => import("./modules/operations-pulse-module").then((m) => ({ default: m.OperationsPulseModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicBookkeeping = dynamic(
  () => import("./modules/bookkeeping-module").then((m) => ({ default: m.BookkeepingModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicFinancial = dynamic(
  () => import("./modules/financial-reporting-module").then((m) => ({ default: m.FinancialReportingModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicProduction = dynamic(
  () => import("./modules/production-prep-module").then((m) => ({ default: m.ProductionPrepModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicInventory = dynamic(
  () => import("./modules/inventory-cost-module").then((m) => ({ default: m.InventoryCostModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicOrders = dynamic(
  () => import("./modules/orders-delivery-module").then((m) => ({ default: m.OrdersDeliveryModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicPayroll = dynamic(
  () => import("./modules/payroll-labor-module").then((m) => ({ default: m.PayrollLaborModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicTax = dynamic(
  () => import("./modules/tax-compliance-module").then((m) => ({ default: m.TaxComplianceModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicBudgeting = dynamic(
  () => import("./modules/budgeting-module").then((m) => ({ default: m.BudgetingModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicCashFlow = dynamic(
  () => import("./modules/cash-flow-module").then((m) => ({ default: m.CashFlowModule })),
  { loading: () => <ModuleSkeleton /> },
);
const DynamicAdvice = dynamic(
  () => import("./modules/business-advice-module").then((m) => ({ default: m.BusinessAdviceModule })),
  { loading: () => <ModuleSkeleton /> },
);

const MODULE_COMPONENTS: Record<string, React.ComponentType> = {
  operations: DynamicOperations,
  bookkeeping: DynamicBookkeeping,
  financial: DynamicFinancial,
  production: DynamicProduction,
  inventory: DynamicInventory,
  orders: DynamicOrders,
  payroll: DynamicPayroll,
  tax: DynamicTax,
  budgeting: DynamicBudgeting,
  cashflow: DynamicCashFlow,
  advice: DynamicAdvice,
};

const MODULE_IDS = MODULE_META.map((m) => m.id);

function resolveModuleId(hash: string) {
  return MODULE_IDS.includes(hash) ? hash : MODULE_IDS[0];
}

export function DemoShell() {
  const [active, setActive] = useState(MODULE_IDS[0]);
  const [presentation, setPresentation] = useState(false);

  const selectModule = useCallback((id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActive(resolveModuleId(hash));

    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if (next) setActive(resolveModuleId(next));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        return;
      }
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      e.preventDefault();
      const idx = MODULE_IDS.indexOf(active);
      const delta = e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1;
      const next = MODULE_IDS[(idx + delta + MODULE_IDS.length) % MODULE_IDS.length];
      selectModule(next);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, selectModule]);

  const ActiveModule = MODULE_COMPONENTS[active];

  return (
    <DemoShellContext.Provider value={{ presentation, setPresentation }}>
      <section
        id="demo-shell"
        className={cn(
          "container-px mx-auto max-w-7xl py-8 sm:py-10",
          presentation && "max-w-none px-2 sm:px-4",
        )}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Interactive demo
            </h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Pick a module — only one loads at a time for a fast, app-like experience.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPresentation((p) => !p)}
            className="gap-2"
          >
            {presentation ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            {presentation ? "Exit presentation" : "Presentation mode"}
          </Button>
        </div>

        <div
          className={cn(
            "border-border bg-card overflow-hidden rounded-2xl border shadow-sm",
            presentation ? "min-h-[85vh]" : "min-h-[70vh]",
          )}
        >
          <div className="flex h-full min-h-[inherit] flex-col lg:grid lg:grid-cols-[240px_1fr]">
            <div className="hidden border-r lg:block">
              <DemoModuleNav active={active} onSelect={selectModule} />
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="lg:hidden">
                <DemoModuleNav active={active} onSelect={selectModule} vertical={false} />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {ActiveModule ? <ActiveModule key={active} /> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DemoShellContext.Provider>
  );
}
