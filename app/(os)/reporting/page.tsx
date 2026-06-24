import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { ReportingView } from "@/components/os/views/operations-views";
import { getCategorySales, getChannelMix, getSalesTrend } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Reporting" };

export default function Page() {
  const trend = getSalesTrend();
  const weekTotal = trend.reduce((s, d) => s + d.sales, 0);
  const topCategory = getCategorySales().reduce((best, c) => (c.sales > best.sales ? c : best));
  const deliveryPct = getChannelMix()
    .filter((c) => c.channel === "DoorDash" || c.channel === "Uber Eats")
    .reduce((s, c) => s + c.pct, 0);

  return (
    <OsPageShell
      title="Reporting"
      description="Sales trends, category mix, channel breakdown, and monthly seasonality."
      stats={[
        { label: "7-day sales", value: formatCurrency(weekTotal) },
        { label: "Top category", value: topCategory.category },
        { label: "Delivery share", value: `${deliveryPct.toFixed(1)}%` },
        { label: "Daily avg", value: formatCurrency(Math.round(weekTotal / trend.length)) },
      ]}
    >
      <ReportingView />
    </OsPageShell>
  );
}
