import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { choppyFrame, comicShake } from "../lib/choppy";
import { BRAND } from "../lib/constants";

type ComicTextProps = {
  text: string;
  className?: string;
  delay?: number;
  shake?: boolean;
  color?: string;
  strokeColor?: string;
  fontSize?: number;
};

export function ComicText({
  text,
  className = "",
  delay = 0,
  shake = true,
  color = BRAND.cream,
  strokeColor = BRAND.charcoal,
  fontSize = 72,
}: ComicTextProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame - delay);

  const scale = spring({
    frame: f,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  const pop = interpolate(scale, [0, 1], [2.2, 1], { extrapolateRight: "clamp" });
  const shakeX = shake ? comicShake(f + delay, 5, 0.9) : 0;

  return (
    <div
      className={`font-display text-center font-black uppercase tracking-tight ${className}`}
      style={{
        color,
        fontSize,
        lineHeight: 1.05,
        transform: `scale(${pop}) translateX(${shakeX}px)`,
        WebkitTextStroke: `3px ${strokeColor}`,
        paintOrder: "stroke fill",
        textShadow: `4px 4px 0 ${strokeColor}`,
      }}
    >
      {text}
    </div>
  );
}
