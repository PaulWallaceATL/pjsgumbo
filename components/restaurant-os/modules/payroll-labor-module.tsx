"use client";

import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleBand } from "@/components/restaurant-os/module-band";
import { LaborGaugeChart } from "@/components/restaurant-os/charts/demo-charts";
import { EmployeesView } from "@/components/os/views/operations-views";
import { getLaborGauge, getPayrollTaxCompliance } from "@/lib/os/data";
import { cn } from "@/lib/utils";

export function PayrollLaborModule() {
  const gauge = getLaborGauge();
  const taxCompliance = getPayrollTaxCompliance();

  return (
    <ModuleBand id="payroll" icon={Users}>
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
                  <Badge variant="muted" className={cn("mt-2 border-transparent", item.status === "Current" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <EmployeesView />
    </ModuleBand>
  );
}
