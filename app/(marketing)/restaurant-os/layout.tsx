import { CustomDashboardProvider } from "@/components/restaurant-os/custom-dashboard-provider";

export default function RestaurantOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomDashboardProvider>{children}</CustomDashboardProvider>;
}
