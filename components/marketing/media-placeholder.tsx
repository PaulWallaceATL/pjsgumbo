import Image from "next/image";
import { Soup } from "lucide-react";

import { cn } from "@/lib/utils";

const GRADIENTS: Record<string, string> = {
  roux: "from-roux-700 via-roux-500 to-cajun-700",
  cajun: "from-cajun-600 via-cajun-500 to-roux-600",
  cream: "from-cream-200 via-cream-100 to-cream-300",
  dark: "from-charcoal-900 via-roux-800 to-charcoal-800",
};

/**
 * Stand-in for professional photography. Renders a real image when `src` is
 * provided, otherwise a tasteful branded gradient so layouts are
 * photo-ready without placeholder stock images.
 */
export function MediaPlaceholder({
  src,
  alt,
  label,
  tone = "roux",
  className,
  rounded = "rounded-2xl",
}: {
  src?: string;
  alt?: string;
  label?: string;
  tone?: keyof typeof GRADIENTS;
  className?: string;
  rounded?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", rounded, className)}>
        <Image src={src} alt={alt ?? ""} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? label ?? "PJ's Gumbo"}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-cream-100/90",
        GRADIENTS[tone],
        rounded,
        className,
      )}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <Soup className="size-10 opacity-80" />
        {label ? (
          <span className="font-display text-lg font-semibold tracking-tight">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
