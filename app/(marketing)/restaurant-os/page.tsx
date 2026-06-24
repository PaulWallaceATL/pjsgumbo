import type { Metadata } from "next";
import { Soup } from "lucide-react";

import { RestaurantOsHero } from "@/components/restaurant-os/restaurant-os-hero";
import { DemoIntro } from "@/components/restaurant-os/demo-intro";
import { ModuleNav } from "@/components/restaurant-os/module-nav";
import { OperationsPulseModule } from "@/components/restaurant-os/modules/operations-pulse-module";
import { BookkeepingModule } from "@/components/restaurant-os/modules/bookkeeping-module";
import { FinancialReportingModule } from "@/components/restaurant-os/modules/financial-reporting-module";
import { ProductionPrepModule } from "@/components/restaurant-os/modules/production-prep-module";
import { InventoryCostModule } from "@/components/restaurant-os/modules/inventory-cost-module";
import { OrdersDeliveryModule } from "@/components/restaurant-os/modules/orders-delivery-module";
import { PayrollLaborModule } from "@/components/restaurant-os/modules/payroll-labor-module";
import { TaxComplianceModule } from "@/components/restaurant-os/modules/tax-compliance-module";
import { BudgetingModule } from "@/components/restaurant-os/modules/budgeting-module";
import { CashFlowModule } from "@/components/restaurant-os/modules/cash-flow-module";
import { BusinessAdviceModule } from "@/components/restaurant-os/modules/business-advice-module";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Restaurant OS — Live Demo",
  description:
    "Explore PJ's Restaurant OS — bookkeeping, production, orders, inventory, payroll, tax compliance, forecasting, and AI insights for PJ's Gumbo in Atlanta.",
};

export default function RestaurantOsPage() {
  return (
    <>
      <RestaurantOsHero />
      <ModuleNav />
      <DemoIntro />
      <OperationsPulseModule />
      <BookkeepingModule />
      <FinancialReportingModule />
      <ProductionPrepModule />
      <InventoryCostModule />
      <OrdersDeliveryModule />
      <PayrollLaborModule />
      <TaxComplianceModule />
      <BudgetingModule />
      <CashFlowModule />
      <BusinessAdviceModule />
      <CtaBand
        eyebrow="Taste the difference"
        title="See the food. Order the gumbo."
        description="Restaurant OS runs the kitchen. Our gumbo runs on three generations of Louisiana recipes — order a bowl and taste why."
        primary={{ href: "/order", label: "Order Gumbo" }}
        secondary={{ href: "/contact", label: "Talk to Us" }}
        icon={Soup}
      />
    </>
  );
}
