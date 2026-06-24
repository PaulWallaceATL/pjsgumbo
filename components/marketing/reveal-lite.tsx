"use client";

import { cn } from "@/lib/utils";

/**
 * Lightweight CSS fade-up — no Framer observers. Safe for data-heavy pages.
 */
export function RevealLite({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  return (
    <div
      className={cn("animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500", className)}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
