"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleSection } from "@/components/restaurant-os/module-section";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import { LaborGaugeChart } from "@/components/restaurant-os/charts/demo-charts";
import {
  getLaborGauge,
  getPayrollRows,
  getPayrollTaxCompliance,
} from "@/lib/restaurant-os/data";
import type { PayrollRow } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

export function PayrollLaborModule() {
  const payroll = getPayrollRows();
  const gauge = getLaborGauge();
  const taxCompliance = getPayrollTaxCompliance();

  const columns = useMemo<ColumnDef<PayrollRow>[]>(
    () => [
      { accessorKey: "name", header: "Employee" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "regularHrs", header: "Reg Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "otHrs", header: "OT Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "rate", header: "Rate", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}/hr</span> },
      { accessorKey: "grossPay", header: "Gross Pay", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      { accessorKey: "tipsReported", header: "Tips", cell: ({ getValue }) => <span className="tabular-nums">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", getValue<string>() === "Processed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <ModuleSection
      id="payroll"
      icon={Users}
      title="Payroll & Labor Control"
      description="Hours, overtime, tip reporting, labor cost gauge, and payroll tax compliance."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Labor Cost as % of Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <LaborGaugeChart current={gauge.current} targetMin={gauge.targetMin} targetMax={gauge.targetMax} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payroll Tax Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {taxCompliance.map((item) => (
                <div key={item.label} className="rounded-xl border p-4">
                  <p className="font-medium">{item.label}</p>
                  <Badge
                    variant="muted"
                    className={cn(
                      "mt-2 border-transparent",
                      item.status === "Current" ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Processing — Current Period</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={payroll} columns={columns} />
        </CardContent>
      </Card>
    </ModuleSection>
  );
}
