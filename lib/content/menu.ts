/**
 * Canonical menu catalog for PJ's Gumbo.
 *
 * This is the single source of truth used by both the marketing site (Menu,
 * Featured Gumbo) and the Phase 1 database seed, so prices and items never
 * drift between the two apps.
 */

export type SpiceLevel = "MILD" | "SPICY";

export type MenuSizeKey =
  | "CUP"
  | "BOWL"
  | "LARGE_BOWL"
  | "QUART"
  | "HALF_GALLON";

export type MenuCategoryKey =
  | "SIGNATURE_GUMBOS"
  | "SIDES"
  | "DESSERTS"
  | "DRINKS";

export const MENU_SIZES: { key: MenuSizeKey; label: string; ounces: number }[] =
  [
    { key: "CUP", label: "Cup", ounces: 8 },
    { key: "BOWL", label: "Bowl", ounces: 16 },
    { key: "LARGE_BOWL", label: "Large Bowl", ounces: 24 },
    { key: "QUART", label: "Quart", ounces: 32 },
    { key: "HALF_GALLON", label: "Half Gallon", ounces: 64 },
  ];

export type GumboItem = {
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  weekendOnly?: boolean;
  featured?: boolean;
  /** Price by size, in dollars. */
  prices: Record<MenuSizeKey, number>;
};

export const GUMBOS: GumboItem[] = [
  {
    slug: "pjs-signature-gumbo",
    name: "PJ's Signature Gumbo",
    description:
      "Our house gumbo, simmered for hours over a dark, hand-stirred roux. Chicken, smoked sausage, Gulf shrimp, and okra in one soulful bowl.",
    ingredients: [
      "Chicken",
      "Smoked sausage",
      "Gulf shrimp",
      "Okra",
      "Holy trinity",
      "Dark roux",
      "White rice",
    ],
    featured: true,
    prices: { CUP: 7.5, BOWL: 12.5, LARGE_BOWL: 15.5, QUART: 21, HALF_GALLON: 38 },
  },
  {
    slug: "chicken-sausage-gumbo",
    name: "Chicken & Sausage Gumbo",
    description:
      "The Louisiana classic. Tender chicken and smoked andouille sausage in a rich, slow-cooked roux.",
    ingredients: [
      "Chicken",
      "Smoked sausage",
      "Holy trinity",
      "Dark roux",
      "White rice",
    ],
    prices: { CUP: 6.5, BOWL: 10.5, LARGE_BOWL: 13.5, QUART: 18, HALF_GALLON: 32 },
  },
  {
    slug: "chicken-gumbo",
    name: "Chicken Gumbo",
    description:
      "All-chicken comfort in a bowl, built on the same deep, dark roux.",
    ingredients: ["Chicken", "Holy trinity", "Dark roux", "White rice"],
    prices: { CUP: 6, BOWL: 9.5, LARGE_BOWL: 12.5, QUART: 16.5, HALF_GALLON: 29 },
  },
  {
    slug: "veggie-gumbo",
    name: "Veggie Gumbo",
    description:
      "A hearty, plant-forward gumbo loaded with okra and the holy trinity over rice. No meat, all soul.",
    ingredients: [
      "Okra",
      "Holy trinity",
      "Tomatoes",
      "Vegetable stock",
      "Dark roux",
      "White rice",
    ],
    prices: { CUP: 6, BOWL: 9.5, LARGE_BOWL: 12.5, QUART: 16.5, HALF_GALLON: 29 },
  },
  {
    slug: "blue-crab-sausage-gumbo",
    name: "Weekend Blue Crab & Sausage Gumbo",
    description:
      "Our weekend special. Sweet Gulf blue crab and smoked sausage in a luxurious seafood roux. Available Saturday & Sunday only.",
    ingredients: [
      "Blue crab",
      "Smoked sausage",
      "Holy trinity",
      "Seafood stock",
      "Dark roux",
      "White rice",
    ],
    weekendOnly: true,
    featured: true,
    prices: { CUP: 9, BOWL: 15, LARGE_BOWL: 19, QUART: 27, HALF_GALLON: 48 },
  },
];

export type AddOn = {
  slug: string;
  name: string;
  price: number;
  weekendOnly?: boolean;
};

export const ADD_ONS: AddOn[] = [
  { slug: "shrimp", name: "Shrimp", price: 3.5 },
  { slug: "okra", name: "Okra", price: 1.5 },
  { slug: "extra-chicken", name: "Extra Chicken", price: 2.5 },
  { slug: "extra-smoked-sausage", name: "Extra Smoked Sausage", price: 2.5 },
  { slug: "extra-rice", name: "Extra Rice", price: 1 },
  {
    slug: "extra-blue-crab",
    name: "Extra Blue Crab",
    price: 5,
    weekendOnly: true,
  },
];

export type SimpleItem = {
  slug: string;
  name: string;
  description?: string;
  price: number;
};

export const SIDES: SimpleItem[] = [
  { slug: "cornbread-muffins", name: "Cornbread Muffins", price: 3.5 },
  {
    slug: "jalapeno-cheddar-cornbread-muffins",
    name: "Jalapeño Cheddar Cornbread Muffins",
    price: 4.5,
  },
  { slug: "french-fries", name: "French Fries", price: 3.5 },
  { slug: "cole-slaw", name: "Cole Slaw", price: 3 },
  { slug: "dirty-rice", name: "Dirty Rice", price: 4 },
  { slug: "fried-okra", name: "Fried Okra", price: 4 },
  { slug: "cajun-green-beans", name: "Cajun Green Beans", price: 3.5 },
  { slug: "white-rice", name: "White Rice", price: 2 },
];

export const DESSERTS: SimpleItem[] = [
  {
    slug: "ooey-gooey-butter-cake",
    name: "PJ's Ooey Gooey Butter Cake",
    description: "Rich, buttery, and dangerously good — a Southern bakery classic.",
    price: 5.5,
  },
];

export const DRINKS: SimpleItem[] = [
  { slug: "sweet-tea", name: "Sweet Tea", price: 2.75 },
  { slug: "unsweet-tea", name: "Unsweet Tea", price: 2.75 },
  { slug: "lemonade", name: "Lemonade", price: 3 },
  { slug: "strawberry-lemonade", name: "Strawberry Lemonade", price: 3.5 },
  { slug: "bottled-water", name: "Bottled Water", price: 2 },
  { slug: "soft-drinks", name: "Soft Drinks", price: 2.5 },
];

export const SPICE_LEVELS: { key: SpiceLevel; label: string; note: string }[] = [
  { key: "MILD", label: "Mild", note: "Warm and balanced" },
  {
    key: "SPICY",
    label: "Spicy",
    note: "Kicked up with fresh serrano peppers",
  },
];

export const MENU_CATEGORIES: {
  key: MenuCategoryKey;
  label: string;
  description: string;
}[] = [
  {
    key: "SIGNATURE_GUMBOS",
    label: "Signature Gumbos",
    description: "Slow-cooked over a dark roux, available mild or spicy.",
  },
  { key: "SIDES", label: "Sides", description: "Southern staples." },
  { key: "DESSERTS", label: "Desserts", description: "Save room." },
  { key: "DRINKS", label: "Drinks", description: "Wash it all down." },
];
