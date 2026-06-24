import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { CashFlowView } from "@/components/os/views/finance-views";
import { getCashFlowForecast, getVendorPayments } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Cash Flow" };

export default function Page() {
  const forecast = getCashFlowForecast();
  const vendors = getVendorPayments();
  const net30 = forecast.reduce((s, d) => s + d.inflows - d.outflows, 0);
  const dueThisWeek = vendors
    .filter((v) => v.dueDate <= "2026-06-28")
    .reduce((s, v) => s + v.amount, 0);
  const approved = vendors.filter((v) => v.status === "Approved").length;

  return (
    <OsPageShell
      title="Cash Flow"
      description="30-day cash forecast and vendor payment queue for seafood suppliers and rent."
      stats={[
        { label: "30-day net", value: formatCurrency(net30) },
        { label: "Total inflows", value: formatCurrency(forecast.reduce((s, d) => s + d.inflows, 0)) },
        { label: "Due this week", value: formatCurrency(dueThisWeek) },
        { label: "Approved payments", value: approved.toString() },
      ]}
    >
      <CashFlowView />
    </OsPageShell>
  );
}
