"use client";

import dynamic from "next/dynamic";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { RevealLite } from "@/components/marketing/reveal-lite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoShell } from "@/components/restaurant-os/demo-context";
import { MODULE_META, type ModuleTone } from "@/lib/restaurant-os/data";
import { cn } from "@/lib/utils";

const AdviceBlob = dynamic(
  () => import("@/components/react-bits/ai-blob").then((m) => m.AIBlob),
  { ssr: false },
);

const TONE_STYLES: Record<
  ModuleTone,
  { section: string; text?: string; muted?: string; header?: string }
> = {
  cream: {
    section: "from-cream-100/90 via-cream-50/40 to-background bg-gradient-to-br",
    header: "border-cream-200/80 bg-cream-50/50",
  },
  light: {
    section: "bg-background",
    header: "border-border/80 bg-muted/20",
  },
  muted: {
    section: "from-muted/40 to-background bg-gradient-to-br",
    header: "border-border/80 bg-background/70",
  },
  dark: {
    section: "from-charcoal-900 via-charcoal-900 to-charcoal-950 bg-gradient-to-br text-cream-100",
    text: "text-cream-50",
    muted: "text-cream-200/70",
    header: "border-cream-100/10 bg-cream-100/5",
  },
  roux: {
    section: "from-roux-900 via-roux-950 to-charcoal-950 bg-gradient-to-br text-cream-100",
    text: "text-cream-50",
    muted: "text-cream-200/75",
    header: "border-cream-100/10 bg-cream-100/5",
  },
};

export function ModuleBand({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  const meta = MODULE_META.find((m) => m.id === id)!;
  const tone = TONE_STYLES[meta.tone];
  const isDark = meta.tone === "dark" || meta.tone === "roux";
  const { presentation } = useDemoShell();

  return (
    <section id={id} className={cn("h-full", tone.section, presentation && "text-base")}>
      <div className={cn("space-y-5 p-4 sm:p-6", presentation && "sm:p-8")}>
        <RevealLite>
          <header
            className={cn(
              "relative overflow-hidden rounded-2xl border p-4 sm:p-5",
              tone.header,
            )}
          >
            {id === "advice" ? (
              <div
                aria-hidden
                className="pointer-events-none absolute -top-8 -right-8 opacity-40 mix-blend-screen"
              >
                <AdviceBlob size={180} animationSpeed={0.6} resolution={0.4} glowIntensity={0.7} />
              </div>
            ) : null}

            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <div className={cn("min-w-0 flex-1", isDark && tone.text)}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant={isDark ? "outline" : "secondary"}
                    className={cn(
                      "gap-1 font-normal",
                      isDark && "border-cream-100/20 text-cajun-200",
                    )}
                  >
                    <Icon className="size-3" />
                    {meta.eyebrow}
                  </Badge>
                </div>
                <h2
                  className={cn(
                    "font-display text-xl font-bold tracking-tight sm:text-2xl",
                    isDark && "text-cream-50",
                    presentation && "sm:text-3xl",
                  )}
                >
                  {meta.title}
                </h2>
                {!presentation ? (
                  <p
                    className={cn(
                      "mt-1.5 max-w-2xl text-sm leading-relaxed",
                      isDark ? tone.muted : "text-muted-foreground",
                    )}
                  >
                    {meta.description}
                  </p>
                ) : null}
              </div>
              <Button
                asChild
                variant={isDark ? "outline" : "secondary"}
                size="sm"
                className={cn("shrink-0 gap-1", isDark && "border-cream-100/20 hover:bg-cream-100/10")}
              >
                <Link href={meta.osHref}>
                  Open in OS
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            {meta.highlights?.length ? (
              <div className="relative mt-4 grid gap-2 sm:grid-cols-3">
                {meta.highlights.map((h) => (
                  <div
                    key={h.label}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 backdrop-blur-sm",
                      isDark ? "border-cream-100/10 bg-charcoal-800/40" : "bg-background/80",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] font-medium tracking-wide uppercase",
                        isDark ? tone.muted : "text-muted-foreground",
                      )}
                    >
                      {h.label}
                    </p>
                    <p
                      className={cn(
                        "font-display mt-0.5 text-lg font-bold tabular-nums",
                        isDark && tone.text,
                      )}
                    >
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <p
              className={cn(
                "relative mt-4 border-t pt-3 text-sm leading-relaxed",
                isDark ? tone.muted : "text-muted-foreground",
              )}
            >
              {meta.narrative}
            </p>
          </header>
        </RevealLite>

        <RevealLite delayMs={80}>
          <div
            className={cn(
              "space-y-5 [&_[data-slot=card]]:shadow-sm",
              isDark &&
                "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-charcoal-800/90 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100",
              meta.tone === "roux" &&
                "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-roux-900/70 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100",
              presentation && "[&_[data-slot=card-content]]:p-6 [&_.recharts-responsive-container]:min-h-[320px]",
            )}
          >
            {children}
          </div>
        </RevealLite>
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
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-dashed px-4 py-3">
          <p className="text-muted-foreground text-xs uppercase tracking-wide">{s.label}</p>
          <p className="font-display mt-1 text-xl font-bold tabular-nums">{s.value}</p>
          {s.hint ? <p className="text-muted-foreground mt-0.5 text-xs">{s.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}
