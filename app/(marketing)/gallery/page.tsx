import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at PJ's Gumbo — our food, our kitchen, and the people behind the pot.",
};

type Tile = {
  label?: string;
  src?: string;
  tone?: "roux" | "cajun" | "cream" | "dark";
  span?: string;
  ratio: string;
};

const TILES: Tile[] = [
  {
    src: SITE.founders,
    label: "The founders of PJ's Gumbo",
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
          <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Gallery
          </p>
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
              <MediaPlaceholder
                src={tile.src}
                tone={tile.tone}
                label={tile.label}
                alt={tile.label ?? "PJ's Gumbo"}
                className={`${tile.ratio} h-full w-full`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="container-px mx-auto max-w-7xl py-16 text-center">
          <AnimatedHeading
            as="h2"
            text="Hungry yet?"
            center
            className="font-display text-3xl font-bold sm:text-4xl"
          />
          <Button asChild size="lg" className="mt-6">
            <Link href="/order">
              Order Now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
