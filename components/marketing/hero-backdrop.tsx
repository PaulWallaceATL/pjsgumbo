"use client";

import SilkWaves from "@/components/react-bits/silk-waves";
import { cn } from "@/lib/utils";

/**
 * Ambient, on-brand animated backdrop for light hero sections (React Bits
 * SilkWaves shader, retuned to a warm cream→gold→cajun palette at low opacity).
 * A soft radial mask keeps foreground content readable.
 *
 * The parent section must be `relative overflow-hidden` and foreground content
 * should sit at `z-10`.
 */
export function HeroBackdrop({
  className,
  opacity = 0.22,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <SilkWaves
        className="h-full w-full"
        speed={0.35}
        scale={2.8}
        distortion={1.25}
        curve={1}
        contrast={0.9}
        brightness={1.05}
        frequency={0.9}
        opacity={opacity}
        colors={[
          "#fdfbf6",
          "#f9f3e7",
          "#f3e8cf",
          "#ead9b2",
          "#ddc48b",
          "#e0a83a",
          "#cf4f47",
          "#a4262c",
        ]}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_0%,color-mix(in_srgb,var(--background)_55%,transparent)_64%,var(--background)_100%)]" />
    </div>
  );
}
