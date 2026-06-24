"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleBand } from "@/components/restaurant-os/module-band";
import { SortableTable } from "@/components/restaurant-os/sortable-table";
import { SeasonalForecastChart } from "@/components/restaurant-os/charts/demo-charts";
import { getSeasonalForecast, getStaffingForecast } from "@/lib/restaurant-os/data";
import type { StaffingForecast } from "@/lib/restaurant-os/types";
import { formatCurrency } from "@/lib/utils";

export function BudgetingModule() {
  const forecast = getSeasonalForecast();
  const staffing = getStaffingForecast();

  const columns = useMemo<ColumnDef<StaffingForecast>[]>(
    () => [
      { accessorKey: "week", header: "Week" },
      { accessorKey: "projectedCovers", header: "Covers", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>().toLocaleString()}</span> },
      { accessorKey: "recommendedFte", header: "Recommended Staffing" },
      { accessorKey: "laborHours", header: "Labor Hrs", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "estLaborCost", header: "Est. Labor Cost", cell: ({ getValue }) => <span className="tabular-nums font-medium">{formatCurrency(getValue<number>())}</span> },
    ],
    [],
  );

  return (
    <ModuleBand id="budgeting" icon={TrendingUp}>
      <Card>
        <CardHeader>
          <CardTitle>Sales Projections — Atlanta Seasonality</CardTitle>
        </CardHeader>
        <CardContent>
          <SeasonalForecastChart data={forecast} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staffing Needs Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableTable data={staffing} columns={columns} />
        </CardContent>
      </Card>
    </ModuleBand>
  );
}
