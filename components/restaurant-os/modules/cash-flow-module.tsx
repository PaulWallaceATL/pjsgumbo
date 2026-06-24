"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleSection } from "@/components/restaurant-os/module-section";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import { CashFlowForecastChart } from "@/components/restaurant-os/charts/demo-charts";
import { getCashFlowForecast, getVendorPayments } from "@/lib/restaurant-os/data";
import type { VendorPayment } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

const PRIORITY_STYLES = {
  High: "bg-destructive/15 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

const STATUS_STYLES = {
  Approved: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Scheduled: "bg-primary/15 text-primary",
};

export function CashFlowModule() {
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
          <Badge variant="muted" className={cn("border-transparent", STATUS_STYLES[getValue<keyof typeof STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  const net30 = forecast.reduce((s, d) => s + d.inflows - d.outflows, 0);

  return (
    <ModuleSection
      id="cashflow"
      icon={Wallet}
      title="Cash Flow Management"
      description="30-day cash forecast and vendor payment queue for seafood suppliers and rent."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">30-Day Net Cash</p>
            <p className={cn("font-display text-2xl font-bold tabular-nums", net30 >= 0 ? "text-success" : "text-destructive")}>
              {formatCurrency(net30)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Total Inflows</p>
            <p className="font-display text-2xl font-bold tabular-nums text-success">
              {formatCurrency(forecast.reduce((s, d) => s + d.inflows, 0))}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Total Outflows</p>
            <p className="font-display text-2xl font-bold tabular-nums text-destructive">
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
          <CashFlowForecastChart data={forecast} />
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
    </ModuleSection>
  );
}
