"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MODULE_META } from "@/lib/restaurant-os/data";
import { MODULE_ICONS } from "@/lib/restaurant-os/module-icons";
import { cn } from "@/lib/utils";

export function DemoModuleNav({
  active,
  onSelect,
  vertical = true,
}: {
  active: string;
  onSelect: (id: string) => void;
  vertical?: boolean;
}) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MODULE_META;
    return MODULE_META.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.eyebrow.toLowerCase().includes(q),
    );
  }, [query]);

  if (!vertical) {
    return <ScrollPills active={active} onSelect={onSelect} />;
  }

  const activeIndex = MODULE_META.findIndex((m) => m.id === active);

  return (
    <TooltipProvider delayDuration={300}>
      <nav
        aria-label="Demo modules"
        className="bg-muted/20 flex h-full min-h-0 flex-col"
      >
        <div className="shrink-0 space-y-3 p-3 pb-2">
          <div className="flex items-center justify-between gap-2 px-0.5">
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.14em] uppercase">
              Explore modules
            </p>
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal tabular-nums">
              {MODULE_META.length}
            </Badge>
          </div>
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter modules…"
              className="bg-background h-8 border-dashed pl-8 text-xs"
            />
          </div>
        </div>

        <ScrollArea className="min-h-0 flex-1 px-2">
          <ul className="space-y-0.5 pb-2">
            {filtered.map(({ id, label, eyebrow }) => {
              const Icon = MODULE_ICONS[id] ?? MODULE_ICONS.operations;
              const isActive = active === id;
              return (
                <li key={id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => onSelect(id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground hover:bg-background/80",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                            isActive
                              ? "border-primary-foreground/20 bg-primary-foreground/10"
                              : "bg-background group-hover:border-border border-transparent",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium leading-tight">
                            {label}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block truncate text-[11px] leading-tight",
                              isActive ? "text-primary-foreground/75" : "text-muted-foreground",
                            )}
                          >
                            {eyebrow}
                          </span>
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      {MODULE_META.find((m) => m.id === id)?.description}
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground px-2 py-6 text-center text-xs">
              No modules match &ldquo;{query}&rdquo;
            </p>
          ) : null}
        </ScrollArea>

        <div className="bg-background/60 shrink-0 border-t p-3">
          <Separator className="mb-3" />
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            <kbd className="bg-muted rounded border px-1 py-0.5 font-mono text-[10px]">↑</kbd>{" "}
            <kbd className="bg-muted rounded border px-1 py-0.5 font-mono text-[10px]">↓</kbd>{" "}
            cycle modules
            {activeIndex >= 0 ? (
              <span className="mt-1.5 block tabular-nums">
                Module {activeIndex + 1} of {MODULE_META.length}
              </span>
            ) : null}
          </p>
        </div>
      </nav>
    </TooltipProvider>
  );
}

function ScrollPills({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="border-b bg-background/95 backdrop-blur-sm">
      <ScrollArea className="w-full">
        <div className="flex gap-1.5 px-3 py-2.5">
          {MODULE_META.map(({ id, label }) => {
            const Icon = MODULE_ICONS[id] ?? MODULE_ICONS.operations;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  active === id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground bg-background",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
