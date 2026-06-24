import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { StorageView } from "@/components/os/views/inventory-views";
import { getFreezerItems } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Freezer" };

export default function Page() {
  const rows = getFreezerItems();
  const totalValue = rows.reduce((s, r) => s + r.value, 0);
  const lowCount = rows.filter((r) => r.status !== "ok").length;

  return (
    <OsPageShell
      title="Freezer"
      description="Frozen proteins, seafood, and roux inputs stored at 0°F."
      stats={[
        { label: "SKUs", value: rows.length.toString() },
        { label: "Inventory value", value: formatCurrency(totalValue) },
        { label: "Below par", value: lowCount.toString() },
        { label: "Critical", value: rows.filter((r) => r.status === "critical").length.toString() },
      ]}
    >
      <StorageView variant="freezer" />
    </OsPageShell>
  );
}
