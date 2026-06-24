import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Boxes,
  ChefHat,
  LayoutDashboard,
  Receipt,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

/** Sidebar icons keyed by demo module id */
export const MODULE_ICONS: Record<string, LucideIcon> = {
  operations: LayoutDashboard,
  bookkeeping: BookOpen,
  financial: BarChart3,
  production: ChefHat,
  inventory: Boxes,
  orders: Truck,
  payroll: Users,
  tax: Receipt,
  budgeting: TrendingUp,
  cashflow: Wallet,
  advice: Sparkles,
};

export { Activity };
