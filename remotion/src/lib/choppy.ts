/** Snap frame to hold steps for 12fps choppy anime motion at 24fps output. */
export function choppyFrame(frame: number, holdFrames = 2): number {
  return Math.floor(frame / holdFrames) * holdFrames;
}

/** Horizontal shake offset for kinetic typography. */
export function comicShake(frame: number, amplitude = 6, speed = 0.8): number {
  const f = choppyFrame(frame);
  return Math.sin(f * speed) * amplitude;
}
