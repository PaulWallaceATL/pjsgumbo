import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/os/kpi-card";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { getDemoKpis } from "@/lib/restaurant-os/data";

export function RestaurantOsHero() {
  const kpis = getDemoKpis();

  return (
    <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b pb-8 pt-10">
      <HeroBackdrop />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <Badge variant="muted" className="mb-4 border-cajun-200 bg-cajun-50 text-cajun-700">
          Live Demo — No login required
        </Badge>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          PJ&apos;s Restaurant OS
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
          The brain behind PJ&apos;s Gumbo — bookkeeping, inventory, payroll, tax
          compliance, and AI-powered insights for our Peachtree Street kitchen.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>
      </div>
    </section>
  );
}
