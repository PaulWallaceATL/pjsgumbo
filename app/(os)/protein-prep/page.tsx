import type { Metadata } from "next";

import { OsPageShell } from "@/components/os/os-page-shell";
import { ProteinPrepView } from "@/components/os/views/production-views";
import { getProteinPrepChecklist } from "@/lib/os/data";

export const metadata: Metadata = { title: "Protein Prep" };

export default function Page() {
  const checklist = getProteinPrepChecklist();
  const complete = checklist.filter((t) => t.status === "Complete").length;

  return (
    <OsPageShell
      title="Protein Prep"
      description="Chicken, andouille, shrimp, crab, and holy trinity prep assignments."
      stats={[
        { label: "Tasks", value: checklist.length.toString() },
        { label: "Complete", value: complete.toString() },
        { label: "In progress", value: checklist.filter((t) => t.status === "In Progress").length.toString() },
        { label: "Scheduled", value: checklist.filter((t) => t.status === "Scheduled").length.toString() },
      ]}
    >
      <ProteinPrepView />
    </OsPageShell>
  );
}
