/**
 * Restaurant OS public demo data — pitch-perfect dummy figures for PJ's Gumbo.
 * Grounded in lib/content/* canonical menu, inventory, and site data.
 */

import { INVENTORY_ITEMS } from "@/lib/content/operations";
import { getInventoryRows } from "@/lib/os/data";
import type {
  BalanceSheetItem,
  BankTransaction,
  CashFlowItem,
  DemoKpi,
  Expense,
  MenuEngineeringRow,
  PayrollRow,
  PlLineItem,
  PosSale,
  StaffingForecast,
  TaxComplianceItem,
  TaxDeadline,
  VendorPayment,
  WasteEntry,
} from "./types";

export function getDemoKpis(): DemoKpi[] {
  return [
    { label: "Today's Sales", value: "$3,482", delta: 8.2, hint: "vs. yesterday" },
    { label: "Food Cost %", value: "28.4%", delta: -1.3, hint: "target < 30%" },
    { label: "Labor %", value: "28.7%", delta: 0.4, hint: "of sales" },
    { label: "Cash on Hand", value: "$42,180", hint: "operating account" },
  ];
}

export function getPosSalesFeed(): PosSale[] {
  const items = [
    { item: "Signature Gumbo Bowl", price: 16 },
    { item: "Signature Gumbo Quart", price: 30 },
    { item: "Signature Gumbo Cup", price: 10 },
    { item: "Chicken & Sausage Bowl", price: 14 },
    { item: "Blue Crab & Sausage Bowl", price: 19 },
    { item: "Blue Crab & Sausage Quart", price: 36 },
    { item: "Veggie Gumbo Bowl", price: 13 },
    { item: "Dirty Rice", price: 6 },
    { item: "Cornbread Muffins (2)", price: 5 },
    { item: "Sweet Tea", price: 3.5 },
    { item: "Jalapeño Cheddar Cornbread", price: 6 },
    { item: "Fried Okra", price: 6 },
    { item: "PJ's Ooey Gooey Butter Cake", price: 8 },
    { item: "Signature Gumbo Half Gallon", price: 56 },
    { item: "Cajun Green Beans", price: 5 },
  ];
  const payments: PosSale["payment"][] = ["Card", "Card", "Card", "Cash", "DoorDash", "Uber Eats"];
  const times = [
    "11:04 AM", "11:18 AM", "11:32 AM", "11:45 AM", "12:02 PM", "12:15 PM",
    "12:28 PM", "12:41 PM", "12:55 PM", "1:08 PM", "1:22 PM", "1:35 PM",
    "1:48 PM", "2:01 PM", "2:14 PM", "2:27 PM", "2:40 PM", "2:53 PM",
    "3:06 PM", "3:19 PM", "3:32 PM", "3:45 PM", "4:02 PM", "4:18 PM",
    "4:35 PM", "5:02 PM", "5:28 PM", "6:15 PM", "6:42 PM", "7:08 PM",
  ];
  return times.map((time, i) => {
    const pick = items[i % items.length];
    const qty = pick.item.includes("Half Gallon") ? 1 : (i % 3 === 0 ? 2 : 1);
    const subtotal = pick.price * qty;
    const tax = Math.round(subtotal * 0.089 * 100) / 100;
    const tip = payments[i % payments.length] === "Cash" ? 0 : Math.round(subtotal * 0.18 * 100) / 100;
    return {
      id: `pos-${i + 1}`,
      time,
      ticket: `#${1042 + i}`,
      item: pick.item,
      qty,
      subtotal,
      tax,
      tip,
      payment: payments[i % payments.length],
    };
  });
}

