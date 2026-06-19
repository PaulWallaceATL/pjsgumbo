"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/order/cart-store";
import { computeBreakdown } from "@/lib/order/pricing";
import { formatCurrency } from "@/lib/utils";
import { placeOrder } from "@/app/(marketing)/order/actions";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Enter a valid phone number."),
  line1: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  scheduledFor: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutForm({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: (orderNumber: string) => void;
}) {
  const cart = useCart();
  const isDelivery = cart.fulfillment === "DELIVERY";
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const breakdown = computeBreakdown({
    lines: cart.lines,
    fulfillment: cart.fulfillment,
    promoCode: cart.promoCode,
    tip: cart.tip,
  });

  async function onSubmit(values: FormValues) {
    if (isDelivery && (!values.line1 || !values.city || !values.zip)) {
      toast.error("Please enter your delivery address.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await placeOrder({
        lines: cart.lines,
        fulfillment: cart.fulfillment,
        promoCode: cart.promoCode || undefined,
        tip: cart.tip,
        customer: { name: values.name, email: values.email, phone: values.phone },
        address: isDelivery
          ? { line1: values.line1!, city: values.city!, zip: values.zip! }
          : undefined,
        scheduledFor: values.scheduledFor || undefined,
        notes: values.notes || undefined,
      });
      if (result.ok) {
        cart.clear();
        onSuccess(result.orderNumber);
      } else {
        toast.error(result.error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4" /> Back to cart
      </button>

      <div className="space-y-4">
        <Field label="Full name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Jordan Pierre" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} placeholder="you@email.com" />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} placeholder="(404) 555-0142" />
          </Field>
        </div>

        {isDelivery ? (
          <div className="space-y-4 rounded-xl border p-4">
            <p className="text-sm font-semibold">Delivery address</p>
            <Field label="Street address" error={errors.line1?.message}>
              <Input {...register("line1")} placeholder="229 Peachtree St NE" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" error={errors.city?.message}>
                <Input {...register("city")} placeholder="Atlanta" />
              </Field>
              <Field label="ZIP" error={errors.zip?.message}>
                <Input {...register("zip")} placeholder="30303" />
              </Field>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl border p-4 text-sm">
            <p className="font-semibold">Pickup</p>
            <p className="text-muted-foreground">
              229 Peachtree St NE, Atlanta, GA 30303
            </p>
          </div>
        )}

        <Field label="Schedule (optional)">
          <Input {...register("scheduledFor")} placeholder="ASAP, or e.g. 6:30 PM" />
        </Field>
        <Field label="Order notes (optional)">
          <Textarea {...register("notes")} placeholder="Gate code, allergies, etc." />
        </Field>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Placing order…
          </>
        ) : (
          <>Place order · {formatCurrency(breakdown.total)}</>
        )}
      </Button>
      <p className="text-muted-foreground text-center text-xs">
        Payment is processed securely at the kitchen. (Stripe wiring is stubbed
        in this environment.)
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}
