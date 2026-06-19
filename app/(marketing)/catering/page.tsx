import type { Metadata } from "next";
import { Check } from "lucide-react";

import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { CateringForm } from "@/components/marketing/catering-form";
import { AnimatedHeading } from "@/components/marketing/animated-heading";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Cater your next Atlanta event with PJ's Gumbo — office lunches, parties, weddings, and more. Submit an inquiry and we'll plan the perfect spread.",
};

const PERKS = [
  "Half gallons & quarts that feed a crowd",
  "Mild and spicy options for every palate",
  "Cornbread, sides, and dessert add-ons",
  "Delivery & setup across metro Atlanta",
  "Custom menus for dietary needs",
  "Corporate invoicing available",
];

export default function CateringPage() {
  return (
    <>
      <section className="from-cream-100 to-background bg-gradient-to-b">
        <div className="container-px mx-auto max-w-7xl py-16 text-center">
          <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Catering
          </p>
          <AnimatedHeading
            as="h1"
            text="Feed the whole crew"
            center
            className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl"
          />
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            From office lunches to weddings, we bring a pot of real Louisiana
            gumbo to your Atlanta event.
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <MediaPlaceholder
              src="/menu/blue-crab-sausage-gumbo.png"
              alt="A large pot of gumbo for catering"
              className="aspect-[4/3] w-full shadow-xl"
            />
            <div>
              <h2 className="font-display text-2xl font-bold">
                What we offer
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="size-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-cream-50 rounded-2xl border p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Request a quote</h2>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Tell us about your event and we&apos;ll be in touch within one
              business day.
            </p>
            <CateringForm />
          </div>
        </div>
      </section>
    </>
  );
}
