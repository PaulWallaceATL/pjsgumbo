import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Clock, Mail, MapPin, Phone, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/marketing/animated-heading";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { HOURS, SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit, call, or message PJ's Gumbo in Atlanta. Hours, location, phone, email, and social links.",
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.mapQuery,
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <section className="from-cream-100 to-background relative overflow-hidden bg-gradient-to-b">
        <HeroBackdrop />
        <div className="container-px relative z-10 mx-auto max-w-7xl py-16 text-center">
          <p className="text-primary font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Contact
          </p>
          <AnimatedHeading
            as="h1"
            text="Come say hey"
            center
            className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl"
          />
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Questions, catering, or just craving a bowl? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <InfoRow icon={MapPin} title="Location">
              {SITE.address}
            </InfoRow>
            <InfoRow icon={Phone} title="Phone">
              <a href={`tel:${SITE.phone}`} className="hover:text-primary">
                {SITE.phone}
              </a>
            </InfoRow>
            <InfoRow icon={Mail} title="Email">
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} title="Hours">
              <ul className="space-y-1">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span className="text-foreground">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                className="bg-muted hover:bg-primary hover:text-primary-foreground flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <Camera className="size-4" />
              </a>
              <a
                href={SITE.social.facebook}
                aria-label="Facebook"
                className="bg-muted hover:bg-primary hover:text-primary-foreground flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <Share2 className="size-4" />
              </a>
            </div>

            <div className="border-t pt-6">
              <p className="text-muted-foreground text-sm">
                Looking for answers fast? Check our{" "}
                <Link href="/#faq" className="text-primary font-medium underline-offset-4 hover:underline">
                  FAQ
                </Link>
                .
              </p>
              <Button asChild className="mt-4">
                <Link href="/order">Start an order</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <iframe
              title="PJ's Gumbo location"
              src={mapSrc}
              className="h-full min-h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="font-display font-bold">{title}</h3>
        <div className="text-muted-foreground mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}
