"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/os/sortable-table";
import {
  getFreezerItems,
  getPackagingItems,
  getPackagingUsage,
  getRestaurantDepotCart,
  getRestaurantDepotTotal,
  getWalkInItems,
  getWeeklyReorder,
  type InventoryRow,
} from "@/lib/os/data";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_STYLES = {
  ok: "bg-success/15 text-success",
  low: "bg-warning/15 text-warning",
  critical: "bg-destructive/15 text-destructive",
};

function inventoryColumns(): ColumnDef<InventoryRow>[] {
  return [
    {
      accessorKey: "name",
      header: "Item",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-muted-foreground text-xs">{row.original.sku}</div>
        </div>
      ),
    },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "onHand",
      header: "On Hand",
      cell: ({ row }) => (
        <span className="tabular-nums">
          {row.original.onHand} / {row.original.par} {row.original.unit}
        </span>
      ),
    },
    { accessorKey: "value", header: "Value", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <Badge variant="muted" className={cn("border-transparent capitalize", STATUS_STYLES[getValue<keyof typeof STATUS_STYLES>()])}>
          {getValue<string>()}
        </Badge>
      ),
    },
  ];
}

export function RestaurantDepotView() {
  const cart = getRestaurantDepotCart();
  const total = getRestaurantDepotTotal();

  const columns = useMemo<ColumnDef<(typeof cart)[number]>[]>(
    () => [
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "name", header: "Item" },
      { accessorKey: "qty", header: "Qty", cell: ({ row }) => <span className="tabular-nums">{row.original.qty} {row.original.unit}</span> },
      { accessorKey: "unitCost", header: "Unit Cost", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "lineTotal", header: "Line Total", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Depot Cart</CardTitle>
        <p className="text-muted-foreground text-sm">Estimated total: {formatCurrency(total)}</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={cart} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function WeeklyReorderView() {
  const reorder = getWeeklyReorder();

  const columns = useMemo<ColumnDef<(typeof reorder)[number]>[]>(
    () => [
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "name", header: "Item" },
      { accessorKey: "onHand", header: "On Hand", cell: ({ row }) => <span className="tabular-nums">{row.original.onHand} {row.original.unit}</span> },
      { accessorKey: "par", header: "Par", cell: ({ row }) => <span className="tabular-nums">{row.original.par} {row.original.unit}</span> },
      { accessorKey: "gap", header: "Gap", cell: ({ row }) => <span className="tabular-nums">{row.original.gap} {row.original.unit}</span> },
      { accessorKey: "supplier", header: "Supplier" },
      { accessorKey: "estCost", header: "Est. Cost", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  const totalEst = reorder.reduce((s, r) => s + r.estCost, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Reorder List</CardTitle>
        <p className="text-muted-foreground text-sm">{reorder.length} items below par — est. {formatCurrency(totalEst)}</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={reorder} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function StorageView({ variant }: { variant: "freezer" | "walk-in" }) {
  const rows = variant === "freezer" ? getFreezerItems() : getWalkInItems();
  const title = variant === "freezer" ? "Freezer Inventory" : "Walk-In Cooler Inventory";
  const columns = useMemo(() => inventoryColumns(), []);

  const totalValue = rows.reduce((s, r) => s + r.value, 0);
  const lowCount = rows.filter((r) => r.status !== "ok").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground text-sm">
          {rows.length} SKUs · {formatCurrency(totalValue)} on hand · {lowCount} below par
        </p>
      </CardHeader>
      <CardContent>
        <SortableTable data={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function PackagingView() {
  const items = getPackagingItems();
  const usage = getPackagingUsage();
  const invColumns = useMemo(() => inventoryColumns(), []);

  const usageColumns = useMemo<ColumnDef<(typeof usage)[number]>[]>(
    () => [
      { accessorKey: "name", header: "Item" },
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "onHand", header: "On Hand", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "dailyUse", header: "Daily Use", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "daysLeft", header: "Days Left", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Packaging Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={items} columns={invColumns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Packaging Usage Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={usage} columns={usageColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
