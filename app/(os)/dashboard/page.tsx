import Link from "next/link";
import { ArrowRight, RefreshCw, Receipt, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/os/kpi-card";
import { OsPageShell } from "@/components/os/os-page-shell";
import { LazyChart } from "@/components/os/lazy-chart";
import {
  CategorySalesChart,
  SalesTrendChart,
} from "@/components/os/dashboard-charts";
import { InventoryTable } from "@/components/os/inventory-table";
import { StatusBadge } from "@/components/os/status-badge";
import { statusToneFromInventory } from "@/lib/os/status-utils";
import {
  getCategorySales,
  getDashboardKpis,
  getInventoryRows,
  getSalesTrend,
  getUpcomingPrep,
} from "@/lib/os/data";

export default function DashboardPage() {
  const kpis = getDashboardKpis();
  const salesTrend = getSalesTrend();
  const categorySales = getCategorySales();
  const upcoming = getUpcomingPrep();
  const lowStock = getInventoryRows()
    .filter((r) => r.status !== "ok")
    .sort((a, b) => a.onHand / a.par - b.onHand / b.par);

  return (
    <OsPageShell
      title="Dashboard"
      description="Today's operations at a glance."
      actions={
        <>
          <Button asChild variant="outline" size="sm">
            <Link href="/weekly-reorder">
              <RefreshCw className="size-4" />
              Reorder
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/waste-log">
              <Trash2 className="size-4" />
              Log waste
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/orders">
              <Receipt className="size-4" />
              View orders
            </Link>
          </Button>
        </>
      }
    >
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
            <LazyChart>
              <SalesTrendChart data={salesTrend} />
            </LazyChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyChart>
              <CategorySalesChart data={categorySales} />
            </LazyChart>
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
              <Link
                key={row.sku}
                href="/inventory"
                className="hover:border-primary/30 flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {row.onHand} / {row.par} {row.unit} on hand
                  </p>
                </div>
                <StatusBadge
                  label={row.status === "critical" ? "Critical" : "Low"}
                  tone={statusToneFromInventory(row.status)}
                />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Upcoming prep</CardTitle>
            <Link
              href="/daily-prep"
              className="text-primary flex items-center gap-1 text-sm font-medium"
            >
              Prep queue <ArrowRight className="size-3.5" />
            </Link>
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
    </OsPageShell>
  );
}
