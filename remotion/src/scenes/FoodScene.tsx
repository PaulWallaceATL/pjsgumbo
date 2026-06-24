import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TAGLINE } from "../lib/demo-data";
import { ComicText } from "../components/ComicText";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { ASSETS } from "../lib/assets";
import { BRAND } from "../lib/constants";
import { choppyFrame } from "../lib/choppy";

export function FoodScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame);

  const zoom = spring({
    frame: f,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const scale = interpolate(zoom, [0, 1], [1.3, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          filter: "saturate(1.4) contrast(1.2)",
        }}
      >
        <Img
          src={ASSETS.signatureGumbo}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        className="flex items-end justify-center pb-32"
        style={{
          background: "linear-gradient(transparent 40%, rgba(26,23,20,0.85) 100%)",
        }}
      >
        <ComicText
          text={TAGLINE.toUpperCase()}
          delay={10}
          fontSize={56}
          color={BRAND.gold}
        />
      </AbsoluteFill>

      <HalftoneOverlay opacity={0.5} />
    </AbsoluteFill>
  );
}
