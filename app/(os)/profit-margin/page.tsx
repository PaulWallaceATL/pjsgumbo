import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { ProfitMarginView } from "@/components/os/views/costing-views";
import { getProfitMarginRows } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Profit Margin" };

export default function Page() {
  const rows = getProfitMarginRows();
  const stars = rows.filter((r) => r.classification === "Star").length;
  const avgMargin = Math.round((rows.reduce((s, r) => s + r.marginPct, 0) / rows.length) * 10) / 10;

  return (
    <OsPageShell
      title="Profit Margin"
      description="Contribution margin and menu engineering classification by item."
      stats={[
        { label: "Items analyzed", value: rows.length.toString() },
        { label: "Avg margin", value: `${avgMargin}%` },
        { label: "Stars", value: stars.toString() },
        { label: "Top margin", value: formatCurrency(Math.max(...rows.map((r) => r.margin))) },
      ]}
    >
      <ProfitMarginView />
    </OsPageShell>
  );
}
