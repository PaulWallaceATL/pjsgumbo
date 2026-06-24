import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { EmployeesView } from "@/components/os/views/operations-views";
import { getPayrollRows } from "@/lib/os/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Employees" };

export default function Page() {
  const payroll = getPayrollRows();
  const grossTotal = payroll.reduce((s, p) => s + p.grossPay, 0);
  const pending = payroll.filter((p) => p.status === "Pending").length;

  return (
    <OsPageShell
      title="Employees & Payroll"
      description="Hours, overtime, tip reporting, and biweekly payroll for the PJ's Gumbo crew."
      stats={[
        { label: "Active staff", value: payroll.length.toString() },
        { label: "Biweekly gross", value: formatCurrency(grossTotal) },
        { label: "Pending", value: pending.toString() },
        { label: "OT hours", value: payroll.reduce((s, p) => s + p.otHrs, 0).toString() },
      ]}
    >
      <EmployeesView />
    </OsPageShell>
  );
}