export function getExpenses(): Expense[] {
  return [
    { id: "exp-1", date: "2026-06-20", vendor: "Gulf Coast Seafood Co.", category: "Food / Seafood", amount: 3840, status: "Paid", memo: "Gulf shrimp 40 lb, blue crab 18 lb" },
    { id: "exp-2", date: "2026-06-18", vendor: "Peach State Produce", category: "Food / Produce", amount: 680, status: "Paid", memo: "Holy trinity, okra, serrano" },
    { id: "exp-3", date: "2026-06-17", vendor: "Restaurant Depot", category: "Food / Seafood", amount: 1920, status: "Paid", memo: "Chicken thighs, andouille, stock base" },
    { id: "exp-4", date: "2026-06-15", vendor: "Coca-Cola Bottling", category: "Beverages", amount: 420, status: "Paid" },
    { id: "exp-5", date: "2026-06-14", vendor: "Payroll — Biweekly", category: "Payroll", amount: 14850, status: "Paid" },
    { id: "exp-6", date: "2026-06-12", vendor: "Georgia Power", category: "Atlanta Utilities", amount: 892, status: "Paid", memo: "Peachtree commissary" },
    { id: "exp-7", date: "2026-06-10", vendor: "City of Atlanta Water", category: "Atlanta Utilities", amount: 458, status: "Paid" },
    { id: "exp-8", date: "2026-06-22", vendor: "Gulf Coast Seafood Co.", category: "Food / Seafood", amount: 3120, status: "Pending", memo: "Weekly shrimp order" },
    { id: "exp-9", date: "2026-06-21", vendor: "Peach State Produce", category: "Food / Produce", amount: 540, status: "Pending" },
    { id: "exp-10", date: "2026-06-28", vendor: "Payroll — Biweekly", category: "Payroll", amount: 15200, status: "Pending" },
    { id: "exp-11", date: "2026-06-08", vendor: "Restaurant Depot", category: "Food / Seafood", amount: 1640, status: "Paid", memo: "Roux inputs: flour, oil, rice" },
    { id: "exp-12", date: "2026-06-05", vendor: "Atlanta Gas Light", category: "Atlanta Utilities", amount: 312, status: "Paid" },
  ];
}

export function getBankTransactions(): BankTransaction[] {
  return [
    { id: "bank-1", date: "2026-06-23", description: "Square POS batch — Jun 23", amount: 2942.17, type: "deposit", status: "matched", matchedTo: "POS batch #8821" },
    { id: "bank-2", date: "2026-06-23", description: "Cash deposit — register", amount: 540.0, type: "deposit", status: "matched", matchedTo: "Cash drawer EOD" },
    { id: "bank-3", date: "2026-06-23", description: "DoorDash payout (pending)", amount: 412.5, type: "deposit", status: "pending", matchedTo: "DoorDash — Jun 22 orders" },
    { id: "bank-4", date: "2026-06-22", description: "Gulf Coast Seafood Co.", amount: -3840, type: "withdrawal", status: "matched", matchedTo: "Invoice #GC-4482" },
    { id: "bank-5", date: "2026-06-21", description: "Square POS batch — Jun 21", amount: 3188.42, type: "deposit", status: "matched", matchedTo: "POS batch #8819" },
    { id: "bank-6", date: "2026-06-20", description: "Georgia Power ACH", amount: -892, type: "withdrawal", status: "matched", matchedTo: "Utility bill Jun" },
    { id: "bank-7", date: "2026-06-19", description: "Uber Eats payout", amount: 286.3, type: "deposit", status: "unmatched" },
    { id: "bank-8", date: "2026-06-18", description: "Peach State Produce", amount: -680, type: "withdrawal", status: "matched", matchedTo: "Invoice #PS-1192" },
  ];
}

