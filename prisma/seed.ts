import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../lib/generated/prisma/client";
import {
  ADD_ONS,
  DESSERTS,
  DRINKS,
  GUMBOS,
  MENU_CATEGORIES,
  MENU_SIZES,
  SIDES,
  type MenuSizeKey,
} from "../lib/content/menu";
import { REVIEWS } from "../lib/content/site";
import {
  ADDON_INVENTORY,
  INVENTORY_CATEGORIES,
  INVENTORY_ITEMS,
  STORAGE_LOCATIONS,
  SUPPLIERS,
  UNITS,
} from "../lib/content/operations";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/* ------------------------------- reference data ------------------------------- */

/** Recipe ingredient lines per gumbo, keyed by slug. Quantities are per base batch. */
const GUMBO_RECIPES: Record<
  string,
  { sku: string; quantity: number; unit: string }[]
> = {
  "pjs-signature-gumbo": [
    { sku: "PRO-CHK", quantity: 6, unit: "lb" },
    { sku: "PRO-SAU", quantity: 4, unit: "lb" },
    { sku: "SEA-SHR", quantity: 3, unit: "lb" },
    { sku: "PRD-OKR", quantity: 2, unit: "lb" },
    { sku: "DRY-FLR", quantity: 1, unit: "lb" },
    { sku: "DRY-OIL", quantity: 0.25, unit: "gal" },
    { sku: "PRD-ONI", quantity: 2, unit: "lb" },
    { sku: "PRD-BPR", quantity: 1, unit: "lb" },
    { sku: "PRD-CEL", quantity: 1, unit: "lb" },
    { sku: "DRY-STK-CHK", quantity: 0.5, unit: "lb" },
    { sku: "SPC-CAJ", quantity: 0.25, unit: "lb" },
    { sku: "DRY-RIC", quantity: 4, unit: "lb" },
  ],
  "chicken-sausage-gumbo": [
    { sku: "PRO-CHK", quantity: 6, unit: "lb" },
    { sku: "PRO-SAU", quantity: 4, unit: "lb" },
    { sku: "DRY-FLR", quantity: 1, unit: "lb" },
    { sku: "DRY-OIL", quantity: 0.25, unit: "gal" },
    { sku: "PRD-ONI", quantity: 2, unit: "lb" },
    { sku: "PRD-BPR", quantity: 1, unit: "lb" },
    { sku: "PRD-CEL", quantity: 1, unit: "lb" },
    { sku: "DRY-STK-CHK", quantity: 0.5, unit: "lb" },
    { sku: "SPC-CAJ", quantity: 0.25, unit: "lb" },
    { sku: "DRY-RIC", quantity: 4, unit: "lb" },
  ],
  "chicken-gumbo": [
    { sku: "PRO-CHK", quantity: 8, unit: "lb" },
    { sku: "DRY-FLR", quantity: 1, unit: "lb" },
    { sku: "DRY-OIL", quantity: 0.25, unit: "gal" },
    { sku: "PRD-ONI", quantity: 2, unit: "lb" },
    { sku: "PRD-BPR", quantity: 1, unit: "lb" },
    { sku: "PRD-CEL", quantity: 1, unit: "lb" },
    { sku: "DRY-STK-CHK", quantity: 0.5, unit: "lb" },
    { sku: "SPC-CAJ", quantity: 0.25, unit: "lb" },
    { sku: "DRY-RIC", quantity: 4, unit: "lb" },
  ],
  "veggie-gumbo": [
    { sku: "PRD-OKR", quantity: 4, unit: "lb" },
    { sku: "DRY-FLR", quantity: 1, unit: "lb" },
    { sku: "DRY-OIL", quantity: 0.25, unit: "gal" },
    { sku: "PRD-ONI", quantity: 3, unit: "lb" },
    { sku: "PRD-BPR", quantity: 1.5, unit: "lb" },
    { sku: "PRD-CEL", quantity: 1.5, unit: "lb" },
    { sku: "SPC-CAJ", quantity: 0.25, unit: "lb" },
    { sku: "DRY-RIC", quantity: 4, unit: "lb" },
  ],
  "blue-crab-sausage-gumbo": [
    { sku: "SEA-CRB", quantity: 5, unit: "lb" },
    { sku: "PRO-SAU", quantity: 4, unit: "lb" },
    { sku: "DRY-FLR", quantity: 1, unit: "lb" },
    { sku: "DRY-OIL", quantity: 0.25, unit: "gal" },
    { sku: "PRD-ONI", quantity: 2, unit: "lb" },
    { sku: "PRD-BPR", quantity: 1, unit: "lb" },
    { sku: "PRD-CEL", quantity: 1, unit: "lb" },
    { sku: "DRY-STK-SEA", quantity: 0.5, unit: "lb" },
    { sku: "SPC-CAJ", quantity: 0.25, unit: "lb" },
    { sku: "DRY-RIC", quantity: 4, unit: "lb" },
  ],
};

