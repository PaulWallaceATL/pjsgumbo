"use client";

import { BarChart3 } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { FinancialReportsView } from "@/components/os/views/finance-views";

export function FinancialReportingModule() {
  return (
    <ModuleBand id="financial" icon={BarChart3}>
      <FinancialReportsView />
    </ModuleBand>
  );
}