export function getPlStatement(): PlLineItem[] {
  return [
    { id: "pl-1", label: "Revenue", amount: 0, section: "revenue" },
    { id: "pl-2", label: "Gumbo Sales", amount: 68420, section: "revenue", indent: 1 },
    { id: "pl-3", label: "Sides & Add-ons", amount: 12840, section: "revenue", indent: 1 },
    { id: "pl-4", label: "Beverages", amount: 8120, section: "revenue", indent: 1 },
    { id: "pl-5", label: "Catering", amount: 16120, section: "revenue", indent: 1 },
    { id: "pl-6", label: "Total Revenue", amount: 105500, section: "summary" },
    { id: "pl-7", label: "Cost of Goods Sold", amount: 0, section: "cogs" },
    { id: "pl-8", label: "Seafood (shrimp, crab)", amount: 14280, section: "cogs", indent: 1 },
    { id: "pl-9", label: "Proteins & Produce", amount: 8640, section: "cogs", indent: 1 },
    { id: "pl-10", label: "Dry Goods & Roux Inputs", amount: 3280, section: "cogs", indent: 1 },
    { id: "pl-11", label: "Beverage COGS", amount: 1190, section: "cogs", indent: 1 },
    { id: "pl-12", label: "Total COGS", amount: 27390, section: "summary" },
    { id: "pl-13", label: "Gross Profit", amount: 78110, section: "summary" },
    { id: "pl-14", label: "Operating Expenses", amount: 0, section: "opex" },
    { id: "pl-15", label: "Labor", amount: 30280, section: "opex", indent: 1 },
    { id: "pl-16", label: "Commissary Rent", amount: 4200, section: "opex", indent: 1 },
    { id: "pl-17", label: "Utilities (Atlanta)", amount: 1850, section: "opex", indent: 1 },
    { id: "pl-18", label: "Marketing & Delivery Fees", amount: 3420, section: "opex", indent: 1 },
    { id: "pl-19", label: "Insurance & Admin", amount: 2100, section: "opex", indent: 1 },
    { id: "pl-20", label: "Total Operating Expenses", amount: 41850, section: "summary" },
    { id: "pl-21", label: "Net Income", amount: 36260, section: "summary" },
  ];
}

export function getBalanceSheet(): BalanceSheetItem[] {
  return [
    { id: "bs-1", label: "Cash & Equivalents", amount: 42180, side: "asset" },
    { id: "bs-2", label: "Inventory", amount: 18640, side: "asset" },
    { id: "bs-3", label: "Prepaid Expenses", amount: 2400, side: "asset" },
    { id: "bs-4", label: "Kitchen Equipment", amount: 28400, side: "asset" },
    { id: "bs-5", label: "Total Assets", amount: 91620, side: "asset" },
    { id: "bs-6", label: "Accounts Payable", amount: 6240, side: "liability" },
    { id: "bs-7", label: "Sales Tax Payable", amount: 2140, side: "liability" },
    { id: "bs-8", label: "Payroll Liabilities", amount: 3820, side: "liability" },
    { id: "bs-9", label: "Equipment Loan", amount: 12000, side: "liability" },
    { id: "bs-10", label: "Total Liabilities", amount: 24200, side: "liability" },
    { id: "bs-11", label: "Owner's Equity", amount: 67420, side: "equity" },
  ];
}

export function getCashFlowStatement(): CashFlowItem[] {
  return [
    { id: "cf-1", label: "Net Income", amount: 36260, section: "operating" },
    { id: "cf-2", label: "Depreciation", amount: 680, section: "operating" },
    { id: "cf-3", label: "Inventory change", amount: -1240, section: "operating" },
    { id: "cf-4", label: "Accounts payable change", amount: 820, section: "operating" },
    { id: "cf-5", label: "Net Cash from Operations", amount: 36520, section: "operating" },
    { id: "cf-6", label: "Equipment purchase", amount: -4200, section: "investing" },
    { id: "cf-7", label: "Net Cash from Investing", amount: -4200, section: "investing" },
    { id: "cf-8", label: "Loan principal payment", amount: -500, section: "financing" },
    { id: "cf-9", label: "Owner draw", amount: -8000, section: "financing" },
    { id: "cf-10", label: "Net Cash from Financing", amount: -8500, section: "financing" },
    { id: "cf-11", label: "Net Change in Cash", amount: 23820, section: "operating" },
  ];
}

export function getSalesReportMonthly(): { month: string; sales: number; priorYear?: number }[] {
  return [
    { month: "Jul", sales: 88200, priorYear: 82400 },
    { month: "Aug", sales: 86400, priorYear: 81200 },
    { month: "Sep", sales: 91800, priorYear: 85600 },
    { month: "Oct", sales: 96200, priorYear: 89400 },
    { month: "Nov", sales: 102400, priorYear: 94800 },
    { month: "Dec", sales: 114800, priorYear: 106200 },
    { month: "Jan", sales: 108600, priorYear: 99800 },
    { month: "Feb", sales: 104200, priorYear: 96200 },
    { month: "Mar", sales: 98600, priorYear: 92400 },
    { month: "Apr", sales: 94800, priorYear: 88600 },
    { month: "May", sales: 92400, priorYear: 86800 },
    { month: "Jun", sales: 105500, priorYear: 98200 },
  ];
}

