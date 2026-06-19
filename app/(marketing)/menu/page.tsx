import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { MenuNav } from "@/components/marketing/menu-nav";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { BrandWaves } from "@/components/marketing/brand-waves";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { formatCurrency } from "@/lib/utils";
import {
  ADD_ONS,
  DESSERTS,
  DRINKS,
  GUMBOS,
  MENU_SIZES,
  menuImage,
  SIDES,
  type SimpleItem,
} from "@/lib/content/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse PJ's Gumbo menu — signature gumbos, sides, desserts, and drinks. Available mild or spicy, in sizes from a cup to a half gallon.",
};

const NAV_ITEMS = [
  { id: "signature-gumbos", label: "Signature Gumbos" },
  { id: "add-ons", label: "Add-Ons" },
  { id: "sides", label: "Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export default function MenuPage() {
  return (
    <>
      <MenuHeader />
      <MenuNav items={NAV_ITEMS} />

      <div className="container-px mx-auto max-w-7xl">
        <SignatureGumbos />
        <AddOns />
        <SimpleSection
          id="sides"
          eyebrow="Sides"
          title="Southern staples"
          items={SIDES}
          columns
        />
        <SimpleSection
          id="desserts"
          eyebrow="Desserts"
          title="Save room"
          items={DESSERTS}
        />
        <SimpleSection
          id="drinks"
          eyebrow="Drinks"
          title="Wash it all down"
          items={DRINKS}
          columns
        />
      </div>

      <MenuCta />
    </>
  );
}

/* ------------------------------- Header -------------------------------- */

function MenuHeader() {
  return (
    <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b">
      <HeroBackdrop />
      <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center sm:py-20">
        <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
          Our Menu
        </p>
        <AnimatedHeading
          as="h1"
          text="Made from scratch, every day"
          center
          className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg leading-relaxed">
          Every gumbo is slow-cooked over a dark roux and available mild or
          spicy. Choose your size, add your favorites, and dig in.
        </p>
      </div>
    </section>
  );
}

/* --------------------------- Signature Gumbos -------------------------- */

function SignatureGumbos() {
  return (
    <section id="signature-gumbos" className="scroll-mt-32 py-16">
      <SectionHeading
        eyebrow="Signature Gumbos"
        title="The heart of the menu"
        description="Served over white rice. Available mild or kicked up with fresh serrano peppers."
      />
      <div className="mt-12 space-y-8">
        {GUMBOS.map((gumbo, i) => (
          <Reveal key={gumbo.slug} delay={i * 0.05}>
            <Card className="overflow-hidden pt-0 lg:flex-row lg:gap-0">
              <MediaPlaceholder
                src={menuImage(gumbo.slug)}
                alt={gumbo.name}
                rounded="rounded-none"
                className="aspect-[16/10] w-full lg:aspect-auto lg:w-2/5"
              />
              <CardContent className="flex-1 space-y-5 py-6 lg:py-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold">
                      {gumbo.name}
                    </h3>
                    {gumbo.weekendOnly ? (
                      <Badge>Weekend Only</Badge>
                    ) : null}
                    {gumbo.featured ? (
                      <Badge variant="cream">Customer Favorite</Badge>
                    ) : null}
                  </div>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {gumbo.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {gumbo.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                    >
                      <Check className="size-3" />
                      {ing}
                    </span>
                  ))}
                </div>

                <SpiceLevels />

                <Separator />

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {MENU_SIZES.map((size) => (
                    <div
                      key={size.key}
                      className="flex items-baseline justify-between gap-2 text-sm"
                    >
                      <span className="text-muted-foreground">
                        {size.label}
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(gumbo.prices[size.key])}
                      </span>
                    </div>
                  ))}
                </div>

                <Button asChild>
                  <Link href="/order">
                    Customize &amp; Order
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SpiceLevels() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="gap-1.5">
        <Flame className="size-3" /> Mild
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <Flame className="text-cajun-500 size-3" />
        <Flame className="text-cajun-500 -ml-2.5 size-3" /> Spicy · fresh serrano
      </Badge>
    </div>
  );
}

/* ------------------------------- Add-Ons ------------------------------- */

function AddOns() {
  return (
    <section id="add-ons" className="scroll-mt-32 py-16">
      <div className="bg-card rounded-3xl border p-8 sm:p-12">
        <SectionHeading
          align="left"
          eyebrow="Add-Ons"
          title="Make it yours"
          description="Pile on the good stuff. Add-ons are available on any gumbo."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.slug}
              className="bg-background flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
            >
              <span className="flex items-center gap-2 font-medium">
                {addOn.name}
                {addOn.weekendOnly ? (
                  <Badge variant="muted" className="text-[10px]">
                    Weekends
                  </Badge>
                ) : null}
              </span>
              <span className="text-primary font-semibold">
                +{formatCurrency(addOn.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Simple sections --------------------------- */

function SimpleSection({
  id,
  eyebrow,
  title,
  items,
  columns = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  items: SimpleItem[];
  columns?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-16">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div
        className={
          columns
            ? "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "mx-auto mt-10 grid max-w-2xl gap-4"
        }
      >
        {items.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.04}>
            <div className="flex items-stretch gap-4 overflow-hidden rounded-xl border">
              <MediaPlaceholder
                src={menuImage(item.slug)}
                alt={item.name}
                rounded="rounded-none"
                className="aspect-square w-24 shrink-0 sm:w-28"
              />
              <div className="flex flex-1 items-start justify-between gap-4 py-4 pr-5">
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {item.name}
                  </h3>
                  {item.description ? (
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  ) : null}
                </div>
                <span className="text-primary shrink-0 font-semibold">
                  {formatCurrency(item.price)}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- CTA --------------------------------- */

function MenuCta() {
  return (
    <section className="bg-roux-700 text-cream-100 relative mt-8 overflow-hidden">
      <BrandWaves opacity={0.45} />
      <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center">
        <AnimatedHeading
          as="h2"
          text="Ready to order?"
          center
          className="font-display text-cream-50 text-3xl font-bold sm:text-4xl"
        />
        <p className="text-cream-100/75 mx-auto mt-3 max-w-md">
          Build your order for delivery or pickup in just a few taps.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link href="/order">
            Start your order
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------- Shared -------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <AnimatedHeading
        as="h2"
        text={title}
        center={align === "center"}
        className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      />
      {description ? (
        <p className="text-muted-foreground mt-3 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
