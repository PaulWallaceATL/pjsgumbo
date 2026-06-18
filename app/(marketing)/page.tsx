import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Leaf,
  MapPin,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/marketing/reveal";
import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { StarRating } from "@/components/marketing/star-rating";
import { formatCurrency } from "@/lib/utils";
import { GUMBOS, menuImage } from "@/lib/content/menu";
import {
  DELIVERY_AREAS,
  FAQS,
  FRESH_INGREDIENTS,
  REVIEWS,
  SITE,
  WHY_DIFFERENT,
} from "@/lib/content/site";

const featured = GUMBOS.filter((g) => g.featured);
const blueCrab = GUMBOS.find((g) => g.slug === "blue-crab-sausage-gumbo")!;

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedGumbo />
      <OurStory />
      <WhyDifferent />
      <FreshIngredients />
      <BlueCrabSpecial />
      <Reviews />
      <DeliveryAreas />
      <Faq />
      <FinalCta />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="from-cream-100 via-background to-cream-50 relative overflow-hidden bg-gradient-to-b">
      <div className="bg-cajun-500/5 pointer-events-none absolute -top-24 -right-24 size-96 rounded-full blur-3xl" />
      <div className="container-px mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <Badge variant="cream" className="mb-5 px-3 py-1 text-sm">
            <Star className="fill-warning text-warning size-3.5" />
            Loved across Atlanta
          </Badge>
          <h1 className="font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Authentic Louisiana{" "}
            <span className="text-primary">Gumbo</span> Delivered
          </h1>
          <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">
            Slow-cooked over a dark, hand-stirred roux with fresh Gulf shrimp,
            smoked sausage, and the holy trinity. Made from scratch, every single
            day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/order">
                Order Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
          <div className="text-muted-foreground mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <Leaf className="text-success size-4" /> Fresh, never frozen
            </span>
            <span className="flex items-center gap-2">
              <Truck className="text-primary size-4" /> Fast local delivery
            </span>
            <span className="flex items-center gap-2">
              <Flame className="text-cajun-500 size-4" /> Mild or spicy
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="from-cream-100 via-cream-50 to-cream-300 relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-2xl ring-1 ring-black/5">
            <div className="bg-cajun-500/10 pointer-events-none absolute -top-10 -right-10 size-56 rounded-full blur-3xl" />
            <div className="bg-roux-500/10 pointer-events-none absolute -bottom-12 -left-12 size-56 rounded-full blur-3xl" />
            <div className="relative flex flex-col items-center gap-5 px-8 text-center">
              <Image
                src={SITE.logo}
                alt="PJ's Gumbo"
                width={360}
                height={360}
                priority
                className="h-auto w-52 drop-shadow-xl sm:w-64"
              />
              <p className="font-display text-roux-800 text-xl font-semibold tracking-tight">
                {SITE.tagline}
              </p>
            </div>
          </div>
          <Card className="absolute -bottom-6 -left-6 hidden w-52 py-4 shadow-xl sm:block">
            <CardContent className="px-4">
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="text-sm font-semibold">4.9</span>
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                From 1,200+ happy customers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Featured Gumbo ---------------------------- */

