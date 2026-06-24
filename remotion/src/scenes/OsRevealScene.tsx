import React from "react";
import { AbsoluteFill, Img } from "remotion";
import {
  getCategorySales,
  getDemoKpis,
  getSalesTrend,
  TAGLINE,
} from "../lib/demo-data";
import { ComicText } from "../components/ComicText";
import { FlyingWidget } from "../components/FlyingWidget";
import { HalftoneOverlay } from "../components/HalftoneOverlay";
import { MANUS } from "../lib/assets";
import { BRAND } from "../lib/constants";
import { WidgetAiInsights } from "../widgets/WidgetAiInsights";
import { WidgetCategoryBars } from "../widgets/WidgetCategoryBars";
import { WidgetInventory } from "../widgets/WidgetInventory";
import { WidgetKpi } from "../widgets/WidgetKpi";
import { WidgetLaborGauge } from "../widgets/WidgetLaborGauge";
import { WidgetSalesChart } from "../widgets/WidgetSalesChart";

export function OsRevealScene() {
  const kpis = getDemoKpis();
  const salesTrend = getSalesTrend();
  const categories = getCategorySales();

  const widgets = [
    { key: "sales", el: <WidgetKpi {...kpis[0]} /> },
    { key: "orders", el: <WidgetKpi {...kpis[1]} /> },
    { key: "food", el: <WidgetKpi {...kpis[2]} /> },
    { key: "labor", el: <WidgetLaborGauge value={kpis[4]?.value ?? "28.7%"} /> },
    { key: "chart", el: <WidgetSalesChart data={salesTrend} /> },
    { key: "cats", el: <WidgetCategoryBars data={categories} /> },
    { key: "ai", el: <WidgetAiInsights /> },
    { key: "inv", el: <WidgetInventory item="Gulf Shrimp" status="Critical" /> },
  ];

  const positions = [
    { top: "8%", left: "5%", width: 200 },
    { top: "12%", right: "5%", width: 200 },
    { top: "28%", left: "8%", width: 220 },
    { top: "32%", right: "8%", width: 200 },
    { top: "48%", left: "12%", width: 240 },
    { top: "52%", right: "10%", width: 220 },
    { top: "68%", left: "6%", width: 240 },
    { top: "72%", right: "6%", width: 220 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal }}>
      <AbsoluteFill style={{ opacity: 0.25 }}>
        <Img
          src={MANUS.speedLines}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill className="flex items-start justify-center pt-16">
        <ComicText
          text="THE BRAIN OF THE KITCHEN"
          delay={0}
          fontSize={48}
          color={BRAND.cream}
        />
      </AbsoluteFill>

      <AbsoluteFill>
        {widgets.map((w, i) => (
          <div
            key={w.key}
            style={{
              position: "absolute",
              ...positions[i],
            }}
          >
            <FlyingWidget delay={8} index={i}>
              {w.el}
            </FlyingWidget>
          </div>
        ))}
      </AbsoluteFill>

      <HalftoneOverlay opacity={0.3} pulse={false} />
    </AbsoluteFill>
  );
}
