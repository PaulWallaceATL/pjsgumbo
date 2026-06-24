import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { WeeklyReorderView } from "@/components/os/views/inventory-views";
import { getWeeklyReorder } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Weekly Reorder" };

export default function Page() {
  const reorder = getWeeklyReorder();
  const totalEst = reorder.reduce((s, r) => s + r.estCost, 0);

  return (
    <OsPageShell
      title="Weekly Reorder"
      description="Items below par with supplier gaps and estimated reorder costs."
      stats={[
        { label: "Items below par", value: reorder.length.toString() },
        { label: "Est. reorder cost", value: formatCurrency(totalEst) },
        { label: "Critical gaps", value: reorder.filter((r) => r.gap > r.par * 0.5).length.toString() },
        { label: "Suppliers", value: new Set(reorder.map((r) => r.supplier)).size.toString() },
      ]}
    >
      <WeeklyReorderView />
    </OsPageShell>
  );
}
