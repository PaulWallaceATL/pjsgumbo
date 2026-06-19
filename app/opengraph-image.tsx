import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "PJ's Gumbo — Atlanta Made. Cajun Soul.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function dataUrl(relativePath: string) {
  const bytes = await readFile(join(process.cwd(), relativePath));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

export default async function OpengraphImage() {
  const graffiti = await dataUrl("public/graffiti/founders-graffiti-v2.png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(120% 120% at 50% 0%, #FBF3E7 0%, #F2E2C6 55%, #E7CfA0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={graffiti}
          alt=""
          style={{
            width: "94%",
            height: "94%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
