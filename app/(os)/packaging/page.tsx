import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { PackagingView } from "@/components/os/views/inventory-views";
import { getPackagingItems, getPackagingUsage } from "@/lib/os/data";

export const metadata: Metadata = { title: "Packaging" };

export default function Page() {
  const items = getPackagingItems();
  const usage = getPackagingUsage();
  const minDays = Math.min(...usage.map((u) => u.daysLeft));

  return (
    <OsPageShell
      title="Packaging"
      description="Bowls, containers, lids, and carryout bags with usage forecasts."
      stats={[
        { label: "Packaging SKUs", value: items.length.toString() },
        { label: "Usage tracked", value: usage.length.toString() },
        { label: "Min days left", value: minDays.toString() },
        { label: "Daily bowl use", value: usage.find((u) => u.sku === "PKG-BWL")?.dailyUse.toString() ?? "—" },
      ]}
    >
      <PackagingView />
    </OsPageShell>
  );
}
