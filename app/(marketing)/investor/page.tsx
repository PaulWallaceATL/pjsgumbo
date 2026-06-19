import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChefHat,
  CircleDollarSign,
  Cpu,
  Gauge,
  LineChart,
  MapPin,
  Megaphone,
  PieChart,
  Rocket,
  Soup,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { BrandWaves } from "@/components/marketing/brand-waves";
import { Eyebrow } from "@/components/marketing/section-heading";
import { BrandIcon } from "@/components/marketing/brand-icon";
import { CtaBand } from "@/components/marketing/cta-band";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Investor Prospectus",
  description:
    "PJ's Gumbo — a pre-launch concept. Raising $250K for 25% to launch authentic Louisiana gumbo in Atlanta with a ghost-kitchen model, a purpose-built operating system, and a path to franchise.",
  robots: { index: false, follow: false },
};

/* ----------------------------- Deck data ------------------------------ */

const RAISE_AMOUNT = 250_000;
const EQUITY_PCT = 25;
const POST_MONEY = (RAISE_AMOUNT / EQUITY_PCT) * 100; // $1,000,000

/** Money in millions, e.g. 600_000 -> "$0.6M". */
function fmtM(n: number) {
  const m = n / 1_000_000;
  return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
}

const COVER_FACTS = [
  { icon: CircleDollarSign, value: formatCurrency(RAISE_AMOUNT, { maximumFractionDigits: 0 }), label: "Raising" },
  { icon: PieChart, value: `${EQUITY_PCT}%`, label: "Equity offered" },
  { icon: MapPin, value: "Atlanta", label: "Launch market" },
  { icon: Building2, value: "Ghost-kitchen", label: "First go-to-market" },
] as const;

const PROJECTIONS = [
  { year: "Year 1", phase: "Launch", revenue: 600_000, note: "Flagship kitchen + delivery across metro Atlanta" },
  { year: "Year 2", phase: "Expand", revenue: 1_800_000, note: "3–4 ghost kitchens covering new delivery zones" },
  { year: "Year 3", phase: "Franchise", revenue: 4_500_000, note: "Company units + first franchised locations" },
] as const;

const TARGETS = [
  { icon: CircleDollarSign, value: "~$24", label: "Target average order value" },
  { icon: Gauge, value: "< 30%", label: "Target food cost" },
  { icon: Building2, value: "~$40–60K", label: "Cost to open a ghost kitchen (vs. $500K+ storefront)" },
  { icon: Rocket, value: "8+", label: "Target locations by Year 3" },
] as const;

const SCALE_PILLARS = [
  {
    icon: Building2,
    title: "Ghost Kitchens",
    body: "We'll expand from low-overhead commissary kitchens — not $500K+ storefronts. Each new delivery zone opens for a fraction of the cost and can reach profitability faster.",
  },
  {
    icon: Cpu,
    title: "AI & The PJ's OS",
    body: "Our operating system is designed for demand forecasting, auto-replenishment, dynamic prep, and AI-assisted marketing — so every future kitchen runs lean and consistent.",
  },
  {
    icon: Megaphone,
    title: "Performance Marketing",
    body: "A bold, ownable brand paired with paid social, short-form content, and loyalty is built to drive a low customer-acquisition cost and a high repeat-order rate.",
  },
  {
    icon: Trophy,
    title: "Falcons & Athlete Network",
    body: "Co-founder John's Atlanta Falcons connections can unlock athlete partnerships, stadium activations, and citywide awareness money can't easily buy.",
  },
] as const;

const OS_FEATURES = [
  {
    icon: LineChart,
    title: "Financial command center",
    body: "Sales, food-cost %, prime-cost %, labor %, and waste designed into one screen — the metrics that protect margin from day one.",
  },
  {
    icon: Boxes,
    title: "Inventory that runs itself",
    body: "Par levels, live valuation, and low-stock alerts across proteins, seafood, produce, dry goods, and packaging — already modeled in the platform.",
  },
  {
    icon: Gauge,
    title: "Auto-deduction & prep planning",
    body: "Add-ons deduct from inventory automatically, and prep scheduling keeps each kitchen ahead of demand.",
  },
  {
    icon: Sparkles,
    title: "Multi-location ready",
    body: "Architected from day one to run many kitchens from one dashboard — the backbone of a franchise system.",
  },
] as const;

