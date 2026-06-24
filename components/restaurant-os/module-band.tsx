"use client";

import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { BrandWaves } from "@/components/marketing/brand-waves";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Eyebrow } from "@/components/marketing/section-heading";
import { BrandIcon } from "@/components/marketing/brand-icon";
import { Card, CardContent } from "@/components/ui/card";
import { MODULE_META, type ModuleTone } from "@/lib/restaurant-os/data";
import { cn } from "@/lib/utils";

const TONE_STYLES: Record<
  ModuleTone,
  { section: string; text?: string; muted?: string; card?: string }
> = {
  cream: {
    section: "from-cream-100 via-cream-50/80 to-background relative overflow-hidden bg-gradient-to-b",
  },
  light: {
    section: "bg-background border-y",
  },
  muted: {
    section: "bg-muted/40 border-y border-muted",
  },
  dark: {
    section: "bg-charcoal-900 text-cream-100 relative overflow-hidden",
    text: "text-cream-50",
    muted: "text-cream-200/70",
    card: "bg-charcoal-800/80 border-cream-100/10 text-cream-50",
  },
  roux: {
    section: "bg-roux-800 text-cream-100 relative overflow-hidden",
    text: "text-cream-50",
    muted: "text-cream-200/75",
    card: "bg-roux-900/60 border-cream-100/10 text-cream-50",
  },
};

export function ModuleBand({
  id,
  icon,
  children,
}: {
  id: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  const meta = MODULE_META.find((m) => m.id === id)!;
  const tone = TONE_STYLES[meta.tone];
  const isDark = meta.tone === "dark" || meta.tone === "roux";

  return (
    <section id={id} className={cn("scroll-mt-36 py-16 sm:py-20", tone.section)}>
      {meta.tone === "cream" ? <HeroBackdrop opacity={0.14} /> : null}
      {meta.tone === "dark" ? <BrandWaves opacity={0.45} speed={0.55} /> : null}
      {meta.tone === "roux" ? (
        <BrandWaves
          opacity={0.35}
          speed={0.45}
          className="opacity-90"
        />
      ) : null}

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className={cn("max-w-2xl", isDark && tone.text)}>
              <Eyebrow align="left" icon={icon} className={isDark ? "text-cajun-300" : undefined}>
                {meta.eyebrow}
              </Eyebrow>
              <AnimatedHeading
                as="h2"
                text={meta.title}
                className={cn(
                  "font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
                  isDark && "text-cream-50",
                )}
              />
              <p className={cn("mt-4 leading-relaxed", isDark ? tone.muted : "text-muted-foreground")}>
                {meta.description}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm leading-relaxed",
                  isDark ? "text-cream-200/60" : "text-muted-foreground/80",
                )}
              >
                {meta.narrative}
              </p>

              {meta.highlights?.length ? (
                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {meta.highlights.map((h, i) => (
                    <Reveal key={h.label} delay={0.08 * (i + 1)}>
                      <div
                        className={cn(
                          "rounded-xl border px-4 py-3",
                          isDark
                            ? "border-cream-100/10 bg-cream-100/5"
                            : "bg-card/80 backdrop-blur-sm",
                        )}
                      >
                        <p className={cn("text-xs uppercase tracking-wide", isDark ? tone.muted : "text-muted-foreground")}>
                          {h.label}
                        </p>
                        <p className={cn("font-display mt-0.5 text-lg font-bold tabular-nums", isDark && tone.text)}>
                          {h.value}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>

            <BrandIcon icon={icon} size="lg" variant={isDark ? "soft" : "solid"} className="hidden shrink-0 sm:inline-flex" />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 space-y-6 [&_[data-slot=card]]:shadow-sm">
          <div
            className={cn(
              isDark &&
                "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-charcoal-800/90 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100 [&_.rounded-xl.border]:border-cream-100/10",
              meta.tone === "roux" &&
                "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-roux-900/70 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100 [&_.rounded-xl.border]:border-cream-100/10",
            )}
          >
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Compact stat strip for use inside module content areas */
export function ModuleStatStrip({
  stats,
  className,
}: {
  stats: { label: string; value: string; hint?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={0.05 * i}>
          <Card className="border-dashed">
            <CardContent className="py-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">{s.label}</p>
              <p className="font-display mt-1 text-xl font-bold tabular-nums">{s.value}</p>
              {s.hint ? <p className="text-muted-foreground mt-0.5 text-xs">{s.hint}</p> : null}
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
