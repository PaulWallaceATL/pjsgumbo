import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { Reveal } from "@/components/marketing/reveal";
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
  { src: SITE.founders, span: "sm:col-span-2 sm:row-span-2", ratio: "aspect-square" },
  { label: "PJ's Signature Gumbo", tone: "roux", ratio: "aspect-[4/3]" },
  { label: "The Holy Trinity", tone: "cajun", ratio: "aspect-[4/3]" },
  { label: "Cornbread Muffins", tone: "cream", ratio: "aspect-[4/3]" },
  { label: "Dark Roux", tone: "dark", ratio: "aspect-[4/3]" },
  { label: "Blue Crab Special", tone: "cajun", span: "sm:col-span-2", ratio: "aspect-[16/9]" },
  { label: "Fresh Gulf Shrimp", tone: "roux", ratio: "aspect-[4/3]" },
  { label: "In the Kitchen", tone: "dark", ratio: "aspect-[4/3]" },
  { src: SITE.logo, tone: "cream", ratio: "aspect-square" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="from-cream-100 to-background bg-gradient-to-b">
        <div className="container-px mx-auto max-w-7xl py-16 text-center">
          <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Gallery
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            A taste of PJ&apos;s
          </h1>
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

      <section className="bg-cream-50">
        <div className="container-px mx-auto max-w-7xl py-16 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Hungry yet?
          </h2>
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
