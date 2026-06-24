import { staticFile } from "remotion";

export const ASSETS = {
  logo: staticFile("brand/pjs-logo.png"),
  signatureGumbo: staticFile("menu/pjs-signature-gumbo.png"),
  stirVideo: staticFile("gallery/closeup-stir.mp4"),
  rouxPot: staticFile("assets/roux-pot-silhouette.svg"),
  halftone: staticFile("assets/halftone-texture.svg"),
  speedLines: staticFile("assets/speed-lines.svg"),
  founderPaul: staticFile("assets/founder-paul-silhouette.svg"),
  founderJonathan: staticFile("assets/founder-jonathan-silhouette.svg"),
} as const;

/** Swap `.svg` → `.png` in ASSETS when Manus PNGs are dropped into public/assets/. */
export function pngOrSvg(base: keyof typeof ASSETS, pngName: string): string {
  return staticFile(`assets/${pngName}`);
}

export const MANUS = {
  rouxPot: ASSETS.rouxPot,
  halftone: ASSETS.halftone,
  speedLines: ASSETS.speedLines,
  founderPaul: ASSETS.founderPaul,
  founderJonathan: ASSETS.founderJonathan,
} as const;
