import React from "react";
import { BRAND } from "../lib/constants";

type WidgetKpiProps = {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
};

export function WidgetKpi({ label, value, delta, hint }: WidgetKpiProps) {
  const deltaColor = delta !== undefined && delta >= 0 ? "#2f7d4f" : BRAND.cajunLight;

  return (
    <div className="p-4">
      <p className="text-xs uppercase tracking-wider opacity-70">{label}</p>
      <p className="font-display text-3xl font-bold" style={{ color: BRAND.gold }}>
        {value}
      </p>
      {delta !== undefined && (
        <p className="text-sm" style={{ color: deltaColor }}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% {hint}
        </p>
      )}
      {!delta && hint && <p className="text-sm opacity-60">{hint}</p>}
    </div>
  );
}
