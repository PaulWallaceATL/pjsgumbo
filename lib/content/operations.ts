/**
 * Canonical operations reference data (inventory, units, categories, storage,
 * suppliers). Used by the Prisma seed and by the Restaurant OS as a fallback
 * data source before a live database is connected.
 */

export type UnitType = "WEIGHT" | "VOLUME" | "EACH";
export type StorageType = "DRY" | "WALK_IN_COOLER" | "FREEZER";

export const UNITS: { name: string; abbreviation: string; type: UnitType }[] = [
  { name: "Pound", abbreviation: "lb", type: "WEIGHT" },
  { name: "Ounce", abbreviation: "oz", type: "WEIGHT" },
  { name: "Gallon", abbreviation: "gal", type: "VOLUME" },
  { name: "Quart", abbreviation: "qt", type: "VOLUME" },
  { name: "Cup", abbreviation: "cup", type: "VOLUME" },
  { name: "Fluid Ounce", abbreviation: "fl oz", type: "VOLUME" },
  { name: "Each", abbreviation: "ea", type: "EACH" },
  { name: "Case", abbreviation: "cs", type: "EACH" },
];

export const INVENTORY_CATEGORIES = [
  "Proteins",
  "Seafood",
  "Produce",
  "Dry Goods",
  "Spices",
  "Dairy",
  "Beverages",
  "Packaging",
  "Cleaning",
];

export const STORAGE_LOCATIONS: { name: string; type: StorageType }[] = [
  { name: "Dry Storage", type: "DRY" },
  { name: "Walk-In Cooler", type: "WALK_IN_COOLER" },
  { name: "Freezer", type: "FREEZER" },
];

export const SUPPLIERS: { name: string; type: string }[] = [
  { name: "Restaurant Depot", type: "Wholesale" },
  { name: "Gulf Coast Seafood Co.", type: "Seafood" },
  { name: "Acadiana Produce", type: "Produce" },
  { name: "LA Paper & Packaging", type: "Paper Goods" },
  { name: "CleanPro Supplies", type: "Cleaning" },
];

export type SeedItem = {
  sku: string;
  name: string;
  category: string;
  unit: string;
  storage: string;
  supplier: string;
  costPerUnit: number;
  parLevel: number;
  onHand: number;
  isPackaging?: boolean;
  trackExpiration?: boolean;
};

