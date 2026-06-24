import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { choppyFrame } from "../lib/choppy";
import { MANUS } from "../lib/assets";

type HalftoneOverlayProps = {
  opacity?: number;
  pulse?: boolean;
};

export function HalftoneOverlay({ opacity = 0.45, pulse = true }: HalftoneOverlayProps) {
  const frame = useCurrentFrame();
  const f = choppyFrame(frame);
  const pulseOpacity = pulse
    ? interpolate(Math.sin(f * 0.15), [-1, 1], [opacity * 0.7, opacity])
    : opacity;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: pulseOpacity,
      }}
    >
      <Img
        src={MANUS.halftone}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <AbsoluteFill className="halftone-dots" style={{ opacity: 0.25 }} />
    </AbsoluteFill>
  );
}
