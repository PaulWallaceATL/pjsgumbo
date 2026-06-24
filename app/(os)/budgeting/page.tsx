import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { BudgetingView } from "@/components/os/views/finance-views";
import { getSeasonalForecast, getStaffingForecast } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Budgeting" };

export default function Page() {
  const forecast = getSeasonalForecast();
  const staffing = getStaffingForecast();
  const peak = forecast.reduce((best, f) => (f.projected > best.projected ? f : best), forecast[0]);
  const summer = forecast.filter((f) => ["Jun", "Jul", "Aug"].includes(f.month));
  const summerAvg = summer.reduce((s, f) => s + f.projected, 0) / summer.length;
  const winter = forecast.filter((f) => ["Nov", "Dec", "Jan", "Feb"].includes(f.month));
  const winterAvg = winter.reduce((s, f) => s + f.projected, 0) / winter.length;
  const lift = summerAvg ? `${Math.round(((winterAvg - summerAvg) / summerAvg) * 100)}%` : "—";

  return (
    <OsPageShell
      title="Budgeting & Forecasting"
      description="Seasonal Atlanta demand projections and staffing needs based on expected volume."
      stats={[
        { label: "Peak month", value: peak?.month ?? "—" },
        { label: "Winter lift", value: lift },
        { label: "Forecast weeks", value: staffing.length.toString() },
        { label: "Peak projected", value: formatCurrency(peak?.projected ?? 0) },
      ]}
    >
      <BudgetingView />
    </OsPageShell>
  );
}
