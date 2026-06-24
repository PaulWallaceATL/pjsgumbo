import type {
  BalanceSheetItem,
  BankTransaction,
  CashFlowItem,
  Expense,
  PlLineItem,
  StaffingForecast,
  TaxComplianceItem,
  TaxDeadline,
  VendorPayment,
} from "@/lib/restaurant-os/types";

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

export function getSalesReportMonthly() {
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

export function getLaborCostWeekly() {
  return [
    { week: "W1", sales: 24800, labor: 7120 },
    { week: "W2", sales: 26200, labor: 7480 },
    { week: "W3", sales: 25600, labor: 7340 },
    { week: "W4", sales: 28900, labor: 8340 },
  ];
}

export function getSeasonalForecast() {
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

const CASH_FLOW_INFLOW = [7520, 3380, 3520, 3610, 3480, 4720, 4980, 21480, 3280, 3410, 3560, 3620, 3480, 6680, 3320, 3580, 3640, 3510, 4680, 5120, 3240, 3460, 3590, 3680, 3520, 4820, 5240, 3180, 3420, 3540];
const CASH_FLOW_OUTFLOW = [9200, 1120, 980, 1240, 1080, 1420, 1380, 3840, 16880, 1180, 1020, 1340, 1100, 1920, 1280, 980, 1160, 1320, 1480, 1240, 1080, 1420, 980, 1180, 1340, 1280, 1420, 1100, 980, 1240];

export function getCashFlowForecast() {
  return CASH_FLOW_INFLOW.map((inflows, i) => {
    const d = new Date(2026, 5, 24 + i);
    return {
      day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      inflows,
      outflows: CASH_FLOW_OUTFLOW[i],
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

export function getCostPercentages() {
  return { food: 28.4, beverage: 22.1, combined: 27.6, foodTarget: 30, beverageTarget: 25, combinedTarget: 30 };
}

export function getLaborGauge() {
  return { current: 28.7, targetMin: 25, targetMax: 30 };
}
