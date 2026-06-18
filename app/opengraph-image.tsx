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
  const [logo, gumbo] = await Promise.all([
    dataUrl("public/brand/pjs-logo.png"),
    dataUrl("public/menu/pjs-signature-gumbo.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#1c1410",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gumbo}
          alt=""
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(28,20,16,0.92) 0%, rgba(28,20,16,0.78) 45%, rgba(28,20,16,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
            padding: "0 80px",
            maxWidth: 760,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt="PJ's Gumbo"
            width={150}
            height={150}
            style={{ borderRadius: 999 }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              color: "#FBF3E7",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Authentic Louisiana Gumbo
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: "#E7B85C",
              fontWeight: 600,
            }}
          >
            Atlanta Made. Cajun Soul.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(251,243,231,0.75)",
            }}
          >
            Made from scratch · Delivery & pickup · pjsgumbo.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