/** Packaging consumed per size (SKU + quantity). */
const PACKAGING_BY_SIZE: Record<MenuSizeKey, { sku: string; qty: number }[]> = {
  CUP: [
    { sku: "PKG-CUP", qty: 1 },
    { sku: "PKG-LID", qty: 1 },
    { sku: "PKG-SPN", qty: 1 },
    { sku: "PKG-NAP", qty: 2 },
  ],
  BOWL: [
    { sku: "PKG-BWL", qty: 1 },
    { sku: "PKG-LID", qty: 1 },
    { sku: "PKG-SPN", qty: 1 },
    { sku: "PKG-NAP", qty: 2 },
  ],
  LARGE_BOWL: [
    { sku: "PKG-LBWL", qty: 1 },
    { sku: "PKG-LID", qty: 1 },
    { sku: "PKG-SPN", qty: 1 },
    { sku: "PKG-NAP", qty: 3 },
  ],
  QUART: [
    { sku: "PKG-QT", qty: 1 },
    { sku: "PKG-LID", qty: 1 },
    { sku: "PKG-BAG", qty: 1 },
    { sku: "PKG-LBL", qty: 1 },
  ],
  HALF_GALLON: [
    { sku: "PKG-HG", qty: 1 },
    { sku: "PKG-LID", qty: 1 },
    { sku: "PKG-BAG", qty: 1 },
    { sku: "PKG-LBL", qty: 1 },
  ],
};

