export const FPS = 24;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_FRAMES = 720; // 30s @ 24fps

/** Scene frame ranges (local frame 0 within each scene) */
export const SCENE = {
  roux: { start: 0, duration: 120 },
  founders: { start: 120, duration: 120 },
  osReveal: { start: 240, duration: 192 },
  food: { start: 432, duration: 144 },
  finale: { start: 576, duration: 144 },
} as const;

export const BRAND = {
  charcoal: "#1a1714",
  cajun: "#a4262c",
  cajunLight: "#cf4f47",
  cream: "#f9f3e7",
  gold: "#e0a83a",
  creamGold: "#ddc48b",
  roux: "#74471f",
} as const;
