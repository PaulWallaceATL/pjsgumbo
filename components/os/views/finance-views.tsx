"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Landmark, MapPin, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortableTable } from "@/components/os/sortable-table";
import { LazyChart } from "@/components/os/lazy-chart";
import { InsightsChat } from "@/components/os/insights-chat";
import {
  CashFlowForecastChart,
  ExpansionRoiChart,
  LaborCostChart,
  SalesReportChart,
  SeasonalForecastChart,
} from "@/components/restaurant-os/charts/demo-charts";
import {
  getBankTransactions,
  getCashFlowForecast,
  getCashFlowStatement,
  getBalanceSheet,
  getExpenses,
  getExpansionAnalysis,
  getLaborCostWeekly,
  getMenuEngineering,
  getPlStatement,
  getPosSalesFeed,
  getSalesReportMonthly,
  getSeasonalForecast,
  getStaffingForecast,
  getTaxComplianceItems,
  getTaxDeadlines,
  getVendorPayments,
} from "@/lib/os/data";
import type {
  BalanceSheetItem,
  BankTransaction,
  CashFlowItem,
  Expense,
  MenuEngineeringRow,
  PlLineItem,
  PosSale,
  StaffingForecast,
  VendorPayment,
} from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

const BANK_STATUS_STYLES = {
  matched: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  unmatched: "bg-destructive/15 text-destructive",
};

const TAX_STATUS_STYLES = {
  Filed: "bg-success/15 text-success",
  Current: "bg-success/15 text-success",
  Due: "bg-warning/15 text-warning",
};

const TAX_TYPE_STYLES = {
  sales: "bg-cajun-100 text-cajun-800",
  payroll: "bg-roux-100 text-roux-800",
  income: "bg-cream-200 text-roux-700",
};

