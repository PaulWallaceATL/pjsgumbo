import type { Metadata } from "next";

import { OrderExperience } from "@/components/order/order-experience";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Build your PJ's Gumbo order — choose spice and size, add sides, apply a promo code, and check out for delivery or pickup.",
};

export default function OrderPage() {
  return (
    <>
      <section className="from-cream-100 to-background border-b bg-gradient-to-b">
        <div className="container-px mx-auto max-w-7xl py-12 text-center">
          <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Order Online
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Build your order
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
            Delivery across Atlanta or pickup at our Peachtree Street kitchen.
          </p>
        </div>
      </section>
      <OrderExperience />
    </>
  );
}
