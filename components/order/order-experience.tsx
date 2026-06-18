"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Flame, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MediaPlaceholder } from "@/components/marketing/media-placeholder";
import { formatCurrency } from "@/lib/utils";
import {
  DESSERTS,
  DRINKS,
  GUMBOS,
  SIDES,
  type SimpleItem,
} from "@/lib/content/menu";
import { CartProvider, useCart } from "@/lib/order/cart-store";
import { GumboCustomizer } from "./gumbo-customizer";
import { CartPanel } from "./cart-panel";
import { CheckoutForm } from "./checkout-form";

type Step = "build" | "checkout" | "done";

export function OrderExperience() {
  return (
    <CartProvider>
      <OrderInner />
    </CartProvider>
  );
}

function OrderInner() {
  const [step, setStep] = React.useState<Step>("build");
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null);

  if (step === "done" && orderNumber) {
    return <Confirmation orderNumber={orderNumber} onReset={() => setStep("build")} />;
  }

  return (
    <div className="container-px mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[1fr_400px]">
      <div className="space-y-12">
        <MenuGroup title="Signature Gumbos" id="gumbos">
          <div className="grid gap-4 sm:grid-cols-2">
            {GUMBOS.map((g) => (
              <Card key={g.slug} className="overflow-hidden pt-0">
                <MediaPlaceholder
                  tone={g.weekendOnly ? "cajun" : "roux"}
                  label={g.name}
                  alt={g.name}
                  rounded="rounded-none"
                  className="aspect-[16/9] w-full"
                />
                <CardContent className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold">{g.name}</h3>
                    <span className="text-primary shrink-0 text-sm font-semibold">
                      from {formatCurrency(g.prices.CUP)}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {g.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {g.weekendOnly ? <Badge>Weekend</Badge> : null}
                    <Badge variant="outline">
                      <Flame className="size-3" /> Mild or Spicy
                    </Badge>
                  </div>
                  <GumboCustomizer gumbo={g}>
                    <Button className="w-full">Customize &amp; Add</Button>
                  </GumboCustomizer>
                </CardContent>
              </Card>
            ))}
          </div>
        </MenuGroup>

        <MenuGroup title="Sides">
          <SimpleGrid items={SIDES} />
        </MenuGroup>
        <MenuGroup title="Desserts">
          <SimpleGrid items={DESSERTS} />
        </MenuGroup>
        <MenuGroup title="Drinks">
          <SimpleGrid items={DRINKS} />
        </MenuGroup>
      </div>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <Card>
          <CardContent className="py-6">
            <h2 className="font-display mb-4 text-xl font-bold">
              {step === "build" ? "Your order" : "Checkout"}
            </h2>
            {step === "build" ? (
              <CartPanel onCheckout={() => setStep("checkout")} />
            ) : (
              <CheckoutForm
                onBack={() => setStep("build")}
                onSuccess={(num) => {
                  setOrderNumber(num);
                  setStep("done");
                }}
              />
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function MenuGroup({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display mb-5 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function SimpleGrid({ items }: { items: SimpleItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <AddSimpleRow key={item.slug} item={item} />
      ))}
    </div>
  );
}

function AddSimpleRow({ item }: { item: SimpleItem }) {
  const { addLine } = useCart();
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border p-4">
      <div>
        <p className="font-medium">{item.name}</p>
        {item.description ? (
          <p className="text-muted-foreground line-clamp-1 text-xs">
            {item.description}
          </p>
        ) : null}
        <p className="text-primary mt-0.5 text-sm font-semibold">
          {formatCurrency(item.price)}
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        aria-label={`Add ${item.name}`}
        onClick={() => {
          addLine({
            itemSlug: item.slug,
            name: item.name,
            kind: "SIMPLE",
            addOns: [],
            unitBasePrice: item.price,
            quantity: 1,
          });
          toast.success(`Added ${item.name}`);
        }}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

function Confirmation({
  orderNumber,
  onReset,
}: {
  orderNumber: string;
  onReset: () => void;
}) {
  return (
    <div className="container-px mx-auto max-w-xl py-24 text-center">
      <div className="bg-success/10 text-success mx-auto flex size-16 items-center justify-center rounded-full">
        <CheckCircle2 className="size-9" />
      </div>
      <h1 className="font-display mt-6 text-4xl font-bold">Order confirmed!</h1>
      <p className="text-muted-foreground mt-3 text-lg">
        Your order <span className="text-foreground font-semibold">{orderNumber}</span>{" "}
        is in. We&apos;ve sent a confirmation to your email and phone.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={onReset}>Order again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
