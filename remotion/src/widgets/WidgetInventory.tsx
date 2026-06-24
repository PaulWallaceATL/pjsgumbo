import React from "react";
import { BRAND } from "../lib/constants";

type WidgetInventoryProps = {
  item: string;
  status: "Critical" | "Low";
};

export function WidgetInventory({ item, status }: WidgetInventoryProps) {
  const badgeColor = status === "Critical" ? BRAND.cajun : BRAND.gold;

  return (
    <div className="p-4">
      <p className="mb-2 text-xs uppercase tracking-wider opacity-70">Low Stock Alert</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{item}</span>
        <span
          className="rounded px-2 py-0.5 text-xs font-bold uppercase"
          style={{ backgroundColor: badgeColor, color: BRAND.cream }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
