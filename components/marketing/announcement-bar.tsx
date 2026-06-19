import { Flame, MapPin, Truck } from "lucide-react";

/**
 * Slim, brand-colored bar pinned above the header — a classic franchise
 * signal that surfaces delivery + promo messaging on every page.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-secondary text-secondary-foreground relative z-50">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-center gap-x-6 gap-y-1 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Truck className="text-cream-300 size-3.5" />
          Free delivery on orders over $40
        </span>
        <span className="text-cream-100/30 hidden sm:inline">•</span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <MapPin className="text-cream-300 size-3.5" />
          Now serving metro Atlanta
        </span>
        <span className="text-cream-100/30 hidden md:inline">•</span>
        <span className="hidden items-center gap-1.5 md:flex">
          <Flame className="text-cajun-300 size-3.5" />
          Mild or spicy, made fresh daily
        </span>
      </div>
    </div>
  );
}