export function getLaborCostWeekly(): { week: string; sales: number; labor: number }[] {
  return [
    { week: "W1", sales: 24800, labor: 7120 },
    { week: "W2", sales: 26200, labor: 7480 },
    { week: "W3", sales: 25600, labor: 7340 },
    { week: "W4", sales: 28900, labor: 8340 },
  ];
}

export function getInventoryDemoRows() {
  return getInventoryRows().filter((r) => !r.category.includes("Packaging"));
}

export function getCostPercentages() {
  return {
    food: 28.4,
    beverage: 22.1,
    combined: 27.6,
    foodTarget: 30,
    beverageTarget: 25,
    combinedTarget: 30,
  };
}

export function getWasteLog(): WasteEntry[] {
  return [
    { id: "w-1", date: "2026-06-22", item: "Gulf Shrimp (21/25)", qty: "3 lb", reason: "Spoiled — walk-in cooler temp spike", cogsImpact: 23.85, loggedBy: "Marcus T." },
    { id: "w-2", date: "2026-06-21", item: "Signature Gumbo", qty: "2 gal", reason: "Overproduction — slow Tuesday", cogsImpact: 41.2, loggedBy: "Keisha R." },
    { id: "w-3", date: "2026-06-20", item: "Fresh Okra", qty: "4 lb", reason: "Trim loss — quality below standard", cogsImpact: 9.0, loggedBy: "Marcus T." },
    { id: "w-4", date: "2026-06-19", item: "Blue Crab", qty: "1.5 lb", reason: "Freezer burn — weekend prep", cogsImpact: 14.25, loggedBy: "Darnell W." },
    { id: "w-5", date: "2026-06-18", item: "Cornbread Batter", qty: "24 muffins", reason: "Burned batch — oven calibration", cogsImpact: 12.6, loggedBy: "Keisha R." },
    { id: "w-6", date: "2026-06-17", item: "Serrano Peppers", qty: "0.5 lb", reason: "Wilting — past hold time", cogsImpact: 1.2, loggedBy: "Marcus T." },
    { id: "w-7", date: "2026-06-16", item: "Dirty Rice", qty: "3 qt", reason: "End-of-shift discard", cogsImpact: 8.4, loggedBy: "Darnell W." },
  ];
}

export function getPayrollRows(): PayrollRow[] {
  return [
    { id: "pay-1", name: "Keisha Robinson", role: "Head Line Cook", regularHrs: 78, otHrs: 4, rate: 19.5, grossPay: 1638, tipsReported: 0, status: "Processed" },
    { id: "pay-2", name: "Marcus Thompson", role: "Prep Cook", regularHrs: 72, otHrs: 0, rate: 16.0, grossPay: 1152, tipsReported: 0, status: "Processed" },
    { id: "pay-3", name: "Darnell Williams", role: "Line Cook", regularHrs: 68, otHrs: 6, rate: 17.5, grossPay: 1347.5, tipsReported: 0, status: "Processed" },
    { id: "pay-4", name: "Aisha Patel", role: "Expo / FOH", regularHrs: 64, otHrs: 0, rate: 15.0, grossPay: 960, tipsReported: 842, status: "Processed" },
    { id: "pay-5", name: "Jordan Lee", role: "Delivery Driver", regularHrs: 58, otHrs: 8, rate: 14.0, grossPay: 980, tipsReported: 624, status: "Processed" },
    { id: "pay-6", name: "Tamika Jones", role: "Prep Cook", regularHrs: 60, otHrs: 0, rate: 15.5, grossPay: 930, tipsReported: 0, status: "Processed" },
    { id: "pay-7", name: "Chris Nguyen", role: "Line Cook", regularHrs: 56, otHrs: 0, rate: 16.5, grossPay: 924, tipsReported: 0, status: "Pending" },
    { id: "pay-8", name: "Destiny Moore", role: "Part-time Expo", regularHrs: 32, otHrs: 0, rate: 14.5, grossPay: 464, tipsReported: 318, status: "Pending" },
    { id: "pay-9", name: "Raymond Brooks", role: "Weekend Driver", regularHrs: 24, otHrs: 4, rate: 14.0, grossPay: 420, tipsReported: 286, status: "Pending" },
  ];
}