const PRIORITY_STYLES = {
  High: "bg-destructive/15 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

const PAYMENT_STATUS_STYLES = {
  Approved: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Scheduled: "bg-primary/15 text-primary",
};

const MENU_CLASS_STYLES = {
  Star: "bg-success/15 text-success",
  "Plow Horse": "bg-primary/15 text-primary",
  Puzzle: "bg-warning/15 text-warning",
  Dog: "bg-muted text-muted-foreground",
};

export function BookkeepingView() {
  const posSales = getPosSalesFeed();
  const expenses = getExpenses();
  const bankTx = getBankTransactions();
  const [expenseTab, setExpenseTab] = useState("all");

  const posColumns = useMemo<ColumnDef<PosSale>[]>(
    () => [
      { accessorKey: "time", header: "Time" },
      { accessorKey: "ticket", header: "Ticket" },
      { accessorKey: "item", header: "Item" },
      { accessorKey: "qty", header: "Qty", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "subtotal", header: "Subtotal", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "tax", header: "Tax", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "tip", header: "Tip", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "payment", header: "Payment" },
    ],
    [],
  );

  const expenseColumns = useMemo<ColumnDef<Expense>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", getValue<string>() === "Paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  const bankColumns = useMemo<ColumnDef<BankTransaction>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className={cn("tabular-nums font-medium", row.original.type === "deposit" ? "text-success" : "text-foreground")}>
            {row.original.type === "deposit" ? "+" : "-"}
            {formatCurrency(Math.abs(row.original.amount))}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent capitalize", BANK_STATUS_STYLES[getValue<keyof typeof BANK_STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
      { accessorKey: "matchedTo", header: "Matched To", cell: ({ getValue }) => getValue<string>() ?? "—" },
    ],
    [],
  );

  const filteredExpenses =
    expenseTab === "all" ? expenses : expenses.filter((e) => e.category === expenseTab);

  const matchedTotal = bankTx
    .filter((t) => t.type === "deposit" && t.status === "matched")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Live POS Sales — Today</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={posSales} columns={posColumns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={expenseTab} onValueChange={setExpenseTab}>
            <TabsList className="mb-4 flex h-auto flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Food / Seafood">Seafood</TabsTrigger>
              <TabsTrigger value="Food / Produce">Produce</TabsTrigger>
              <TabsTrigger value="Beverages">Beverages</TabsTrigger>
              <TabsTrigger value="Payroll">Payroll</TabsTrigger>
              <TabsTrigger value="Atlanta Utilities">Utilities</TabsTrigger>
            </TabsList>
            <TabsContent value={expenseTab}>
              <SortableTable data={filteredExpenses} columns={expenseColumns} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="size-4" />
              Reconciliation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Matched Deposits Today</p>
              <p className="font-display text-2xl font-bold tabular-nums">{formatCurrency(matchedTotal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Pending</p>
              <p className="font-display text-warning text-xl font-bold tabular-nums">{formatCurrency(412.5)}</p>
              <p className="text-muted-foreground text-xs">DoorDash payout — Jun 22 orders</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bank Reconciliation</CardTitle>
          </CardHeader>
          <CardContent>
            <SortableTable data={bankTx} columns={bankColumns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function FinancialReportsView() {
  const pl = getPlStatement();
  const balanceSheet = getBalanceSheet();
  const cashFlow = getCashFlowStatement();
  const salesMonthly = getSalesReportMonthly();
  const laborWeekly = getLaborCostWeekly();
  const [statementTab, setStatementTab] = useState("pl");

  const plColumns = useMemo<ColumnDef<PlLineItem>[]>(
    () => [
      {
        accessorKey: "label",
        header: "Line Item",
        cell: ({ row }) => (
          <span className={cn(row.original.indent ? "pl-4" : "font-medium", row.original.section === "summary" && "font-bold")}>
            {row.original.label}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className={cn("block text-right tabular-nums", row.original.section === "summary" && "font-bold")}>
            {row.original.amount === 0 && row.original.section !== "summary" ? "" : formatCurrency(row.original.amount)}
          </span>
        ),
      },
    ],
    [],
  );

  const bsColumns = useMemo<ColumnDef<BalanceSheetItem>[]>(
    () => [
      { accessorKey: "label", header: "Account", cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span> },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "side", header: "Type", cell: ({ getValue }) => <span className="text-muted-foreground capitalize">{getValue<string>()}</span> },
    ],
    [],
  );

  const cfColumns = useMemo<ColumnDef<CashFlowItem>[]>(
    () => [
      { accessorKey: "label", header: "Activity" },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "section", header: "Section", cell: ({ getValue }) => <span className="text-muted-foreground capitalize">{getValue<string>()}</span> },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <Tabs value={statementTab} onValueChange={setStatementTab}>
        <TabsList>
          <TabsTrigger value="pl">P&L Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
        {statementTab === "pl" ? (
          <TabsContent value="pl" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Statement — June 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <SortableTable data={pl} columns={plColumns} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {statementTab === "balance" ? (
          <TabsContent value="balance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Balance Sheet — As of Jun 23, 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <SortableTable data={balanceSheet} columns={bsColumns} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {statementTab === "cashflow" ? (
          <TabsContent value="cashflow" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Statement — June 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <SortableTable data={cashFlow} columns={cfColumns} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
      </Tabs>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Report — 12 Month (Atlanta Seasonality)</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyChart>
              <SalesReportChart data={salesMonthly} />
            </LazyChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Labor Cost vs Sales — Weekly</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyChart>
              <LaborCostChart data={laborWeekly} />
            </LazyChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TaxComplianceView() {
  const items = getTaxComplianceItems();
  const deadlines = getTaxDeadlines();

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(2026, 5, 1 + i);
    return {
      date: d.getDate(),
      full: d.toISOString().slice(0, 10),
      isCurrentMonth: d.getMonth() === 5,
    };
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.label}</CardTitle>
              <p className="text-muted-foreground text-sm">{item.jurisdiction}</p>
            </CardHeader>
            <CardContent>
              <Badge variant="muted" className={cn("border-transparent", TAX_STATUS_STYLES[item.status])}>
                {item.status}
              </Badge>
              {item.dueDate ? <p className="text-muted-foreground mt-2 text-sm">Due {item.dueDate}</p> : null}
              {item.amount ? <p className="font-display mt-1 text-lg font-bold tabular-nums">{formatCurrency(item.amount)}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filing Deadlines — Next 60 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {deadlines.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{d.label}</p>
                  <p className="text-muted-foreground text-sm">{d.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant="muted" className={cn("border-transparent capitalize", TAX_TYPE_STYLES[d.type])}>
                    {d.type}
                  </Badge>
                  {d.amount ? <p className="mt-1 text-sm font-medium tabular-nums">{formatCurrency(d.amount)}</p> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-muted-foreground mb-3 text-sm font-medium">June 2026 Calendar</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-muted-foreground py-1 font-medium">{d}</div>
              ))}
              {calendarDays.map((day, i) => {
                const deadline = deadlines.find(
                  (d) => d.date.endsWith(`-${String(day.date).padStart(2, "0")}`) && day.isCurrentMonth,
                );
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative rounded-md py-2",
                      !day.isCurrentMonth && "text-muted-foreground/40",
                      deadline && "bg-primary/10 font-bold",
                    )}
                  >
                    {day.date}
                    {deadline ? <span className="bg-primary absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full" /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function BudgetingView() {
  const forecast = getSeasonalForecast();
  const staffing = getStaffingForecast();

  const columns = useMemo<ColumnDef<StaffingForecast>[]>(
    () => [
      { accessorKey: "week", header: "Week" },
      { accessorKey: "projectedCovers", header: "Covers", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>().toLocaleString()}</span> },
      { accessorKey: "recommendedFte", header: "Recommended Staffing" },
      { accessorKey: "laborHours", header: "Labor Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "estLaborCost", header: "Est. Labor Cost", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Sales Projections — Atlanta Seasonality</CardTitle>
        </CardHeader>
        <CardContent>
          <LazyChart>
            <SeasonalForecastChart data={forecast} />
          </LazyChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staffing Needs Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={staffing} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function CashFlowView() {
  const forecast = getCashFlowForecast();
  const vendors = getVendorPayments();

  const columns = useMemo<ColumnDef<VendorPayment>[]>(
    () => [
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "dueDate", header: "Due Date" },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", PRIORITY_STYLES[getValue<keyof typeof PRIORITY_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", PAYMENT_STATUS_STYLES[getValue<keyof typeof PAYMENT_STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  const net30 = forecast.reduce((s, d) => s + d.inflows - d.outflows, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">30-Day Net Cash</p>
            <p className={cn("font-display text-2xl font-bold tabular-nums", net30 >= 0 ? "text-success" : "text-destructive")}>
              {formatCurrency(net30)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Total Inflows</p>
            <p className="font-display text-success text-2xl font-bold tabular-nums">
              {formatCurrency(forecast.reduce((s, d) => s + d.inflows, 0))}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Total Outflows</p>
            <p className="font-display text-destructive text-2xl font-bold tabular-nums">
              {formatCurrency(forecast.reduce((s, d) => s + d.outflows, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>30-Day Cash Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <LazyChart height={320}>
            <CashFlowForecastChart data={forecast} />
          </LazyChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Payment Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={vendors} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function InsightsView() {
  const menu = getMenuEngineering();
  const expansion = getExpansionAnalysis();

  const columns = useMemo<ColumnDef<MenuEngineeringRow>[]>(
    () => [
      { accessorKey: "name", header: "Menu Item" },
      { accessorKey: "sold", header: "# Sold", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>().toLocaleString()}</span> },
      { accessorKey: "foodCostPct", header: "Food Cost %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
      { accessorKey: "contributionMargin", header: "Margin $", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "classification",
        header: "Class",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", MENU_CLASS_STYLES[getValue<keyof typeof MENU_CLASS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <InsightsChat surface="light" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary size-4" />
            Menu Engineering
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={menu} columns={columns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-primary size-4" />
            Expansion Analysis — {expansion.location}
          </CardTitle>
          <p className="text-muted-foreground text-sm">Demo projection. Not financial advice.</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Year 1 Revenue</p>
              <p className="font-display text-xl font-bold tabular-nums">{formatCurrency(expansion.year1Revenue)}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Monthly Rent</p>
              <p className="font-display text-xl font-bold tabular-nums">{formatCurrency(expansion.monthlyRent)}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Breakeven</p>
              <p className="font-display text-xl font-bold tabular-nums">Month {expansion.breakevenMonth}</p>
            </div>
          </div>
          <LazyChart height={320}>
            <ExpansionRoiChart data={expansion.roiData} />
          </LazyChart>
        </CardContent>
      </Card>
    </div>
  );
}
