import React from "react";
import { BRAND } from "../lib/constants";

export function WidgetAiInsights() {
  return (
    <div className="p-4">
      <p className="mb-2 text-xs uppercase tracking-wider" style={{ color: BRAND.gold }}>
        Kitchen AI
      </p>
      <div
        className="mb-2 rounded-lg px-3 py-2 text-sm"
        style={{ backgroundColor: BRAND.cajun, color: BRAND.cream }}
      >
        Should we expand?
      </div>
      <div
        className="rounded-lg px-3 py-2 text-xs leading-relaxed opacity-90"
        style={{ backgroundColor: "#2a2622" }}
      >
        Old Fourth Ward pop-up: month 14 breakeven, $980K Y1 projected.
      </div>
    </div>
  );
}
