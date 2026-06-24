#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

mkdir -p out remotion/out

cd remotion/public
[[ -L brand ]] || ln -sf ../../public/brand brand
[[ -L menu ]] || ln -sf ../../public/menu menu
[[ -L gallery ]] || ln -sf ../../public/gallery gallery
cd "$ROOT"

cp -f public/graffiti/founders-graffiti-v2.png remotion/public/assets/founders-full.png
cp -f public/graffiti/hero-graffiti-v2.png remotion/public/assets/hero-graffiti.png
cp -f public/graffiti/atlanta-city-graffiti.png remotion/public/assets/atlanta-city-graffiti.png

(cd remotion && npm install)

(cd remotion && npx remotion render src/index.ts PjsIntro --out ../out/pjs-promo.mp4)

# Remotion may write to remotion/out/PjsIntro.mp4 depending on CLI version
if [[ ! -f out/pjs-promo.mp4 ]]; then
  if [[ -f remotion/out/PjsIntro.mp4 ]]; then
    mv -f remotion/out/PjsIntro.mp4 out/pjs-promo.mp4
  elif [[ -f out/PjsIntro.mp4 ]]; then
    mv -f out/PjsIntro.mp4 out/pjs-promo.mp4
  fi
fi

if [[ ! -f out/pjs-promo.mp4 ]]; then
  echo "Error: render finished but out/pjs-promo.mp4 was not created" >&2
  exit 1
fi

ls -lh out/pjs-promo.mp4

if command -v ffprobe >/dev/null 2>&1; then
  ffprobe -v error -show_entries format=duration -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1 out/pjs-promo.mp4
fi

echo "Done: out/pjs-promo.mp4"
