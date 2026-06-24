"use client";

import { TrendingUp } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { BudgetingView } from "@/components/os/views/finance-views";

export function BudgetingModule() {
  return (
    <ModuleBand id="budgeting" icon={TrendingUp}>
      <BudgetingView />
    </ModuleBand>
  );
}
