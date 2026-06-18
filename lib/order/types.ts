import type { MenuSizeKey, SpiceLevel } from "@/lib/content/menu";

export type Fulfillment = "DELIVERY" | "PICKUP";

export type CartAddOn = { slug: string; name: string; price: number };

export type CartLine = {
  /** Unique per configured line (same item + different options = new line). */
  id: string;
  itemSlug: string;
  name: string;
  kind: "GUMBO" | "SIMPLE";
  size?: MenuSizeKey;
  sizeLabel?: string;
  spice?: SpiceLevel;
  addOns: CartAddOn[];
  /** Base price for the chosen size (gumbo) or the item price (simple). */
  unitBasePrice: number;
  quantity: number;
  notes?: string;
};

export type PriceBreakdown = {
  subtotal: number;
  discount: number;
  promoApplied: string | null;
  promoMessage: string | null;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
};
