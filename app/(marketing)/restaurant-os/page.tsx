import type { Metadata } from "next";
import { Soup } from "lucide-react";

import { RestaurantOsHero } from "@/components/restaurant-os/restaurant-os-hero";
import { DemoIntro } from "@/components/restaurant-os/demo-intro";
import { DemoShell } from "@/components/restaurant-os/demo-shell";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Restaurant OS — Live Demo",
  description:
    "Explore PJ's Restaurant OS — bookkeeping, production, orders, inventory, payroll, tax compliance, forecasting, and AI insights for PJ's Gumbo in Atlanta.",
};

export default function RestaurantOsPage() {
  return (
    <>
      <RestaurantOsHero />
      <DemoIntro />
      <DemoShell />
      <CtaBand
        eyebrow="Taste the difference"
        title="See the food. Order the gumbo."
        description="Restaurant OS runs the kitchen. Our gumbo runs on three generations of Louisiana recipes — order a bowl and taste why."
        primary={{ href: "/order", label: "Order Gumbo" }}
        secondary={{ href: "/contact", label: "Talk to Us" }}
        icon={Soup}
        staticBackground
      />
    </>
  );
}
