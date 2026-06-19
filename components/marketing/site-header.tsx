"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/content/site";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Our Story" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    !href.startsWith("/#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/90 border-b backdrop-blur-md"
            : "bg-transparent",
        )}
      >
      <div className="container-px mx-auto flex h-18 max-w-7xl items-center justify-between py-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src={SITE.logo}
            alt="PJ's Gumbo"
            width={48}
            height={48}
            priority
            className="ring-primary/10 size-11 rounded-full object-contain ring-1 transition-transform group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold tracking-tight">
            PJ&apos;s Gumbo
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary relative text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary after:bg-primary after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full"
                  : "text-foreground/80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="lg">
            <Link href="/order">
              <ShoppingBag className="size-4" />
              Order Now
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="bg-background border-b md:hidden">
          <nav className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-2">
              <Link href="/order" onClick={() => setOpen(false)}>
                <ShoppingBag className="size-4" />
                Order Now
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
      </header>
    </>
  );
}
