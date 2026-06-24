import { getInventoryRows } from "./inventory";

export type ModuleTone = "cream" | "light" | "muted" | "dark" | "roux";

export type ModuleMeta = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  narrative: string;
  tone: ModuleTone;
  osHref: string;
  highlights?: { label: string; value: string }[];
};

export const MODULE_META: ModuleMeta[] = [
  {
    id: "operations",
    label: "Dashboard",
    eyebrow: "Operations",
    title: "Today at a Glance",
    description: "Daily KPIs, category sales, and low-stock alerts — the same view our kitchen team opens first.",
    narrative: "146 orders today, prime cost at 57.1%, and five SKUs below par. Signature Gumbos are driving 64% of category sales while Gulf Shrimp and Blue Crab need a reorder before the weekend rush.",
    tone: "light",
    osHref: "/dashboard",
    highlights: [
      { label: "Orders today", value: "146" },
      { label: "Prime cost", value: "57.1%" },
      { label: "Low stock", value: "5 SKUs" },
    ],
  },
  {
    id: "bookkeeping",
    label: "Bookkeeping",
    eyebrow: "Real-Time Records",
    title: "Bookkeeping & Records",
    description: "Live POS sales, expense tracking, and bank reconciliation for 229 Peachtree St NE.",
    narrative: "Every Signature Gumbo bowl and Blue Crab quart sold today hits this feed in real time. Expenses from Gulf Coast Seafood, Peach State Produce, and Georgia Power reconcile against deposits automatically.",
    tone: "cream",
    osHref: "/bookkeeping",
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
    narrative: "June revenue crossed $105K with gumbo sales driving 65% of the top line. Atlanta's colder months lift sales 18% above summer.",
    tone: "muted",
    osHref: "/financial-reports",
    highlights: [
      { label: "Net income", value: "$36,260" },
      { label: "Gross margin", value: "74.0%" },
      { label: "Cash on hand", value: "$42,180" },
    ],
  },
  {
    id: "production",
    label: "Production",
    eyebrow: "Prep & Batch",
    title: "Production & Prep",
    description: "Daily prep queue, weekly batch schedule, and gumbo scaling from home pot to 40 gallons.",
    narrative: "Keisha's crew runs two roux batches before noon, then shifts to Blue Crab prep for the weekend. Every batch scales from the same home-pot master recipe in the Recipe Book.",
    tone: "cream",
    osHref: "/daily-prep",
    highlights: [
      { label: "Prep tasks today", value: "4" },
      { label: "Weekend batch", value: "Blue Crab" },
      { label: "Max batch", value: "40 gal" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory & Cost",
    eyebrow: "From Gulf to Pot",
    title: "Inventory & Cost Management",
    description: "Track Gulf shrimp, blue crab, roux inputs, food cost percentages, and waste shrinkage.",
    narrative: "Gulf Shrimp and Blue Crab are the heartbeat of our seafood gumbos. The waste log captures every dollar lost and pushes it straight into COGS.",
    tone: "light",
    osHref: "/inventory",
    highlights: [
      { label: "Food cost", value: "28.4%" },
      { label: "Low / critical SKUs", value: "5" },
      { label: "Waste (7d)", value: "$110" },
    ],
  },
  {
    id: "orders",
    label: "Orders & Delivery",
    eyebrow: "Live Orders",
    title: "Orders & Delivery",
    description: "Live order queue, delivery analytics by Atlanta neighborhood, and channel mix.",
    narrative: "DoorDash and Uber Eats account for 42% of tickets. Buckhead and Decatur runs take longer but carry higher average checks — especially on Blue Crab weekends.",
    tone: "muted",
    osHref: "/orders",
    highlights: [
      { label: "Active orders", value: "12" },
      { label: "Delivery %", value: "42%" },
      { label: "Top zone", value: "Midtown" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll & Labor",
    eyebrow: "People & Hours",
    title: "Payroll & Labor Control",
    description: "Hours, overtime, tip reporting, labor cost gauge, and payroll tax compliance.",
    narrative: "Labor sits at 28.7% of sales, inside our 25–30% target band. Biweekly payroll runs ~$15K across nine staff.",
    tone: "dark",
    osHref: "/employees",
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
    narrative: "Atlanta's combined 8.9% sales tax, federal 941 payroll filings, and quarterly estimated income tax — all tracked on the calendar.",
    tone: "light",
    osHref: "/tax-compliance",
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
    narrative: "Comfort food peaks when Atlanta cools down — November through February projects 15–20% above summer covers.",
    tone: "cream",
    osHref: "/budgeting",
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
    narrative: "Gulf Coast Seafood invoices land every Friday. The 30-day forecast shows exactly when cash gets tight.",
    tone: "roux",
    osHref: "/cash-flow",
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
    narrative: "Signature Gumbo is a Star. Blue Crab is a Puzzle: premium contribution but weekend-only.",
    tone: "dark",
    osHref: "/insights",
    highlights: [
      { label: "Menu stars", value: "2" },
      { label: "Expansion ROI", value: "Month 14" },
      { label: "Y1 revenue (proj.)", value: "$980K" },
    ],
  },
];

export const MODULE_SECTIONS = MODULE_META.map(({ id, label }) => ({ id, label }));

export function getInventoryDemoRows() {
  return getInventoryRows().filter((r) => !r.category.includes("Packaging"));
}

export function getHighlightedInventory() {
  const rows = getInventoryDemoRows();
  return ["SEA-SHR", "SEA-CRB", "DRY-FLR", "DRY-OIL"]
    .map((sku) => rows.find((r) => r.sku === sku))
    .filter(Boolean);
}
