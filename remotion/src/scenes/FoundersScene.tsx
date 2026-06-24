import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { ComicPanel } from "../components/ComicPanel";
import { ComicText } from "../components/ComicText";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { MANUS } from "../lib/assets";
import { BRAND } from "../lib/constants";

export function FoundersScene() {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal }}>
      <AbsoluteFill className="flex flex-col items-center justify-center gap-6 px-8">
        <div className="flex w-full gap-4" style={{ height: 520 }}>
          <ComicPanel from="left" delay={0} width="50%" height="100%">
            <div
              className="flex h-full items-end justify-center"
              style={{ backgroundColor: "#271812" }}
            >
              <Img
                src={MANUS.founderPaul}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </ComicPanel>
          <ComicPanel from="right" delay={6} width="50%" height="100%">
            <div
              className="flex h-full items-end justify-center"
              style={{ backgroundColor: "#271812" }}
            >
              <Img
                src={MANUS.founderJonathan}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </ComicPanel>
        </div>

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
