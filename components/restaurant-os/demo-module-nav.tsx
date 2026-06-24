"use client";

import { cn } from "@/lib/utils";
import { MODULE_META } from "@/lib/restaurant-os/data";

export function DemoModuleNav({
  active,
  onSelect,
  vertical = true,
}: {
  active: string;
  onSelect: (id: string) => void;
  vertical?: boolean;
}) {
  if (!vertical) {
    return (
      <ScrollPills active={active} onSelect={onSelect} />
    );
  }

  return (
    <nav aria-label="Demo modules" className="flex h-full flex-col">
      <p className="text-muted-foreground px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase">
        Modules
      </p>
      <ul className="space-y-0.5 overflow-y-auto px-2 pb-2">
        {MODULE_META.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                active === id
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground mt-auto border-t px-3 py-3 text-[11px] leading-relaxed">
        Use arrow keys to cycle modules
      </p>
    </nav>
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
    <div className="border-b bg-background/95 px-3 py-2">
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {MODULE_META.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
              active === id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