export function getLaborGauge() {
  return { current: 28.7, targetMin: 25, targetMax: 30 };
}

export function getPayrollTaxCompliance() {
  return [
    { label: "Federal Withholding", status: "Current" as const },
    { label: "Georgia State Tax", status: "Current" as const },
    { label: "FICA (SS + Medicare)", status: "Due Mar 15" as const },
  ];
}

export function getTaxComplianceItems(): TaxComplianceItem[] {
  return [
    { id: "tax-1", label: "Sales Tax", jurisdiction: "GA + Atlanta (8.9%)", status: "Filed", dueDate: "2026-06-20", amount: 2140 },
    { id: "tax-2", label: "Payroll Tax (941)", jurisdiction: "Federal + GA", status: "Current", dueDate: "2026-07-31" },
    { id: "tax-3", label: "Income Tax (Estimated)", jurisdiction: "Federal + GA", status: "Due", dueDate: "2026-07-15", amount: 4200 },
  ];
}

export function getTaxDeadlines(): TaxDeadline[] {
  return [
    { id: "td-1", date: "2026-06-28", label: "Payroll tax deposit", type: "payroll", amount: 2840 },
    { id: "td-2", date: "2026-07-15", label: "Q2 estimated income tax", type: "income", amount: 4200 },
    { id: "td-3", date: "2026-07-20", label: "GA sales tax filing", type: "sales", amount: 2280 },
    { id: "td-4", date: "2026-07-31", label: "Form 941 — Q2 payroll", type: "payroll" },
    { id: "td-5", date: "2026-08-15", label: "Payroll tax deposit", type: "payroll", amount: 2920 },
    { id: "td-6", date: "2026-08-20", label: "GA sales tax filing", type: "sales", amount: 2180 },
  ];
}

export function getSeasonalForecast(): { month: string; actual: number | null; projected: number }[] {
  return [
    { month: "Jul", actual: 88200, projected: 88000 },
    { month: "Aug", actual: null, projected: 86400 },
    { month: "Sep", actual: null, projected: 91800 },
    { month: "Oct", actual: null, projected: 96200 },
    { month: "Nov", actual: null, projected: 102400 },
    { month: "Dec", actual: null, projected: 114800 },
    { month: "Jan", actual: null, projected: 108600 },
    { month: "Feb", actual: null, projected: 104200 },
    { month: "Mar", actual: null, projected: 98600 },
    { month: "Apr", actual: null, projected: 94800 },
    { month: "May", actual: null, projected: 92400 },
    { month: "Jun", actual: 105500, projected: 105500 },
  ];
}

export function getStaffingForecast(): StaffingForecast[] {
  return [
    { id: "sf-1", week: "Jun 23–29", projectedCovers: 1180, recommendedFte: "2 line, 1 prep, 1 expo, 1 driver (F–Su)", laborHours: 420, estLaborCost: 7560 },
    { id: "sf-2", week: "Jun 30–Jul 6", projectedCovers: 1050, recommendedFte: "2 line, 1 prep (M–Th); +1 expo (F–Su)", laborHours: 380, estLaborCost: 6840 },
    { id: "sf-3", week: "Jul 7–13", projectedCovers: 980, recommendedFte: "2 line, 1 prep", laborHours: 360, estLaborCost: 6480 },
    { id: "sf-4", week: "Jul 14–20", projectedCovers: 1020, recommendedFte: "2 line, 1 prep, 1 driver (F–Su)", laborHours: 372, estLaborCost: 6696 },
    { id: "sf-5", week: "Nov 3–9", projectedCovers: 1420, recommendedFte: "3 line, 2 prep, 2 expo, 2 drivers", laborHours: 520, estLaborCost: 9360 },
  ];
}

