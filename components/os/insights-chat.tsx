"use client";

import * as React from "react";
import {
  BookOpen,
  MapPin,
  MessageSquare,
  Package,
  Receipt,
  Send,
  Sparkles,
} from "lucide-react";

import { AIBlob, PJS_BLOB_COLORS } from "@/components/react-bits/ai-blob";
import { LazyChart } from "@/components/os/lazy-chart";
import { StatusBadge } from "@/components/os/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExpansionRoiChart } from "@/components/restaurant-os/charts/demo-charts";
import {
  getBankTransactions,
  getCategorySales,
  getDashboardKpis,
  getExpansionAnalysis,
  getInventoryRows,
  getPosSalesFeed,
} from "@/lib/os/data";
import { statusToneFromInventory } from "@/lib/os/status-utils";
import { formatCurrency } from "@/lib/utils";

type ScenarioId = "books" | "orders" | "low-stock" | "expand";

type PromptOption = {
  id: ScenarioId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const PROMPTS: PromptOption[] = [
  { id: "books", label: "Show me my books", icon: BookOpen },
  { id: "orders", label: "How many orders today?", icon: Receipt },
  { id: "low-stock", label: "What's running low?", icon: Package },
  { id: "expand", label: "Should we expand?", icon: MapPin },
];

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="bg-primary text-primary-foreground max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm">
        {children}
      </div>
    </div>
  );
}

function AiBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
        <Sparkles className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">{children}</div>
    </div>
  );
}

function BooksScenario() {
  const pos = getPosSalesFeed().slice(0, 5);
  const bank = getBankTransactions();
  const matched = bank
    .filter((t) => t.type === "deposit" && t.status === "matched")
    .reduce((s, t) => s + t.amount, 0);
  const pending = bank.filter((t) => t.status === "pending").length;

  return (
    <AiBubble>
      <p className="text-sm leading-relaxed">
        Here&apos;s your bookkeeping snapshot for today at 229 Peachtree St NE — live POS
        feed, matched deposits, and one payout still clearing.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">POS tickets</p>
          <p className="font-display text-xl font-bold tabular-nums">30</p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Matched deposits</p>
          <p className="font-display text-xl font-bold tabular-nums">{formatCurrency(matched)}</p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Pending payouts</p>
          <p className="font-display text-xl font-bold tabular-nums">{pending}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b text-left">
              <th className="px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Item</th>
              <th className="px-3 py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {pos.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                <td className="text-muted-foreground px-3 py-2 tabular-nums">{row.time}</td>
                <td className="px-3 py-2">{row.item}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatCurrency(row.subtotal + row.tax + row.tip)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AiBubble>
  );
}

