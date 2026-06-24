import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { choppyFrame } from "../lib/choppy";
import { BRAND } from "../lib/constants";

type FlyingWidgetProps = {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  className?: string;
};

export function FlyingWidget({
  children,
  delay = 0,
  index = 0,
  className = "",
}: FlyingWidgetProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame - delay - index * 4);

  const progress = spring({
    frame: f,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const scale = interpolate(progress, [0, 1], [0.25, 1.35]);
  const translateY = interpolate(progress, [0, 1], [400, -40]);
  const rotate = interpolate(progress, [0, 1], [-8 + index * 3, 2 - index]);
  const opacity = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      className={`rounded-xl border-2 font-body ${className}`}
      style={{
        borderColor: BRAND.cajun,
        backgroundColor: BRAND.charcoal,
        color: BRAND.cream,
        boxShadow: `6px 6px 0 ${BRAND.cajun}`,
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}