function FeaturedGumbo() {
  return (
    <section id="menu-preview" className="container-px mx-auto max-w-7xl py-20">
      <SectionHeading
        eyebrow="Featured"
        title="Our most-loved gumbos"
        description="Every gumbo is available mild or kicked up with fresh serrano peppers, in sizes from a cup to a half gallon."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.08}>
            <Card className="group h-full overflow-hidden pt-0">
              <MediaPlaceholder
                src={menuImage(g.slug)}
                alt={g.name}
                rounded="rounded-none"
                className="aspect-[16/10] w-full"
              />
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold">{g.name}</h3>
                  <span className="text-primary shrink-0 pt-1 font-semibold">
                    from {formatCurrency(g.prices.CUP)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {g.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {g.weekendOnly ? (
                    <Badge>Weekend Only</Badge>
                  ) : (
                    <Badge variant="muted">Daily</Badge>
                  )}
                  <Badge variant="outline">
                    <Flame className="size-3" /> Mild or Spicy
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild size="lg" variant="secondary">
          <Link href="/menu">
            See the full menu
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------- Our Story ------------------------------- */

function OurStory() {
  return (
    <section id="story" className="bg-cream-50">
      <div className="container-px mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <MediaPlaceholder
            src={SITE.founders}
            alt="The founders of PJ's Gumbo"
            className="aspect-[5/4] w-full shadow-xl"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Three generations of Louisiana cooking"
            />
            <div className="text-muted-foreground mt-5 space-y-4 leading-relaxed">
              <p>
                PJ&apos;s Gumbo started with a cast-iron pot, a wooden spoon, and
                a family recipe passed down through three generations. We still
                make every pot the way our grandmother taught us, stirring the
                roux by hand until it&apos;s the color of dark chocolate.
              </p>
              <p>
                Today we bring that same pot to Atlanta — a family-owned kitchen
                sourcing fresh Gulf seafood, local produce, and smoked sausage.
                No shortcuts, no powders, no compromises, just real Louisiana
                flavor in every bowl.
              </p>
            </div>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/about">
                Read more about us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Why Different ----------------------------- */

function WhyDifferent() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeading
        eyebrow="Why We're Different"
        title="What sets our gumbo apart"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_DIFFERENT.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <Card className="h-full">
              <CardContent className="space-y-3">
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                  <UtensilsCrossed className="size-5" />
                </span>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Fresh Ingredients --------------------------- */

function FreshIngredients() {
  return (
    <section className="bg-roux-700 text-cream-100">
      <div className="container-px mx-auto max-w-7xl py-16 text-center">
        <p className="text-cream-200/80 font-display text-sm font-semibold tracking-[0.2em] uppercase">
          Fresh Ingredients
        </p>
        <h2 className="font-display text-cream-50 mt-3 text-3xl font-bold sm:text-4xl">
          Made with what matters
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FRESH_INGREDIENTS.map((ingredient) => (
            <span
              key={ingredient}
              className="border-cream-100/20 bg-cream-100/5 rounded-full border px-5 py-2.5 text-sm font-medium"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Blue Crab Special --------------------------- */

function BlueCrabSpecial() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <Reveal>
        <div className="from-cajun-600 to-roux-700 relative overflow-hidden rounded-3xl bg-gradient-to-br">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="text-cream-100">
              <Badge className="bg-cream-100 text-cajun-700 mb-4">
                Weekend Special
              </Badge>
              <h2 className="font-display text-cream-50 text-4xl font-bold sm:text-5xl">
                Blue Crab &amp; Sausage Gumbo
              </h2>
              <p className="text-cream-100/85 mt-4 max-w-md leading-relaxed">
                {blueCrab.description}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="font-display text-2xl font-bold">
                  from {formatCurrency(blueCrab.prices.CUP)}
                </span>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/order">Order this weekend</Link>
                </Button>
              </div>
            </div>
            <MediaPlaceholder
              src={menuImage(blueCrab.slug)}
              alt="Blue crab and sausage gumbo"
              className="aspect-square w-full shadow-2xl lg:aspect-[4/3]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Reviews -------------------------------- */

function Reviews() {
  return (
    <section id="reviews" className="bg-cream-50">
      <div className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading
          eyebrow="Reviews"
          title="What our customers are saying"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.06}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4">
                  <StarRating rating={review.rating} />
                  <p className="flex-1 text-sm leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Delivery Areas ---------------------------- */

function DeliveryAreas() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeading
        eyebrow="Delivery Areas"
        title="We deliver across Acadiana"
        description="Hot, fresh gumbo brought right to your door. Enter your address at checkout to confirm delivery."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DELIVERY_AREAS.map((area, i) => (
          <Reveal key={area.name} delay={i * 0.05}>
            <div className="flex items-center justify-between rounded-xl border p-5">
              <span className="flex items-center gap-3 font-medium">
                <MapPin className="text-primary size-5" />
                {area.name}
              </span>
              <span className="text-muted-foreground text-sm">{area.eta}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function Faq() {
  return (
    <section id="faq" className="bg-cream-50">
      <div className="container-px mx-auto max-w-3xl py-20">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA ------------------------------- */

function FinalCta() {
  return (
    <section className="bg-charcoal-800">
      <div className="container-px mx-auto max-w-7xl py-20 text-center">
        <h2 className="font-display text-cream-50 text-4xl font-bold text-balance sm:text-5xl">
          Hungry yet? Let&apos;s get you some gumbo.
        </h2>
        <p className="text-cream-100/70 mx-auto mt-4 max-w-lg text-lg">
          Order online for delivery or pickup in just a few taps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/order">
              Order Now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-cream-100/30 text-cream-100 hover:bg-cream-100/10 hover:text-cream-50"
          >
            <Link href="/catering">Catering Inquiries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Shared UI ------------------------------- */

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
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
