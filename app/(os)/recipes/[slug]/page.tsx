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

  const title = `${recipe.name} · Recipes`;
  const description = recipe.description;

  return {
    title: recipe.name,
    description,
    openGraph: {
      title,
      description,
      url: `/recipes/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/recipes/${slug}`,
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return <RecipeDetailView recipe={recipe} />;
}
