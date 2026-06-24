import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { ComicText } from "../components/ComicText";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { ASSETS } from "../lib/assets";
import { BRAND } from "../lib/constants";
import { choppyFrame } from "../lib/choppy";

export function FinaleScene() {
  const frame = useCurrentFrame();
  const f = choppyFrame(frame);

  const flashOn = Math.floor(f / 6) % 2 === 0;
  const ctaPulse = interpolate(Math.sin(f * 0.25), [-1, 1], [0.92, 1.08]);
  const logoScale = interpolate(f, [0, 20], [0.6, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: BRAND.charcoal }}
    >
      <Img
        src={ASSETS.logo}
        style={{
          width: "50%",
          transform: `scale(${logoScale})`,
        }}
      />

      <div style={{ opacity: flashOn ? 1 : 0.35 }}>
        <ComicText
          text="RESTAURANT OS"
          delay={8}
          shake={false}
          fontSize={52}
          color={BRAND.cajunLight}
        />
      </div>

      <div
        className="font-display rounded-full px-10 py-4 text-2xl font-black uppercase tracking-wide"
        style={{
          backgroundColor: BRAND.cajun,
          color: BRAND.cream,
          transform: `scale(${ctaPulse})`,
          boxShadow: `6px 6px 0 ${BRAND.gold}`,
          border: `3px solid ${BRAND.charcoal}`,
        }}
      >
        Launch Live
      </div>

      <HalftoneOverlay opacity={0.25} pulse={false} />
    </AbsoluteFill>
  );
}
