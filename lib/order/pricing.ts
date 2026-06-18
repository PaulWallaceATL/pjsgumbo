import type { CartLine, Fulfillment, PriceBreakdown } from "./types";

export const TAX_RATE = 0.089; // Atlanta combined sales tax (approx.)
export const DELIVERY_FEE = 4.99;
export const TIP_PRESETS = [0, 0.15, 0.18, 0.2] as const;

/** Round to whole cents to avoid floating point drift. */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function lineUnitPrice(line: CartLine): number {
  const addOns = line.addOns.reduce((sum, a) => sum + a.price, 0);
  return round2(line.unitBasePrice + addOns);
}

export function lineTotal(line: CartLine): number {
  return round2(lineUnitPrice(line) * line.quantity);
}

export function computeSubtotal(lines: CartLine[]): number {
  return round2(lines.reduce((sum, l) => sum + lineTotal(l), 0));
}

export type PromoResult = {
  code: string;
  valid: boolean;
  discount: number;
  freeDelivery: boolean;
  message: string;
};

/**
 * Pure promo-code evaluation. Mirrors the seeded PromoCode rows so the cart
 * and the server agree on discounts.
 */
export function applyPromo(rawCode: string, subtotal: number): PromoResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return { code, valid: false, discount: 0, freeDelivery: false, message: "" };
  }

  switch (code) {
    case "WELCOME10": {
      if (subtotal < 15) {
        return {
          code,
          valid: false,
          discount: 0,
          freeDelivery: false,
          message: "Spend $15 or more to use WELCOME10.",
        };
      }
      return {
        code,
        valid: true,
        discount: round2(subtotal * 0.1),
        freeDelivery: false,
        message: "10% off applied.",
      };
    }
    case "FREEDELIVERY": {
      if (subtotal < 40) {
        return {
          code,
          valid: false,
          discount: 0,
          freeDelivery: false,
          message: "Spend $40 or more for free delivery.",
        };
      }
      return {
        code,
        valid: true,
        discount: 0,
        freeDelivery: true,
        message: "Free delivery applied.",
      };
    }
    default:
      return {
        code,
        valid: false,
        discount: 0,
        freeDelivery: false,
        message: "That promo code isn't valid.",
      };
  }
}

export function computeBreakdown(opts: {
  lines: CartLine[];
  fulfillment: Fulfillment;
  promoCode?: string;
  tip?: number;
}): PriceBreakdown {
  const subtotal = computeSubtotal(opts.lines);

  const promo = opts.promoCode
    ? applyPromo(opts.promoCode, subtotal)
    : null;
  const discount = promo?.valid ? promo.discount : 0;

  let deliveryFee = opts.fulfillment === "DELIVERY" ? DELIVERY_FEE : 0;
  if (promo?.valid && promo.freeDelivery) deliveryFee = 0;

  const taxable = Math.max(0, subtotal - discount);
  const tax = round2(taxable * TAX_RATE);
  const tip = round2(opts.tip ?? 0);
  const total = round2(taxable + deliveryFee + tax + tip);

  return {
    subtotal,
    discount,
    promoApplied: promo?.valid ? promo.code : null,
    promoMessage: promo?.message ?? null,
    deliveryFee,
    tax,
    tip,
    total,
  };
}
