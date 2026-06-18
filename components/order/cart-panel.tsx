"use client";

import * as React from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/order/cart-store";
import {
  TIP_PRESETS,
  computeBreakdown,
  computeSubtotal,
  lineUnitPrice,
} from "@/lib/order/pricing";

export function CartPanel({ onCheckout }: { onCheckout: () => void }) {
  const cart = useCart();
  const [promoInput, setPromoInput] = React.useState(cart.promoCode);

  const subtotal = computeSubtotal(cart.lines);
  const breakdown = computeBreakdown({
    lines: cart.lines,
    fulfillment: cart.fulfillment,
    promoCode: cart.promoCode,
    tip: cart.tip,
  });

  if (cart.hydrated && cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center">
        <ShoppingBag className="text-muted-foreground size-8" />
        <p className="font-display text-lg font-semibold">Your cart is empty</p>
        <p className="text-muted-foreground text-sm">
          Add a gumbo or a side to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        {(["DELIVERY", "PICKUP"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => cart.setFulfillment(f)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
              cart.fulfillment === f
                ? "border-primary bg-primary/5 text-primary"
                : "hover:bg-accent",
            )}
          >
            {f === "DELIVERY" ? "Delivery" : "Pickup"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {cart.lines.map((line) => (
          <div key={line.id} className="flex gap-3 rounded-xl border p-3">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{line.name}</p>
                <span className="font-semibold">
                  {formatCurrency(lineUnitPrice(line) * line.quantity)}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                {[
                  line.sizeLabel,
                  line.spice === "SPICY" ? "Spicy" : line.spice === "MILD" ? "Mild" : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {line.addOns.length > 0 ? (
                <p className="text-muted-foreground text-xs">
                  + {line.addOns.map((a) => a.name).join(", ")}
                </p>
              ) : null}
              {line.notes ? (
                <p className="text-muted-foreground mt-1 text-xs italic">
                  “{line.notes}”
                </p>
              ) : null}

              <div className="mt-2 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  onClick={() => cart.setQuantity(line.id, line.quantity - 1)}
                >
                  <Minus className="size-3" />
                </Button>
                <span className="w-5 text-center text-sm font-medium">
                  {line.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  onClick={() => cart.setQuantity(line.id, line.quantity + 1)}
                >
                  <Plus className="size-3" />
                </Button>
                <button
                  type="button"
                  onClick={() => cart.removeLine(line.id)}
                  className="text-muted-foreground hover:text-destructive ml-auto"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="uppercase"
          />
          <Button
            variant="secondary"
            onClick={() => cart.setPromoCode(promoInput)}
          >
            Apply
          </Button>
        </div>
        {cart.promoCode && breakdown.promoMessage ? (
          <p
            className={cn(
              "text-xs",
              breakdown.promoApplied ? "text-success" : "text-destructive",
            )}
          >
            {breakdown.promoMessage}
          </p>
        ) : null}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Add a tip</p>
        <div className="grid grid-cols-4 gap-2">
          {TIP_PRESETS.map((pct) => {
            const tipValue = Math.round(subtotal * pct * 100) / 100;
            const active = Math.abs(cart.tip - tipValue) < 0.001;
            return (
              <button
                key={pct}
                type="button"
                onClick={() => cart.setTip(tipValue)}
                className={cn(
                  "rounded-lg border py-2 text-sm font-medium transition-colors",
                  active ? "border-primary bg-primary/5 text-primary" : "hover:bg-accent",
                )}
              >
                {pct === 0 ? "None" : `${Math.round(pct * 100)}%`}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      <dl className="space-y-1.5 text-sm">
        <Row label="Subtotal" value={breakdown.subtotal} />
        {breakdown.discount > 0 ? (
          <Row label="Discount" value={-breakdown.discount} className="text-success" />
        ) : null}
        {cart.fulfillment === "DELIVERY" ? (
          <Row label="Delivery" value={breakdown.deliveryFee} />
        ) : null}
        <Row label="Tax" value={breakdown.tax} />
        {breakdown.tip > 0 ? <Row label="Tip" value={breakdown.tip} /> : null}
        <Separator className="my-2" />
        <div className="flex items-center justify-between text-base font-bold">
          <span>Total</span>
          <span>{formatCurrency(breakdown.total)}</span>
        </div>
      </dl>

      <Button size="lg" className="w-full" onClick={onCheckout}>
        Checkout · {formatCurrency(breakdown.total)}
      </Button>
    </div>
  );
}

function Row({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("text-muted-foreground flex justify-between", className)}>
      <dt>{label}</dt>
      <dd>{formatCurrency(value)}</dd>
    </div>
  );
}
