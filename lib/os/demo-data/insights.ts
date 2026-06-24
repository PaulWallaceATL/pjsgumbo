import type { MenuEngineeringRow } from "@/lib/restaurant-os/types";

export function getMenuEngineering(): MenuEngineeringRow[] {
  return [
    { id: "me-1", name: "PJ's Signature Gumbo", sold: 2840, foodCostPct: 26.2, contributionMargin: 11.84, classification: "Star" },
    { id: "me-2", name: "Chicken & Sausage Gumbo", sold: 1620, foodCostPct: 24.8, contributionMargin: 10.53, classification: "Plow Horse" },
    { id: "me-3", name: "Blue Crab & Sausage Gumbo", sold: 680, foodCostPct: 32.1, contributionMargin: 12.89, classification: "Puzzle" },
    { id: "me-4", name: "Chicken Gumbo", sold: 920, foodCostPct: 23.5, contributionMargin: 9.95, classification: "Plow Horse" },
    { id: "me-5", name: "Veggie Gumbo", sold: 540, foodCostPct: 22.0, contributionMargin: 10.14, classification: "Plow Horse" },
    { id: "me-6", name: "Dirty Rice", sold: 1180, foodCostPct: 18.4, contributionMargin: 4.9, classification: "Star" },
    { id: "me-7", name: "Fried Okra", sold: 420, foodCostPct: 21.0, contributionMargin: 4.74, classification: "Dog" },
  ];
}

export function getExpansionAnalysis() {
  return {
    location: "Old Fourth Ward — Krog Street area",
    year1Revenue: 980000,
    monthlyRent: 6500,
    breakevenMonth: 14,
    roiData: Array.from({ length: 36 }, (_, i) => ({
      month: i + 1,
      cumulativeProfit: i < 14 ? -(42000 - i * 2800) : (i - 13) * 8200 - 8400,
    })),
  };
}
