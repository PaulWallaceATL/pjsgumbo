"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/marketing/section-heading";
import { useDemoShell } from "@/components/restaurant-os/demo-context";
import { MODULE_META, type ModuleTone } from "@/lib/restaurant-os/data";
import { cn } from "@/lib/utils";

const TONE_STYLES: Record<
  ModuleTone,
  { section: string; text?: string; muted?: string }
> = {
  cream: {
    section: "from-cream-100/80 via-cream-50/50 to-background bg-gradient-to-b",
  },
  light: {
    section: "bg-background",
  },
  muted: {
    section: "bg-muted/30",
  },
  dark: {
    section: "from-charcoal-900 to-charcoal-800 bg-gradient-to-b text-cream-100",
    text: "text-cream-50",
    muted: "text-cream-200/70",
  },
  roux: {
    section: "from-roux-800 to-roux-900 bg-gradient-to-b text-cream-100",
    text: "text-cream-50",
    muted: "text-cream-200/75",
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
  const { presentation } = useDemoShell();
  const primaryHighlight = meta.highlights?.[0];

  return (
    <section
      id={id}
      className={cn(
        "h-full",
        tone.section,
        presentation && "text-base",
      )}
    >
      <div className={cn("space-y-6 p-4 sm:p-6", presentation && "sm:p-8")}>
        <header className="space-y-4 border-b pb-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className={cn("min-w-0 flex-1", isDark && tone.text)}>
              <Eyebrow align="left" icon={icon} className={isDark ? "text-cajun-300" : undefined}>
                {meta.eyebrow}
              </Eyebrow>
              <h2
                className={cn(
                  "font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
                  isDark && "text-cream-50",
                  presentation && "sm:text-4xl",
                )}
              >
                {meta.title}
              </h2>
              {!presentation ? (
                <p className={cn("mt-2 max-w-2xl text-sm leading-relaxed sm:text-base", isDark ? tone.muted : "text-muted-foreground")}>
                  {meta.description}
                </p>
              ) : null}
            </div>
            <Link
              href={meta.osHref}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                isDark
                  ? "border-cream-100/20 hover:bg-cream-100/10"
                  : "hover:bg-accent",
              )}
            >
              Open in OS
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div
            className={cn(
              "flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 text-sm",
              isDark ? "border-cream-100/10 bg-cream-100/5" : "bg-background/80",
            )}
          >
            <p className={cn("flex-1 leading-relaxed", isDark ? tone.muted : "text-muted-foreground")}>
              {meta.narrative}
            </p>
            {primaryHighlight ? (
              <div className={cn("shrink-0 text-right", isDark && tone.text)}>
                <p className={cn("text-xs uppercase tracking-wide", isDark ? tone.muted : "text-muted-foreground")}>
                  {primaryHighlight.label}
                </p>
                <p className="font-display text-lg font-bold tabular-nums">{primaryHighlight.value}</p>
              </div>
            ) : null}
          </div>

          {meta.highlights?.length ? (
            <div className="grid gap-2 sm:grid-cols-3">
              {meta.highlights.map((h) => (
                <div
                  key={h.label}
                  className={cn(
                    "rounded-lg border px-3 py-2.5",
                    isDark ? "border-cream-100/10 bg-cream-100/5" : "bg-background/90",
                  )}
                >
                  <p className={cn("text-xs uppercase tracking-wide", isDark ? tone.muted : "text-muted-foreground")}>
                    {h.label}
                  </p>
                  <p className={cn("font-display mt-0.5 text-base font-bold tabular-nums sm:text-lg", isDark && tone.text)}>
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className={cn(
            "space-y-6 [&_[data-slot=card]]:shadow-sm",
            isDark &&
              "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-charcoal-800/90 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100",
            meta.tone === "roux" &&
              "[&_[data-slot=card]]:border-cream-100/10 [&_[data-slot=card]]:bg-roux-900/70 [&_[data-slot=card-title]]:text-cream-50 [&_.text-muted-foreground]:text-cream-200/65 [&_th]:text-cream-200/80 [&_td]:text-cream-100",
            presentation && "[&_[data-slot=card-content]]:p-6 [&_.recharts-responsive-container]:min-h-[320px]",
          )}
        >
          {children}
        </div>
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
