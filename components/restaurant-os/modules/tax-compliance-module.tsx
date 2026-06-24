"use client";

import { Receipt } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleBand } from "@/components/restaurant-os/module-band";
import { getTaxComplianceItems, getTaxDeadlines } from "@/lib/restaurant-os/data";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_STYLES = {
  Filed: "bg-success/15 text-success",
  Current: "bg-success/15 text-success",
  Due: "bg-warning/15 text-warning",
};

const TYPE_STYLES = {
  sales: "bg-cajun-100 text-cajun-800",
  payroll: "bg-roux-100 text-roux-800",
  income: "bg-cream-200 text-roux-700",
};

export function TaxComplianceModule() {
  const items = getTaxComplianceItems();
  const deadlines = getTaxDeadlines();

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(2026, 5, 1 + i);
    return {
      date: d.getDate(),
      full: d.toISOString().slice(0, 10),
      isCurrentMonth: d.getMonth() === 5,
    };
  });

  return (
    <ModuleBand id="tax" icon={Receipt}>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.label}</CardTitle>
              <p className="text-muted-foreground text-sm">{item.jurisdiction}</p>
            </CardHeader>
            <CardContent>
              <Badge variant="muted" className={cn("border-transparent", STATUS_STYLES[item.status])}>
                {item.status}
              </Badge>
              {item.dueDate ? (
                <p className="text-muted-foreground mt-2 text-sm">Due {item.dueDate}</p>
              ) : null}
              {item.amount ? (
                <p className="font-display mt-1 text-lg font-bold tabular-nums">{formatCurrency(item.amount)}</p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filing Deadlines — Next 60 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {deadlines.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{d.label}</p>
                  <p className="text-muted-foreground text-sm">{d.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant="muted" className={cn("border-transparent capitalize", TYPE_STYLES[d.type])}>
                    {d.type}
                  </Badge>
                  {d.amount ? (
                    <p className="mt-1 text-sm font-medium tabular-nums">{formatCurrency(d.amount)}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-muted-foreground mb-3 text-sm font-medium">June 2026 Calendar</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-muted-foreground py-1 font-medium">{d}</div>
              ))}
              {calendarDays.map((day, i) => {
                const deadline = deadlines.find((d) => d.date.endsWith(`-${String(day.date).padStart(2, "0")}`) && day.isCurrentMonth);
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative rounded-md py-2",
                      !day.isCurrentMonth && "text-muted-foreground/40",
                      deadline && "bg-primary/10 font-bold",
                    )}
                  >
                    {day.date}
                    {deadline ? (
                      <span className="bg-primary absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </ModuleBand>
  );
}
