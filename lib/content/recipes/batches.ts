import type { RecipeBatchSize } from "./types";

/** Gumbo batches — home single-pot recipe is the master (multiplier = 1). */
export const GUMBO_BATCH_SIZES: RecipeBatchSize[] = [
  {
    key: "home",
    label: "Home Batch",
    multiplier: 1,
    yield: "~2 gal (single pot)",
    portionCount: 9,
  },
  {
    key: "restaurant",
    label: "Restaurant Batch",
    multiplier: 4.5,
    yield: "10 gal",
    portionCount: 40,
  },
  {
    key: "double",
    label: "Double Batch",
    multiplier: 9,
    yield: "20 gal",
    portionCount: 80,
  },
  {
    key: "20-gallon",
    label: "20 Gallon",
    multiplier: 9,
    yield: "20 gal",
    portionCount: 80,
  },
  {
    key: "40-gallon",
    label: "40 Gallon",
    multiplier: 18,
    yield: "40 gal",
    portionCount: 160,
  },
];

/** Side dish and fry-station batches. */
export const SIDE_BATCH_SIZES: RecipeBatchSize[] = [
  {
    key: "home",
    label: "Home Batch",
    multiplier: 0.25,
    yield: "8 portions",
    portionCount: 8,
  },
  {
    key: "restaurant",
    label: "Restaurant Batch",
    multiplier: 1,
    yield: "32 portions",
    portionCount: 32,
  },
  {
    key: "double",
    label: "Double Batch",
    multiplier: 2,
    yield: "64 portions",
    portionCount: 64,
  },
  {
    key: "20-gallon",
    label: "20 Gallon",
    multiplier: 3,
    yield: "96 portions",
    portionCount: 96,
  },
  {
    key: "40-gallon",
    label: "40 Gallon",
    multiplier: 6,
    yield: "192 portions",
    portionCount: 192,
  },
];

/** Cornbread muffin trays — restaurant batch = 4 full sheet pans (48 muffins). */
export const BREAD_BATCH_SIZES: RecipeBatchSize[] = [
  {
    key: "home",
    label: "Home Batch",
    multiplier: 0.125,
    yield: "6 muffins",
    portionCount: 6,
  },
  {
    key: "restaurant",
    label: "Restaurant Batch",
    multiplier: 1,
    yield: "48 muffins",
    portionCount: 48,
  },
  {
    key: "double",
    label: "Double Batch",
    multiplier: 2,
    yield: "96 muffins",
    portionCount: 96,
  },
  {
    key: "20-gallon",
    label: "20 Gallon",
    multiplier: 4,
    yield: "192 muffins",
    portionCount: 192,
  },
  {
    key: "40-gallon",
    label: "40 Gallon",
    multiplier: 8,
    yield: "384 muffins",
    portionCount: 384,
  },
];

/** Beverage batches — restaurant = 8 gal cambro. */
export const BEVERAGE_BATCH_SIZES: RecipeBatchSize[] = [
  {
    key: "home",
    label: "Home Batch",
    multiplier: 0.125,
    yield: "1 gal",
    portionCount: 16,
  },
  {
    key: "restaurant",
    label: "Restaurant Batch",
    multiplier: 1,
    yield: "8 gal",
    portionCount: 128,
  },
  {
    key: "double",
    label: "Double Batch",
    multiplier: 2,
    yield: "16 gal",
    portionCount: 256,
  },
  {
    key: "20-gallon",
    label: "20 Gallon",
    multiplier: 2.5,
    yield: "20 gal",
    portionCount: 320,
  },
  {
    key: "40-gallon",
    label: "40 Gallon",
    multiplier: 5,
    yield: "40 gal",
    portionCount: 640,
  },
];

/** Single dessert pan batches. */
export const DESSERT_BATCH_SIZES: RecipeBatchSize[] = [
  {
    key: "home",
    label: "Home Batch",
    multiplier: 0.25,
    yield: "4 squares",
    portionCount: 4,
  },
  {
    key: "restaurant",
    label: "Restaurant Batch",
    multiplier: 1,
    yield: "16 squares",
    portionCount: 16,
  },
  {
    key: "double",
    label: "Double Batch",
    multiplier: 2,
    yield: "32 squares",
    portionCount: 32,
  },
  {
    key: "20-gallon",
    label: "20 Gallon",
    multiplier: 4,
    yield: "64 squares",
    portionCount: 64,
  },
  {
    key: "40-gallon",
    label: "40 Gallon",
    multiplier: 8,
    yield: "128 squares",
    portionCount: 128,
  },
];
