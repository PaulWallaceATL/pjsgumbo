"use client";

import * as React from "react";
import {
  BookOpen,
  MapPin,
  MessageSquare,
  Package,
  Receipt,
  Sparkles,
} from "lucide-react";

import { AIBlob, PJS_BLOB_COLORS } from "@/components/react-bits/ai-blob";
import { LazyChart } from "@/components/os/lazy-chart";
import { StatusBadge } from "@/components/os/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { cn, formatCurrency } from "@/lib/utils";

type ScenarioId = "books" | "orders" | "low-stock" | "expand";
type Surface = "light" | "dark";

type ChatTheme = {
  isDark: boolean;
  panel: string;
  panelMuted: string;
  label: string;
  body: string;
  border: string;
  tableHead: string;
  tableRow: string;
  progressTrack: string;
  userBubble: string;
  aiIcon: string;
  input: string;
  promptOutline: string;
  promptActive: string;
};

function useChatTheme(surface: Surface): ChatTheme {
  const isDark = surface === "dark";
  return {
    isDark,
    panel: isDark
      ? "border-cream-100/20 bg-charcoal-900/55"
      : "border-border bg-background",
    panelMuted: isDark ? "text-cream-200/80" : "text-muted-foreground",
    label: isDark
      ? "text-cream-200/70 text-[10px] font-medium tracking-wide uppercase"
      : "text-muted-foreground text-[10px] font-medium tracking-wide uppercase",
    body: isDark ? "text-cream-50" : "text-foreground",
    border: isDark ? "border-cream-100/20" : "border-border",
    tableHead: isDark ? "border-cream-100/15 bg-cream-100/10 text-cream-100" : "bg-muted/50 border-border",
    tableRow: isDark ? "border-cream-100/10 text-cream-100" : "border-border",
    progressTrack: isDark ? "bg-cream-100/15" : "bg-muted",
    userBubble: isDark
      ? "bg-cajun-500 text-cream-50"
      : "bg-primary text-primary-foreground",
    aiIcon: isDark
      ? "border-cajun-400/30 bg-cajun-500/20 text-cajun-200"
      : "bg-primary/10 text-primary",
    input: isDark
      ? "border-cream-100/25 bg-charcoal-950/80 text-cream-100 placeholder:text-cream-200/45"
      : "bg-muted/50",
    promptOutline: isDark
      ? "border-cream-100/30 bg-charcoal-900/40 text-cream-100 hover:border-cajun-300/50 hover:bg-cream-100/10"
      : "",
    promptActive: isDark ? "border-cajun-400 bg-cajun-500 text-cream-50 shadow-md shadow-cajun-900/40" : "",
  };
}

const ChatThemeContext = React.createContext<ChatTheme | null>(null);

function useChatStyles() {
  const theme = React.useContext(ChatThemeContext);
  if (!theme) throw new Error("InsightsChat theme missing");
  return theme;
}

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
  const t = useChatStyles();
  return (
    <div className="flex justify-end">
      <div className={cn("max-w-[90%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm", t.userBubble)}>
        {children}
      </div>
    </div>
  );
}

function AiBubble({ children }: { children: React.ReactNode }) {
  const t = useChatStyles();
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border",
          t.aiIcon,
        )}
      >
        <Sparkles className="size-4" />
      </div>
      <div className={cn("min-w-0 flex-1 space-y-3", t.body)}>{children}</div>
    </div>
  );
}

function StatPanel({ label, value }: { label: string; value: React.ReactNode }) {
  const t = useChatStyles();
  return (
    <div className={cn("rounded-xl border p-3", t.panel)}>
      <p className={t.label}>{label}</p>
      <p className="font-display mt-0.5 text-xl font-bold tabular-nums">{value}</p>
    </div>
  );
}

