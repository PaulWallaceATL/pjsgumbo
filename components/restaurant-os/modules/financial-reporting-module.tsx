"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModuleBand } from "@/components/restaurant-os/module-band";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import {
  LaborCostChart,
  SalesReportChart,
} from "@/components/restaurant-os/charts/demo-charts";
import {
  getBalanceSheet,
  getCashFlowStatement,
  getLaborCostWeekly,
  getPlStatement,
  getSalesReportMonthly,
} from "@/lib/restaurant-os/data";
import type { BalanceSheetItem, CashFlowItem, PlLineItem } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

export function FinancialReportingModule() {
  const pl = getPlStatement();
  const balanceSheet = getBalanceSheet();
  const cashFlow = getCashFlowStatement();
  const salesMonthly = getSalesReportMonthly();
  const laborWeekly = getLaborCostWeekly();

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
          <span className={cn("tabular-nums text-right block", row.original.section === "summary" && "font-bold")}>
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
      { accessorKey: "side", header: "Type", cell: ({ getValue }) => <span className="capitalize text-muted-foreground">{getValue<string>()}</span> },
    ],
    [],
  );

  const cfColumns = useMemo<ColumnDef<CashFlowItem>[]>(
    () => [
      { accessorKey: "label", header: "Activity" },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "section", header: "Section", cell: ({ getValue }) => <span className="capitalize text-muted-foreground">{getValue<string>()}</span> },
    ],
    [],
  );

  return (
    <ModuleBand id="financial" icon={BarChart3}>
      <Tabs defaultValue="pl">
        <TabsList>
          <TabsTrigger value="pl">P&L Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
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
      </Tabs>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Report — 12 Month (Atlanta Seasonality)</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesReportChart data={salesMonthly} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Labor Cost vs Sales — Weekly</CardTitle>
          </CardHeader>
          <CardContent>
            <LaborCostChart data={laborWeekly} />
          </CardContent>
        </Card>
      </div>
    </ModuleBand>
  );
}
