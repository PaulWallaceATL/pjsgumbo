"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChefHat,
  DollarSign,
  FileDown,
  Printer,
  Star,
  Thermometer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  computeRecipeCost,
  formatAmount,
  formatDuration,
  getBatchSize,
  scaleIngredients,
  type BatchSizeKey,
  type Recipe,
} from "@/lib/content/recipes";
import { useRecipePrefs } from "@/lib/recipes/use-recipe-prefs";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/40 flex flex-col gap-0.5 rounded-lg border px-3 py-2.5">
      <span className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function ChefNotesSection({ recipe }: { recipe: Recipe }) {
  const { chefNotes: n } = recipe;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex list-disc flex-col gap-2 pl-4 text-sm">
            {n.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Critical Control Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex list-disc flex-col gap-2 pl-4 text-sm">
            {n.criticalControlPoints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Common Mistakes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex list-disc flex-col gap-2 pl-4 text-sm">
            {n.commonMistakes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sensory Guides</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div>
            <p className="font-medium">Texture</p>
            <p className="text-muted-foreground">{n.textureGuide}</p>
          </div>
          <div>
            <p className="font-medium">Color</p>
            <p className="text-muted-foreground">{n.colorGuide}</p>
          </div>
          <div>
            <p className="font-medium">Taste</p>
            <p className="text-muted-foreground">{n.tasteGuide}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RecipeDetailView({ recipe }: { recipe: Recipe }) {
  const [batchKey, setBatchKey] = React.useState<BatchSizeKey>("restaurant");
  const { toggleFavorite, markViewed, isFavorite, ready } = useRecipePrefs();

  React.useEffect(() => {
    markViewed(recipe.slug);
  }, [recipe.slug, markViewed]);

  const batch = getBatchSize(recipe, batchKey);
  const ingredients = scaleIngredients(recipe, batchKey);
  const cost = computeRecipeCost(recipe, batchKey);
  const favorite = ready && isFavorite(recipe.slug);

  const handlePrint = () => window.print();

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="recipe-detail mx-auto max-w-6xl">
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="/recipes">
            <ArrowLeft data-icon="inline-start" />
            Recipe Book
          </Link>
        </Button>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button
            variant={favorite ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFavorite(recipe.slug)}
          >
            <Star data-icon="inline-start" className={cn(favorite && "fill-current")} />
            {favorite ? "Favorited" : "Favorite"}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer data-icon="inline-start" />
            Print Recipe
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPdf}>
            <FileDown data-icon="inline-start" />
            Export PDF
          </Button>
          <Button size="sm" asChild>
            <Link href={`/recipes/${recipe.slug}/kitchen?batch=${batchKey}`}>
              <ChefHat data-icon="inline-start" />
              Kitchen View
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-2xl border">
        <div className="relative aspect-[21/9] min-h-[220px]">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="cream">{recipe.category}</Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {recipe.difficulty}
              </Badge>
            </div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {recipe.name}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-white/85 sm:text-base">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <MetaItem label="Yield" value={batch.yield} />
        <MetaItem label="Prep Time" value={formatDuration(recipe.prepTimeMinutes)} />
        <MetaItem label="Cook Time" value={formatDuration(recipe.cookTimeMinutes)} />
        <MetaItem label="Hold Time" value={formatDuration(recipe.holdTimeMinutes)} />
        <MetaItem label="Shelf Life" value={recipe.shelfLife} />
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Storage & Service</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div>
              <p className="font-medium">Storage Instructions</p>
              <p className="text-muted-foreground">{recipe.storageInstructions}</p>
            </div>
            <div>
              <p className="font-medium">Serving Temperature</p>
              <p className="text-muted-foreground">{recipe.servingTemperature}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Thermometer className="size-4" />
              Internal Cook Temperatures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm">
              {recipe.internalTemps.map((t) => (
                <li key={t.item} className="flex justify-between gap-4 border-b pb-2 last:border-0">
                  <span>{t.item}</span>
                  <span className="font-medium tabular-nums">{t.tempF}°F</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Required Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recipe.equipment.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="no-print mb-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
          Recipe Size
        </p>
        <Tabs value={batchKey} onValueChange={(v) => setBatchKey(v as BatchSizeKey)}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            {recipe.batchSizes.map((b) => (
              <TabsTrigger key={b.key} value={b.key} className="text-xs sm:text-sm">
                {b.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="text-muted-foreground mt-2 text-sm">
          {batch.label} · {batch.yield} · {batch.portionCount} portions — quantities scale from master recipe
        </p>
      </div>

      <div className="print-batch mb-8 hidden">
        <p className="font-display text-lg font-bold">{batch.label}</p>
        <p>{batch.yield} · {batch.portionCount} portions</p>
      </div>

      <Tabs defaultValue="ingredients" className="mb-8">
        <TabsList className="no-print mb-4 flex h-auto w-full flex-wrap">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="prep">Preparation</TabsTrigger>
          <TabsTrigger value="notes">Chef Notes</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="cost">
            <DollarSign data-icon="inline-start" />
            Cost
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients">
          <Card>
            <CardContent className="py-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="hidden md:table-cell">Prep Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ing) => (
                    <TableRow key={ing.name}>
                      <TableCell className="font-medium">{ing.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatAmount(ing.scaledAmount)}
                      </TableCell>
                      <TableCell>{ing.unit}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {ing.prepNotes ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prep">
          <Card>
            <CardContent className="py-6">
              <ol className="flex list-decimal flex-col gap-4 pl-5 text-sm leading-relaxed">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <ChefNotesSection recipe={recipe} />
        </TabsContent>

        <TabsContent value="nutrition">
          <Card>
            <CardContent className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Calories", value: `${recipe.nutrition.calories}` },
                { label: "Protein", value: `${recipe.nutrition.proteinG}g` },
                { label: "Fat", value: `${recipe.nutrition.fatG}g` },
                { label: "Carbs", value: `${recipe.nutrition.carbsG}g` },
                { label: "Sodium", value: `${recipe.nutrition.sodiumMg}mg` },
                { label: "Serving Size", value: recipe.nutrition.servingSize },
              ].map((n) => (
                <div key={n.label} className="bg-muted/40 rounded-lg border px-4 py-3">
                  <p className="text-muted-foreground text-xs uppercase">{n.label}</p>
                  <p className="font-display text-xl font-bold">{n.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Ingredient Cost", value: formatCurrency(cost.recipeCost) },
              { label: "Recipe Cost", value: formatCurrency(cost.recipeCost) },
              { label: "Cost Per Serving", value: formatCurrency(cost.costPerServing) },
              { label: "Suggested Menu Price", value: formatCurrency(cost.suggestedMenuPrice) },
              { label: "Food Cost %", value: formatPercent(cost.foodCostPercent) },
              { label: "Gross Profit", value: formatCurrency(cost.grossProfit) },
            ].map((c) => (
              <Card key={c.label}>
                <CardContent className="py-5">
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    {c.label}
                  </p>
                  <p className="font-display mt-1 text-2xl font-bold">{c.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator className="my-6" />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ingredient Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Line Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ing) => (
                    <TableRow key={ing.name}>
                      <TableCell>{ing.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatAmount(ing.scaledAmount)} {ing.unit}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(ing.lineCost)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
