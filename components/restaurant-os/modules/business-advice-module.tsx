"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MapPin, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleSection } from "@/components/restaurant-os/module-section";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import { ExpansionRoiChart } from "@/components/restaurant-os/charts/demo-charts";
import { getExpansionAnalysis, getMenuEngineering } from "@/lib/restaurant-os/data";
import type { MenuEngineeringRow } from "@/lib/restaurant-os/types";
import { cn, formatCurrency } from "@/lib/utils";

const CLASS_STYLES = {
  Star: "bg-success/15 text-success",
  "Plow Horse": "bg-primary/15 text-primary",
  Puzzle: "bg-warning/15 text-warning",
  Dog: "bg-muted text-muted-foreground",
};

export function BusinessAdviceModule() {
  const menu = getMenuEngineering();
  const expansion = getExpansionAnalysis();

  const columns = useMemo<ColumnDef<MenuEngineeringRow>[]>(
    () => [
      { accessorKey: "name", header: "Menu Item" },
      { accessorKey: "sold", header: "# Sold", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>().toLocaleString()}</span> },
      { accessorKey: "foodCostPct", header: "Food Cost %", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span> },
      { accessorKey: "contributionMargin", header: "Margin $", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
      {
        accessorKey: "classification",
        header: "Class",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", CLASS_STYLES[getValue<keyof typeof CLASS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <ModuleSection
      id="advice"
      icon={Sparkles}
      title="Business Advice (AI Insights)"
      description="Menu engineering analysis and expansion profitability for a second Atlanta location."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary size-4" />
            Menu Engineering
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Signature Gumbo is a Star (high popularity, strong margin). Blue Crab is a Puzzle — premium margin but weekend-only volume limits throughput.
          </p>
        </CardHeader>
        <CardContent>
          <SortableTable data={menu} columns={columns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-primary size-4" />
            Expansion Analysis — {expansion.location}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Demo projection. Not financial advice.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Year 1 Revenue</p>
              <p className="font-display text-xl font-bold tabular-nums">{formatCurrency(expansion.year1Revenue)}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Monthly Rent</p>
              <p className="font-display text-xl font-bold tabular-nums">{formatCurrency(expansion.monthlyRent)}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Breakeven</p>
              <p className="font-display text-xl font-bold tabular-nums">Month {expansion.breakevenMonth}</p>
            </div>
          </div>
          <ExpansionRoiChart data={expansion.roiData} />
        </CardContent>
      </Card>
    </ModuleSection>
  );
}
