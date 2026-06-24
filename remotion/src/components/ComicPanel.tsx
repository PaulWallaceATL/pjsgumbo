import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { choppyFrame } from "../lib/choppy";
import { BRAND } from "../lib/constants";

type ComicPanelProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right" | "bottom";
  width?: number | string;
  height?: number | string;
};

export function ComicPanel({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  width = "100%",
  height = "100%",
}: ComicPanelProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame - delay);

  const progress = spring({
    frame: f,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const translateX =
    from === "left"
      ? interpolate(progress, [0, 1], [-120, 0])
      : from === "right"
        ? interpolate(progress, [0, 1], [120, 0])
        : 0;
  const translateY =
    from === "bottom" ? interpolate(progress, [0, 1], [80, 0]) : 0;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        width,
        height,
        border: `5px solid ${BRAND.charcoal}`,
        boxShadow: `8px 8px 0 ${BRAND.charcoal}`,
        backgroundColor: BRAND.cream,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}
