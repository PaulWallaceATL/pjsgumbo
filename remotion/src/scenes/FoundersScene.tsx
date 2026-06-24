import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ComicPanel } from "../components/ComicPanel";
import { ComicText } from "../components/ComicText";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { choppyFrame } from "../lib/choppy";
import { MANUS } from "../lib/assets";
import { BRAND } from "../lib/constants";

export function FoundersScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame);

  const panelProgress = spring({
    frame: f,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const scale = interpolate(panelProgress, [0, 1], [1.15, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal }}>
      <AbsoluteFill className="flex flex-col items-center justify-center gap-6 px-8">
        <ComicPanel from="bottom" delay={0} width="100%" height={520}>
          <div
            className="flex h-full items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#271812" }}
          >
            <Img
              src={MANUS.foundersFull}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </ComicPanel>

        <ComicText
          text="THE ROUX MASTERS"
          delay={14}
          fontSize={64}
          color={BRAND.gold}
        />
      </AbsoluteFill>
      <HalftoneOverlay opacity={0.4} />
    </AbsoluteFill>
  );
}
