"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import type { InventoryRow, InventoryStatus } from "@/lib/os/data";

const STATUS_STYLES: Record<InventoryStatus, string> = {
  ok: "bg-success/15 text-success",
  low: "bg-warning/15 text-warning",
  critical: "bg-destructive/15 text-destructive",
};

const STATUS_LABEL: Record<InventoryStatus, string> = {
  ok: "In stock",
  low: "Low",
  critical: "Critical",
};

export function InventoryTable({ rows }: { rows: InventoryRow[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(rows.map((r) => r.category)))],
    [rows],
  );

  const filtered = rows.filter((r) => {
    const matchesQuery =
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.sku.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || r.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search items or SKU…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">On Hand</TableHead>
              <TableHead className="text-right">Par</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.sku}>
                <TableCell>
                  <div className="font-medium">{row.name}</div>
                  <div className="text-muted-foreground text-xs">{row.sku}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.category}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.onHand} {row.unit}
                </TableCell>
                <TableCell className="text-muted-foreground text-right tabular-nums">
                  {row.par} {row.unit}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(row.costPerUnit)}
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {formatCurrency(row.value)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {row.supplier}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="muted"
                    className={cn("border-transparent", STATUS_STYLES[row.status])}
                  >
                    {STATUS_LABEL[row.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-muted-foreground py-10 text-center">
                  No items match your search.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
