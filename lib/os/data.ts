/**
 * Restaurant OS data layer. Currently derives figures from the canonical
 * operations content + representative sample metrics so the dashboard is fully
 * populated before a live database is connected. Swap these for Prisma queries
 * once the DB is wired.
 */

import { INVENTORY_ITEMS, type SeedItem } from "@/lib/content/operations";

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
  status: InventoryStatus;
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
    status: statusFor(i),
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

export type Kpi = {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
};

export function getDashboardKpis(): Kpi[] {
  const inv = getInventorySummary();
  return [
    { label: "Today's Sales", value: "$3,482", delta: 8.2, hint: "vs. yesterday" },
    { label: "Orders", value: "146", delta: 5.1, hint: "today" },
    { label: "Food Cost %", value: "28.4%", delta: -1.3, hint: "target < 30%" },
    { label: "Prime Cost %", value: "57.1%", delta: -0.6, hint: "food + labor" },
    { label: "Labor %", value: "28.7%", delta: 0.4, hint: "of sales" },
    {
      label: "Inventory Value",
      value: `$${inv.totalValue.toLocaleString()}`,
      hint: `${inv.itemCount} items`,
    },
    { label: "Waste (7d)", value: "$214", delta: -12, hint: "spoilage + overprod." },
    {
      label: "Low Stock",
      value: String(inv.lowCount),
      hint: "below par",
    },
  ];
}

export function getSalesTrend(): { day: string; sales: number }[] {
  return [
    { day: "Mon", sales: 2650 },
    { day: "Tue", sales: 2980 },
    { day: "Wed", sales: 3120 },
    { day: "Thu", sales: 3340 },
    { day: "Fri", sales: 4210 },
    { day: "Sat", sales: 4880 },
    { day: "Sun", sales: 3482 },
  ];
}

export function getCategorySales(): { category: string; sales: number }[] {
  return [
    { category: "Signature Gumbos", sales: 2240 },
    { category: "Sides", sales: 520 },
    { category: "Drinks", sales: 410 },
    { category: "Desserts", sales: 312 },
  ];
}

export function getUpcomingPrep(): { task: string; due: string; qty: string }[] {
  return [
    { task: "Chicken & Sausage roux", due: "Today, 2:00 PM", qty: "20 gal" },
    { task: "Holy trinity prep", due: "Today, 3:00 PM", qty: "18 lb" },
    { task: "Shrimp clean & devein", due: "Tomorrow, 9:00 AM", qty: "30 lb" },
    { task: "Cornbread batter", due: "Tomorrow, 10:00 AM", qty: "120 muffins" },
  ];
}
