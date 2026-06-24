import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { InventoryTable } from "@/components/os/inventory-table";
import { OsPageShell } from "@/components/os/os-page-shell";
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
    <OsPageShell
      title="Inventory"
      description="Master list with on-hand levels, par, cost, value, and vendor."
      stats={stats}
    >
      <Card>
        <CardContent className="py-6">
          <InventoryTable rows={rows} />
        </CardContent>
      </Card>
    </OsPageShell>
  );
}
