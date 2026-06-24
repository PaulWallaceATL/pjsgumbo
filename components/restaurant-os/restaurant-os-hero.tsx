"use client";

import { Cpu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/os/kpi-card";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { Eyebrow } from "@/components/marketing/section-heading";
import { getDemoKpis } from "@/lib/restaurant-os/data";

export function RestaurantOsHero() {
  const kpis = getDemoKpis();

  return (
    <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b pb-10 pt-12 sm:pb-12 sm:pt-16">
      <HeroBackdrop />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Badge variant="muted" className="mb-4 border-cajun-200 bg-cajun-50 text-cajun-700">
            Live Demo — No login required
          </Badge>
          <Eyebrow align="left" icon={Cpu}>
            Restaurant OS
          </Eyebrow>
          <AnimatedHeading
            as="h1"
            text="The brain behind PJ's Gumbo"
            className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
          />
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            Bookkeeping, inventory, payroll, tax compliance, and AI-powered insights
            for our Peachtree Street kitchen — the same system we built to run a
            successful Atlanta ghost kitchen.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={0.08 * (i + 1)}>
              <KpiCard kpi={kpi} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
