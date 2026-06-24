import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { MenuManagementView } from "@/components/os/views/operations-views";
import { getMenuCatalog } from "@/lib/os/data";

export const metadata: Metadata = { title: "Menu Management" };

export default function Page() {
  const catalog = getMenuCatalog();
  const gumbos = catalog.filter((c) => c.category === "Gumbo").length;
  const featured = catalog.filter((c) => c.featured).length;

  return (
    <OsPageShell
      title="Menu Management"
      description="Full menu catalog — gumbos, sides, drinks, and desserts with pricing by size."
      stats={[
        { label: "Total SKUs", value: catalog.length.toString() },
        { label: "Gumbo variants", value: gumbos.toString() },
        { label: "Featured items", value: featured.toString() },
        { label: "Weekend-only", value: catalog.filter((c) => c.weekendOnly).length.toString() },
      ]}
    >
      <MenuManagementView />
    </OsPageShell>
  );
}
