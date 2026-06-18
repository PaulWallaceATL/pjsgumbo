"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

/** Sticky in-page category navigation with scroll-spy for the menu. */
export function MenuNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="bg-background/85 sticky top-18 z-30 border-y backdrop-blur-md">
      <nav className="container-px mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              active === item.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent text-muted-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
