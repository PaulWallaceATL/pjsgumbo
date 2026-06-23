"use client";

import * as React from "react";
import { Search, Star, TrendingUp, Clock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { useRecipePrefs } from "@/lib/recipes/use-recipe-prefs";
import type { RecipeCategory, RecipeListItem } from "@/lib/content/recipes";
import { RECIPE_CATEGORIES } from "@/lib/content/recipes";
import { cn } from "@/lib/utils";

type FilterMode = "all" | "favorites" | "most-used" | "recent";

export function RecipeBook({
  recipes,
}: {
  recipes: RecipeListItem[];
}) {
  const { favorites, recent, ready, isFavorite } = useRecipePrefs();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<RecipeCategory | "all">("all");
  const [mode, setMode] = React.useState<FilterMode>("all");

  const filtered = React.useMemo(() => {
    let list = [...recipes];

    if (mode === "favorites" && ready) {
      list = list.filter((r) => favorites.includes(r.slug));
    } else if (mode === "most-used") {
      list = [...list].sort((a, b) => b.usageCount - a.usageCount);
    } else if (mode === "recent" && ready) {
      list = recent
        .map((slug) => list.find((r) => r.slug === slug))
        .filter((r): r is RecipeListItem => Boolean(r));
    }

    if (category !== "all") {
      list = list.filter((r) => r.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.difficulty.toLowerCase().includes(q),
      );
    }

    return list;
  }, [recipes, mode, category, query, favorites, recent, ready]);

  const modes: { key: FilterMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "all", label: "All Recipes", icon: Search },
    { key: "favorites", label: "Favorites", icon: Star },
    { key: "most-used", label: "Most Used", icon: TrendingUp },
    { key: "recent", label: "Recently Viewed", icon: Clock },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:p-5">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, categories, difficulty…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <Button
              key={m.key}
              variant={mode === m.key ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(m.key)}
            >
              <m.icon data-icon="inline-start" />
              {m.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={category === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategory("all")}
          >
            All Categories
          </Badge>
          {RECIPE_CATEGORIES.map((c) => (
            <Badge
              key={c.key}
              variant={category === c.key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-2 rounded-xl border py-16 text-center">
          <p className="font-display text-lg font-semibold">No recipes found</p>
          <p className="text-muted-foreground text-sm">
            Try a different search or clear your filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setMode("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
            mode === "most-used" && "xl:grid-cols-2",
          )}
        >
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.slug}
              recipe={recipe}
              isFavorite={ready && isFavorite(recipe.slug)}
            />
          ))}
        </div>
      )}

      <p className="text-muted-foreground text-center text-xs">
        {filtered.length} of {recipes.length} recipes · Master batches scale automatically
      </p>
    </div>
  );
}
