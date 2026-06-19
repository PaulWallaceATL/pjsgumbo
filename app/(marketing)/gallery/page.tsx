import type { Metadata } from "next";

import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Eyebrow } from "@/components/marketing/section-heading";
import { CtaBand } from "@/components/marketing/cta-band";
import { SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at PJ's Gumbo — our food, our kitchen, and the people behind the pot.",
};

type Tile = {
  label?: string;
  src?: string;
  video?: string;
  poster?: string;
  tone?: "roux" | "cajun" | "cream" | "dark";
  span?: string;
  ratio: string;
};

const TILES: Tile[] = [
  {
    video: "/gallery/closeup-stir.mp4",
    label: "Stirring the pot, low and slow",
    span: "sm:col-span-2 sm:row-span-2",
    ratio: "aspect-square",
  },
  { src: "/menu/pjs-signature-gumbo.png", label: "PJ's Signature Gumbo", ratio: "aspect-[4/3]" },
  { src: "/menu/veggie-gumbo.png", label: "The Holy Trinity", ratio: "aspect-[4/3]" },
  { src: "/menu/cornbread-muffins.png", label: "Cornbread Muffins", ratio: "aspect-[4/3]" },
  { src: "/menu/chicken-sausage-gumbo.png", label: "A dark, hand-stirred roux", ratio: "aspect-[4/3]" },
  {
    src: "/menu/blue-crab-sausage-gumbo.png",
    label: "Blue Crab & Sausage — weekend special",
    span: "sm:col-span-2",
    ratio: "aspect-[16/9]",
  },
  { src: "/menu/fried-okra.png", label: "Crispy fried okra", ratio: "aspect-[4/3]" },
  { src: "/menu/dirty-rice.png", label: "Louisiana dirty rice", ratio: "aspect-[4/3]" },
  { src: SITE.logo, tone: "cream", label: "PJ's Gumbo", ratio: "aspect-square" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b">
        <HeroBackdrop />
        <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center">
          <Eyebrow>Gallery</Eyebrow>
          <AnimatedHeading
            as="h1"
            text="A taste of PJ's"
            center
            className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl"
          />
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Our food, our kitchen, and the people behind the pot.
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid auto-rows-[1fr] grid-cols-2 gap-4 sm:grid-cols-4">
          {TILES.map((tile, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.05}
              className={tile.span ?? ""}
            >
              {tile.video ? (
                <div
                  className={`relative overflow-hidden rounded-2xl ${tile.ratio} h-full w-full`}
                >
                  <video
                    src={tile.video}
                    poster={tile.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={tile.label ?? "PJ's Gumbo"}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              ) : (
                <MediaPlaceholder
                  src={tile.src}
                  tone={tile.tone}
                  label={tile.label}
                  alt={tile.label ?? "PJ's Gumbo"}
                  className={`${tile.ratio} h-full w-full`}
                />
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Order Online"
        title="Hungry yet?"
        description="Everything you just saw is made fresh daily. Order online for delivery or pickup."
        primary={{ href: "/order", label: "Order Now" }}
        secondary={{ href: "/menu", label: "View Menu" }}
      />
    </>
  );
}
