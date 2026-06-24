import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { ProductionScheduleView } from "@/components/os/views/production-views";
import { getProductionSchedule } from "@/lib/os/data";

export const metadata: Metadata = { title: "Production Schedule" };

export default function Page() {
  const schedule = getProductionSchedule();
  const totalGallons = schedule.reduce((s, d) => s + d.gallons, 0);
  const weekend = schedule.filter((d) => d.day === "Sat" || d.day === "Sun").reduce((s, d) => s + d.gallons, 0);

  return (
    <OsPageShell
      title="Production Schedule"
      description="Weekly gumbo batch plan — Signature, Chicken & Sausage, and weekend Blue Crab runs."
      stats={[
        { label: "Weekly gallons", value: totalGallons.toString() },
        { label: "Weekend gallons", value: weekend.toString() },
        { label: "Peak day", value: schedule.reduce((best, d) => (d.gallons > best.gallons ? d : best)).day },
        { label: "Lead cook", value: "Keisha R." },
      ]}
    >
      <ProductionScheduleView />
    </OsPageShell>
  );
}
