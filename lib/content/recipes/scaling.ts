import type {
  BatchSizeKey,
  Recipe,
  RecipeBatchSize,
  RecipeCostSummary,
  ScaledIngredient,
} from "./types";

const DEFAULT_MASTER_BATCH: BatchSizeKey = "restaurant";

export function getMasterBatchKey(recipe: Recipe): BatchSizeKey {
  return recipe.masterBatchKey ?? DEFAULT_MASTER_BATCH;
}

/** Resolve a batch size config from a recipe. Falls back to master batch. */
export function getBatchSize(
  recipe: Recipe,
  key: BatchSizeKey,
): RecipeBatchSize {
  const masterKey = getMasterBatchKey(recipe);
  return (
    recipe.batchSizes.find((b) => b.key === key) ??
    recipe.batchSizes.find((b) => b.key === masterKey)!
  );
}

/** Scale factor from master batch to the selected batch. */
export function getScaleFactor(
  recipe: Recipe,
  batchKey: BatchSizeKey,
): number {
  const master = getBatchSize(recipe, getMasterBatchKey(recipe));
  const selected = getBatchSize(recipe, batchKey);
  return selected.multiplier / master.multiplier;
}

/** Scale master ingredient amounts — never duplicate ingredient lists. */
export function scaleIngredients(
  recipe: Recipe,
  batchKey: BatchSizeKey,
): ScaledIngredient[] {
  const factor = getScaleFactor(recipe, batchKey);
  return recipe.ingredients.map((ingredient) => {
    const scaledAmount = ingredient.amount * factor;
    return {
      ...ingredient,
      scaledAmount,
      lineCost: scaledAmount * ingredient.costPerUnit,
    };
  });
}

/** Format scaled amounts for display — trim trailing zeros. */
export function formatAmount(value: number): string {
  if (value === 0) return "0";
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1).replace(/\.0$/, "");
  if (value >= 1) return value.toFixed(2).replace(/\.?0+$/, "");
  return value.toFixed(3).replace(/\.?0+$/, "");
}

export function computeRecipeCost(
  recipe: Recipe,
  batchKey: BatchSizeKey,
): RecipeCostSummary {
  const batch = getBatchSize(recipe, batchKey);
  const scaled = scaleIngredients(recipe, batchKey);
  const recipeCost = scaled.reduce((sum, i) => sum + i.lineCost, 0);
  const costPerServing = recipeCost / batch.portionCount;
  const suggestedMenuPrice = recipe.costing.suggestedMenuPrice;
  const foodCostPercent =
    suggestedMenuPrice > 0 ? costPerServing / suggestedMenuPrice : 0;
  const grossProfit = suggestedMenuPrice - costPerServing;

  return {
    ingredientCost: recipeCost,
    recipeCost,
    costPerServing,
    suggestedMenuPrice,
    foodCostPercent,
    grossProfit,
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}
