import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/lib/content/recipes";
import type { RecipeListItem } from "@/lib/content/recipes";

const DIFFICULTY_VARIANT: Record<
  RecipeListItem["difficulty"],
  "default" | "secondary" | "outline" | "muted"
> = {
  Easy: "muted",
  Intermediate: "outline",
  Advanced: "secondary",
  Expert: "default",
};

export function RecipeCard({
  recipe,
  isFavorite,
}: {
  recipe: RecipeListItem;
  isFavorite?: boolean;
}) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <Card className="overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16">
            <Badge variant="cream" className="mb-2">
              {recipe.category}
            </Badge>
            <h3 className="font-display text-lg font-bold text-white leading-tight">
              {recipe.name}
            </h3>
          </div>
          {isFavorite ? (
            <Badge className="absolute top-3 right-3" variant="default">
              Favorite
            </Badge>
          ) : null}
        </div>
        <CardContent className="flex flex-col gap-3 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={DIFFICULTY_VARIANT[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock className="size-3.5" />
              {formatDuration(totalTime)}
            </span>
          </div>
          <div className="text-muted-foreground grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-foreground font-medium">Prep</p>
              <p>{formatDuration(recipe.prepTimeMinutes)}</p>
            </div>
            <div>
              <p className="text-foreground font-medium">Cook</p>
              <p>{formatDuration(recipe.cookTimeMinutes)}</p>
            </div>
            <div>
              <p className="text-foreground font-medium">Yield</p>
              <p>{recipe.yield}</p>
            </div>
            <div>
              <p className="text-foreground flex items-center gap-1 font-medium">
                <Users className="size-3" />
                Portions
              </p>
              <p>{recipe.portionCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
