import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const SIZES = {
  sm: "size-9 rounded-lg [&>svg]:size-4",
  md: "size-12 rounded-xl [&>svg]:size-5",
  lg: "size-14 rounded-2xl [&>svg]:size-6",
} as const;

/**
 * Consistent, on-brand icon "chip" used across the marketing site so every
 * feature, perk, and info row shares the same visual language.
 *
 * - `solid` (default): a warm cajun→roux gradient roundel with a soft ring +
 *   shadow — the signature franchise treatment.
 * - `soft`: a subtle tinted square for denser layouts.
 */
export function BrandIcon({
  icon: Icon,
  variant = "solid",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  variant?: "solid" | "soft";
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        SIZES[size],
        variant === "solid"
          ? "from-cajun-500 to-roux-700 text-cream-50 shadow-cajun-900/25 ring-cream-50/15 bg-gradient-to-br shadow-md ring-1"
          : "bg-primary/10 text-primary ring-primary/15 ring-1",
        className,
      )}
    >
      <Icon />
    </span>
  );
}
