import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { BookkeepingView } from "@/components/os/views/finance-views";
import { getBankTransactions, getPosSalesFeed } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookkeeping" };

export default function Page() {
  const posSales = getPosSalesFeed();
  const bankTx = getBankTransactions();
  const matchedTotal = bankTx
    .filter((t) => t.type === "deposit" && t.status === "matched")
    .reduce((s, t) => s + t.amount, 0);
  const pending = bankTx.filter((t) => t.status === "pending").length;

  return (
    <OsPageShell
      title="Bookkeeping"
      description="Live POS sales, expense tracking, and bank reconciliation for 229 Peachtree St NE."
      stats={[
        { label: "Today's tickets", value: posSales.length.toString() },
        { label: "Matched deposits", value: formatCurrency(matchedTotal) },
        { label: "Pending payouts", value: pending.toString() },
        { label: "POS revenue today", value: formatCurrency(posSales.reduce((s, p) => s + p.subtotal + p.tax + p.tip, 0)) },
      ]}
    >
      <BookkeepingView />
    </OsPageShell>
  );
}
