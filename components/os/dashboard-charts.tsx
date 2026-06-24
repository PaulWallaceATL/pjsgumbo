"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_PRIMARY = "var(--primary)";
const CHART_SECONDARY = "var(--secondary)";

export function SalesTrendChart({
  data,
}: {
  data: { day: string; sales: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString()}`, "Sales"]}
          contentStyle={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)" }}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke={CHART_PRIMARY}
          strokeWidth={3}
          dot={{ r: 3, fill: CHART_PRIMARY }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategorySalesChart({
  data,
}: {
  data: { category: string; sales: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" vertical={false} />
        <XAxis dataKey="category" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString()}`, "Sales"]}
          cursor={{ fill: "rgba(120,100,80,0.08)" }}
          contentStyle={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)" }}
        />
        <Bar dataKey="sales" fill={CHART_SECONDARY} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
