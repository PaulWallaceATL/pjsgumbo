import { staticFile } from "remotion";

export const ASSETS = {
  logo: staticFile("brand/pjs-logo.png"),
  signatureGumbo: staticFile("menu/pjs-signature-gumbo.png"),
  stirVideo: staticFile("gallery/closeup-stir.mp4"),
  foundersFull: staticFile("assets/founders-full.png"),
  heroGraffiti: staticFile("assets/hero-graffiti.png"),
  atlantaCity: staticFile("assets/atlanta-city-graffiti.png"),
  rouxPot: staticFile("assets/roux-pot-silhouette.svg"),
  halftone: staticFile("assets/halftone-texture.svg"),
  speedLines: staticFile("assets/speed-lines.svg"),
  founderPaul: staticFile("assets/founder-paul-silhouette.svg"),
  founderJonathan: staticFile("assets/founder-jonathan-silhouette.svg"),
} as const;

export const MANUS = {
  rouxPot: ASSETS.rouxPot,
  halftone: ASSETS.halftone,
  speedLines: ASSETS.speedLines,
  founderPaul: ASSETS.founderPaul,
  founderJonathan: ASSETS.founderJonathan,
  foundersFull: ASSETS.foundersFull,
  heroGraffiti: ASSETS.heroGraffiti,
  atlantaCity: ASSETS.atlantaCity,
} as const;
