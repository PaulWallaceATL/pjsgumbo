import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, Heart, Leaf, Soup } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { BrandWaves } from "@/components/marketing/brand-waves";
import { FRESH_INGREDIENTS } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "PJ's Gumbo is a family-owned Atlanta kitchen serving authentic Louisiana gumbo made from scratch — three generations of recipes, fresh ingredients, and a slow-cooked roux.",
};

const PROCESS = [
  {
    icon: Soup,
    title: "The Roux",
    description:
      "Flour and oil, stirred by hand over low heat until it's the color of dark chocolate. This is where the soul begins.",
  },
  {
    icon: Leaf,
    title: "The Trinity",
    description:
      "Onion, bell pepper, and celery — the holy trinity — sweated down to build a deep, aromatic base.",
  },
  {
    icon: ChefHat,
    title: "Low & Slow",
    description:
      "Proteins, stock, and Cajun spice simmered for hours until everything melds into one soulful pot.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="from-cream-100 to-background bg-gradient-to-b">
        <div className="container-px mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
              Our Story
            </p>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Atlanta Made. <span className="text-primary">Cajun Soul.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
              PJ&apos;s Gumbo brings three generations of Louisiana cooking to
              the heart of Atlanta — one hand-stirred, slow-cooked pot at a time.
            </p>
            <Button asChild className="mt-6">
              <Link href="/order">
                Order Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <Reveal>
            <div className="relative">
              <div className="bg-cajun-500/10 pointer-events-none absolute inset-0 scale-90 rounded-full blur-3xl" />
              <Image
                src="/graffiti/founders-graffiti-v2.png"
                alt="The founders of PJ's Gumbo"
                width={1024}
                height={683}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="relative h-auto w-full drop-shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roots */}
      <section className="container-px mx-auto max-w-3xl py-20">
        <Reveal>
          <div className="space-y-6 text-center">
            <Badge variant="cream">Family-owned</Badge>
            <AnimatedHeading
              as="h2"
              text="From a cast-iron pot to your door"
              center
              className="font-display text-3xl font-bold sm:text-4xl"
            />
            <div className="text-muted-foreground space-y-4 text-left leading-relaxed">
              <p>
                It started with a cast-iron pot, a wooden spoon, and a recipe
                passed down through three generations. Our grandmother taught us
                that great gumbo can&apos;t be rushed — the roux has to be
                stirred by hand until it&apos;s dark and nutty, and the pot has
                to simmer until the whole kitchen smells like home.
              </p>
              <p>
                We brought that pot to Atlanta because this city knows good
                food and good people. Every batch is still made from scratch, in
                small batches, with fresh Gulf seafood, local produce, and
                smoked sausage. No powders, no shortcuts, no compromises.
              </p>
              <p>
                Whether you&apos;re grabbing a cup on your lunch break or feeding
                the whole family with a half gallon, you&apos;re getting the real
                thing — Louisiana flavor with Atlanta roots.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="bg-cream-50">
        <div className="container-px mx-auto max-w-7xl py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
              How We Cook
            </p>
            <AnimatedHeading
              as="h2"
              text="Three steps, no shortcuts"
              center
              className="font-display mt-2 text-3xl font-bold sm:text-4xl"
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROCESS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="bg-background h-full rounded-2xl border p-7">
                  <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                    <step.icon className="size-6" />
                  </span>
                  <h3 className="font-display mt-4 text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="container-px mx-auto max-w-7xl py-20 text-center">
        <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
          What Goes In
        </p>
        <AnimatedHeading
          as="h2"
          text="Fresh ingredients, every batch"
          center
          className="font-display mt-2 text-3xl font-bold sm:text-4xl"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FRESH_INGREDIENTS.map((ingredient) => (
            <span
              key={ingredient}
              className="bg-muted rounded-full px-5 py-2.5 text-sm font-medium"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-roux-700 text-cream-100 relative overflow-hidden">
        <BrandWaves opacity={0.4} speed={0.5} />
        <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center">
          <Heart className="text-cream-100/80 mx-auto size-8" />
          <AnimatedHeading
            as="h2"
            text="Made with love in Atlanta"
            center
            className="font-display text-cream-50 mt-4 text-3xl font-bold sm:text-4xl"
          />
          <p className="text-cream-100/75 mx-auto mt-3 max-w-md">
            Taste the difference a slow-cooked roux makes.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link href="/menu">See the menu</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
