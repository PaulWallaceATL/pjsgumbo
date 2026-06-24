"use client";

import { BookOpen } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { BookkeepingView } from "@/components/os/views/finance-views";

export function BookkeepingModule() {
  return (
    <ModuleBand id="bookkeeping" icon={BookOpen}>
      <BookkeepingView />
    </ModuleBand>
  );
}
