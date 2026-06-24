"use client";

import { Receipt } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { TaxComplianceView } from "@/components/os/views/finance-views";

export function TaxComplianceModule() {
  return (
    <ModuleBand id="tax" icon={Receipt}>
      <TaxComplianceView />
    </ModuleBand>
  );
}
