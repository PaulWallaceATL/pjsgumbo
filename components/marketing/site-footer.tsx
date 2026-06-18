import Link from "next/link";
import Image from "next/image";
import { Camera, Mail, MapPin, Phone, Share2 } from "lucide-react";

import { SITE, HOURS } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={SITE.logo}
                alt="PJ's Gumbo"
                width={48}
                height={48}
                className="size-11 rounded-full object-contain"
              />
              <span className="font-display text-xl font-bold">
                PJ&apos;s Gumbo
              </span>
            </Link>
            <p className="text-cream-100/70 max-w-xs text-sm leading-relaxed">
              Authentic Louisiana gumbo, made from scratch in Atlanta with a
              slow-cooked roux and the freshest ingredients.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                className="hover:bg-cajun-600 flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors"
              >
                <Camera className="size-4" />
              </a>
              <a
                href={SITE.social.facebook}
                aria-label="Facebook"
                className="hover:bg-cajun-600 flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors"
              >
                <Share2 className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-cream-100 mb-4 text-sm font-bold tracking-wide uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/menu", label: "Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/catering", label: "Catering" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream-100/70 hover:text-cream-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-cream-100 mb-4 text-sm font-bold tracking-wide uppercase">
              Visit Us
            </h4>
            <ul className="text-cream-100/70 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-cream-100">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-cream-100">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-cream-100 mb-4 text-sm font-bold tracking-wide uppercase">
              Hours
            </h4>
            <ul className="text-cream-100/70 space-y-1.5 text-sm">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream-100/90">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-cream-100/10 mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 text-sm sm:flex-row">
          <p className="text-cream-100/60">
            &copy; {new Date().getFullYear()} PJ&apos;s Gumbo. All rights
            reserved.
          </p>
          <p className="text-cream-100/60">Atlanta Made. Cajun Soul.</p>
        </div>
      </div>
    </footer>
  );
}