function BooksScenario() {
  const t = useChatStyles();
  const pos = getPosSalesFeed().slice(0, 5);
  const bank = getBankTransactions();
  const matched = bank
    .filter((tx) => tx.type === "deposit" && tx.status === "matched")
    .reduce((s, tx) => s + tx.amount, 0);
  const pending = bank.filter((tx) => tx.status === "pending").length;

  return (
    <AiBubble>
      <p className={cn("text-sm leading-relaxed", t.panelMuted)}>
        Here&apos;s your bookkeeping snapshot for today at 229 Peachtree St NE — live POS
        feed, matched deposits, and one payout still clearing.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatPanel label="POS tickets" value="30" />
        <StatPanel label="Matched deposits" value={formatCurrency(matched)} />
        <StatPanel label="Pending payouts" value={pending} />
      </div>
      <div className={cn("overflow-hidden rounded-xl border", t.border)}>
        <table className="w-full text-sm">
          <thead>
            <tr className={cn("border-b text-left", t.tableHead)}>
              <th className="px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Item</th>
              <th className="px-3 py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {pos.map((row) => (
              <tr key={row.id} className={cn("border-b last:border-0", t.tableRow)}>
                <td className={cn("px-3 py-2 tabular-nums", t.panelMuted)}>{row.time}</td>
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
  const t = useChatStyles();
  const kpis = getDashboardKpis();
  const orders = kpis.find((k) => k.label === "Orders");
  const sales = kpis.find((k) => k.label === "Today's Sales");
  const categories = getCategorySales();

  return (
    <AiBubble>
      <p className={cn("text-sm leading-relaxed", t.panelMuted)}>
        You&apos;ve run <strong className={t.body}>{orders?.value ?? "146"} orders</strong> today
        with <strong className={t.body}>{sales?.value ?? "$3,482"}</strong> in sales — Signature
        Gumbos are carrying the board.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatPanel label="Orders today" value={orders?.value} />
        <StatPanel label="Today's sales" value={sales?.value} />
      </div>
      <div className={cn("space-y-2 rounded-xl border p-4", t.panel)}>
        <p className={t.label}>Sales by category</p>
        {categories.map((c) => {
          const max = categories[0]?.sales ?? 1;
          const pct = Math.round((c.sales / max) * 100);
          return (
            <div key={c.category}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{c.category}</span>
                <span className={cn("tabular-nums", t.panelMuted)}>{formatCurrency(c.sales)}</span>
              </div>
              <div className={cn("h-2 overflow-hidden rounded-full", t.progressTrack)}>
                <div
                  className="from-cajun-400 to-roux-400 h-full rounded-full bg-gradient-to-r"
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
  const t = useChatStyles();
  const low = getInventoryRows()
    .filter((r) => r.status !== "ok")
    .sort((a, b) => a.onHand / a.par - b.onHand / b.par)
    .slice(0, 6);

  return (
    <AiBubble>
      <p className={cn("text-sm leading-relaxed", t.panelMuted)}>
        {low.length} SKUs are below par — reorder before the weekend rush, especially Gulf
        seafood and produce.
      </p>
      <ul className={cn("divide-y overflow-hidden rounded-xl border", t.border)}>
        {low.map((item) => (
          <li
            key={item.sku}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-3",
              t.isDark ? "divide-cream-100/10" : "",
            )}
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{item.name}</p>
              <p className={cn("text-xs", t.panelMuted)}>
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
  const t = useChatStyles();
  const expansion = getExpansionAnalysis();

  return (
    <AiBubble>
      <p className={cn("text-sm leading-relaxed", t.panelMuted)}>
        A second ghost kitchen in <strong className={t.body}>{expansion.location}</strong> projects
        breakeven around <strong className={t.body}>month {expansion.breakevenMonth}</strong> with
        ~{formatCurrency(expansion.year1Revenue)} year-one revenue. Demo projection only.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatPanel label="Year 1 revenue" value={formatCurrency(expansion.year1Revenue)} />
        <StatPanel label="Monthly rent" value={formatCurrency(expansion.monthlyRent)} />
        <StatPanel label="Breakeven" value={`Month ${expansion.breakevenMonth}`} />
      </div>
      <div className={cn("rounded-xl border p-2", t.panel)}>
        <LazyChart height={260}>
          <ExpansionRoiChart data={expansion.roiData} />
        </LazyChart>
      </div>
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

export function InsightsChat({ surface = "light" }: { surface?: Surface }) {
  const [active, setActive] = React.useState<ScenarioId>("books");
  const activePrompt = PROMPTS.find((p) => p.id === active)!;
  const theme = useChatTheme(surface);
  const isDark = theme.isDark;

  return (
    <ChatThemeContext.Provider value={theme}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border shadow-sm",
          isDark
            ? "border-cream-100/20 bg-charcoal-950/90 shadow-black/20"
            : "border-border bg-card",
        )}
      >
        <div className="grid min-h-[min(520px,70vh)] lg:grid-cols-[minmax(11rem,13rem)_1fr] lg:grid-rows-[1fr_auto]">
          {/* Blob column — compact, no text overlap */}
          <div
            className={cn(
              "relative flex flex-col items-center justify-center gap-3 border-b px-4 py-6 lg:row-span-2 lg:border-r lg:border-b-0",
              isDark
                ? "border-cream-100/15 bg-gradient-to-b from-charcoal-900 to-charcoal-950"
                : "from-cream-50 to-background border-border bg-gradient-to-b",
            )}
          >
            <AIBlob
              size={isDark ? 168 : 200}
              animationSpeed={0.7}
              glowIntensity={0.9}
              resolution={0.45}
              colors={[...PJS_BLOB_COLORS]}
            />
            <div className="text-center">
              <Badge
                variant={isDark ? "outline" : "secondary"}
                className={cn(
                  "mb-1.5 gap-1",
                  isDark && "border-cajun-400/40 bg-cajun-500/15 text-cajun-100",
                )}
              >
                <Sparkles className="size-3" />
                Kitchen AI
              </Badge>
              <p className={cn("font-display text-sm font-semibold", isDark ? "text-cream-50" : "")}>
                Ask your OS
              </p>
              <p className={cn("mt-0.5 text-xs leading-snug", theme.panelMuted)}>
                Demo scenarios below
              </p>
            </div>
          </div>

          {/* Conversation */}
          <ScrollArea className="min-h-[280px] lg:min-h-0 lg:max-h-[min(420px,58vh)]">
            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                {PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  const selected = active === prompt.id;
                  return (
                    <Button
                      key={prompt.id}
                      type="button"
                      size="sm"
                      variant={selected ? "default" : "outline"}
                      className={cn(
                        "h-auto gap-2 py-2 text-left whitespace-normal",
                        !selected && isDark && theme.promptOutline,
                        selected && isDark && theme.promptActive,
                      )}
                      onClick={() => setActive(prompt.id)}
                    >
                      <Icon className="size-4 shrink-0" />
                      {prompt.label}
                    </Button>
                  );
                })}
              </div>

              <UserBubble>{activePrompt.label}</UserBubble>
              <ScenarioResponse id={active} />
            </div>
          </ScrollArea>

          {/* Chat input — full width under conversation on mobile, spans convo col on desktop */}
          <div
            className={cn(
              "border-t p-4 sm:p-5 lg:col-start-2",
              isDark ? "border-cream-100/15 bg-charcoal-900/50" : "border-border bg-muted/20",
            )}
          >
            <div className="relative">
              <MessageSquare
                className={cn(
                  "absolute top-1/2 left-3 size-4 -translate-y-1/2",
                  isDark ? "text-cream-200/60" : "text-muted-foreground",
                )}
              />
              <Input
                disabled
                placeholder="Ask anything about sales, food cost, prep, or expansion…"
                className={cn("h-11 cursor-not-allowed pr-28 pl-10", theme.input)}
              />
              <Badge
                variant={isDark ? "outline" : "muted"}
                className={cn(
                  "absolute top-1/2 right-3 -translate-y-1/2 text-[10px] tracking-wide uppercase",
                  isDark && "border-cream-100/30 bg-charcoal-800/80 text-cream-200",
                )}
              >
                Chat coming soon
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </ChatThemeContext.Provider>
  );
}
