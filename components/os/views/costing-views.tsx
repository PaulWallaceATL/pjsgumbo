"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/os/sortable-table";
import { getFoodCostRows, getPortionRows, getProfitMarginRows } from "@/lib/os/data";
import { cn, formatCurrency } from "@/lib/utils";

const CLASS_STYLES = {
  Star: "bg-success/15 text-success",
  "Plow Horse": "bg-primary/15 text-primary",
  Puzzle: "bg-warning/15 text-warning",
  Dog: "bg-muted text-muted-foreground",
};

export function FoodCostView() {
  const rows = getFoodCostRows();

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(
    () => [
      { accessorKey: "item", header: "Menu Item" },
      { accessorKey: "sold", header: "# Sold", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>().toLocaleString()}</span> },
      { accessorKey: "foodCostPct", header: "Food Cost %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
      { accessorKey: "targetPct", header: "Target %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", getValue<string>() === "On Target" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
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
        <CardTitle>Food Cost by Menu Item</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function ProfitMarginView() {
  const rows = getProfitMarginRows();

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(
    () => [
      { accessorKey: "item", header: "Menu Item" },
      { accessorKey: "price", header: "Price", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "foodCost", header: "Food Cost", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "margin", header: "Margin $", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "marginPct", header: "Margin %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
      {
        accessorKey: "classification",
        header: "Class",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", CLASS_STYLES[getValue<keyof typeof CLASS_STYLES>()])}>
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
        <CardTitle>Profit Margin Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function PortionsView() {
  const rows = getPortionRows();

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(
    () => [
      { accessorKey: "item", header: "Gumbo" },
      { accessorKey: "size", header: "Size" },
      { accessorKey: "ounces", header: "Ounces", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()} oz</span> },
      { accessorKey: "price", header: "Price", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "yieldPer10Gal", header: "Yield / 10 gal", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()} portions</span> },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portion Yields & Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}
