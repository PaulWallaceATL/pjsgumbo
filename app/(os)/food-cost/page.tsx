import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { FoodCostView } from "@/components/os/views/costing-views";
import { getFoodCostRows } from "@/lib/os/data";

export const metadata: Metadata = { title: "Food Cost" };

export default function Page() {
  const rows = getFoodCostRows();
  const over = rows.filter((r) => r.status === "Over").length;
  const avgPct = Math.round((rows.reduce((s, r) => s + r.foodCostPct, 0) / rows.length) * 10) / 10;

  return (
    <OsPageShell
      title="Food Cost"
      description="Food cost percentage by menu item against a 30% target."
      stats={[
        { label: "Items tracked", value: rows.length.toString() },
        { label: "Avg food cost", value: `${avgPct}%` },
        { label: "Over target", value: over.toString() },
        { label: "Target", value: "30%" },
      ]}
    >
      <FoodCostView />
    </OsPageShell>
  );
}