const FUND_USE = [
  {
    icon: ChefHat,
    label: "Ghost Kitchen Supplies & Equipment",
    pct: 40,
    note: "Commissary set-up, smallwares, and kit to open our first capital-light delivery hub.",
  },
  {
    icon: Soup,
    label: "Ingredients & Inventory",
    pct: 20,
    note: "Initial stock of the holy trinity, Gulf seafood, andouille, and packaging to run at par.",
  },
  {
    icon: Megaphone,
    label: "Marketing & Growth",
    pct: 30,
    note: "Launch campaign, performance social, content, athlete activations, and a loyalty program.",
  },
  {
    icon: Wallet,
    label: "Working Capital & Ops",
    pct: 10,
    note: "Runway, first hires, and finishing the PJ's OS for launch.",
  },
] as const;

const ROADMAP = [
  { step: "01", when: "Months 0–12", title: "Prove the model", body: "Launch the Atlanta flagship and first ghost kitchen. Validate unit economics and the playbook." },
  { step: "02", when: "Months 12–18", title: "Package the system", body: "Turn recipes, sourcing, training, and the PJ's OS into a turn-key franchise kit." },
  { step: "03", when: "Months 18–30", title: "Sell franchises", body: "Open franchising — fees plus recurring royalties on every unit, powered by our software." },
  { step: "04", when: "Year 3+", title: "Scale the brand", body: "Expand city by city. Each operator launches faster on proven rails." },
] as const;

/* ------------------------------- Page --------------------------------- */

