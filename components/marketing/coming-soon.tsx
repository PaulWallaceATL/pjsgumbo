import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Placeholder for marketing routes that are built in a later phase. */
export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="container-px mx-auto flex max-w-2xl flex-col items-center py-28 text-center">
      <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
        Coming Soon
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        {description}
      </p>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Button>
    </section>
  );
}
