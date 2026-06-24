"use client";

import { ChefHat } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { ProductionModuleView } from "@/components/os/views/marketing-views";

export function ProductionPrepModule() {
  return (
    <ModuleBand id="production" icon={ChefHat}>
      <ProductionModuleView />
    </ModuleBand>
  );
}
