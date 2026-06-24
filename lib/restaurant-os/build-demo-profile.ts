import { SITE } from "@/lib/content/site";
import {
  getCategorySales,
  getDashboardKpis,
} from "@/lib/os/demo-data/dashboard";
import {
  getBalanceSheet,
  getBankTransactions,
  getCashFlowForecast,
  getExpenses,
  getLaborGauge,
  getPlStatement,
  getSeasonalForecast,
  getTaxComplianceItems,
  getTaxDeadlines,
  getVendorPayments,
} from "@/lib/os/demo-data/finance";
import { getInventorySummary } from "@/lib/os/demo-data/inventory";
import { getPayrollRows } from "@/lib/os/demo-data/people";
import { getDailyPrepQueue, getProductionSchedule } from "@/lib/os/demo-data/production";
import {
  getChannelMix,
  getDeliveryAnalytics,
  getLiveOrders,
  getPosSalesFeed,
} from "@/lib/os/demo-data/sales";
import type { CustomRestaurantProfile } from "@/lib/restaurant-os/custom-profile";

/** Build a full profile from PJ's Restaurant OS demo data (all 11 modules). */
export function buildDemoAutofillProfile(): CustomRestaurantProfile {
  const kpis = getDashboardKpis();
  const inv = getInventorySummary();
  const labor = getLaborGauge();
  const orders = getLiveOrders();
  const payroll = getPayrollRows();
  const expenses = getExpenses();
  const bank = getBankTransactions();
  const taxItems = getTaxComplianceItems();
  const taxDeadlines = getTaxDeadlines();
  const vendorPayments = getVendorPayments();
  const pl = getPlStatement();
  const prep = getDailyPrepQueue();
  const schedule = getProductionSchedule();
  const delivery = getDeliveryAnalytics();
  const channels = getChannelMix();
  const seasonal = getSeasonalForecast();
  const cashFlow = getCashFlowForecast();
  const posFeed = getPosSalesFeed();

  const salesKpi = kpis.find((k) => k.label === "Today's Sales");
  const ordersKpi = kpis.find((k) => k.label === "Orders");
  const foodKpi = kpis.find((k) => k.label === "Food Cost %");
  const primeKpi = kpis.find((k) => k.label === "Prime Cost %");
  const wasteKpi = kpis.find((k) => k.label === "Waste (7d)");

  const monthlyRevenue = pl
    .filter((l) => l.section === "revenue")
    .reduce((sum, l) => sum + l.amount, 0);

  const netIncome = pl.find((l) => l.label === "Net Income")?.amount ?? 0;
  const cashOnHand =
    getBalanceSheet().find((b) => b.label === "Cash & Equivalents")?.amount ?? 42180;
  const topChannel = [...channels].sort((a, b) => b.pct - a.pct)[0];

  return {
    restaurantName: SITE.name,
    city: SITE.city,
    address: SITE.address,
    cuisineType: "Louisiana Cajun",
    todaySales: parseFloat(salesKpi?.value.replace(/[$,]/g, "") ?? "3482"),
    todayOrders: parseInt(ordersKpi?.value ?? "146", 10),
    foodCostPct: parseFloat(foodKpi?.value.replace("%", "") ?? "28.4"),
    laborPct: labor.current,
    primeCostPct: parseFloat(primeKpi?.value.replace("%", "") ?? "57.1"),
    inventoryValue: inv.totalValue,
    lowStockCount: inv.lowCount,
    waste7d: parseFloat(wasteKpi?.value.replace(/[$,]/g, "") ?? "214"),
    categories: getCategorySales().map((c) => ({
      name: c.category,
      sales: c.sales,
    })),
    posTicketsToday: posFeed.length,
    monthlyExpenses: expenses.reduce((s, e) => s + e.amount, 0),
    bankBalance: cashOnHand,
    unmatchedDeposits: bank.filter((t) => t.status === "unmatched").length,
    employeeCount: payroll.length,
    weeklyPayrollTotal: Math.round(
      payroll.reduce((s, p) => s + p.grossPay, 0),
    ),
    laborHoursWeek: payroll.reduce((s, p) => s + p.regularHrs + p.otHrs, 0),
    salesTaxRate: 8.9,
    nextTaxDeadline: taxDeadlines[0]?.label ?? "Sales Tax — Jun 20",
    openTaxFilings: taxItems.filter((t) => t.status !== "Filed").length,
    inventorySkuCount: inv.itemCount,
    criticalStockCount: inv.lowCount,
    activeOrders: orders.filter((o) => o.status !== "Complete").length,
    deliveryZoneCount: delivery.length,
    avgDeliveryTicket: Math.round(
      delivery.reduce((s, d) => s + d.avgTicket, 0) / delivery.length,
    ),
    topOrderChannel: topChannel?.channel ?? "DoorDash",
    prepTasksToday: prep.length,
    batchesThisWeek: schedule.length,
    monthlyRevenue: Math.round(monthlyRevenue),
    netIncomeYtd: Math.round(netIncome),
    cashOnHand,
    netCashFlow30d: cashFlow.reduce((s, w) => s + (w.inflows - w.outflows), 0),
    vendorPaymentsDue: vendorPayments.filter((v) => v.status === "Pending").length,
    projectedMonthlySales: seasonal[seasonal.length - 1]?.projected ?? 105000,
    seasonalLiftPct: 18,
    useFullOsDemo: true,
  };
}