const CASH_FLOW_INFLOW_BASE = [
  7520, 3380, 3520, 3610, 3480, 4720, 4980, 21480, 3280, 3410, 3560, 3620, 3480,
  6680, 3320, 3580, 3640, 3510, 4680, 5120, 3240, 3460, 3590, 3680, 3520, 4820,
  5240, 3180, 3420, 3540,
];
const CASH_FLOW_OUTFLOW_BASE = [
  9200, 1120, 980, 1240, 1080, 1420, 1380, 3840, 16880, 1180, 1020, 1340, 1100,
  1920, 1280, 980, 1160, 1320, 1480, 1240, 1080, 1420, 980, 1180, 1340, 1280,
  1420, 1100, 980, 1240,
];

export function getCashFlowForecast(): { day: string; inflows: number; outflows: number }[] {
  return CASH_FLOW_INFLOW_BASE.map((inflows, i) => {
    const d = new Date(2026, 5, 24 + i);
    return {
      day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      inflows,
      outflows: CASH_FLOW_OUTFLOW_BASE[i],
    };
  });
}

export function getVendorPayments(): VendorPayment[] {
  return [
    { id: "vp-1", vendor: "Gulf Coast Seafood Co.", category: "Seafood", dueDate: "2026-06-27", amount: 3840, priority: "High", status: "Approved" },
    { id: "vp-2", vendor: "Restaurant Depot", category: "Dry Goods / Proteins", dueDate: "2026-06-28", amount: 1920, priority: "Medium", status: "Pending" },
    { id: "vp-3", vendor: "Peach State Produce", category: "Produce", dueDate: "2026-06-26", amount: 680, priority: "Medium", status: "Scheduled" },
    { id: "vp-4", vendor: "Peachtree Commissary", category: "Rent", dueDate: "2026-07-01", amount: 4200, priority: "High", status: "Scheduled" },
    { id: "vp-5", vendor: "LA Paper & Packaging", category: "Packaging", dueDate: "2026-07-05", amount: 840, priority: "Low", status: "Pending" },
    { id: "vp-6", vendor: "Georgia Power", category: "Utilities", dueDate: "2026-07-12", amount: 892, priority: "Medium", status: "Pending" },
  ];
}

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

export type ModuleTone = "cream" | "light" | "muted" | "dark" | "roux";

export type ModuleMeta = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  narrative: string;
  tone: ModuleTone;
  highlights?: { label: string; value: string }[];
};

