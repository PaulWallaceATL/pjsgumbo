"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { BookOpen, Landmark } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModuleBand } from "@/components/restaurant-os/module-band";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import {
  getBankTransactions,
  getExpenses,
  getPosSalesFeed,
} from "@/lib/restaurant-os/data";
import type { BankTransaction, Expense, PosSale } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_STYLES = {
  matched: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  unmatched: "bg-destructive/15 text-destructive",
};

export function BookkeepingModule() {
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
          <Badge variant="muted" className={cn("border-transparent capitalize", STATUS_STYLES[getValue<keyof typeof STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
      { accessorKey: "matchedTo", header: "Matched To", cell: ({ getValue }) => getValue<string>() ?? "—" },
    ],
    [],
  );

  const filteredExpenses =
    expenseTab === "all"
      ? expenses
      : expenses.filter((e) => e.category === expenseTab);

  const matchedTotal = bankTx
    .filter((t) => t.type === "deposit" && t.status === "matched")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <ModuleBand id="bookkeeping" icon={BookOpen}>
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
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Matched Deposits Today</p>
              <p className="font-display text-2xl font-bold tabular-nums">{formatCurrency(matchedTotal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Pending</p>
              <p className="font-display text-xl font-bold tabular-nums text-warning">{formatCurrency(412.5)}</p>
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
    </ModuleBand>
  );
}
