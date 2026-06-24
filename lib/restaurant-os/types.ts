export type PosSale = {
  id: string;
  time: string;
  ticket: string;
  item: string;
  qty: number;
  subtotal: number;
  tax: number;
  tip: number;
  payment: "Card" | "Cash" | "DoorDash" | "Uber Eats";
};

export type ExpenseCategory =
  | "Food / Seafood"
  | "Food / Produce"
  | "Beverages"
  | "Payroll"
  | "Atlanta Utilities";

export type Expense = {
  id: string;
  date: string;
  vendor: string;
  category: ExpenseCategory;
  amount: number;
  status: "Paid" | "Pending";
  memo?: string;
};

export type BankTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "deposit" | "withdrawal";
  status: "matched" | "pending" | "unmatched";
  matchedTo?: string;
};

export type PlLineItem = {
  id: string;
  label: string;
  amount: number;
  section: "revenue" | "cogs" | "opex" | "summary";
  indent?: number;
};

export type BalanceSheetItem = {
  id: string;
  label: string;
  amount: number;
  side: "asset" | "liability" | "equity";
};

export type CashFlowItem = {
  id: string;
  label: string;
  amount: number;
  section: "operating" | "investing" | "financing";
};

export type InventoryDemoRow = {
  sku: string;
  name: string;
  category: string;
  onHand: number;
  unit: string;
  costPerUnit: number;
  value: number;
  status: "ok" | "low" | "critical";
};

export type WasteEntry = {
  id: string;
  date: string;
  item: string;
  qty: string;
  reason: string;
  cogsImpact: number;
  loggedBy: string;
};

export type PayrollRow = {
  id: string;
  name: string;
  role: string;
  regularHrs: number;
  otHrs: number;
  rate: number;
  grossPay: number;
  tipsReported: number;
  status: "Processed" | "Pending";
};

export type TaxComplianceItem = {
  id: string;
  label: string;
  jurisdiction: string;
  status: "Filed" | "Current" | "Due";
  dueDate?: string;
  amount?: number;
};

export type TaxDeadline = {
  id: string;
  date: string;
  label: string;
  type: "sales" | "payroll" | "income";
  amount?: number;
};

export type StaffingForecast = {
  id: string;
  week: string;
  projectedCovers: number;
  recommendedFte: string;
  laborHours: number;
  estLaborCost: number;
};

export type VendorPayment = {
  id: string;
  vendor: string;
  category: string;
  dueDate: string;
  amount: number;
  priority: "High" | "Medium" | "Low";
  status: "Approved" | "Pending" | "Scheduled";
};

export type MenuEngineeringRow = {
  id: string;
  name: string;
  sold: number;
  foodCostPct: number;
  contributionMargin: number;
  classification: "Star" | "Plow Horse" | "Puzzle" | "Dog";
};

export type DemoKpi = {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
};
