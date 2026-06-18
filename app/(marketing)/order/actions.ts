"use server";

import { z } from "zod";

import { computeBreakdown } from "@/lib/order/pricing";
import type { CartLine } from "@/lib/order/types";
import {
  getEmailProvider,
  getPaymentProvider,
  getSmsProvider,
} from "@/lib/integrations";

const addOnSchema = z.object({
  slug: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
});

const lineSchema = z.object({
  id: z.string(),
  itemSlug: z.string(),
  name: z.string(),
  kind: z.enum(["GUMBO", "SIMPLE"]),
  size: z
    .enum(["CUP", "BOWL", "LARGE_BOWL", "QUART", "HALF_GALLON"])
    .optional(),
  sizeLabel: z.string().optional(),
  spice: z.enum(["MILD", "SPICY"]).optional(),
  addOns: z.array(addOnSchema),
  unitBasePrice: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  notes: z.string().max(280).optional(),
});

const placeOrderSchema = z
  .object({
    lines: z.array(lineSchema).min(1, "Your cart is empty."),
    fulfillment: z.enum(["DELIVERY", "PICKUP"]),
    promoCode: z.string().optional(),
    tip: z.number().nonnegative().default(0),
    customer: z.object({
      name: z.string().min(2, "Please enter your name."),
      email: z.string().email("Enter a valid email."),
      phone: z.string().min(7, "Enter a valid phone number."),
    }),
    address: z
      .object({
        line1: z.string().min(3),
        city: z.string().min(2),
        zip: z.string().min(3),
      })
      .optional(),
    scheduledFor: z.string().optional(),
    notes: z.string().max(500).optional(),
  })
  .refine((d) => d.fulfillment !== "DELIVERY" || !!d.address, {
    message: "A delivery address is required.",
    path: ["address"],
  });

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;

export type PlaceOrderResult =
  | { ok: true; orderNumber: string; total: number }
  | { ok: false; error: string };

function makeOrderNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `PJ-${n}`;
}

/**
 * Places an order. Totals are recomputed server-side from the menu prices the
 * client sent (never trusting the client's math). Payment, email, and SMS use
 * the integration stubs until real keys are wired in.
 */
export async function placeOrder(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult> {
  const parsed = placeOrderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid order." };
  }

  const data = parsed.data;
  const breakdown = computeBreakdown({
    lines: data.lines as CartLine[],
    fulfillment: data.fulfillment,
    promoCode: data.promoCode,
    tip: data.tip,
  });

  const orderNumber = makeOrderNumber();

  const payments = getPaymentProvider();
  await payments.createCheckoutSession({
    lineItems: data.lines.map((l) => ({
      name: l.name,
      amount: Math.round((l.unitBasePrice + l.addOns.reduce((s, a) => s + a.price, 0)) * 100),
      quantity: l.quantity,
    })),
    successUrl: "/order?status=success",
    cancelUrl: "/order?status=cancel",
    customerEmail: data.customer.email,
    metadata: { orderNumber },
  });

  const summary = `Order ${orderNumber} · ${data.fulfillment === "DELIVERY" ? "Delivery" : "Pickup"} · Total $${breakdown.total.toFixed(2)}`;

  await getEmailProvider().sendEmail({
    to: data.customer.email,
    subject: `PJ's Gumbo — ${orderNumber} confirmed`,
    html: `<h1>Thanks, ${data.customer.name}!</h1><p>${summary}</p>`,
  });

  await getSmsProvider().sendSms({
    to: data.customer.phone,
    body: `PJ's Gumbo: ${summary}. We'll text when it's on the way.`,
  });

  return { ok: true, orderNumber, total: breakdown.total };
}
