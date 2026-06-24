import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function OsPageShell({
  title,
  description,
  badge,
  stats,
  children,
}: {
  title: string;
  description: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        {badge ? (
          <Badge variant="secondary" className="mb-3">
            {badge}
          </Badge>
        ) : null}
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">{description}</p>
      </div>
      {stats?.length ? <OsStatGrid stats={stats} /> : null}
      {children}
    </div>
  );
}

export function OsStatGrid({
  stats,
  className,
}: {
  stats: { label: string; value: string; icon?: LucideIcon }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="py-5">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {s.label}
            </p>
            <p className="font-display mt-1.5 text-2xl font-bold tabular-nums">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
