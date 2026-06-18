import { describe, expect, it } from "vitest";

import { cn, formatCurrency, formatPercent } from "./utils";

describe("utils", () => {
  it("merges and dedupes tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", false && "hidden", "font-bold")).toBe(
      "text-sm font-bold",
    );
  });

  it("formats currency", () => {
    expect(formatCurrency(12.5)).toBe("$12.50");
  });

  it("formats percentages", () => {
    expect(formatPercent(0.284)).toBe("28.4%");
  });
});
