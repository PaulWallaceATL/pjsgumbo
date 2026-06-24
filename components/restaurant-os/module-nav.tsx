"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MODULE_SECTIONS } from "@/lib/restaurant-os/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ModuleNav() {
  const [active, setActive] = useState<string>(MODULE_SECTIONS[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    MODULE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-140px 0px -55% 0px", threshold: 0.05 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-[4.5rem] z-40 border-b transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <ScrollArea className="w-full">
        <div className="container-px mx-auto flex max-w-7xl gap-1.5 py-2.5">
          {MODULE_SECTIONS.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all sm:text-sm",
                active === id
                  ? "bg-primary text-primary-foreground shadow-sm"
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
