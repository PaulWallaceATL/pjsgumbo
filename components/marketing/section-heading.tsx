import { Flame, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/marketing/animated-heading";

/**
 * Branded section eyebrow — a small flame mark + uppercase, letter-spaced
 * label. Centered eyebrows get flanking gradient rules for a polished,
 * franchise-grade flourish.
 */
export function Eyebrow({
  children,
  align = "center",
  icon: Icon = Flame,
  className,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-primary font-display flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] uppercase",
        align === "center" && "justify-center",
        className,
      )}
    >
      {align === "center" ? (
        <span className="from-primary/0 to-primary/60 h-px w-7 bg-gradient-to-r" />
      ) : null}
      <Icon className="fill-primary/15 size-4" />
      {children}
      {align === "center" ? (
        <span className="from-primary/60 to-primary/0 h-px w-7 bg-gradient-to-r" />
      ) : null}
    </p>
  );
}

/**
 * Shared section heading used across every marketing page so eyebrows,
 * titles, and supporting copy are perfectly consistent site-wide.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  icon,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}
    >
      <Eyebrow align={align} icon={icon}>
        {eyebrow}
      </Eyebrow>
      <AnimatedHeading
        as="h2"
        text={title}
        center={align === "center"}
        className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
      />
      {description ? (
        <p
          className={cn(
            "text-muted-foreground mt-4 leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
