import { INVENTORY_ITEMS, SUPPLIERS, type SeedItem } from "@/lib/content/operations";

export type InventoryStatus = "ok" | "low" | "critical";

export type InventoryRow = {
  sku: string;
  name: string;
  category: string;
  onHand: number;
  par: number;
  unit: string;
  costPerUnit: number;
  value: number;
  supplier: string;
  storage: string;
  status: InventoryStatus;
  trackExpiration?: boolean;
};

function statusFor(item: SeedItem): InventoryStatus {
  if (item.onHand <= item.parLevel * 0.5) return "critical";
  if (item.onHand < item.parLevel) return "low";
  return "ok";
}

export function getInventoryRows(): InventoryRow[] {
  return INVENTORY_ITEMS.map((i) => ({
    sku: i.sku,
    name: i.name,
    category: i.category,
    onHand: i.onHand,
    par: i.parLevel,
    unit: i.unit,
    costPerUnit: i.costPerUnit,
    value: Math.round(i.onHand * i.costPerUnit * 100) / 100,
    supplier: i.supplier,
    storage: i.storage,
    status: statusFor(i),
    trackExpiration: i.trackExpiration,
  }));
}

export function getInventorySummary() {
  const rows = getInventoryRows();
  const totalValue = rows.reduce((s, r) => s + r.value, 0);
  const lowCount = rows.filter((r) => r.status !== "ok").length;
  const categories = new Set(rows.map((r) => r.category)).size;
  return {
    totalValue: Math.round(totalValue),
    itemCount: rows.length,
    lowCount,
    categories,
  };
}

export function getInventoryByStorage(storage: string) {
  return getInventoryRows().filter((r) => r.storage === storage);
}

export function getFreezerItems() {
  return getInventoryByStorage("Freezer");
}

export function getWalkInItems() {
  return getInventoryByStorage("Walk-In Cooler");
}

export function getPackagingItems() {
  return getInventoryRows().filter((r) => r.category === "Packaging");
}

export function getWeeklyReorder() {
  return getInventoryRows()
    .filter((r) => r.onHand < r.par)
    .map((r) => ({
      id: r.sku,
      sku: r.sku,
      name: r.name,
      onHand: r.onHand,
      par: r.par,
      gap: r.par - r.onHand,
      unit: r.unit,
      supplier: r.supplier,
      estCost: Math.round((r.par - r.onHand) * r.costPerUnit * 100) / 100,
    }))
    .sort((a, b) => b.estCost - a.estCost);
}

export function getRestaurantDepotCart() {
  return [
    { id: "rd-1", sku: "PRO-CHK", name: "Chicken Thighs", qty: 40, unit: "lb", unitCost: 1.89 },
    { id: "rd-2", sku: "DRY-FLR", name: "All-Purpose Flour", qty: 25, unit: "lb", unitCost: 0.45 },
    { id: "rd-3", sku: "DRY-OIL", name: "Vegetable Oil", qty: 4, unit: "gal", unitCost: 7.2 },
    { id: "rd-4", sku: "DRY-RIC", name: "Long Grain White Rice", qty: 30, unit: "lb", unitCost: 0.62 },
    { id: "rd-5", sku: "PRO-SAU", name: "Smoked Andouille Sausage", qty: 20, unit: "lb", unitCost: 3.49 },
    { id: "rd-6", sku: "DRY-STK-CHK", name: "Chicken Stock Base", qty: 6, unit: "lb", unitCost: 5.5 },
  ].map((i) => ({ ...i, lineTotal: Math.round(i.qty * i.unitCost * 100) / 100 }));
}

export function getRestaurantDepotTotal() {
  return getRestaurantDepotCart().reduce((s, i) => s + i.lineTotal, 0);
}

export function getVendors() {
  const payments = [
    { vendor: "Gulf Coast Seafood Co.", balance: 3840 },
    { vendor: "Peach State Produce", balance: 680 },
    { vendor: "Restaurant Depot", balance: 1920 },
    { vendor: "LA Paper & Packaging", balance: 840 },
    { vendor: "Georgia Power", balance: 892 },
  ];
  return SUPPLIERS.map((s) => ({
    ...s,
    openBalance: payments.find((p) => p.vendor === s.name)?.balance ?? 0,
  }));
}

export { INVENTORY_ITEMS, SUPPLIERS };
