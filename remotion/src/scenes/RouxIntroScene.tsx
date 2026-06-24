import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { choppyFrame } from "../lib/choppy";
import { ASSETS, MANUS } from "../lib/assets";
import { BRAND } from "../lib/constants";

export function RouxIntroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = choppyFrame(frame);

  const potPhase = f < 70;
  const logoStart = 70;
  const heroFlashEnd = logoStart + 8;

  const potRotate = interpolate(f, [0, 70], [0, 12]);
  const potScale = interpolate(Math.sin(f * 0.2), [-1, 1], [0.95, 1.05]);
  const potOpacity = interpolate(f, [55, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroFlashOpacity = interpolate(
    f,
    [logoStart, logoStart + 3, heroFlashEnd],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const logoProgress = spring({
    frame: f - heroFlashEnd,
    fps,
    config: { damping: 10, stiffness: 160 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [3, 1]);
  const logoOpacity = interpolate(f, [heroFlashEnd, heroFlashEnd + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const videoOpacity = interpolate(f, [10, 40, 60], [0, 0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal }}>
      <AbsoluteFill style={{ opacity: videoOpacity }}>
        <Video
          src={ASSETS.stirVideo}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
        />
      </AbsoluteFill>

      {potPhase && (
        <AbsoluteFill
          className="flex items-center justify-center"
          style={{ opacity: potOpacity }}
        >
          <Img
            src={MANUS.rouxPot}
            style={{
              width: "85%",
              transform: `rotate(${potRotate}deg) scale(${potScale})`,
            }}
          />
        </AbsoluteFill>
      )}

      {!potPhase && heroFlashOpacity > 0 && (
        <AbsoluteFill
          className="flex items-center justify-center"
          style={{ opacity: heroFlashOpacity }}
        >
          <Img
            src={MANUS.heroGraffiti}
            style={{ width: "92%", objectFit: "contain" }}
          />
        </AbsoluteFill>
      )}

      {!potPhase && f >= heroFlashEnd && (
        <AbsoluteFill className="flex items-center justify-center">
          <Img
            src={ASSETS.logo}
            style={{
              width: "55%",
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          />
        </AbsoluteFill>
      )}

      <HalftoneOverlay opacity={0.35} />
    </AbsoluteFill>
  );
}
