import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { InsightsView } from "@/components/os/views/finance-views";
import { getExpansionAnalysis, getMenuEngineering } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "AI Insights" };

export default function Page() {
  const menu = getMenuEngineering();
  const expansion = getExpansionAnalysis();
  const stars = menu.filter((m) => m.classification === "Star").length;

  return (
    <OsPageShell
      title="Business Advice (AI Insights)"
      description="Ask your kitchen OS for books, orders, inventory, and expansion insights — full reports below."
      stats={[
        { label: "Menu stars", value: stars.toString() },
        { label: "Expansion ROI", value: `Month ${expansion.breakevenMonth}` },
        { label: "Y1 revenue (proj.)", value: formatCurrency(expansion.year1Revenue) },
        { label: "Items analyzed", value: menu.length.toString() },
      ]}
    >
      <InsightsView />
    </OsPageShell>
  );
}
