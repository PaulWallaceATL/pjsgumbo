import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { PortionsView } from "@/components/os/views/costing-views";
import { getPortionRows } from "@/lib/os/data";

export const metadata: Metadata = { title: "Portions" };

export default function Page() {
  const rows = getPortionRows();
  const gumbos = new Set(rows.map((r) => r.item)).size;

  return (
    <OsPageShell
      title="Portions"
      description="Portion sizes, pricing, and yield per 10-gallon batch for every gumbo."
      stats={[
        { label: "Portion SKUs", value: rows.length.toString() },
        { label: "Gumbo varieties", value: gumbos.toString() },
        { label: "Size options", value: "3" },
        { label: "Max yield / 10 gal", value: `${Math.max(...rows.map((r) => r.yieldPer10Gal))} portions` },
      ]}
    >
      <PortionsView />
    </OsPageShell>
  );
}
