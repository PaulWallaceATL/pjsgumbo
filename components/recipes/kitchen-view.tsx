"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatAmount,
  formatDuration,
  getBatchSize,
  scaleIngredients,
  type BatchSizeKey,
  type Recipe,
} from "@/lib/content/recipes";

export function KitchenView({
  recipe,
  initialBatch = "restaurant",
}: {
  recipe: Recipe;
  initialBatch?: BatchSizeKey;
}) {
  const [batchKey] = React.useState<BatchSizeKey>(initialBatch);
  const batch = getBatchSize(recipe, batchKey);
  const ingredients = scaleIngredients(recipe, batchKey);

  return (
    <div className="kitchen-view bg-background min-h-screen">
      <header className="no-print bg-card sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/recipes/${recipe.slug}`}>
            <ArrowLeft data-icon="inline-start" />
            Back
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer data-icon="inline-start" />
          Print
        </Button>
        <span className="ml-auto text-sm font-medium">{batch.label}</span>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border">
            <Image src={recipe.image} alt="" fill className="object-cover" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-2">
              {batch.label} · {batch.yield}
            </Badge>
            <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {recipe.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Prep {formatDuration(recipe.prepTimeMinutes)} · Cook{" "}
              {formatDuration(recipe.cookTimeMinutes)} · {batch.portionCount} portions
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="font-display mb-3 text-lg font-bold">Ingredients</h2>
          <div className="divide-y rounded-xl border">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="flex items-baseline justify-between gap-4 px-4 py-3 text-base sm:text-lg"
              >
                <div>
                  <span className="font-semibold">{ing.name}</span>
                  {ing.prepNotes ? (
                    <span className="text-muted-foreground ml-2 text-sm">
                      {ing.prepNotes}
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 font-bold tabular-nums">
                  {formatAmount(ing.scaledAmount)} {ing.unit}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display mb-3 text-lg font-bold">Preparation</h2>
          <ol className="flex list-decimal flex-col gap-4 pl-5 text-base leading-relaxed sm:text-lg">
            {recipe.steps.map((step, i) => (
              <li key={i} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {recipe.internalTemps.length > 0 ? (
          <section className="mt-8 rounded-xl border border-cajun-500/30 bg-cajun-50/50 p-4 dark:bg-cajun-900/20">
            <h2 className="font-display mb-2 text-lg font-bold">Temperature Checks</h2>
            <ul className="flex flex-col gap-1 text-sm sm:text-base">
              {recipe.internalTemps.map((t) => (
                <li key={t.item} className="flex justify-between">
                  <span>{t.item}</span>
                  <span className="font-bold">{t.tempF}°F</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}
