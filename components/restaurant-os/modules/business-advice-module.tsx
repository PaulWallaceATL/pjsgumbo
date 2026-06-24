"use client";

import { Sparkles } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { InsightsView } from "@/components/os/views/finance-views";

export function BusinessAdviceModule() {
  return (
    <ModuleBand id="advice" icon={Sparkles}>
      <InsightsView />
    </ModuleBand>
  );
}
