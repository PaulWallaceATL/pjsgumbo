import React from "react";
import { BRAND } from "../lib/constants";

type WidgetLaborGaugeProps = {
  value?: string;
};

export function WidgetLaborGauge({ value = "28.7%" }: WidgetLaborGaugeProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <p className="mb-2 text-xs uppercase tracking-wider opacity-70">Labor %</p>
      <svg width="160" height="90" viewBox="0 0 160 90">
        <path
          d="M 20 80 A 60 60 0 0 1 140 80"
          fill="none"
          stroke="#38231a"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 80 A 60 60 0 0 1 110 35"
          fill="none"
          stroke={BRAND.cajun}
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>
      <p className="font-display -mt-10 text-2xl font-bold" style={{ color: BRAND.gold }}>
        {value}
      </p>
      <p className="text-xs opacity-60">of sales</p>
    </div>
  );
}
