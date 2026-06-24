"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Maximize2, Minimize2, Sparkles } from "lucide-react";

import { RevealLite } from "@/components/marketing/reveal-lite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DemoModuleNav } from "@/components/restaurant-os/demo-module-nav";
import { DemoShellContext } from "@/components/restaurant-os/demo-context";
import { MODULE_META } from "@/lib/restaurant-os/data";
import { cn } from "@/lib/utils";

function ModuleSkeleton() {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <Skeleton className="h-28 w-full rounded-2xl" />
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

function DemoChrome({
  activeLabel,
  moduleIndex,
}: {
  activeLabel: string;
  moduleIndex: number;
}) {
  return (
    <div className="bg-muted/40 flex shrink-0 items-center gap-3 border-b px-4 py-2.5">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-red-400/90 shadow-sm" />
        <span className="size-2.5 rounded-full bg-amber-400/90 shadow-sm" />
        <span className="size-2.5 rounded-full bg-emerald-400/90 shadow-sm" />
      </div>
      <p className="text-muted-foreground min-w-0 flex-1 truncate text-center text-xs font-medium">
        PJ&apos;s Restaurant OS
        <span className="text-foreground mx-1.5">·</span>
        {activeLabel}
      </p>
      <Badge variant="outline" className="h-5 shrink-0 px-1.5 text-[10px] tabular-nums">
        {moduleIndex + 1}/{MODULE_IDS.length}
      </Badge>
    </div>
  );
}

export function DemoShell() {
  const [active, setActive] = useState(MODULE_IDS[0]);
  const [presentation, setPresentation] = useState(false);

  const activeMeta = useMemo(
    () => MODULE_META.find((m) => m.id === active) ?? MODULE_META[0],
    [active],
  );
  const moduleIndex = MODULE_IDS.indexOf(active);

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
        <RevealLite>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2 gap-1">
                <Sparkles className="size-3" />
                Live interactive demo
              </Badge>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Explore the full OS
              </h2>
              <p className="text-muted-foreground mt-1 max-w-xl text-sm sm:text-base">
                Eleven modules — bookkeeping, production, orders, AI insights, and more.
                Only one loads at a time for a fast, app-like feel.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPresentation((p) => !p)}
                      className="gap-2"
                    >
                      {presentation ? (
                        <Minimize2 className="size-4" />
                      ) : (
                        <Maximize2 className="size-4" />
                      )}
                      {presentation ? "Exit focus" : "Focus mode"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Hide page chrome and expand the demo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button asChild size="sm" className="gap-1.5">
                <Link href={activeMeta.osHref}>
                  Open {activeMeta.label}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </RevealLite>

        <div
          className={cn(
            "ring-border/60 overflow-hidden rounded-2xl border bg-card shadow-xl ring-1",
            presentation ? "min-h-[85vh]" : "min-h-[72vh]",
          )}
        >
          <div className="flex h-full min-h-[inherit] flex-col lg:grid lg:grid-cols-[260px_1fr]">
            <div className="hidden min-h-0 border-r lg:block">
              <DemoModuleNav active={active} onSelect={selectModule} />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <DemoChrome activeLabel={activeMeta.label} moduleIndex={moduleIndex} />
              <div className="lg:hidden">
                <DemoModuleNav active={active} onSelect={selectModule} vertical={false} />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div key={active} className="animate-in fade-in slide-in-from-right-2 fill-mode-both duration-300">
                  {ActiveModule ? <ActiveModule /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DemoShellContext.Provider>
  );
}