export const INVENTORY_ITEMS: SeedItem[] = [
  // Proteins
  { sku: "PRO-CHK", name: "Chicken Thighs", category: "Proteins", unit: "lb", storage: "Walk-In Cooler", supplier: "Restaurant Depot", costPerUnit: 1.89, parLevel: 80, onHand: 92, trackExpiration: true },
  { sku: "PRO-SAU", name: "Smoked Andouille Sausage", category: "Proteins", unit: "lb", storage: "Walk-In Cooler", supplier: "Restaurant Depot", costPerUnit: 3.49, parLevel: 60, onHand: 68, trackExpiration: true },
  // Seafood
  { sku: "SEA-SHR", name: "Gulf Shrimp (21/25)", category: "Seafood", unit: "lb", storage: "Freezer", supplier: "Gulf Coast Seafood Co.", costPerUnit: 7.95, parLevel: 40, onHand: 30, trackExpiration: true },
  { sku: "SEA-CRB", name: "Blue Crab", category: "Seafood", unit: "lb", storage: "Freezer", supplier: "Gulf Coast Seafood Co.", costPerUnit: 9.5, parLevel: 24, onHand: 11, trackExpiration: true },
  // Produce
  { sku: "PRD-OKR", name: "Fresh Okra", category: "Produce", unit: "lb", storage: "Walk-In Cooler", supplier: "Acadiana Produce", costPerUnit: 2.25, parLevel: 30, onHand: 22, trackExpiration: true },
  { sku: "PRD-ONI", name: "Yellow Onions", category: "Produce", unit: "lb", storage: "Dry Storage", supplier: "Acadiana Produce", costPerUnit: 0.69, parLevel: 50, onHand: 58 },
  { sku: "PRD-BPR", name: "Green Bell Peppers", category: "Produce", unit: "lb", storage: "Walk-In Cooler", supplier: "Acadiana Produce", costPerUnit: 1.15, parLevel: 30, onHand: 34 },
  { sku: "PRD-CEL", name: "Celery", category: "Produce", unit: "lb", storage: "Walk-In Cooler", supplier: "Acadiana Produce", costPerUnit: 1.05, parLevel: 25, onHand: 28 },
  { sku: "PRD-SER", name: "Serrano Peppers", category: "Produce", unit: "lb", storage: "Walk-In Cooler", supplier: "Acadiana Produce", costPerUnit: 2.4, parLevel: 8, onHand: 3 },
  { sku: "PRD-JAL", name: "Jalapeños", category: "Produce", unit: "lb", storage: "Walk-In Cooler", supplier: "Acadiana Produce", costPerUnit: 1.6, parLevel: 8, onHand: 5 },
  // Dry goods
  { sku: "DRY-FLR", name: "All-Purpose Flour", category: "Dry Goods", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 0.45, parLevel: 50, onHand: 60 },
  { sku: "DRY-OIL", name: "Vegetable Oil", category: "Dry Goods", unit: "gal", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 7.2, parLevel: 10, onHand: 7 },
  { sku: "DRY-RIC", name: "Long Grain White Rice", category: "Dry Goods", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 0.62, parLevel: 60, onHand: 72 },
  { sku: "DRY-STK-CHK", name: "Chicken Stock Base", category: "Dry Goods", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 5.5, parLevel: 12, onHand: 14 },
  { sku: "DRY-STK-SEA", name: "Seafood Stock Base", category: "Dry Goods", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 6.8, parLevel: 8, onHand: 3 },
  { sku: "DRY-CORN", name: "Cornbread Mix", category: "Dry Goods", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 0.9, parLevel: 20, onHand: 24 },
  // Spices
  { sku: "SPC-CAJ", name: "Cajun Seasoning Blend", category: "Spices", unit: "lb", storage: "Dry Storage", supplier: "Restaurant Depot", costPerUnit: 4.25, parLevel: 10, onHand: 12 },
  // Dairy
  { sku: "DRY-CHE", name: "Shredded Cheddar", category: "Dairy", unit: "lb", storage: "Walk-In Cooler", supplier: "Restaurant Depot", costPerUnit: 3.1, parLevel: 12, onHand: 14 },
  // Packaging
  { sku: "PKG-CUP", name: "8 oz Soup Cup", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.12, parLevel: 1000, onHand: 1180, isPackaging: true },
  { sku: "PKG-BWL", name: "16 oz Bowl", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.18, parLevel: 1000, onHand: 1240, isPackaging: true },
  { sku: "PKG-LBWL", name: "24 oz Large Bowl", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.24, parLevel: 600, onHand: 720, isPackaging: true },
  { sku: "PKG-QT", name: "Quart Container", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.34, parLevel: 500, onHand: 360, isPackaging: true },
  { sku: "PKG-HG", name: "Half Gallon Container", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.62, parLevel: 300, onHand: 120, isPackaging: true },
  { sku: "PKG-LID", name: "Container Lid", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.08, parLevel: 2000, onHand: 2400, isPackaging: true },
  { sku: "PKG-BAG", name: "Carryout Bag", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.1, parLevel: 1500, onHand: 1720, isPackaging: true },
  { sku: "PKG-NAP", name: "Napkins", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.01, parLevel: 5000, onHand: 5600, isPackaging: true },
  { sku: "PKG-SPN", name: "Soup Spoon", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.03, parLevel: 3000, onHand: 3200, isPackaging: true },
  { sku: "PKG-CC", name: "Condiment Cup", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.02, parLevel: 3000, onHand: 2600, isPackaging: true },
  { sku: "PKG-LBL", name: "Label / Sticker", category: "Packaging", unit: "ea", storage: "Dry Storage", supplier: "LA Paper & Packaging", costPerUnit: 0.015, parLevel: 4000, onHand: 4300, isPackaging: true },
];

/** Map an add-on slug to the inventory SKU it consumes (for auto-deduction). */
export const ADDON_INVENTORY: Record<string, string> = {
  shrimp: "SEA-SHR",
  okra: "PRD-OKR",
  "extra-chicken": "PRO-CHK",
  "extra-smoked-sausage": "PRO-SAU",
  "extra-rice": "DRY-RIC",
  "extra-blue-crab": "SEA-CRB",
};
