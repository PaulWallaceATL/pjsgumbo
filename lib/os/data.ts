/**
 * Restaurant OS data layer — thin facade over demo-data.
 * Swap demo-data getters for Prisma queries once the DB is wired.
 */

export type { InventoryStatus, InventoryRow } from "./demo-data/inventory";
export type { Kpi } from "./demo-data/dashboard";

export {
  getInventoryRows,
  getInventorySummary,
  getInventoryByStorage,
  getFreezerItems,
  getWalkInItems,
  getPackagingItems,
  getWeeklyReorder,
  getRestaurantDepotCart,
  getRestaurantDepotTotal,
  getVendors,
  INVENTORY_ITEMS,
  SUPPLIERS,
} from "./demo-data/inventory";

export {
  getDashboardKpis,
  getDemoKpis,
  getSalesTrend,
  getCategorySales,
  getUpcomingPrep,
} from "./demo-data/dashboard";

export {
  getExpenses,
  getBankTransactions,
  getPlStatement,
  getBalanceSheet,
  getCashFlowStatement,
  getSalesReportMonthly,
  getLaborCostWeekly,
  getSeasonalForecast,
  getStaffingForecast,
  getCashFlowForecast,
  getVendorPayments,
  getTaxComplianceItems,
  getTaxDeadlines,
  getCostPercentages,
  getLaborGauge,
} from "./demo-data/finance";

export {
  getWasteLog,
  getPayrollRows,
  getPayrollTaxCompliance,
} from "./demo-data/people";

export {
  getProteinPrepChecklist,
  getDailyPrepQueue,
  getProductionSchedule,
  getBatchCalcRows,
  getPackagingUsage,
} from "./demo-data/production";

export {
  getPosSalesFeed,
  getLiveOrders,
  getDeliveryAnalytics,
  getChannelMix,
  getMenuCatalog,
} from "./demo-data/sales";

export {
  getFoodCostRows,
  getProfitMarginRows,
  getPortionRows,
} from "./demo-data/costing";

export {
  getMenuEngineering,
  getExpansionAnalysis,
} from "./demo-data/insights";

export {
  MODULE_META,
  MODULE_SECTIONS,
  getInventoryDemoRows,
  getHighlightedInventory,
} from "./demo-data/marketing";

export type { ModuleMeta, ModuleTone } from "./demo-data/marketing";
