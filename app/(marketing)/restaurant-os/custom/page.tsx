import type { Metadata } from "next";
import { Suspense } from "react";

import { CustomDashboardShell } from "@/components/restaurant-os/custom-dashboard-shell";

export const metadata: Metadata = {
  title: "Your Dashboard — Restaurant OS",
  description:
    "Build and edit a custom Restaurant OS dashboard with your own sales, labor, and menu data.",
};

function CustomDashboardFallback() {
  return (
    <div className="container-px mx-auto max-w-7xl py-16">
      <div className="bg-muted h-96 animate-pulse rounded-2xl" />
    </div>
  );
}

export default function CustomDashboardPage() {
  return (
    <Suspense fallback={<CustomDashboardFallback />}>
      <CustomDashboardShell />
    </Suspense>
  );
}
