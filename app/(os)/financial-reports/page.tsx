import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { FinancialReportsView } from "@/components/os/views/finance-views";
import { getBalanceSheet, getPlStatement } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Financial Reports" };

export default function Page() {
  const pl = getPlStatement();
  const revenue = pl.find((l) => l.label === "Total Revenue")?.amount ?? 0;
  const netIncome = pl.find((l) => l.label === "Net Income")?.amount ?? 0;
  const cash = getBalanceSheet().find((l) => l.label === "Cash & Equivalents")?.amount ?? 0;
  const grossProfit = pl.find((l) => l.label === "Gross Profit")?.amount ?? 0;
  const grossMargin = revenue ? `${Math.round((grossProfit / revenue) * 1000) / 10}%` : "—";

  return (
    <OsPageShell
      title="Financial Reports"
      description="P&L, balance sheet, cash flow, and interactive sales and labor charts."
      stats={[
        { label: "June revenue", value: formatCurrency(revenue) },
        { label: "Net income", value: formatCurrency(netIncome) },
        { label: "Gross margin", value: grossMargin },
        { label: "Cash on hand", value: formatCurrency(cash) },
      ]}
    >
      <FinancialReportsView />
    </OsPageShell>
  );
}
