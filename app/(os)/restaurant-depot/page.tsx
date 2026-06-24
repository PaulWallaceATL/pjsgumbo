import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { RestaurantDepotView } from "@/components/os/views/inventory-views";
import { getRestaurantDepotCart, getRestaurantDepotTotal } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Restaurant Depot" };

export default function Page() {
  const cart = getRestaurantDepotCart();
  const total = getRestaurantDepotTotal();

  return (
    <OsPageShell
      title="Restaurant Depot"
      description="Wholesale cart for chicken, roux inputs, rice, and stock base."
      stats={[
        { label: "Line items", value: cart.length.toString() },
        { label: "Cart total", value: formatCurrency(total) },
        { label: "Total qty", value: `${cart.reduce((s, i) => s + i.qty, 0)} units` },
        { label: "Categories", value: "Proteins, Dry Goods" },
      ]}
    >
      <RestaurantDepotView />
    </OsPageShell>
  );
}
