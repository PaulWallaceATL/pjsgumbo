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
  ChevronDown,
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
  Search,
  ShoppingCart,
  Snowflake,
  Sparkles,
  Thermometer,
  TrendingUp,
  Trash2,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { AUTH_ENABLED } from "@/lib/auth/config";
import { signOut } from "@/lib/auth/actions";
import type { AuthUser } from "@/lib/auth/session";

type NavItem = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };
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
      { label: "Restaurant Depot", href: "/restaurant-depot", icon: ShoppingCart },
      { label: "Weekly Reorder", href: "/weekly-reorder", icon: RefreshCw },
      { label: "Freezer", href: "/freezer", icon: Snowflake },
      { label: "Walk-In Cooler", href: "/walk-in-cooler", icon: Thermometer },
    ],
  },
  {
    title: "Production",
    items: [
      { label: "Protein Prep", href: "/protein-prep", icon: Drumstick },
      { label: "Daily Prep", href: "/daily-prep", icon: ChefHat },
      { label: "Gumbo Batch Calc", href: "/batch-calc", icon: Calculator },
      { label: "Production Schedule", href: "/production-schedule", icon: CalendarDays },
      { label: "Packaging", href: "/packaging", icon: Package },
    ],
  },
  {
    title: "Recipes & Costing",
    items: [
      { label: "Recipes", href: "/recipes", icon: BookOpen },
      { label: "Food Cost", href: "/food-cost", icon: DollarSign },
      { label: "Profit Margin", href: "/profit-margin", icon: TrendingUp },
      { label: "Portions", href: "/portions", icon: Scale },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/orders", icon: Receipt },
      { label: "Menu Management", href: "/menu-management", icon: UtensilsCrossed },
      { label: "Delivery Analytics", href: "/delivery-analytics", icon: Truck },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Bookkeeping", href: "/bookkeeping", icon: Receipt },
      { label: "Financial Reports", href: "/financial-reports", icon: FileBarChart },
      { label: "Tax Compliance", href: "/tax-compliance", icon: Building2 },
      { label: "Budgeting", href: "/budgeting", icon: TrendingUp },
      { label: "Cash Flow", href: "/cash-flow", icon: Wallet },
      { label: "AI Insights", href: "/insights", icon: Sparkles },
    ],
  },
  {
    title: "People & Reports",
    items: [
      { label: "Waste Log", href: "/waste-log", icon: Trash2 },
      { label: "Vendors", href: "/vendors", icon: Building2 },
      { label: "Employees", href: "/employees", icon: Users },
      { label: "Reporting", href: "/reporting", icon: FileBarChart },
    ],
  },
];

const STORAGE_KEY = "pjs-os-nav-collapsed";

function findNavContext(pathname: string) {
  for (const group of NAV) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        return { group: group.title, page: item.label };
      }
    }
  }
  return null;
}

function loadCollapsed(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function OsShell({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const crumbs = findNavContext(pathname);

  React.useEffect(() => {
    setCollapsed(loadCollapsed());
  }, []);

  React.useEffect(() => {
    const ctx = findNavContext(pathname);
    if (!ctx) return;
    setCollapsed((prev) => {
      if (prev[ctx.group] === false) return prev;
      const next = { ...prev, [ctx.group]: false };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setCollapsed((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredNav = NAV.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) =>
        !normalizedQuery ||
        item.label.toLowerCase().includes(normalizedQuery) ||
        group.title.toLowerCase().includes(normalizedQuery),
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="bg-muted/30 min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
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
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>

        <div className="border-b p-3">
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules…"
              className="h-9 pl-8 text-sm"
            />
          </div>
        </div>

        <nav className="h-[calc(100vh-8.5rem)] space-y-2 overflow-y-auto p-3">
          {filteredNav.map((group) => {
            const isCollapsed = collapsed[group.title] ?? false;
            return (
              <div key={group.title}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.title)}
                  className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase"
                >
                  {group.title}
                  <ChevronDown
                    className={cn("size-3.5 transition-transform", isCollapsed && "-rotate-90")}
                  />
                </button>
                {!isCollapsed ? (
                  <ul className="mt-0.5 space-y-0.5">
                    {group.items.map((item) => {
                      const active =
                        pathname === item.href || pathname.startsWith(`${item.href}/`);
                      return (
                        <li key={item.href}>
                          <Link href={item.href} onClick={() => setOpen(false)}>
                            <span
                              className={cn(
                                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "hover:bg-accent",
                              )}
                            >
                              <item.icon className="size-4 shrink-0" />
                              <span className="flex-1">{item.label}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      ) : null}

      <div className="flex min-h-screen flex-col">
        <header className="bg-background/90 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            {crumbs ? (
              <p className="truncate text-sm">
                <span className="text-muted-foreground">{crumbs.group}</span>
                <span className="text-muted-foreground mx-1.5">/</span>
                <span className="font-medium">{crumbs.page}</span>
              </p>
            ) : (
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
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{user.name ?? user.email}</p>
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
