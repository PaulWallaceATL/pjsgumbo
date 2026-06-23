"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Boxes,
  Building2,
  Calculator,
  CalendarDays,
  ChefHat,
  Clock,
  DollarSign,
  Drumstick,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Receipt,
  RefreshCw,
  Scale,
  ShoppingCart,
  Snowflake,
  Thermometer,
  TrendingUp,
  Trash2,
  Truck,
  UtensilsCrossed,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { AUTH_ENABLED } from "@/lib/auth/config";
import { signOut } from "@/lib/auth/actions";
import type { AuthUser } from "@/lib/auth/session";

type NavItem = { label: string; href?: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Inventory & Purchasing",
    items: [
      { label: "Inventory", href: "/inventory", icon: Boxes },
      { label: "Restaurant Depot", icon: ShoppingCart },
      { label: "Weekly Reorder", icon: RefreshCw },
      { label: "Freezer", icon: Snowflake },
      { label: "Walk-In Cooler", icon: Thermometer },
    ],
  },
  {
    title: "Production",
    items: [
      { label: "Protein Prep", icon: Drumstick },
      { label: "Daily Prep", icon: ChefHat },
      { label: "Gumbo Batch Calc", icon: Calculator },
      { label: "Production Schedule", icon: CalendarDays },
      { label: "Packaging", icon: Package },
    ],
  },
  {
    title: "Recipes & Costing",
    items: [
      { label: "Recipes", href: "/recipes", icon: BookOpen },
      { label: "Food Cost", icon: DollarSign },
      { label: "Profit Margin", icon: TrendingUp },
      { label: "Portions", icon: Scale },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", icon: Receipt },
      { label: "Menu Management", icon: UtensilsCrossed },
      { label: "Delivery Analytics", icon: Truck },
    ],
  },
  {
    title: "People & Reports",
    items: [
      { label: "Waste Log", icon: Trash2 },
      { label: "Vendors", icon: Building2 },
      { label: "Employees", icon: Users },
      { label: "Reporting", icon: FileBarChart },
    ],
  },
];

export function OsShell({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-muted/30 min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-background fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/brand/pjs-logo.png"
              alt="PJ's"
              width={36}
              height={36}
              className="size-9 rounded-full object-contain"
            />
            <span className="font-display text-sm font-bold leading-tight">
              PJ&apos;s Restaurant OS
            </span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="h-[calc(100vh-4rem)] space-y-5 overflow-y-auto p-3">
          {NAV.map((group) => (
            <div key={group.title}>
              <p className="text-muted-foreground px-3 pb-1.5 text-[11px] font-semibold tracking-wider uppercase">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active =
                    item.href &&
                    (pathname === item.href || pathname.startsWith(`${item.href}/`));
                  const content = (
                    <span
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary text-primary-foreground font-medium"
                          : item.href
                            ? "hover:bg-accent"
                            : "text-muted-foreground/70 cursor-default",
                      )}
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {!item.href ? (
                        <Badge
                          variant="muted"
                          className="px-1.5 py-0 text-[9px] tracking-wide"
                        >
                          Soon
                        </Badge>
                      ) : null}
                    </span>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <Link href={item.href} onClick={() => setOpen(false)}>
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* Main column */}
      <div className="flex min-h-screen flex-col">
        <header className="bg-background/90 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground size-4" />
            <span className="text-muted-foreground text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-tight">
                {user.name ?? user.email}
              </p>
              <p className="text-muted-foreground text-xs">{user.role}</p>
            </div>
            <ThemeToggle />
            {AUTH_ENABLED ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="hover:bg-accent flex size-9 items-center justify-center rounded-md"
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </form>
            ) : null}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
