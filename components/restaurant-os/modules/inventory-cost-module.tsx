"use client";

import { Boxes } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CostPercentPie } from "@/components/restaurant-os/charts/demo-charts";
import { WasteLogView } from "@/components/os/views/operations-views";
import {
  getCostPercentages,
  getHighlightedInventory,
  getInventoryDemoRows,
} from "@/lib/os/data";
import { SortableTable } from "@/components/os/sortable-table";
import type { InventoryRow } from "@/lib/os/data";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_STYLES = {
  ok: "bg-success/15 text-success",
  low: "bg-warning/15 text-warning",
  critical: "bg-destructive/15 text-destructive",
};

export function InventoryCostModule() {
  const inventory = getInventoryDemoRows();
  const costs = getCostPercentages();
  const highlights = getHighlightedInventory();

  const invColumns = useMemo<ColumnDef<InventoryRow>[]>(
    () => [
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
      { accessorKey: "onHand", header: "On Hand", cell: ({ row }) => <span className="tabular-nums">{row.original.onHand} {row.original.unit}</span> },
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
    ],
    [],
  );

  return (
    <ModuleBand id="inventory" icon={Boxes}>
      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.filter(Boolean).map((item) => (
          <Card key={item!.sku}>
            <CardContent className="py-5">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">{item!.name}</p>
              <p className="font-display mt-1 text-xl font-bold tabular-nums">{item!.onHand} {item!.unit}</p>
              <p className="text-muted-foreground text-sm">{formatCurrency(item!.value)} on hand</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Cost Percentages</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Food Cost</span><span className="font-bold tabular-nums">{costs.food}%</span></div>
              <div className="flex justify-between"><span>Beverage Cost</span><span className="font-bold tabular-nums">{costs.beverage}%</span></div>
              <div className="flex justify-between border-t pt-3"><span className="font-medium">Combined</span><span className="font-bold tabular-nums">{costs.combined}%</span></div>
            </div>
            <CostPercentPie food={costs.food} beverage={costs.beverage} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Inventory Values</CardTitle></CardHeader>
          <CardContent><SortableTable data={inventory} columns={invColumns} /></CardContent>
        </Card>
      </div>
      <WasteLogView />
    </ModuleBand>
  );
}