function OrdersScenario() {
  const kpis = getDashboardKpis();
  const orders = kpis.find((k) => k.label === "Orders");
  const sales = kpis.find((k) => k.label === "Today's Sales");
  const categories = getCategorySales();

  return (
    <AiBubble>
      <p className="text-sm leading-relaxed">
        You&apos;ve run <strong>{orders?.value ?? "146"} orders</strong> today with{" "}
        <strong>{sales?.value ?? "$3,482"}</strong> in sales — Signature Gumbos are carrying
        the board.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Orders today</p>
          <p className="font-display mt-1 text-3xl font-bold tabular-nums">{orders?.value}</p>
          {orders?.delta !== undefined ? (
            <p className="text-success mt-1 text-xs">↑ {orders.delta}% vs yesterday</p>
          ) : null}
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Today&apos;s sales</p>
          <p className="font-display mt-1 text-3xl font-bold tabular-nums">{sales?.value}</p>
          {sales?.delta !== undefined ? (
            <p className="text-success mt-1 text-xs">↑ {sales.delta}% vs yesterday</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Sales by category
        </p>
        {categories.map((c) => {
          const max = categories[0]?.sales ?? 1;
          const pct = Math.round((c.sales / max) * 100);
          return (
            <div key={c.category}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{c.category}</span>
                <span className="text-muted-foreground tabular-nums">{formatCurrency(c.sales)}</span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className="from-cajun-500 to-roux-500 h-full rounded-full bg-gradient-to-r"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AiBubble>
  );
}

function LowStockScenario() {
  const low = getInventoryRows()
    .filter((r) => r.status !== "ok")
    .sort((a, b) => a.onHand / a.par - b.onHand / b.par)
    .slice(0, 6);

  return (
    <AiBubble>
      <p className="text-sm leading-relaxed">
        {low.length} SKUs are below par — reorder before the weekend rush, especially Gulf
        seafood and produce.
      </p>
      <ul className="divide-y rounded-xl border">
        {low.map((item) => (
          <li key={item.sku} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{item.name}</p>
              <p className="text-muted-foreground text-xs">
                {item.onHand} / {item.par} {item.unit} on hand · {item.supplier}
              </p>
            </div>
            <StatusBadge
              tone={statusToneFromInventory(item.status)}
              label={item.status === "critical" ? "Critical" : "Low"}
            />
          </li>
        ))}
      </ul>
    </AiBubble>
  );
}

function ExpandScenario() {
  const expansion = getExpansionAnalysis();

  return (
    <AiBubble>
      <p className="text-sm leading-relaxed">
        A second ghost kitchen in <strong>{expansion.location}</strong> projects breakeven around{" "}
        <strong>month {expansion.breakevenMonth}</strong> with ~
        {formatCurrency(expansion.year1Revenue)} year-one revenue. Demo projection only — not
        financial advice.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Year 1 revenue</p>
          <p className="font-display text-lg font-bold tabular-nums">
            {formatCurrency(expansion.year1Revenue)}
          </p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Monthly rent</p>
          <p className="font-display text-lg font-bold tabular-nums">
            {formatCurrency(expansion.monthlyRent)}
          </p>
        </div>
        <div className="rounded-xl border p-3">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Breakeven</p>
          <p className="font-display text-lg font-bold tabular-nums">
            Month {expansion.breakevenMonth}
          </p>
        </div>
      </div>
      <LazyChart height={280}>
        <ExpansionRoiChart data={expansion.roiData} />
      </LazyChart>
    </AiBubble>
  );
}

function ScenarioResponse({ id }: { id: ScenarioId }) {
  switch (id) {
    case "books":
      return <BooksScenario />;
    case "orders":
      return <OrdersScenario />;
    case "low-stock":
      return <LowStockScenario />;
    case "expand":
      return <ExpandScenario />;
  }
}

export function InsightsChat() {
  const [active, setActive] = React.useState<ScenarioId>("books");
  const activePrompt = PROMPTS.find((p) => p.id === active)!;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="from-cream-50 via-background to-cajun-50/30 dark:from-cajun-950/20 dark:via-background dark:to-roux-950/10 relative flex flex-col items-center border-b bg-gradient-to-b px-4 py-8 sm:py-10">
            <AIBlob
              size={280}
              animationSpeed={0.75}
              glowIntensity={0.95}
              resolution={0.5}
              colors={[...PJS_BLOB_COLORS]}
              className="sm:hidden"
            />
            <AIBlob
              size={360}
              animationSpeed={0.75}
              glowIntensity={0.95}
              resolution={0.5}
              colors={[...PJS_BLOB_COLORS]}
              className="hidden sm:block"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <Badge variant="secondary" className="mb-2 gap-1">
                <Sparkles className="size-3" />
                Kitchen AI
              </Badge>
              <p className="font-display text-lg font-semibold sm:text-xl">Ask your OS anything</p>
              <p className="text-muted-foreground mt-1 max-w-sm text-sm">
                Books, orders, inventory, and expansion — powered by your live demo data.
              </p>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <Button
                    key={prompt.id}
                    type="button"
                    size="sm"
                    variant={active === prompt.id ? "default" : "outline"}
                    className="h-auto gap-2 py-2 text-left whitespace-normal"
                    onClick={() => setActive(prompt.id)}
                  >
                    <Icon className="size-4 shrink-0" />
                    {prompt.label}
                  </Button>
                );
              })}
            </div>

            <div className="space-y-4">
              <UserBubble>{activePrompt.label}</UserBubble>
              <ScenarioResponse id={active} />
            </div>

            <div className="relative pt-2">
              <div className="relative opacity-60">
                <MessageSquare className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  disabled
                  placeholder="Ask anything about sales, food cost, prep, or expansion…"
                  className="bg-muted/50 h-11 cursor-not-allowed pr-24 pl-10"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled
                  className="absolute top-1/2 right-12 size-8 -translate-y-1/2"
                  aria-hidden
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <Badge
                variant="muted"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] tracking-wide uppercase"
              >
                Chat coming soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
