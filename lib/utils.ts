import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency. */
export function formatCurrency(
  amount: number,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(amount);
}

/** Format a 0-1 ratio as a percentage string (e.g. 0.284 -> "28.4%"). */
export function formatPercent(ratio: number, fractionDigits = 1) {
  return `${(ratio * 100).toFixed(fractionDigits)}%`;
}
