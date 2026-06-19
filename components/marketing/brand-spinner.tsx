import Image from "next/image";

import { SITE } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/**
 * Lightweight, CSS-only brand spinner (no client JS) — a simmering pot with a
 * sweeping cajun-red ring and rising steam. Used by route-level loading states.
 */
export function BrandSpinner({
  label = "Simmering…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="pjs-steam bg-roux-400/40 block h-9 w-1.5 rounded-full blur-[2px]"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>

        <div className="relative grid size-24 place-items-center">
          <svg
            className="pjs-spin absolute inset-0 size-full"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden
          >
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="rgba(164,38,44,0.14)"
              strokeWidth="4"
            />
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#a4262c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="86 260"
            />
          </svg>
          <Image
            src={SITE.logo}
            alt="PJ's Gumbo"
            width={80}
            height={80}
            className="pjs-bob size-[4.5rem] rounded-full object-contain drop-shadow"
          />
        </div>
      </div>

      <p className="text-muted-foreground text-xs font-semibold tracking-[0.22em] uppercase">
        {label}
      </p>
    </div>
  );
}
