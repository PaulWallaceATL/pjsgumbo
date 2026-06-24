import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { DailyPrepView } from "@/components/os/views/production-views";
import { getDailyPrepQueue } from "@/lib/os/data";

export const metadata: Metadata = { title: "Daily Prep" };

export default function Page() {
  const queue = getDailyPrepQueue();
  const today = queue.filter((t) => t.due.startsWith("Today")).length;

  return (
    <OsPageShell
      title="Daily Prep"
      description="Roux batches, protein prep, and sides queued for today and tomorrow."
      stats={[
        { label: "Prep tasks", value: queue.length.toString() },
        { label: "Due today", value: today.toString() },
        { label: "Complete", value: queue.filter((t) => t.status === "Complete").length.toString() },
        { label: "In progress", value: queue.filter((t) => t.status === "In Progress").length.toString() },
      ]}
    >
      <DailyPrepView />
    </OsPageShell>
  );
}
