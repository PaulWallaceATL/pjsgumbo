"use client";

import { Wallet } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { CashFlowView } from "@/components/os/views/finance-views";

export function CashFlowModule() {
  return (
    <ModuleBand id="cashflow" icon={Wallet}>
      <CashFlowView />
    </ModuleBand>
  );
}
