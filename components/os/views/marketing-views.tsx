"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TriangleAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/os/kpi-card";
import {
  CategorySalesChart,
  SalesTrendChart,
} from "@/components/os/dashboard-charts";
import { SortableTable } from "@/components/os/sortable-table";
import { LazyChart } from "@/components/os/lazy-chart";
import {
  getCategorySales,
  getChannelMix,
  getDailyPrepQueue,
  getDeliveryAnalytics,
  getInventoryRows,
  getLiveOrders,
  getProductionSchedule,
  getSalesTrend,
} from "@/lib/os/data";
import { cn, formatCurrency } from "@/lib/utils";

export function OperationsPulseView() {
  const salesTrend = getSalesTrend();
  const categorySales = getCategorySales();
  const lowStock = getInventoryRows()
    .filter((r) => r.status !== "ok")
    .sort((a, b) => a.onHand / a.par - b.onHand / b.par);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyChart>
              <SalesTrendChart data={salesTrend} />
            </LazyChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyChart>
              <CategorySalesChart data={categorySales} />
            </LazyChart>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TriangleAlert className="text-warning size-4" />
            Low Inventory Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {lowStock.slice(0, 5).map((row) => (
            <div key={row.sku} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-muted-foreground text-xs">
                  {row.onHand} / {row.par} {row.unit} on hand
                </p>
              </div>
              <Badge
                variant="muted"
                className={cn(
                  "border-transparent",
                  row.status === "critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning",
                )}
              >
                {row.status === "critical" ? "Critical" : "Low"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ProductionModuleView() {
  const prep = getDailyPrepQueue();
  const schedule = getProductionSchedule();

  const prepColumns = useMemo<ColumnDef<(typeof prep)[number]>[]>(
    () => [
      { accessorKey: "task", header: "Task" },
      { accessorKey: "due", header: "Due" },
      { accessorKey: "qty", header: "Qty" },
      { accessorKey: "assignee", header: "Assignee" },
      { accessorKey: "status", header: "Status" },
    ],
    [],
  );

  const scheduleColumns = useMemo<ColumnDef<(typeof schedule)[number]>[]>(
    () => [
      { accessorKey: "day", header: "Day" },
      { accessorKey: "gumbo", header: "Gumbo" },
      { accessorKey: "gallons", header: "Gallons", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "lead", header: "Lead" },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Prep Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={prep} columns={prepColumns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Batch Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={schedule} columns={scheduleColumns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function OrdersDeliveryView() {
  const orders = getLiveOrders().slice(0, 8);
  const delivery = getDeliveryAnalytics();
  const channelMix = getChannelMix();

  const orderColumns = useMemo<ColumnDef<(typeof orders)[number]>[]>(
    () => [
      { accessorKey: "ticket", header: "Ticket" },
      { accessorKey: "items", header: "Items" },
      { accessorKey: "total", header: "Total", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "channel", header: "Channel" },
      { accessorKey: "status", header: "Status" },
    ],
    [],
  );

  const deliveryColumns = useMemo<ColumnDef<(typeof delivery)[number]>[]>(
    () => [
      { accessorKey: "zone", header: "Zone" },
      { accessorKey: "orders", header: "Orders", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "avgTicket", header: "Avg Ticket", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {channelMix.map((c) => (
          <Card key={c.channel}>
            <CardContent className="py-5">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">{c.channel}</p>
              <p className="font-display mt-1 text-2xl font-bold tabular-nums">{c.pct}%</p>
              <p className="text-muted-foreground text-sm">{c.orders} orders</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <SortableTable data={orders} columns={orderColumns} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <SortableTable data={delivery} columns={deliveryColumns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
