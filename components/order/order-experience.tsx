"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Flame, Plus, ShoppingBag } from "lucide-react";
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
  menuImage,
  SIDES,
  type SimpleItem,
} from "@/lib/content/menu";
import { computeBreakdown } from "@/lib/order/pricing";
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
    <div className="container-px mx-auto grid max-w-7xl gap-10 pt-12 pb-28 lg:grid-cols-[1fr_400px] lg:pb-12">
      <div className="space-y-12">
        <MenuGroup title="Signature Gumbos" id="gumbos">
          <div className="grid gap-4 sm:grid-cols-2">
            {GUMBOS.map((g) => (
              <Card key={g.slug} className="overflow-hidden pt-0">
                <MediaPlaceholder
                  src={menuImage(g.slug)}
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

      <aside id="order-summary" className="scroll-mt-24 lg:sticky lg:top-24 lg:h-fit">
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

      {step === "build" ? <ContinueToCartBar /> : null}
    </div>
  );
}

/**
 * Always-visible floating CTA that jumps to the order summary / cart. Shown on
 * every breakpoint while building an order (the cart sits far below the menu on
 * smaller screens, so this keeps it one tap away).
 */
function ContinueToCartBar() {
  const cart = useCart();

  if (!cart.hydrated || cart.itemCount === 0) return null;

  const breakdown = computeBreakdown({
    lines: cart.lines,
    fulfillment: cart.fulfillment,
    promoCode: cart.promoCode,
    tip: cart.tip,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Button
        asChild
        size="lg"
        className="pointer-events-auto w-full max-w-md gap-3 shadow-2xl"
      >
        <a href="#order-summary">
          <ShoppingBag className="size-4 shrink-0" />
          <span>Continue to cart</span>
          <span className="ml-auto flex items-center gap-2 font-semibold">
            <span>
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
            </span>
            <span aria-hidden>·</span>
            <span>{formatCurrency(breakdown.total)}</span>
          </span>
        </a>
      </Button>
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
    <div className="flex items-center gap-3 overflow-hidden rounded-xl border p-2 pr-4">
      <MediaPlaceholder
        src={menuImage(item.slug)}
        alt={item.name}
        rounded="rounded-lg"
        className="aspect-square w-16 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{item.name}</p>
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
