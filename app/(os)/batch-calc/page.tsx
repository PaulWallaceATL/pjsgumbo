import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { BatchCalcView } from "@/components/os/views/production-views";
import { getBatchCalcRows } from "@/lib/os/data";

export const metadata: Metadata = { title: "Gumbo Batch Calc" };

export default function Page() {
  const rows = getBatchCalcRows();
  const max = rows.reduce((best, r) => (r.multiplier > best.multiplier ? r : best), rows[0]);

  return (
    <OsPageShell
      title="Gumbo Batch Calculator"
      description="Scale roux, stock, and yields from home pot to 40-gallon commissary batches."
      stats={[
        { label: "Batch sizes", value: rows.length.toString() },
        { label: "Max batch", value: max?.yield ?? "—" },
        { label: "Max portions", value: max?.portions.toString() ?? "—" },
        { label: "Max roux", value: max ? `${max.rouxLb} lb` : "—" },
      ]}
    >
      <BatchCalcView />
    </OsPageShell>
  );
}
