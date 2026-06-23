import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecipeDetailView } from "@/components/recipes/recipe-detail-view";
import { getRecipeBySlug, getRecipeSlugs } from "@/lib/content/recipes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };
  return {
    title: recipe.name,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return <RecipeDetailView recipe={recipe} />;
}
