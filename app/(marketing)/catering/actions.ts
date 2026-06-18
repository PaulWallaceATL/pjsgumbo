"use server";

import { z } from "zod";

import { getEmailProvider } from "@/lib/integrations";
import { SITE } from "@/lib/content/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Enter a valid phone number."),
  eventDate: z.string().optional(),
  headcount: z.string().optional(),
  eventType: z.string().optional(),
  details: z.string().max(1000).optional(),
});

export type CateringInput = z.infer<typeof schema>;

export type CateringResult = { ok: true } | { ok: false; error: string };

export async function submitCateringInquiry(
  input: CateringInput,
): Promise<CateringResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }

  const d = parsed.data;
  await getEmailProvider().sendEmail({
    to: SITE.email,
    replyTo: d.email,
    subject: `Catering inquiry — ${d.name}`,
    html: `
      <h2>New catering inquiry</h2>
      <p><strong>Name:</strong> ${d.name}</p>
      <p><strong>Email:</strong> ${d.email}</p>
      <p><strong>Phone:</strong> ${d.phone}</p>
      <p><strong>Event date:</strong> ${d.eventDate ?? "—"}</p>
      <p><strong>Headcount:</strong> ${d.headcount ?? "—"}</p>
      <p><strong>Type:</strong> ${d.eventType ?? "—"}</p>
      <p><strong>Details:</strong> ${d.details ?? "—"}</p>
    `,
  });

  return { ok: true };
}
