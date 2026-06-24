"use client";

import { Truck } from "lucide-react";

import { ModuleBand } from "@/components/restaurant-os/module-band";
import { OrdersDeliveryView } from "@/components/os/views/marketing-views";

export function OrdersDeliveryModule() {
  return (
    <ModuleBand id="orders" icon={Truck}>
      <OrdersDeliveryView />
    </ModuleBand>
  );
}
