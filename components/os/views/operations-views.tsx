"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/os/sortable-table";
import {
  CategorySalesChart,
  SalesTrendChart,
} from "@/components/os/dashboard-charts";
import { SalesReportChart } from "@/components/restaurant-os/charts/demo-charts";
import {
  getCategorySales,
  getChannelMix,
  getDeliveryAnalytics,
  getLiveOrders,
  getMenuCatalog,
  getPayrollRows,
  getSalesReportMonthly,
  getSalesTrend,
  getVendors,
  getWasteLog,
} from "@/lib/os/data";
import type { PayrollRow, WasteEntry } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

const ORDER_STATUS_STYLES: Record<string, string> = {
  New: "bg-primary/15 text-primary",
  "In Kitchen": "bg-warning/15 text-warning",
  Ready: "bg-success/15 text-success",
  "Out for Delivery": "bg-roux-100 text-roux-800",
  Complete: "bg-muted text-muted-foreground",
};

export function WasteLogView() {
  const waste = getWasteLog();

  const columns = useMemo<ColumnDef<WasteEntry>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "item", header: "Item" },
      { accessorKey: "qty", header: "Qty" },
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "cogsImpact", header: "COGS Impact", cell: ({ getValue }) => <span className="text-destructive tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "loggedBy", header: "Logged By" },
    ],
    [],
  );

  const totalImpact = waste.reduce((s, w) => s + w.cogsImpact, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Log — Shrinkage Impact on COGS</CardTitle>
        <p className="text-muted-foreground text-sm">7-day total impact: {formatCurrency(totalImpact)}</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={waste} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function VendorsView() {
  const vendors = getVendors();

  const columns = useMemo<ColumnDef<(typeof vendors)[number]>[]>(
    () => [
      { accessorKey: "name", header: "Vendor" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "openBalance", header: "Open Balance", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={vendors} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function EmployeesView() {
  const payroll = getPayrollRows();

  const columns = useMemo<ColumnDef<PayrollRow>[]>(
    () => [
      { accessorKey: "name", header: "Employee" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "regularHrs", header: "Reg Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "otHrs", header: "OT Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "rate", header: "Rate", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}/hr</span> },
      { accessorKey: "grossPay", header: "Gross Pay", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "tipsReported", header: "Tips", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", getValue<string>() === "Processed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Processing — Current Period</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={payroll} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function ReportingView() {
  const salesMonthly = getSalesReportMonthly();
  const channelMix = getChannelMix();
  const salesTrend = getSalesTrend();
  const categorySales = getCategorySales();

  const channelColumns = useMemo<ColumnDef<(typeof channelMix)[number]>[]>(
    () => [
      { accessorKey: "channel", header: "Channel" },
      { accessorKey: "orders", header: "Orders", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "pct", header: "Share %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTrendChart data={salesTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategorySalesChart data={categorySales} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>12-Month Sales Report</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesReportChart data={salesMonthly} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Channel Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <SortableTable data={channelMix} columns={channelColumns} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales — Atlanta Seasonality</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesTrendChart
            data={salesMonthly.map((m) => ({ day: m.month.slice(0, 3), sales: m.sales }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function OrdersView() {
  const orders = getLiveOrders();

  const columns = useMemo<ColumnDef<(typeof orders)[number]>[]>(
    () => [
      { accessorKey: "ticket", header: "Ticket" },
      { accessorKey: "time", header: "Time" },
      { accessorKey: "items", header: "Items" },
      { accessorKey: "total", header: "Total", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "channel", header: "Channel" },
      { accessorKey: "zone", header: "Zone" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", ORDER_STATUS_STYLES[getValue<string>()] ?? "bg-muted")}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Order Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={orders} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function MenuManagementView() {
  const catalog = getMenuCatalog();

  const columns = useMemo<ColumnDef<(typeof catalog)[number]>[]>(
    () => [
      { accessorKey: "name", header: "Item" },
      { accessorKey: "size", header: "Size" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "weekendOnly",
        header: "Weekend",
        cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "—"),
      },
      {
        accessorKey: "featured",
        header: "Featured",
        cell: ({ getValue }) =>
          getValue<boolean>() ? (
            <Badge variant="muted" className="border-transparent bg-primary/15 text-primary">
              Featured
            </Badge>
          ) : (
            "—"
          ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Catalog</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={catalog} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function DeliveryAnalyticsView() {
  const analytics = getDeliveryAnalytics();

  const columns = useMemo<ColumnDef<(typeof analytics)[number]>[]>(
    () => [
      { accessorKey: "zone", header: "Zone" },
      { accessorKey: "orders", header: "Orders", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "avgTicket", header: "Avg Ticket", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "eta", header: "ETA" },
    ],
    [],
  );

  const totalOrders = analytics.reduce((s, a) => s + a.orders, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Analytics by Atlanta Zone</CardTitle>
        <p className="text-muted-foreground text-sm">{totalOrders} delivery orders this week</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={analytics} columns={columns} />
      </CardContent>
    </Card>
  );
}
