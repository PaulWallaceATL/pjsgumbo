import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SCENE } from "./lib/constants";
import { FoundersScene } from "./scenes/FoundersScene";
import { FinaleScene } from "./scenes/FinaleScene";
import { FoodScene } from "./scenes/FoodScene";
import { OsRevealScene } from "./scenes/OsRevealScene";
import { RouxIntroScene } from "./scenes/RouxIntroScene";
import "./style.css";

/*
 * Beat markers for future audio sync (30s @ ~170 BPM):
 * 0.0s  — roux pot hit
 * 5.0s  — founders slam
 * 10.0s — OS widgets burst
 * 18.0s — food reveal
 * 24.0s — finale logo lock
 *
 * When ready, add:
 * import { Audio, staticFile } from "remotion";
 * <Audio src={staticFile("audio/pjs-intro.mp3")} />
 */

export function PjsIntro() {
  return (
    <AbsoluteFill className="font-body">
      <Series>
        <Series.Sequence durationInFrames={SCENE.roux.duration}>
          <RouxIntroScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE.founders.duration}>
          <FoundersScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE.osReveal.duration}>
          <OsRevealScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE.food.duration}>
          <FoodScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE.finale.duration}>
          <FinaleScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