async function main() {
  console.log("Seeding PJ's Gumbo database...");

  // Units
  const unitByAbbr = new Map<string, string>();
  for (const u of UNITS) {
    const unit = await prisma.unit.upsert({
      where: { abbreviation: u.abbreviation },
      update: { name: u.name, type: u.type },
      create: u,
    });
    unitByAbbr.set(u.abbreviation, unit.id);
  }

  // Inventory categories
  const categoryByName = new Map<string, string>();
  for (const [i, name] of INVENTORY_CATEGORIES.entries()) {
    const cat = await prisma.inventoryCategory.upsert({
      where: { name },
      update: { sortOrder: i },
      create: { name, sortOrder: i },
    });
    categoryByName.set(name, cat.id);
  }

  // Storage locations
  const storageByName = new Map<string, string>();
  for (const s of STORAGE_LOCATIONS) {
    const loc = await prisma.storageLocation.upsert({
      where: { name: s.name },
      update: { type: s.type },
      create: s,
    });
    storageByName.set(s.name, loc.id);
  }

  // Suppliers
  const supplierByName = new Map<string, string>();
  for (const s of SUPPLIERS) {
    const sup = await prisma.supplier.upsert({
      where: { name: s.name },
      update: { type: s.type },
      create: s,
    });
    supplierByName.set(s.name, sup.id);
  }

  // Inventory items
  const itemBySku = new Map<string, string>();
  for (const item of INVENTORY_ITEMS) {
    const created = await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {
        name: item.name,
        costPerUnit: item.costPerUnit,
        parLevel: item.parLevel,
        onHand: item.onHand,
        isPackaging: item.isPackaging ?? false,
        trackExpiration: item.trackExpiration ?? false,
      },
      create: {
        sku: item.sku,
        name: item.name,
        categoryId: categoryByName.get(item.category),
        unitId: unitByAbbr.get(item.unit)!,
        storageLocationId: storageByName.get(item.storage),
        primarySupplierId: supplierByName.get(item.supplier),
        costPerUnit: item.costPerUnit,
        parLevel: item.parLevel,
        reorderPoint: item.parLevel * 0.5,
        onHand: item.onHand,
        isPackaging: item.isPackaging ?? false,
        trackExpiration: item.trackExpiration ?? false,
      },
    });
    itemBySku.set(item.sku, created.id);
  }

  // Menu categories
  const menuCategoryByKey = new Map<string, string>();
  for (const [i, c] of MENU_CATEGORIES.entries()) {
    const cat = await prisma.menuCategory.upsert({
      where: { key: c.key },
      update: { name: c.label, description: c.description, sortOrder: i },
      create: { key: c.key, name: c.label, description: c.description, sortOrder: i },
    });
    menuCategoryByKey.set(c.key, cat.id);
  }

  // Add-ons
  for (const a of ADD_ONS) {
    await prisma.addOn.upsert({
      where: { slug: a.slug },
      update: { name: a.name, price: a.price, weekendOnly: a.weekendOnly ?? false },
      create: {
        slug: a.slug,
        name: a.name,
        price: a.price,
        weekendOnly: a.weekendOnly ?? false,
        inventoryItemId: ADDON_INVENTORY[a.slug]
          ? itemBySku.get(ADDON_INVENTORY[a.slug])
          : undefined,
      },
    });
  }
  const addOnBySlug = new Map(
    (await prisma.addOn.findMany()).map((a) => [a.slug, a.id]),
  );

  const gumboCategoryId = menuCategoryByKey.get("SIGNATURE_GUMBOS")!;

  // Gumbos: recipe + menu item + size variants + linked add-ons
  for (const [i, g] of GUMBOS.entries()) {
    const recipe = await prisma.recipe.upsert({
      where: { id: `recipe-${g.slug}` },
      update: { name: g.name, description: g.description },
      create: {
        id: `recipe-${g.slug}`,
        name: g.name,
        description: g.description,
        instructions:
          "Make a dark roux with flour and oil, add the holy trinity, proteins, stock, and seasonings. Simmer low and slow. Serve over rice.",
        yieldQuantity: 32,
        yieldUnit: "BOWL",
        prepMinutes: 45,
        cookMinutes: 180,
      },
    });

    // Recipe ingredients (reset to avoid duplicates on reseed)
    await prisma.recipeIngredient.deleteMany({ where: { recipeId: recipe.id } });
    for (const line of GUMBO_RECIPES[g.slug] ?? []) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          inventoryItemId: itemBySku.get(line.sku)!,
          quantity: line.quantity,
          unitId: unitByAbbr.get(line.unit)!,
        },
      });
    }

    const menuItem = await prisma.menuItem.upsert({
      where: { slug: g.slug },
      update: {
        name: g.name,
        description: g.description,
        ingredientsText: g.ingredients,
        isFeatured: g.featured ?? false,
        weekendOnly: g.weekendOnly ?? false,
        sortOrder: i,
      },
      create: {
        slug: g.slug,
        name: g.name,
        description: g.description,
        categoryId: gumboCategoryId,
        recipeId: recipe.id,
        ingredientsText: g.ingredients,
        spiceLevels: ["MILD", "SPICY"],
        isFeatured: g.featured ?? false,
        weekendOnly: g.weekendOnly ?? false,
        sortOrder: i,
      },
    });

    for (const size of MENU_SIZES) {
      await prisma.menuVariant.upsert({
        where: { menuItemId_size: { menuItemId: menuItem.id, size: size.key } },
        update: { price: g.prices[size.key], label: size.label, ounces: size.ounces },
        create: {
          menuItemId: menuItem.id,
          size: size.key,
          label: size.label,
          ounces: size.ounces,
          price: g.prices[size.key],
        },
      });
    }

    // Link all add-ons to gumbos
    for (const a of ADD_ONS) {
      const addOnId = addOnBySlug.get(a.slug)!;
      await prisma.menuItemAddOn.upsert({
        where: { menuItemId_addOnId: { menuItemId: menuItem.id, addOnId } },
        update: {},
        create: { menuItemId: menuItem.id, addOnId },
      });
    }
  }

  // Simple items (sides, desserts, drinks) — single base price, no sizes
  const simpleGroups: { categoryKey: string; items: typeof SIDES }[] = [
    { categoryKey: "SIDES", items: SIDES },
    { categoryKey: "DESSERTS", items: DESSERTS },
    { categoryKey: "DRINKS", items: DRINKS },
  ];
  for (const group of simpleGroups) {
    const categoryId = menuCategoryByKey.get(group.categoryKey)!;
    for (const [i, item] of group.items.entries()) {
      await prisma.menuItem.upsert({
        where: { slug: item.slug },
        update: { name: item.name, basePrice: item.price, description: item.description },
        create: {
          slug: item.slug,
          name: item.name,
          description: item.description,
          categoryId,
          basePrice: item.price,
          sortOrder: i,
        },
      });
    }
  }

  // Packaging rules (size -> packaging items)
  await prisma.packagingRule.deleteMany({});
  for (const [size, rules] of Object.entries(PACKAGING_BY_SIZE)) {
    for (const r of rules) {
      await prisma.packagingRule.create({
        data: {
          name: `${size} packaging`,
          size: size as MenuSizeKey,
          inventoryItemId: itemBySku.get(r.sku)!,
          quantityPerUnit: r.qty,
        },
      });
    }
  }

  // Promo codes
  await prisma.promoCode.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      description: "10% off your first order",
      discountType: "PERCENT",
      amount: 10,
      minSubtotal: 15,
      isActive: true,
    },
  });
  await prisma.promoCode.upsert({
    where: { code: "FREEDELIVERY" },
    update: {},
    create: {
      code: "FREEDELIVERY",
      description: "Free delivery over $40",
      discountType: "FIXED",
      amount: 5,
      minSubtotal: 40,
      isActive: true,
    },
  });

  // Reviews
  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    for (const r of REVIEWS) {
      await prisma.review.create({
        data: { name: r.name, location: r.location, rating: r.rating, quote: r.quote },
      });
    }
  }

  // Demo owner (Supabase user must be created separately; this links by a
  // placeholder supabaseId for local development).
  await prisma.user.upsert({
    where: { email: "owner@pjsgumbo.com" },
    update: { role: "OWNER" },
    create: {
      supabaseId: "seed-owner-placeholder",
      email: "owner@pjsgumbo.com",
      name: "PJ Owner",
      role: "OWNER",
      employee: {
        create: { firstName: "PJ", lastName: "Owner", position: "Owner" },
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
