import type { Metadata } from "next";

import { BookOpen } from "lucide-react";

import { RecipeBook } from "@/components/recipes/recipe-book";
import { Badge } from "@/components/ui/badge";
import { getAllListItems } from "@/lib/content/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Recipes for PJ's Gumbo — gumbo, sides, drinks, and desserts with home-to-restaurant batch scaling, food cost, and chef prep standards.",
  openGraph: {
    title: "Recipes · PJ's Gumbo",
    description:
      "Recipes for PJ's Gumbo — gumbo, sides, drinks, and desserts with home-to-restaurant batch scaling, food cost, and chef prep standards.",
    url: "/recipes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipes · PJ's Gumbo",
    description:
      "Recipes for PJ's Gumbo — gumbo, sides, drinks, and desserts with home-to-restaurant batch scaling, food cost, and chef prep standards.",
  },
  alternates: {
    canonical: "/recipes",
  },
};

export default function RecipesPage() {
  const recipes = getAllListItems();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">
            <BookOpen className="size-3" />
            Production
          </Badge>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Recipe Book</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
            The digital kitchen bible for PJ&apos;s Gumbo — master recipes, batch scaling,
            food cost, and chef standards. Every quantity scales from one source of truth.
          </p>
        </div>
        <div className="bg-card flex gap-6 rounded-xl border px-5 py-4 text-center">
          <div>
            <p className="font-display text-2xl font-bold">{recipes.length}</p>
            <p className="text-muted-foreground text-xs uppercase">Recipes</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold">5</p>
            <p className="text-muted-foreground text-xs uppercase">Batch Sizes</p>
          </div>
        </div>
      </div>

      <RecipeBook recipes={recipes} />
    </div>
  );
}