export default function InvestorPage() {
  const maxRev = Math.max(...PROJECTIONS.map((p) => p.revenue));

  return (
    <>
      {/* Cover */}
      <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b">
        <HeroBackdrop />
        <div className="container-px relative z-10 mx-auto max-w-5xl py-20 text-center sm:py-28">
          <Badge variant="cream" className="mb-5 px-3 py-1 text-sm">
            <Sparkles className="size-3.5" />
            Pre-Launch Concept · Confidential
          </Badge>
          <h1 className="font-display text-4xl leading-[1.04] font-bold tracking-tight text-balance sm:text-6xl">
            Building the future of{" "}
            <span className="text-primary">Louisiana soul food</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            PJ&apos;s Gumbo is a pre-launch concept — an authentic,
            made-from-scratch gumbo brand built around a ghost-kitchen model and
            an operating system we&apos;ve already built. We&apos;re raising{" "}
            <strong className="text-foreground">
              {formatCurrency(RAISE_AMOUNT, { maximumFractionDigits: 0 })} for{" "}
              {EQUITY_PCT}%
            </strong>{" "}
            to launch in Atlanta and prove a franchise-ready model.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Request a meeting
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#the-ask">See the ask</Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COVER_FACTS.map((s) => (
              <Card key={s.label} className="text-left">
                <CardContent className="py-5">
                  <BrandIcon icon={s.icon} size="sm" variant="soft" />
                  <p className="font-display mt-3 text-2xl font-bold">
                    {s.value}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <Slide n="01" eyebrow="The Opportunity" title="Atlanta is hungry for the real thing">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Soup,
              title: "An authentic product",
              body: "Hand-stirred dark roux, Gulf seafood, and three generations of family recipes. No national brand owns authentic Cajun gumbo — that's the opening.",
            },
            {
              icon: Building2,
              title: "A delivery-first market",
              body: "Ghost kitchens let a beloved local brand reach an entire metro without the cost and risk of dine-in real estate.",
            },
            {
              icon: Cpu,
              title: "A technology edge",
              body: "Most independent restaurants fly blind on cost. Our OS is built to turn margin discipline into a repeatable, franchisable system.",
            },
          ].map((c) => (
            <Reveal key={c.title}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="space-y-3">
                  <BrandIcon icon={c.icon} />
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {c.body}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Slide>

      {/* Model & projections */}
      <Slide
        n="02"
        eyebrow="The Model & Projections"
        title="A clear path from one kitchen to many"
        description="Illustrative, forward-looking projections — not current results. The model assumes a ghost-kitchen-first launch in Atlanta, reinvesting into new delivery zones, then opening franchising in Year 3."
        tone="card"
      >
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Card className="h-full">
              <CardContent className="py-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Projected annual revenue
                    </p>
                    <p className="font-display text-3xl font-bold">
                      {fmtM(PROJECTIONS[PROJECTIONS.length - 1].revenue)}{" "}
                      <span className="text-muted-foreground text-base font-medium">
                        by Year 3
                      </span>
                    </p>
                  </div>
                  <Badge variant="muted">Illustrative</Badge>
                </div>
                <div className="flex h-48 items-end gap-4">
                  {PROJECTIONS.map((p) => (
                    <div
                      key={p.year}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="font-display text-sm font-bold">
                        {fmtM(p.revenue)}
                      </span>
                      <div
                        className="from-cajun-500 to-roux-600 w-full rounded-t-md bg-gradient-to-t"
                        style={{ height: `${(p.revenue / maxRev) * 88 + 8}%` }}
                      />
                      <span className="text-sm font-semibold">{p.year}</span>
                      <span className="text-muted-foreground text-center text-xs">
                        {p.phase}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {TARGETS.map((s) => (
              <Reveal key={s.label}>
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 py-5">
                    <BrandIcon icon={s.icon} variant="soft" />
                    <div>
                      <p className="font-display text-2xl font-bold">
                        {s.value}
                      </p>
                      <p className="text-muted-foreground text-sm">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Slide>

      {/* The OS / moat */}
      <Slide
        n="03"
        eyebrow="The Moat"
        title="We've already built the operating system"
        description="Before raising a dollar, we built the platform that will run every PJ's kitchen — financial controls, inventory, and prep on one dashboard. It's what will make each new location consistent, lean, and franchisable."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {OS_FEATURES.map((f) => (
            <Reveal key={f.title}>
              <div className="bg-card flex h-full gap-4 rounded-2xl border p-6 transition-shadow hover:shadow-lg">
                <BrandIcon icon={f.icon} size="lg" />
                <div>
                  <h3 className="font-display text-lg font-bold">{f.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Slide>

      {/* Scale strategy */}
      <Slide
        n="04"
        eyebrow="How We Scale"
        title="Four engines of growth"
        tone="card"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {SCALE_PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BrandIcon icon={p.icon} />
                    <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Slide>

      {/* Franchise roadmap */}
      <Slide
        n="05"
        eyebrow="Franchise Roadmap"
        title="From one kitchen to a national brand"
        description="The OS is the franchise. Once the model is proven, each unit launches on the same rails — standardized recipes, sourcing, training, and software — and we earn fees plus recurring royalties."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <div className="bg-card relative h-full overflow-hidden rounded-2xl border p-6">
                <span className="font-display text-primary/15 absolute -top-2 right-2 text-6xl font-black">
                  {s.step}
                </span>
                <p className="text-primary relative text-xs font-semibold tracking-wide uppercase">
                  {s.when}
                </p>
                <h3 className="font-display relative mt-1 text-lg font-bold">
                  {s.title}
                </h3>
                <p className="text-muted-foreground relative mt-2 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Slide>

      {/* The Ask */}
      <section
        id="the-ask"
        className="bg-roux-700 text-cream-100 relative scroll-mt-24 overflow-hidden"
      >
        <BrandWaves opacity={0.4} speed={0.5} />
        <div className="container-px relative z-10 mx-auto max-w-7xl py-20 sm:py-24">
          <div className="text-center">
            <p className="text-cream-200/80 font-display text-sm font-semibold tracking-[0.2em] uppercase">
              The Ask · Use of Initial Funds
            </p>
            <AnimatedHeading
              as="h2"
              text="Raising $250K for 25%"
              center
              className="font-display text-cream-50 mt-3 text-4xl font-bold sm:text-5xl"
            />
            <p className="text-cream-100/75 mx-auto mt-4 max-w-xl text-lg">
              A {formatCurrency(POST_MONEY, { maximumFractionDigits: 0 })}{" "}
              post-money valuation. Every dollar goes toward launching the first
              kitchen and the engines that drive growth.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 text-center">
            {[
              { k: formatCurrency(RAISE_AMOUNT, { maximumFractionDigits: 0 }), v: "Raise" },
              { k: `${EQUITY_PCT}%`, v: "Equity" },
              { k: formatCurrency(POST_MONEY, { maximumFractionDigits: 0 }), v: "Post-money" },
            ].map((s) => (
              <div
                key={s.v}
                className="border-cream-100/15 bg-cream-100/5 rounded-2xl border p-4 sm:p-6"
              >
                <p className="font-display text-cream-50 text-2xl font-bold sm:text-4xl">
                  {s.k}
                </p>
                <p className="text-cream-100/70 mt-1 text-xs tracking-wide uppercase sm:text-sm">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          {/* Allocation bar */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="flex h-4 w-full overflow-hidden rounded-full">
              {FUND_USE.map((f, i) => (
                <div
                  key={f.label}
                  title={`${f.label} — ${f.pct}%`}
                  style={{ width: `${f.pct}%` }}
                  className={
                    [
                      "bg-cajun-400",
                      "bg-cream-400",
                      "bg-cajun-200",
                      "bg-roux-300",
                    ][i]
                  }
                />
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FUND_USE.map((f) => (
                <div
                  key={f.label}
                  className="border-cream-100/15 bg-cream-100/5 flex gap-4 rounded-2xl border p-5"
                >
                  <BrandIcon icon={f.icon} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-cream-50 font-bold">
                        {f.label}
                      </h3>
                      <span className="text-cream-100/90 font-display text-sm font-bold">
                        {f.pct}%
                      </span>
                    </div>
                    <p className="text-cream-100/70 mt-1 text-sm leading-relaxed">
                      {f.note}
                    </p>
                    <p className="text-cream-200/90 mt-2 text-sm font-semibold">
                      {formatCurrency((RAISE_AMOUNT * f.pct) / 100, {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <Slide
        n="06"
        eyebrow="The Team"
        title="Founders who can cook — and connect"
        tone="card"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="bg-cajun-500/10 pointer-events-none absolute inset-0 scale-90 rounded-full blur-3xl" />
              <Image
                src="/graffiti/founders-graffiti-v2.png"
                alt="Paul and John, founders of PJ's Gumbo"
                width={1024}
                height={683}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="relative h-auto w-full drop-shadow-2xl"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <BrandIcon icon={ChefHat} size="lg" />
                <div>
                  <h3 className="font-display text-xl font-bold">Paul</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    Operator and product. Owns the recipes and built the PJ&apos;s
                    OS — the platform designed to keep every pot consistent and
                    every dollar accounted for.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BrandIcon icon={Trophy} size="lg" />
                <div>
                  <h3 className="font-display text-xl font-bold">John</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    Brand and partnerships. His Atlanta Falcons connections can
                    open doors to athlete activations, events, and the kind of
                    citywide awareness that accelerates every location.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Slide>

      <CtaBand
        tone="dark"
        icon={PieChart}
        eyebrow="Let's Talk"
        title="Let's build the franchise together"
        description="We'd love to walk you through the concept, the OS, and the plan. Reach out and we'll set up a tasting."
        primary={{ href: "/contact", label: "Request a meeting" }}
        secondary={{ href: "/menu", label: "See the concept" }}
      />

      <div className="bg-background container-px mx-auto max-w-3xl py-8 text-center">
        <p className="text-muted-foreground text-xs leading-relaxed">
          PJ&apos;s Gumbo is an early-stage concept and is pre-revenue. All
          figures on this page are illustrative, forward-looking projections and
          targets — not current results, and not guarantees of future
          performance. This page is confidential and intended for prospective
          investors only; it is not an offer to sell or a solicitation to buy
          securities.
        </p>
      </div>
    </>
  );
}

/* ------------------------------ Slide ---------------------------------- */

function Slide({
  n,
  eyebrow,
  title,
  description,
  tone = "default",
  children,
}: {
  n: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "default" | "card";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "card" ? "bg-card" : ""}>
      <div className="container-px mx-auto max-w-7xl py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <span className="text-primary/40 font-display text-sm font-black tracking-widest">
            {n}
          </span>
          <Eyebrow align="left">{eyebrow}</Eyebrow>
          <AnimatedHeading
            as="h2"
            text={title}
            className="font-display max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
          />
          {description ? (
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
