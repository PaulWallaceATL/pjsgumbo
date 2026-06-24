import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { WasteLogView } from "@/components/os/views/operations-views";
import { getWasteLog } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Waste Log" };

export default function Page() {
  const waste = getWasteLog();
  const totalImpact = waste.reduce((s, w) => s + w.cogsImpact, 0);

  return (
    <OsPageShell
      title="Waste Log"
      description="Track shrinkage and spoilage — every dollar lost pushes straight into COGS."
      stats={[
        { label: "Entries (7d)", value: waste.length.toString() },
        { label: "COGS impact", value: formatCurrency(totalImpact) },
        { label: "Avg per entry", value: formatCurrency(totalImpact / waste.length) },
        { label: "Top reason", value: "Overproduction" },
      ]}
    >
      <WasteLogView />
    </OsPageShell>
  );
}
