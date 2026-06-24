"use client";

import { Sparkles } from "lucide-react";

import { InsightsChat } from "@/components/os/insights-chat";
import { ModuleBand } from "@/components/restaurant-os/module-band";

export function BusinessAdviceModule() {
  return (
    <ModuleBand id="advice" icon={Sparkles} compactHeader>
      <InsightsChat surface="dark" />
    </ModuleBand>
  );
}
