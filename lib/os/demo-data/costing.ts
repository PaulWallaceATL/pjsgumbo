import { GUMBOS, MENU_SIZES } from "@/lib/content/menu";
import { getMenuEngineering } from "./insights";

export function getFoodCostRows() {
  return getMenuEngineering().map((m) => ({
    id: m.id,
    item: m.name,
    sold: m.sold,
    foodCostPct: m.foodCostPct,
    targetPct: 30,
    status: m.foodCostPct <= 30 ? "On Target" as const : "Over" as const,
  }));
}

export function getProfitMarginRows() {
  return getMenuEngineering().map((m) => ({
    id: m.id,
    item: m.name,
    price: 16,
    foodCost: Math.round(16 * (m.foodCostPct / 100) * 100) / 100,
    margin: m.contributionMargin,
    marginPct: Math.round((m.contributionMargin / 16) * 1000) / 10,
    classification: m.classification,
  }));
}

export function getPortionRows() {
  return GUMBOS.flatMap((g) =>
    MENU_SIZES.map((s) => ({
      id: `${g.slug}-${s.key}`,
      item: g.name,
      size: s.label,
      ounces: s.ounces,
      price: g.prices[s.key],
      yieldPer10Gal: Math.round((s.ounces / 16) * 80),
    })),
  );
}
