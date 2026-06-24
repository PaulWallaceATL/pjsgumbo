import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { TaxComplianceView } from "@/components/os/views/finance-views";
import { getTaxComplianceItems, getTaxDeadlines } from "@/lib/os/data";

export const metadata: Metadata = { title: "Tax Compliance" };

export default function Page() {
  const items = getTaxComplianceItems();
  const deadlines = getTaxDeadlines();
  const dueCount = items.filter((i) => i.status === "Due").length;

  return (
    <OsPageShell
      title="Tax Compliance"
      description="Sales tax (GA + Atlanta 8.9%), payroll tax, income tax status and upcoming filing deadlines."
      stats={[
        { label: "Sales tax rate", value: "8.9%" },
        { label: "Open deadlines", value: deadlines.length.toString() },
        { label: "Items due", value: dueCount.toString() },
        { label: "Filings tracked", value: items.length.toString() },
      ]}
    >
      <TaxComplianceView />
    </OsPageShell>
  );
}
