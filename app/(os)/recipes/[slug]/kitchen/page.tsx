import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KitchenView } from "@/components/recipes/kitchen-view";
import {
  getRecipeBySlug,
  getRecipeSlugs,
  getMasterBatchKey,
  type BatchSizeKey,
} from "@/lib/content/recipes";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ batch?: string }>;
};

const BATCH_KEYS: BatchSizeKey[] = [
  "home",
  "restaurant",
  "double",
  "20-gallon",
  "40-gallon",
];

export async function generateStaticParams() {
  return getRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Kitchen View" };
  return { title: `${recipe.name} — Kitchen View` };
}

export default async function KitchenViewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { batch } = await searchParams;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const batchKey =
    batch && BATCH_KEYS.includes(batch as BatchSizeKey)
      ? (batch as BatchSizeKey)
      : getMasterBatchKey(recipe);

  return <KitchenView recipe={recipe} initialBatch={batchKey} />;
}
