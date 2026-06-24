"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

const CAJUN = "#b23a2e";
const ROUX = "#8a5a32";
const CREAM = "#d4a574";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.1)",
};

export function SalesReportChart({
  data,
}: {
  data: { month: string; sales: number; priorYear?: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]}
          contentStyle={tooltipStyle}
        />
        <Legend />
        <Bar dataKey="sales" name="Current Year" fill={CAJUN} radius={[4, 4, 0, 0]} />
        <Bar dataKey="priorYear" name="Prior Year" fill={ROUX} radius={[4, 4, 0, 0]} opacity={0.6} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LaborCostChart({
  data,
}: {
  data: { week: string; sales: number; labor: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" />
        <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          yAxisId="left"
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v, name) => [`$${Number(v).toLocaleString()}`, name === "sales" ? "Sales" : "Labor"]}
          contentStyle={tooltipStyle}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales" stroke={CAJUN} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line yAxisId="right" type="monotone" dataKey="labor" name="Labor" stroke={ROUX} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LaborGaugeChart({
  current,
  targetMin,
  targetMax,
}: {
  current: number;
  targetMin: number;
  targetMax: number;
}) {
  const data = [{ name: "Labor", value: current, fill: current > targetMax ? CAJUN : ROUX }];
  const overTarget = current > targetMax;

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={14}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar background dataKey="value" cornerRadius={8} max={40} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className={cn("font-display text-3xl font-bold tabular-nums", overTarget && "text-destructive")}>
          {current}%
        </span>
        <span className="text-muted-foreground text-xs">
          Target {targetMin}–{targetMax}%
        </span>
      </div>
    </div>
  );
}

export function SeasonalForecastChart({
  data,
}: {
  data: { month: string; actual: number | null; projected: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]}
          contentStyle={tooltipStyle}
        />
        <Legend />
        <Area type="monotone" dataKey="projected" name="Projected" stroke={ROUX} fill={CREAM} fillOpacity={0.4} strokeWidth={2} />
        <Area type="monotone" dataKey="actual" name="Actual" stroke={CAJUN} fill={CAJUN} fillOpacity={0.2} strokeWidth={2} connectNulls={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CashFlowForecastChart({
  data,
}: {
  data: { day: string; inflows: number; outflows: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={10} interval={4} />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v, name) => [`$${Number(v).toLocaleString()}`, name === "inflows" ? "Inflows" : "Outflows"]}
          contentStyle={tooltipStyle}
        />
        <Legend />
        <Bar dataKey="inflows" name="Inflows" fill={ROUX} radius={[2, 2, 0, 0]} stackId="a" />
        <Bar dataKey="outflows" name="Outflows" fill={CAJUN} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExpansionRoiChart({
  data,
}: {
  data: { month: number; cumulativeProfit: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,100,80,0.15)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          label={{ value: "Month", position: "insideBottom", offset: -4, fontSize: 11 }}
        />
        <YAxis
          tickFormatter={(v) => `$${v / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString()}`, "Cumulative Profit"]}
          contentStyle={tooltipStyle}
        />
        <Line type="monotone" dataKey="cumulativeProfit" stroke={CAJUN} strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CostPercentPie({
  food,
  beverage,
}: {
  food: number;
  beverage: number;
}) {
  const data = [
    { name: "Food", value: food, fill: CAJUN },
    { name: "Beverage", value: beverage, fill: ROUX },
    { name: "Other", value: 100 - food - beverage, fill: CREAM },
  ];
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
