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
  /** Operations / dashboard */
  todaySales: number;
  todayOrders: number;
  foodCostPct: number;
  laborPct: number;
  primeCostPct: number;
  inventoryValue: number;
  lowStockCount: number;
  waste7d: number;
  categories: CategorySale[];
  /** Bookkeeping */
  posTicketsToday: number;
  monthlyExpenses: number;
  bankBalance: number;
  unmatchedDeposits: number;
  /** Payroll & labor */
  employeeCount: number;
  weeklyPayrollTotal: number;
  laborHoursWeek: number;
  /** Tax compliance */
  salesTaxRate: number;
  nextTaxDeadline: string;
  openTaxFilings: number;
  /** Inventory */
  inventorySkuCount: number;
  criticalStockCount: number;
  /** Orders & delivery */
  activeOrders: number;
  deliveryZoneCount: number;
  avgDeliveryTicket: number;
  topOrderChannel: string;
  /** Production */
  prepTasksToday: number;
  batchesThisWeek: number;
  /** Financial reporting */
  monthlyRevenue: number;
  netIncomeYtd: number;
  /** Cash flow */
  cashOnHand: number;
  netCashFlow30d: number;
  vendorPaymentsDue: number;
  /** Budgeting */
  projectedMonthlySales: number;
  seasonalLiftPct: number;
  /** Loads all 11 OS modules with full PJ's demo datasets */
  useFullOsDemo: boolean;
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
  primeCostPct: 57,
  inventoryValue: 8500,
  lowStockCount: 2,
  waste7d: 180,
  categories: [
    { name: "Entrees", sales: 1800 },
    { name: "Sides", sales: 650 },
    { name: "Drinks", sales: 420 },
    { name: "Desserts", sales: 330 },
  ],
  posTicketsToday: 24,
  monthlyExpenses: 42000,
  bankBalance: 5000,
  unmatchedDeposits: 2,
  employeeCount: 6,
  weeklyPayrollTotal: 8500,
  laborHoursWeek: 320,
  salesTaxRate: 8.9,
  nextTaxDeadline: "Sales tax — next month",
  openTaxFilings: 1,
  inventorySkuCount: 32,
  criticalStockCount: 1,
  activeOrders: 8,
  deliveryZoneCount: 6,
  avgDeliveryTicket: 28,
  topOrderChannel: "DoorDash",
  prepTasksToday: 4,
  batchesThisWeek: 6,
  monthlyRevenue: 95000,
  netIncomeYtd: 12000,
  cashOnHand: 45000,
  netCashFlow30d: 12000,
  vendorPaymentsDue: 3,
  projectedMonthlySales: 98000,
  seasonalLiftPct: 12,
  useFullOsDemo: true,
};

export { buildDemoAutofillProfile } from "@/lib/restaurant-os/build-demo-profile";

/** @deprecated use buildDemoAutofillProfile() */
export const DEMO_AUTOFILL_PROFILE: CustomRestaurantProfile = DEFAULT_CUSTOM_PROFILE;

export function normalizeProfile(
  partial: Partial<CustomRestaurantProfile>,
): CustomRestaurantProfile {
  return {
    ...DEFAULT_CUSTOM_PROFILE,
    ...partial,
    categories:
      partial.categories?.length ?
        partial.categories.map((c) => ({ ...c }))
      : DEFAULT_CUSTOM_PROFILE.categories.map((c) => ({ ...c })),
  };
}

export function deriveKpis(profile: CustomRestaurantProfile): Kpi[] {
  const primeCost = profile.primeCostPct || profile.foodCostPct + profile.laborPct;
  return [
    {
      label: "Today's Sales",
      value: `$${profile.todaySales.toLocaleString()}`,
      delta: 8.2,
      hint: "vs. yesterday",
    },
    {
      label: "Orders",
      value: String(profile.todayOrders),
      delta: 5.1,
      hint: "today",
    },
    {
      label: "Food Cost %",
      value: `${profile.foodCostPct.toFixed(1)}%`,
      delta: profile.foodCostPct <= 30 ? -1.3 : 0.8,
      hint: "target < 30%",
    },
    {
      label: "Prime Cost %",
      value: `${primeCost.toFixed(1)}%`,
      delta: primeCost <= 60 ? -0.6 : 0.4,
      hint: "food + labor",
    },
    {
      label: "Labor %",
      value: `${profile.laborPct.toFixed(1)}%`,
      delta: 0.4,
      hint: "of sales",
    },
    {
      label: "Inventory Value",
      value: `$${profile.inventoryValue.toLocaleString()}`,
      hint: `${profile.inventorySkuCount} SKUs`,
    },
    {
      label: "Waste (7d)",
      value: `$${profile.waste7d}`,
      delta: -12,
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
  return normalizeProfile({ ...values, useFullOsDemo: true });
}
