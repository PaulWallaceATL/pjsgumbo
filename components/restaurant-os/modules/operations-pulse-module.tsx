"use client";

import { LayoutDashboard } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { OperationsPulseView } from "@/components/os/views/marketing-views";

export function OperationsPulseModule() {
  return (
    <ModuleBand id="operations" icon={LayoutDashboard}>
      <OperationsPulseView />
    </ModuleBand>
  );
}
