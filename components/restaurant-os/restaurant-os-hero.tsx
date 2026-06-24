"use client";

import { Cpu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/os/kpi-card";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { RevealLite } from "@/components/marketing/reveal-lite";
import { Eyebrow } from "@/components/marketing/section-heading";
import { getDashboardKpis } from "@/lib/os/data";

export function RestaurantOsHero() {
  const kpis = getDashboardKpis();

  return (
    <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b pb-8 pt-10 sm:pb-10 sm:pt-14">
      <HeroBackdrop />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <RevealLite>
          <Badge variant="muted" className="mb-4 border-cajun-200 bg-cajun-50 text-cajun-700">
            Live Demo — No login required
          </Badge>
          <Eyebrow align="left" icon={Cpu}>
            Restaurant OS
          </Eyebrow>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            The brain behind PJ&apos;s Gumbo
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            Bookkeeping, inventory, payroll, tax compliance, and AI-powered insights
            for our Peachtree Street kitchen — the same system we built to run a
            successful Atlanta ghost kitchen.
          </p>
        </RevealLite>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>
      </div>
    </section>
  );
}
