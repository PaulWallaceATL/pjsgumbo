import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { StorageView } from "@/components/os/views/inventory-views";
import { getWalkInItems } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Walk-In Cooler" };

export default function Page() {
  const rows = getWalkInItems();
  const totalValue = rows.reduce((s, r) => s + r.value, 0);
  const lowCount = rows.filter((r) => r.status !== "ok").length;

  return (
    <OsPageShell
      title="Walk-In Cooler"
      description="Fresh produce, seafood, and prepped proteins held at 38°F."
      stats={[
        { label: "SKUs", value: rows.length.toString() },
        { label: "Inventory value", value: formatCurrency(totalValue) },
        { label: "Below par", value: lowCount.toString() },
        { label: "Critical", value: rows.filter((r) => r.status === "critical").length.toString() },
      ]}
    >
      <StorageView variant="walk-in" />
    </OsPageShell>
  );
}
