"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitCateringInquiry } from "@/app/(marketing)/catering/actions";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Enter a valid phone number."),
  eventDate: z.string().optional(),
  headcount: z.string().optional(),
  eventType: z.string().optional(),
  details: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const EVENT_TYPES = [
  "Office lunch",
  "Birthday / party",
  "Wedding",
  "Corporate event",
  "Family gathering",
  "Other",
];

export function CateringForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [eventType, setEventType] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const result = await submitCateringInquiry({ ...values, eventType });
      if (result.ok) setDone(true);
      else toast.error(result.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border p-10 text-center">
        <div className="bg-success/10 text-success flex size-14 items-center justify-center rounded-full">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="font-display text-2xl font-bold">Inquiry sent!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thanks for reaching out. Our team will get back to you within one
          business day to plan your event.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Event date">
          <Input type="date" {...register("eventDate")} />
        </Field>
        <Field label="Headcount">
          <Input {...register("headcount")} placeholder="e.g. 40" />
        </Field>
      </div>
      <Field label="Event type">
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger>
            <SelectValue placeholder="Select an event type" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Tell us about your event">
        <Textarea
          {...register("details")}
          placeholder="Menu preferences, location, budget, anything we should know…"
          className="min-h-28"
        />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Submit inquiry"
        )}
      </Button>
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
