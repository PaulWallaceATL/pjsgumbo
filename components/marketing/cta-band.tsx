import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { BrandWaves } from "@/components/marketing/brand-waves";
import { BrandIcon } from "@/components/marketing/brand-icon";

type CtaLink = { href: string; label: string };

/**
 * Shared closing call-to-action band. Every marketing page ends with the same
 * branded, wave-backed CTA so the whole site reads as one franchise.
 */
export function CtaBand({
  eyebrow,
  title,
  description,
  primary = { href: "/order", label: "Order Now" },
  secondary,
  icon,
  tone = "roux",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
  icon?: LucideIcon;
  tone?: "roux" | "dark";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "text-cream-100 relative overflow-hidden",
        tone === "dark" ? "bg-charcoal-800" : "bg-roux-700",
        className,
      )}
    >
      <BrandWaves opacity={tone === "dark" ? 0.55 : 0.4} speed={0.5} />
      <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center sm:py-20">
        {icon ? (
          <BrandIcon icon={icon} size="lg" className="mx-auto mb-5" />
        ) : null}
        {eyebrow ? (
          <p className="text-cream-200/80 font-display text-sm font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <AnimatedHeading
          as="h2"
          text={title}
          center
          className="font-display text-cream-50 mt-3 text-3xl font-bold sm:text-5xl"
        />
        {description ? (
          <p className="text-cream-100/75 mx-auto mt-4 max-w-lg text-lg leading-relaxed">
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream-100/30 text-cream-100 hover:bg-cream-100/10 hover:text-cream-50"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
