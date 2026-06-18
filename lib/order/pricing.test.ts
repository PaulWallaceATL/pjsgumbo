import { describe, expect, it } from "vitest";

import {
  applyPromo,
  computeBreakdown,
  computeSubtotal,
  lineTotal,
  lineUnitPrice,
} from "./pricing";
import type { CartLine } from "./types";

function gumboLine(overrides: Partial<CartLine> = {}): CartLine {
  return {
    id: "1",
    itemSlug: "pjs-signature-gumbo",
    name: "PJ's Signature Gumbo",
    kind: "GUMBO",
    size: "BOWL",
    sizeLabel: "Bowl",
    spice: "MILD",
    addOns: [],
    unitBasePrice: 12.5,
    quantity: 1,
    ...overrides,
  };
}

describe("line pricing", () => {
  it("adds add-on prices to the unit price", () => {
    const line = gumboLine({
      addOns: [
        { slug: "shrimp", name: "Shrimp", price: 3.5 },
        { slug: "okra", name: "Okra", price: 1.5 },
      ],
    });
    expect(lineUnitPrice(line)).toBe(17.5);
  });

  it("multiplies by quantity", () => {
    const line = gumboLine({ quantity: 3 });
    expect(lineTotal(line)).toBe(37.5);
  });

  it("sums a cart subtotal", () => {
    const lines = [
      gumboLine({ id: "a", quantity: 2 }),
      gumboLine({ id: "b", unitBasePrice: 6, quantity: 1 }),
    ];
    expect(computeSubtotal(lines)).toBe(31);
  });
});

describe("promo codes", () => {
  it("applies WELCOME10 above the minimum", () => {
    const promo = applyPromo("welcome10", 50);
    expect(promo.valid).toBe(true);
    expect(promo.discount).toBe(5);
  });

  it("rejects WELCOME10 below the minimum", () => {
    expect(applyPromo("WELCOME10", 10).valid).toBe(false);
  });

  it("FREEDELIVERY waives delivery above $40", () => {
    const promo = applyPromo("FREEDELIVERY", 45);
    expect(promo.valid).toBe(true);
    expect(promo.freeDelivery).toBe(true);
  });

  it("rejects unknown codes", () => {
    expect(applyPromo("NOPE", 100).valid).toBe(false);
  });
});

describe("order breakdown", () => {
  it("computes delivery totals with tax and tip", () => {
    const b = computeBreakdown({
      lines: [gumboLine({ unitBasePrice: 20 })],
      fulfillment: "DELIVERY",
      tip: 4,
    });
    expect(b.subtotal).toBe(20);
    expect(b.deliveryFee).toBe(4.99);
    expect(b.tax).toBe(1.78);
    expect(b.total).toBe(30.77);
  });

  it("waives delivery fee with FREEDELIVERY", () => {
    const b = computeBreakdown({
      lines: [gumboLine({ unitBasePrice: 45 })],
      fulfillment: "DELIVERY",
      promoCode: "FREEDELIVERY",
    });
    expect(b.deliveryFee).toBe(0);
    expect(b.promoApplied).toBe("FREEDELIVERY");
  });

  it("has no delivery fee for pickup", () => {
    const b = computeBreakdown({
      lines: [gumboLine()],
      fulfillment: "PICKUP",
    });
    expect(b.deliveryFee).toBe(0);
  });
});
