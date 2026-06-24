import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { OrdersView } from "@/components/os/views/operations-views";
import { getLiveOrders } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };

export default function Page() {
  const orders = getLiveOrders();
  const active = orders.filter((o) => o.status !== "Complete").length;
  const avgTicket = orders.reduce((s, o) => s + o.total, 0) / orders.length;

  return (
    <OsPageShell
      title="Orders"
      description="Live order queue across dine-in, pickup, DoorDash, and Uber Eats."
      stats={[
        { label: "Orders in queue", value: orders.length.toString() },
        { label: "Active", value: active.toString() },
        { label: "Avg ticket", value: formatCurrency(avgTicket) },
        { label: "Ready", value: orders.filter((o) => o.status === "Ready").length.toString() },
      ]}
    >
      <OrdersView />
    </OsPageShell>
  );
}
