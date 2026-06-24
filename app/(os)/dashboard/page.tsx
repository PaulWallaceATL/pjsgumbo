import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/os/kpi-card";
import {
  CategorySalesChart,
  SalesTrendChart,
} from "@/components/os/dashboard-charts";
import { InventoryTable } from "@/components/os/inventory-table";
import {
  getCategorySales,
  getDashboardKpis,
  getInventoryRows,
  getSalesTrend,
  getUpcomingPrep,
} from "@/lib/os/data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const kpis = getDashboardKpis();
  const salesTrend = getSalesTrend();
  const categorySales = getCategorySales();
  const upcoming = getUpcomingPrep();
  const lowStock = getInventoryRows()
    .filter((r) => r.status !== "ok")
    .sort((a, b) => a.onHand / a.par - b.onHand / b.par);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Today&apos;s operations at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales — last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTrendChart data={salesTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategorySalesChart data={categorySales} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="text-warning size-4" />
              Low inventory alerts
            </CardTitle>
            <Link
              href="/inventory"
              className="text-primary flex items-center gap-1 text-sm font-medium"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {lowStock.slice(0, 5).map((row) => (
              <div
                key={row.sku}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {row.onHand} / {row.par} {row.unit} on hand
                  </p>
                </div>
                <Badge
                  variant="muted"
                  className={cn(
                    "border-transparent",
                    row.status === "critical"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-warning/15 text-warning",
                  )}
                >
                  {row.status === "critical" ? "Critical" : "Low"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming prep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcoming.map((task) => (
              <div
                key={task.task}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{task.task}</p>
                  <p className="text-muted-foreground text-xs">{task.due}</p>
                </div>
                <span className="text-sm font-medium">{task.qty}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryTable rows={getInventoryRows().slice(0, 6)} />
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/restaurant-depot", label: "Restaurant Depot", desc: "Weekly wholesale cart" },
          { href: "/daily-prep", label: "Production", desc: "Prep queue & schedule" },
          { href: "/bookkeeping", label: "Finance", desc: "Books, tax & cash flow" },
          { href: "/orders", label: "Orders", desc: "Live queue & delivery" },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:border-primary/40 h-full transition-colors hover:shadow-sm">
              <CardContent className="py-5">
                <p className="font-display font-bold">{link.label}</p>
                <p className="text-muted-foreground mt-1 text-sm">{link.desc}</p>
                <span className="text-primary mt-3 flex items-center gap-1 text-sm font-medium">
                  Open <ArrowRight className="size-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
