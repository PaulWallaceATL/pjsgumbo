"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableTable } from "@/components/os/sortable-table";
import {
  getBatchCalcRows,
  getDailyPrepQueue,
  getProductionSchedule,
  getProteinPrepChecklist,
} from "@/lib/os/data";
import { cn } from "@/lib/utils";

const PREP_STATUS_STYLES = {
  Complete: "bg-success/15 text-success",
  "In Progress": "bg-warning/15 text-warning",
  Scheduled: "bg-primary/15 text-primary",
};

export function ProteinPrepView() {
  const checklist = getProteinPrepChecklist();

  const columns = useMemo<ColumnDef<(typeof checklist)[number]>[]>(
    () => [
      { accessorKey: "task", header: "Task" },
      { accessorKey: "qty", header: "Qty" },
      { accessorKey: "assignee", header: "Assignee" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", PREP_STATUS_STYLES[getValue<keyof typeof PREP_STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protein Prep Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={checklist} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function DailyPrepView() {
  const queue = getDailyPrepQueue();

  const columns = useMemo<ColumnDef<(typeof queue)[number]>[]>(
    () => [
      { accessorKey: "task", header: "Task" },
      { accessorKey: "due", header: "Due" },
      { accessorKey: "qty", header: "Qty" },
      { accessorKey: "assignee", header: "Assignee" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant="muted" className={cn("border-transparent", PREP_STATUS_STYLES[getValue<keyof typeof PREP_STATUS_STYLES>()])}>
            {getValue<string>()}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Prep Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableTable data={queue} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function BatchCalcView() {
  const rows = getBatchCalcRows();

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(
    () => [
      { accessorKey: "label", header: "Batch Size" },
      { accessorKey: "multiplier", header: "Multiplier", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}×</span> },
      { accessorKey: "yield", header: "Yield" },
      { accessorKey: "portions", header: "Portions", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "rouxLb", header: "Roux (lb)", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
      { accessorKey: "stockGal", header: "Stock (gal)", cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span> },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gumbo Batch Calculator</CardTitle>
        <p className="text-muted-foreground text-sm">Scale from home pot to 40-gallon commissary batches.</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function ProductionScheduleView() {
  const schedule = getProductionSchedule();

  const columns = useMemo<ColumnDef<(typeof schedule)[number]>[]>(
    () => [
      { accessorKey: "day", header: "Day" },
      { accessorKey: "gumbo", header: "Gumbo Varieties" },
      { accessorKey: "gallons", header: "Gallons", cell: ({ getValue }) => <span className="tabular-nums font-medium">{getValue<number>()}</span> },
      { accessorKey: "lead", header: "Lead" },
    ],
    [],
  );

  const totalGallons = schedule.reduce((s, d) => s + d.gallons, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Production Schedule</CardTitle>
        <p className="text-muted-foreground text-sm">{totalGallons} gallons planned this week</p>
      </CardHeader>
      <CardContent>
        <SortableTable data={schedule} columns={columns} />
      </CardContent>
    </Card>
  );
}
