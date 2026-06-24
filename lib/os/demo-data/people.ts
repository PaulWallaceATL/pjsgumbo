import type { PayrollRow, WasteEntry } from "@/lib/restaurant-os/types";

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

export function getPayrollTaxCompliance() {
  return [
    { label: "Federal Withholding", status: "Current" as const },
    { label: "Georgia State Tax", status: "Current" as const },
    { label: "FICA (SS + Medicare)", status: "Due Mar 15" as const },
  ];
}
