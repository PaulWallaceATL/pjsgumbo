import React from "react";
import { BRAND } from "../lib/constants";

type DataPoint = { day: string; sales: number };

type WidgetSalesChartProps = {
  data: DataPoint[];
};

export function WidgetSalesChart({ data }: WidgetSalesChartProps) {
  const max = Math.max(...data.map((d) => d.sales));
  const w = 200;
  const h = 80;
  const barW = w / data.length - 4;

  return (
    <div className="p-4">
      <p className="mb-2 text-xs uppercase tracking-wider opacity-70">7-Day Sales</p>
      <svg width={w} height={h}>
        {data.map((d, i) => {
          const barH = (d.sales / max) * (h - 16);
          return (
            <rect
              key={d.day}
              x={i * (barW + 4) + 2}
              y={h - barH - 8}
              width={barW}
              height={barH}
              rx={2}
              fill={i === data.length - 1 ? BRAND.cajun : BRAND.roux}
            />
          );
        })}
      </svg>
    </div>
  );
}
