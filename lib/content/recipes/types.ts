/** Recipe book domain types — local data layer before Supabase migration. */

export type RecipeDifficulty = "Easy" | "Intermediate" | "Advanced" | "Expert";

export type RecipeCategory =
  | "Gumbo"
  | "Sides"
  | "Breads"
  | "Desserts"
  | "Beverages";

export type BatchSizeKey =
  | "home"
  | "restaurant"
  | "double"
  | "20-gallon"
  | "40-gallon";

/** Master batch is always `restaurant` (multiplier = 1). */
export type RecipeBatchSize = {
  key: BatchSizeKey;
  label: string;
  /** Scale factor relative to the restaurant (master) batch. */
  multiplier: number;
  yield: string;
  portionCount: number;
};

export type RecipeIngredient = {
  name: string;
  /** Amount at restaurant (master) batch — scaled at runtime. */
  amount: number;
  unit: string;
  prepNotes?: string;
  /** Unit cost in USD for food-cost calculations. */
  costPerUnit: number;
};

export type InternalCookTemp = {
  item: string;
  tempF: number;
  note?: string;
};

export type ChefNotes = {
  tips: string[];
  criticalControlPoints: string[];
  commonMistakes: string[];
  textureGuide: string;
  colorGuide: string;
  tasteGuide: string;
};

export type RecipeNutrition = {
  calories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  sodiumMg: number;
  servingSize: string;
};

export type RecipeCosting = {
  /** Suggested menu price per serving in USD. */
  suggestedMenuPrice: number;
};

export type Recipe = {
  slug: string;
  name: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  holdTimeMinutes: number;
  shelfLife: string;
  storageInstructions: string;
  servingTemperature: string;
  internalTemps: InternalCookTemp[];
  equipment: string[];
  description: string;
  image: string;
  /** Seed data for "Most Used" sorting — will sync from usage analytics later. */
  usageCount: number;
  batchSizes: RecipeBatchSize[];
  /** Master ingredient list — single source scaled by batch selector. */
  ingredients: RecipeIngredient[];
  steps: string[];
  chefNotes: ChefNotes;
  nutrition: RecipeNutrition;
  costing: RecipeCosting;
};

export type ScaledIngredient = RecipeIngredient & {
  scaledAmount: number;
  lineCost: number;
};

export type RecipeCostSummary = {
  ingredientCost: number;
  recipeCost: number;
  costPerServing: number;
  suggestedMenuPrice: number;
  foodCostPercent: number;
  grossProfit: number;
};

export type RecipeListItem = Pick<
  Recipe,
  | "slug"
  | "name"
  | "category"
  | "difficulty"
  | "prepTimeMinutes"
  | "cookTimeMinutes"
  | "image"
  | "usageCount"
> & {
  yield: string;
  portionCount: number;
};