export const MODULE_META: ModuleMeta[] = [
  {
    id: "bookkeeping",
    label: "Bookkeeping",
    eyebrow: "Real-Time Records",
    title: "Bookkeeping & Records",
    description: "Live POS sales, expense tracking, and bank reconciliation for 229 Peachtree St NE.",
    narrative:
      "Every Signature Gumbo bowl and Blue Crab quart sold today hits this feed in real time. Expenses from Gulf Coast Seafood, Peach State Produce, and Georgia Power reconcile against deposits automatically — so the books close clean every night.",
    tone: "cream",
    highlights: [
      { label: "Today's tickets", value: "146" },
      { label: "Matched deposits", value: "$6,670" },
      { label: "Pending payouts", value: "1" },
    ],
  },
  {
    id: "financial",
    label: "Financial Reporting",
    eyebrow: "The Full Picture",
    title: "Financial Reporting",
    description: "P&L, balance sheet, cash flow, and interactive sales and labor charts.",
    narrative:
      "June revenue crossed $105K with gumbo sales driving 65% of the top line. Atlanta's colder months lift sales 18% above summer — you can see the seasonality in the 12-month chart below.",
    tone: "light",
    highlights: [
      { label: "Net income", value: "$36,260" },
      { label: "Gross margin", value: "74.0%" },
      { label: "Cash on hand", value: "$42,180" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory & Cost",
    eyebrow: "From Gulf to Pot",
    title: "Inventory & Cost Management",
    description: "Track Gulf shrimp, blue crab, roux inputs, food cost percentages, and waste shrinkage.",
    narrative:
      "Gulf Shrimp and Blue Crab are the heartbeat of our seafood gumbos. When walk-in temps spike or weekend prep runs long, the waste log captures every dollar lost — and pushes it straight into COGS.",
    tone: "muted",
    highlights: [
      { label: "Food cost", value: "28.4%" },
      { label: "Low / critical SKUs", value: "5" },
      { label: "Waste (7d)", value: "$110" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll & Labor",
    eyebrow: "People & Hours",
    title: "Payroll & Labor Control",
    description: "Hours, overtime, tip reporting, labor cost gauge, and payroll tax compliance.",
    narrative:
      "Keisha's line crew, Marcus on prep, Jordan on delivery — every hour, OT minute, and reported tip flows through payroll before biweekly runs. Labor sits at 28.7% of sales, inside our 25–30% target band.",
    tone: "dark",
    highlights: [
      { label: "Active staff", value: "9" },
      { label: "Labor %", value: "28.7%" },
      { label: "Biweekly payroll", value: "~$15K" },
    ],
  },
  {
    id: "tax",
    label: "Tax Compliance",
    eyebrow: "Stay Compliant",
    title: "Tax Compliance",
    description: "Sales tax (GA + Atlanta 8.9%), payroll tax, income tax status and upcoming filing deadlines.",
    narrative:
      "Atlanta's combined 8.9% sales tax, federal 941 payroll filings, and quarterly estimated income tax — all tracked with filing deadlines on the calendar so nothing slips through the cracks.",
    tone: "light",
    highlights: [
      { label: "Sales tax rate", value: "8.9%" },
      { label: "Open deadlines", value: "6" },
      { label: "Last filing", value: "Jun 20" },
    ],
  },
  {
    id: "budgeting",
    label: "Budgeting",
    eyebrow: "Plan Ahead",
    title: "Budgeting & Forecasting",
    description: "Seasonal Atlanta demand projections and staffing needs based on expected volume.",
    narrative:
      "Comfort food peaks when Atlanta cools down — November through February projects 15–20% above summer covers. Staffing scales with volume: extra expo and drivers on Fri–Sun, a third line cook when covers break 1,400.",
    tone: "cream",
    highlights: [
      { label: "Peak month", value: "December" },
      { label: "Summer dip", value: "−8%" },
      { label: "Nov covers", value: "1,420/wk" },
    ],
  },
  {
    id: "cashflow",
    label: "Cash Flow",
    eyebrow: "Cash Position",
    title: "Cash Flow Management",
    description: "30-day cash forecast and vendor payment queue for seafood suppliers and rent.",
    narrative:
      "Gulf Coast Seafood invoices land every Friday. Commissary rent hits the first. Payroll every other week. The 30-day forecast shows exactly when cash gets tight — and which vendor payments need approval first.",
    tone: "roux",
    highlights: [
      { label: "30-day net", value: "+$75K" },
      { label: "Due this week", value: "$6,440" },
      { label: "Approved", value: "2" },
    ],
  },
  {
    id: "advice",
    label: "AI Insights",
    eyebrow: "Smart Decisions",
    title: "Business Advice (AI Insights)",
    description: "Menu engineering analysis and expansion profitability for a second Atlanta location.",
    narrative:
      "Signature Gumbo is a Star — high volume, strong margin. Blue Crab is a Puzzle: premium contribution but weekend-only. The expansion model projects a second location in Old Fourth Ward hitting breakeven by month 14.",
    tone: "dark",
    highlights: [
      { label: "Menu stars", value: "2" },
      { label: "Expansion ROI", value: "Month 14" },
      { label: "Y1 revenue (proj.)", value: "$980K" },
    ],
  },
];

export const MODULE_SECTIONS = MODULE_META.map(({ id, label }) => ({ id, label }));

/** Highlight inventory items for demo callouts */
export function getHighlightedInventory() {
  const rows = getInventoryDemoRows();
  const highlights = ["SEA-SHR", "SEA-CRB", "DRY-FLR", "DRY-OIL"];
  return highlights.map((sku) => rows.find((r) => r.sku === sku)).filter(Boolean);
}

export { INVENTORY_ITEMS };
