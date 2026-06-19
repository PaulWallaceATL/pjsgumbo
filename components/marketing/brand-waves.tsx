"use client";

import SilkWaves from "@/components/react-bits/silk-waves";
import { cn } from "@/lib/utils";

/**
 * Ambient, brand-tinted animated backdrop (React Bits SilkWaves) for dark
 * sections. Renders absolutely positioned behind content — the parent must be
 * `relative overflow-hidden` and content should sit at z-10.
 */
export function BrandWaves({
  className,
  opacity = 0.5,
  speed = 0.7,
}: {
  className?: string;
  opacity?: number;
  speed?: number;
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
        speed={speed}
        scale={2.4}
        distortion={1.15}
        curve={1.1}
        contrast={1.15}
        brightness={1}
        frequency={1}
        opacity={opacity}
        colors={[
          "#271812",
          "#38231a",
          "#4b2e1e",
          "#71191f",
          "#8c1f25",
          "#a4262c",
          "#9c6a3c",
          "#ddc48b",
        ]}
      />
    </div>
  );
}
