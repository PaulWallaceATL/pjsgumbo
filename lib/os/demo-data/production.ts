import { GUMBO_BATCH_SIZES } from "@/lib/content/recipes/batches";

export function getProteinPrepChecklist() {
  return [
    { id: "pp-1", task: "Chicken thigh trim & portion", qty: "40 lb", assignee: "Marcus T.", status: "Complete" as const },
    { id: "pp-2", task: "Andouille slice (1/4\" coins)", qty: "12 lb", assignee: "Marcus T.", status: "Complete" as const },
    { id: "pp-3", task: "Gulf shrimp peel & devein", qty: "30 lb", assignee: "Darnell W.", status: "In Progress" as const },
    { id: "pp-4", task: "Blue crab pick (weekend)", qty: "8 lb", assignee: "Keisha R.", status: "Scheduled" as const },
    { id: "pp-5", task: "Holy trinity dice", qty: "18 lb", assignee: "Tamika J.", status: "In Progress" as const },
  ];
}

export function getDailyPrepQueue() {
  return [
    { id: "dp-1", task: "Signature Gumbo roux", due: "Today, 11:30 AM", qty: "20 gal", assignee: "Keisha R.", status: "Complete" as const },
    { id: "dp-2", task: "Chicken & Sausage roux", due: "Today, 2:00 PM", qty: "20 gal", assignee: "Darnell W.", status: "In Progress" as const },
    { id: "dp-3", task: "Holy trinity prep", due: "Today, 3:00 PM", qty: "18 lb", assignee: "Marcus T.", status: "Scheduled" as const },
    { id: "dp-4", task: "Shrimp clean & devein", due: "Tomorrow, 9:00 AM", qty: "30 lb", assignee: "Marcus T.", status: "Scheduled" as const },
    { id: "dp-5", task: "Cornbread batter", due: "Tomorrow, 10:00 AM", qty: "120 muffins", assignee: "Tamika J.", status: "Scheduled" as const },
    { id: "dp-6", task: "Blue Crab gumbo batch", due: "Sat, 8:00 AM", qty: "15 gal", assignee: "Keisha R.", status: "Scheduled" as const },
  ];
}

export function getProductionSchedule() {
  return [
    { id: "ps-1", day: "Mon", gumbo: "Signature + Chicken & Sausage", gallons: 35, lead: "Keisha R." },
    { id: "ps-2", day: "Tue", gumbo: "Signature + Veggie", gallons: 30, lead: "Darnell W." },
    { id: "ps-3", day: "Wed", gumbo: "Signature + Chicken & Sausage", gallons: 32, lead: "Keisha R." },
    { id: "ps-4", day: "Thu", gumbo: "Signature + Chicken", gallons: 28, lead: "Darnell W." },
    { id: "ps-5", day: "Fri", gumbo: "Signature + Chicken & Sausage", gallons: 40, lead: "Keisha R." },
    { id: "ps-6", day: "Sat", gumbo: "Signature + Blue Crab (weekend)", gallons: 45, lead: "Keisha R." },
    { id: "ps-7", day: "Sun", gumbo: "Signature + Blue Crab (weekend)", gallons: 42, lead: "Keisha R." },
  ];
}

export function getBatchCalcRows() {
  return GUMBO_BATCH_SIZES.map((b) => ({
    key: b.key,
    label: b.label,
    multiplier: b.multiplier,
    yield: b.yield,
    portions: b.portionCount,
    rouxLb: Math.round(2.5 * b.multiplier * 10) / 10,
    stockGal: Math.round(1.2 * b.multiplier * 10) / 10,
  }));
}

export function getPackagingUsage() {
  return [
    { id: "pkg-1", name: "16 oz Bowl", sku: "PKG-BWL", onHand: 1240, dailyUse: 95, daysLeft: 13 },
    { id: "pkg-2", name: "Quart Container", sku: "PKG-QT", onHand: 360, dailyUse: 28, daysLeft: 13 },
    { id: "pkg-3", name: "Half Gallon Container", sku: "PKG-HG", onHand: 120, dailyUse: 12, daysLeft: 10 },
    { id: "pkg-4", name: "Container Lid", sku: "PKG-LID", onHand: 2400, dailyUse: 135, daysLeft: 18 },
    { id: "pkg-5", name: "Carryout Bag", sku: "PKG-BAG", onHand: 1720, dailyUse: 140, daysLeft: 12 },
  ];
}
