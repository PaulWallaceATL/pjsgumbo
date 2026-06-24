import React from "react";
import { Composition } from "remotion";
import { DURATION_FRAMES, FPS, HEIGHT, WIDTH } from "./lib/constants";
import { PjsIntro } from "./PjsIntro";

export function RemotionRoot() {
  return (
    <Composition
      id="PjsIntro"
      component={PjsIntro}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
}
