import type { Metadata } from "next";

import { RestaurantOsHero } from "@/components/restaurant-os/restaurant-os-hero";
import { ModuleNav } from "@/components/restaurant-os/module-nav";
import { BookkeepingModule } from "@/components/restaurant-os/modules/bookkeeping-module";
import { FinancialReportingModule } from "@/components/restaurant-os/modules/financial-reporting-module";
import { InventoryCostModule } from "@/components/restaurant-os/modules/inventory-cost-module";
import { PayrollLaborModule } from "@/components/restaurant-os/modules/payroll-labor-module";
import { TaxComplianceModule } from "@/components/restaurant-os/modules/tax-compliance-module";
import { BudgetingModule } from "@/components/restaurant-os/modules/budgeting-module";
import { CashFlowModule } from "@/components/restaurant-os/modules/cash-flow-module";
import { BusinessAdviceModule } from "@/components/restaurant-os/modules/business-advice-module";

export const metadata: Metadata = {
  title: "Restaurant OS — Live Demo",
  description:
    "Explore PJ's Restaurant OS — a live demo of bookkeeping, financial reporting, inventory, payroll, tax compliance, forecasting, and AI insights for PJ's Gumbo in Atlanta.",
};

export default function RestaurantOsPage() {
  return (
    <>
      <RestaurantOsHero />
      <ModuleNav />
      <div className="container-px mx-auto max-w-7xl space-y-16 pb-20 pt-6">
        <BookkeepingModule />
        <FinancialReportingModule />
        <InventoryCostModule />
        <PayrollLaborModule />
        <TaxComplianceModule />
        <BudgetingModule />
        <CashFlowModule />
        <BusinessAdviceModule />
      </div>
    </>
  );
}
