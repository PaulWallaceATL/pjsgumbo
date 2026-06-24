"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MODULE_SECTIONS } from "@/lib/restaurant-os/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ModuleNav() {
  const [active, setActive] = useState<string>(MODULE_SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    MODULE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="bg-background/95 sticky top-[4.5rem] z-40 border-b backdrop-blur-md">
      <ScrollArea className="w-full">
        <div className="container-px mx-auto flex max-w-7xl gap-1 py-2">
          {MODULE_SECTIONS.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                active === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
