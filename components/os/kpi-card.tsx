import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/os/data";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const positive = (kpi.delta ?? 0) >= 0;
  return (
    <Card>
      <CardContent className="py-5">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {kpi.label}
        </p>
        <p className="font-display mt-1.5 text-2xl font-bold">{kpi.value}</p>
        <div className="mt-1 flex items-center gap-2 text-xs">
          {kpi.delta !== undefined ? (
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                positive ? "text-success" : "text-destructive",
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {Math.abs(kpi.delta)}%
            </span>
          ) : null}
          {kpi.hint ? (
            <span className="text-muted-foreground">{kpi.hint}</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
