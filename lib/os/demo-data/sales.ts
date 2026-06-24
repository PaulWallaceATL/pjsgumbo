import { DELIVERY_AREAS } from "@/lib/content/site";
import { GUMBOS, SIDES, DESSERTS, DRINKS, MENU_SIZES } from "@/lib/content/menu";
import type { PosSale } from "@/lib/restaurant-os/types";

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
  ];
  const payments: PosSale["payment"][] = ["Card", "Card", "Card", "Cash", "DoorDash", "Uber Eats"];
  const times = ["11:04 AM", "11:18 AM", "11:32 AM", "11:45 AM", "12:02 PM", "12:15 PM", "12:28 PM", "12:41 PM", "12:55 PM", "1:08 PM", "1:22 PM", "1:35 PM", "1:48 PM", "2:01 PM", "2:14 PM", "2:27 PM", "2:40 PM", "2:53 PM", "3:06 PM", "3:19 PM", "3:32 PM", "3:45 PM", "4:02 PM", "4:18 PM", "4:35 PM", "5:02 PM", "5:28 PM", "6:15 PM", "6:42 PM", "7:08 PM"];
  return times.map((time, i) => {
    const pick = items[i % items.length];
    const qty = i % 3 === 0 ? 2 : 1;
    const subtotal = pick.price * qty;
    const tax = Math.round(subtotal * 0.089 * 100) / 100;
    const tip = payments[i % payments.length] === "Cash" ? 0 : Math.round(subtotal * 0.18 * 100) / 100;
    return { id: `pos-${i + 1}`, time, ticket: `#${1042 + i}`, item: pick.item, qty, subtotal, tax, tip, payment: payments[i % payments.length] };
  });
}

export function getLiveOrders() {
  const statuses = ["New", "In Kitchen", "Ready", "Out for Delivery", "Complete"] as const;
  return getPosSalesFeed().slice(0, 20).map((s, i) => ({
    id: `ord-${i + 1}`,
    ticket: s.ticket,
    time: s.time,
    items: s.item,
    total: s.subtotal + s.tax + s.tip,
    channel: s.payment,
    status: statuses[Math.min(i % 5, 4)],
    zone: DELIVERY_AREAS[i % DELIVERY_AREAS.length]?.name ?? "Midtown",
  }));
}

export function getDeliveryAnalytics() {
  const orders = [42, 38, 28, 35, 52, 31, 24, 18];
  return DELIVERY_AREAS.map((a, i) => ({
    zone: a.name,
    orders: orders[i] ?? 20,
    avgTicket: 24 + (i % 4) * 3.5,
    eta: a.eta,
  }));
}

export function getChannelMix() {
  return [
    { channel: "Card", orders: 68, pct: 46.6 },
    { channel: "DoorDash", orders: 38, pct: 26.0 },
    { channel: "Uber Eats", orders: 24, pct: 16.4 },
    { channel: "Cash", orders: 16, pct: 11.0 },
  ];
}

export function getMenuCatalog() {
  const gumboRows = GUMBOS.flatMap((g) =>
    MENU_SIZES.map((s) => ({
      id: `${g.slug}-${s.key}`,
      name: g.name,
      size: s.label,
      price: g.prices[s.key],
      category: "Gumbo",
      weekendOnly: g.weekendOnly ?? false,
      featured: g.featured ?? false,
    })),
  );
  const sideRows = SIDES.map((s) => ({ id: s.slug, name: s.name, size: "—", price: s.price, category: "Side", weekendOnly: false, featured: false }));
  const drinkRows = DRINKS.map((d) => ({ id: d.slug, name: d.name, size: "—", price: d.price, category: "Drink", weekendOnly: false, featured: false }));
  const dessertRows = DESSERTS.map((d) => ({ id: d.slug, name: d.name, size: "—", price: d.price, category: "Dessert", weekendOnly: false, featured: false }));
  return [...gumboRows, ...sideRows, ...drinkRows, ...dessertRows];
}
