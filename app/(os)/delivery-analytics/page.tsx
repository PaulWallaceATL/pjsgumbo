import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { DeliveryAnalyticsView } from "@/components/os/views/operations-views";
import { getDeliveryAnalytics } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Delivery Analytics" };

export default function Page() {
  const analytics = getDeliveryAnalytics();
  const totalOrders = analytics.reduce((s, a) => s + a.orders, 0);
  const topZone = analytics.reduce((best, a) => (a.orders > best.orders ? a : best), analytics[0]);

  return (
    <OsPageShell
      title="Delivery Analytics"
      description="Orders, average tickets, and ETAs by Atlanta delivery zone."
      stats={[
        { label: "Weekly orders", value: totalOrders.toString() },
        { label: "Top zone", value: topZone?.zone ?? "—" },
        { label: "Zones tracked", value: analytics.length.toString() },
        { label: "Avg ticket", value: formatCurrency(analytics.reduce((s, a) => s + a.avgTicket, 0) / analytics.length) },
      ]}
    >
      <DeliveryAnalyticsView />
    </OsPageShell>
  );
}
