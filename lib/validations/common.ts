import { z } from "zod";

/** Reusable Zod primitives shared across forms and Server Actions. */

export const emailSchema = z.string().trim().email("Enter a valid email address");

export const phoneSchema = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number")
  .max(20);

export const nonEmptyString = z.string().trim().min(1, "Required");

export const positiveInt = z.coerce.number().int().positive();

export const nonNegativeNumber = z.coerce.number().min(0);

export const currencyAmount = z.coerce
  .number()
  .min(0, "Must be 0 or greater")
  .multipleOf(0.01, "Use at most 2 decimal places");
