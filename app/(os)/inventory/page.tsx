import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { InventoryTable } from "@/components/os/inventory-table";
import { getInventoryRows, getInventorySummary } from "@/lib/os/data";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  const rows = getInventoryRows();
  const summary = getInventorySummary();

  const stats = [
    { label: "Total items", value: summary.itemCount.toString() },
    { label: "Inventory value", value: `$${summary.totalValue.toLocaleString()}` },
    { label: "Categories", value: summary.categories.toString() },
    { label: "Below par", value: summary.lowCount.toString() },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Master list with on-hand levels, par, cost, value, and vendor.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="py-5">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {s.label}
              </p>
              <p className="font-display mt-1.5 text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="py-6">
          <InventoryTable rows={rows} />
        </CardContent>
      </Card>
    </div>
  );
}
