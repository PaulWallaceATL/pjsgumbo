"use client";

import * as React from "react";
import { Check, Flame, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ADD_ONS,
  MENU_SIZES,
  type GumboItem,
  type MenuSizeKey,
  type SpiceLevel,
} from "@/lib/content/menu";
import { useCart } from "@/lib/order/cart-store";
import { toast } from "sonner";

export function GumboCustomizer({
  gumbo,
  children,
}: {
  gumbo: GumboItem;
  children: React.ReactNode;
}) {
  const { addLine } = useCart();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<MenuSizeKey>("BOWL");
  const [spice, setSpice] = React.useState<SpiceLevel>("MILD");
  const [addOns, setAddOns] = React.useState<string[]>([]);
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState("");

  const availableAddOns = ADD_ONS.filter(
    (a) => !a.weekendOnly || gumbo.weekendOnly,
  );

  const basePrice = gumbo.prices[size];
  const addOnTotal = addOns.reduce(
    (sum, slug) => sum + (ADD_ONS.find((a) => a.slug === slug)?.price ?? 0),
    0,
  );
  const unitPrice = basePrice + addOnTotal;
  const total = unitPrice * quantity;

  function reset() {
    setSize("BOWL");
    setSpice("MILD");
    setAddOns([]);
    setQuantity(1);
    setNotes("");
  }

  function handleAdd() {
    addLine({
      itemSlug: gumbo.slug,
      name: gumbo.name,
      kind: "GUMBO",
      size,
      sizeLabel: MENU_SIZES.find((s) => s.key === size)?.label,
      spice,
      addOns: addOns.map((slug) => {
        const a = ADD_ONS.find((x) => x.slug === slug)!;
        return { slug: a.slug, name: a.name, price: a.price };
      }),
      unitBasePrice: basePrice,
      quantity,
      notes: notes.trim() || undefined,
    });
    toast.success(`Added ${quantity} × ${gumbo.name}`);
    setOpen(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{gumbo.name}</DialogTitle>
          <DialogDescription>{gumbo.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label className="mb-2 block">Spice level</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["MILD", "SPICY"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpice(s)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                    spice === s
                      ? "border-primary bg-primary/5 text-primary"
                      : "hover:bg-accent",
                  )}
                >
                  <Flame className="size-3.5" />
                  {s === "MILD" ? "Mild" : "Spicy · serrano"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Size</Label>
            <div className="space-y-2">
              {MENU_SIZES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSize(s.key)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    size === s.key
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent",
                  )}
                >
                  <span className="flex items-center gap-2 font-medium">
                    {size === s.key ? (
                      <Check className="text-primary size-4" />
                    ) : (
                      <span className="size-4" />
                    )}
                    {s.label}
                    <span className="text-muted-foreground text-xs">
                      {s.ounces} oz
                    </span>
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(gumbo.prices[s.key])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Add-ons</Label>
            <div className="space-y-2">
              {availableAddOns.map((a) => {
                const checked = addOns.includes(a.slug);
                return (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() =>
                      setAddOns((prev) =>
                        checked
                          ? prev.filter((x) => x !== a.slug)
                          : [...prev, a.slug],
                      )
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors",
                      checked ? "border-primary bg-primary/5" : "hover:bg-accent",
                    )}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded border",
                          checked && "bg-primary border-primary text-primary-foreground",
                        )}
                      >
                        {checked ? <Check className="size-3" /> : null}
                      </span>
                      {a.name}
                    </span>
                    <span className="text-muted-foreground">
                      +{formatCurrency(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="mb-2 block">
              Special instructions
            </Label>
            <Textarea
              id="notes"
              placeholder="Extra rice on the side, no okra, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button type="button" onClick={handleAdd}>
              Add · {formatCurrency(total)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
