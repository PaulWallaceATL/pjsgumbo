import { Cpu, LineChart, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { BrandIcon } from "@/components/marketing/brand-icon";
import { Card, CardContent } from "@/components/ui/card";

const PILLARS = [
  {
    icon: LineChart,
    title: "See everything",
    description:
      "Sales, costs, labor, and cash — one live dashboard built for a ghost kitchen running 146 orders a day.",
  },
  {
    icon: ShieldCheck,
    title: "Stay compliant",
    description:
      "Atlanta sales tax, payroll deposits, and filing deadlines tracked so you never miss a due date.",
  },
  {
    icon: Cpu,
    title: "Decide smarter",
    description:
      "Menu engineering and expansion models powered by your actual gumbo mix — Signature, Blue Crab, and all.",
  },
];

export function DemoIntro() {
  return (
    <section className="border-b bg-background py-14 sm:py-16">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Platform Overview"
          title="Eight modules. One operating system."
          description="Scroll through a live demo of the software that runs PJ's Gumbo — from the first ticket of the day to the forecast for a second Atlanta location."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 * i}>
              <Card className="h-full border-dashed transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <BrandIcon icon={p.icon} size="sm" className="mb-4" />
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
