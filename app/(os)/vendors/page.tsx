import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { VendorsView } from "@/components/os/views/operations-views";
import { getVendors } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendors" };

export default function Page() {
  const vendors = getVendors();
  const openAp = vendors.reduce((s, v) => s + v.openBalance, 0);

  return (
    <OsPageShell
      title="Vendors"
      description="Supplier directory with open balances for Gulf seafood, produce, and packaging."
      stats={[
        { label: "Active vendors", value: vendors.length.toString() },
        { label: "Open AP", value: formatCurrency(openAp) },
        { label: "Seafood suppliers", value: vendors.filter((v) => v.type === "Seafood").length.toString() },
        { label: "With balance", value: vendors.filter((v) => v.openBalance > 0).length.toString() },
      ]}
    >
      <VendorsView />
    </OsPageShell>
  );
}
