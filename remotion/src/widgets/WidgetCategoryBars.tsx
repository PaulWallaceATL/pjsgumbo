import React from "react";
import { BRAND } from "../lib/constants";

type Category = { category: string; sales: number };

type WidgetCategoryBarsProps = {
  data: Category[];
};

export function WidgetCategoryBars({ data }: WidgetCategoryBarsProps) {
  const max = Math.max(...data.map((d) => d.sales));

  return (
    <div className="p-4">
      <p className="mb-2 text-xs uppercase tracking-wider opacity-70">Category Mix</p>
      {data.slice(0, 3).map((d) => (
        <div key={d.category} className="mb-1.5">
          <div className="mb-0.5 flex justify-between text-xs opacity-70">
            <span>{d.category}</span>
            <span>${d.sales}</span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: "#38231a" }}>
            <div
              className="h-2 rounded-full"
              style={{
                width: `${(d.sales / max) * 100}%`,
                background: `linear-gradient(90deg, ${BRAND.cajun}, ${BRAND.gold})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
