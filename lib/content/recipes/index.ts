import { GUMBO_RECIPES } from "./gumbos";
import { SIDE_RECIPES } from "./sides";
import { BEVERAGE_RECIPES, DESSERT_RECIPES } from "./drinks-desserts";
import type { BatchSizeKey, Recipe, RecipeCategory, RecipeListItem } from "./types";
import { getBatchSize } from "./scaling";

export const ALL_RECIPES: Recipe[] = [
  ...GUMBO_RECIPES,
  ...SIDE_RECIPES,
  ...DESSERT_RECIPES,
  ...BEVERAGE_RECIPES,
];

export const RECIPE_CATEGORIES: { key: RecipeCategory; label: string }[] = [
  { key: "Gumbo", label: "Gumbo" },
  { key: "Sides", label: "Sides" },
  { key: "Breads", label: "Breads" },
  { key: "Desserts", label: "Desserts" },
  { key: "Beverages", label: "Beverages" },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return ALL_RECIPES.find((r) => r.slug === slug);
}

export function getRecipeSlugs(): string[] {
  return ALL_RECIPES.map((r) => r.slug);
}

export function toListItem(recipe: Recipe): RecipeListItem {
  const batch = getBatchSize(recipe, "restaurant");
  return {
    slug: recipe.slug,
    name: recipe.name,
    category: recipe.category,
    difficulty: recipe.difficulty,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    image: recipe.image,
    usageCount: recipe.usageCount,
    yield: batch.yield,
    portionCount: batch.portionCount,
  };
}

export function getAllListItems(): RecipeListItem[] {
  return ALL_RECIPES.map(toListItem);
}

export const DEFAULT_BATCH: BatchSizeKey = "restaurant";

export type { Recipe, RecipeCategory, BatchSizeKey, RecipeListItem } from "./types";
export {
  scaleIngredients,
  computeRecipeCost,
  formatAmount,
  formatDuration,
  getBatchSize,
  getScaleFactor,
} from "./scaling";
