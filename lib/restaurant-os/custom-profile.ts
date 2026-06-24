import type { Kpi } from "@/lib/os/demo-data/dashboard";

export type CategorySale = {
  name: string;
  sales: number;
};

export type CustomRestaurantProfile = {
  restaurantName: string;
  city: string;
  address: string;
  cuisineType: string;
  todaySales: number;
  todayOrders: number;
  foodCostPct: number;
  laborPct: number;
  inventoryValue: number;
  lowStockCount: number;
  waste7d: number;
  categories: CategorySale[];
};

export const CUSTOM_PROFILE_STORAGE_KEY = "pjs-restaurant-os-custom-profile";

export const DEFAULT_CUSTOM_PROFILE: CustomRestaurantProfile = {
  restaurantName: "My Restaurant",
  city: "Atlanta, GA",
  address: "",
  cuisineType: "American",
  todaySales: 3200,
  todayOrders: 120,
  foodCostPct: 29,
  laborPct: 28,
  inventoryValue: 8500,
  lowStockCount: 2,
  waste7d: 180,
  categories: [
    { name: "Entrees", sales: 1800 },
    { name: "Sides", sales: 650 },
    { name: "Drinks", sales: 420 },
    { name: "Desserts", sales: 330 },
  ],
};

/** Realistic PJ's Gumbo demo numbers — used by the autofill button. */
export const DEMO_AUTOFILL_PROFILE: CustomRestaurantProfile = {
  restaurantName: "PJ's Gumbo",
  city: "Atlanta, GA",
  address: "229 Peachtree St NE, Atlanta, GA 30303",
  cuisineType: "Louisiana Cajun",
  todaySales: 3482,
  todayOrders: 146,
  foodCostPct: 28.4,
  laborPct: 28.7,
  inventoryValue: 12840,
  lowStockCount: 3,
  waste7d: 214,
  categories: [
    { name: "Signature Gumbos", sales: 2240 },
    { name: "Sides", sales: 520 },
    { name: "Drinks", sales: 410 },
    { name: "Desserts", sales: 312 },
  ],
};

export function deriveKpis(profile: CustomRestaurantProfile): Kpi[] {
  const primeCost = profile.foodCostPct + profile.laborPct;
  return [
    {
      label: "Today's Sales",
      value: `$${profile.todaySales.toLocaleString()}`,
      delta: 6.2,
      hint: "vs. yesterday",
    },
    {
      label: "Orders",
      value: String(profile.todayOrders),
      delta: 4.1,
      hint: "today",
    },
    {
      label: "Food Cost %",
      value: `${profile.foodCostPct.toFixed(1)}%`,
      delta: profile.foodCostPct <= 30 ? -1.2 : 0.8,
      hint: "target < 30%",
    },
    {
      label: "Prime Cost %",
      value: `${primeCost.toFixed(1)}%`,
      delta: primeCost <= 60 ? -0.5 : 0.3,
      hint: "food + labor",
    },
    {
      label: "Labor %",
      value: `${profile.laborPct.toFixed(1)}%`,
      delta: 0.2,
      hint: "of sales",
    },
    {
      label: "Inventory Value",
      value: `$${profile.inventoryValue.toLocaleString()}`,
      hint: "on hand",
    },
    {
      label: "Waste (7d)",
      value: `$${profile.waste7d}`,
      delta: -8,
      hint: "spoilage + overprod.",
    },
    {
      label: "Low Stock",
      value: String(profile.lowStockCount),
      hint: "below par",
    },
  ];
}

export function deriveSalesTrend(profile: CustomRestaurantProfile) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  const base = profile.todaySales;
  const factors = [0.76, 0.85, 0.89, 0.95, 1.12, 1.28, 1];
  return days.map((day, i) => ({
    day,
    sales: Math.round(base * factors[i]),
  }));
}

export function deriveCategorySales(profile: CustomRestaurantProfile) {
  return profile.categories.map((c) => ({
    category: c.name,
    sales: c.sales,
  }));
}

export function profileFromForm(values: Partial<CustomRestaurantProfile>): CustomRestaurantProfile {
  return {
    ...DEFAULT_CUSTOM_PROFILE,
    ...values,
    categories: values.categories?.length
      ? values.categories
      : DEFAULT_CUSTOM_PROFILE.categories,
  };
}
