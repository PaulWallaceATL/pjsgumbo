"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Kpi } from "@/lib/os/demo-data/dashboard";
import {
  CUSTOM_PROFILE_STORAGE_KEY,
  DEFAULT_CUSTOM_PROFILE,
  deriveCategorySales,
  deriveKpis,
  deriveSalesTrend,
  normalizeProfile,
  type CustomRestaurantProfile,
} from "@/lib/restaurant-os/custom-profile";

type CustomDashboardContextValue = {
  profile: CustomRestaurantProfile | null;
  kpis: Kpi[];
  salesTrend: ReturnType<typeof deriveSalesTrend>;
  categorySales: ReturnType<typeof deriveCategorySales>;
  setProfile: (profile: CustomRestaurantProfile) => void;
  updateProfile: (patch: Partial<CustomRestaurantProfile>) => void;
  updateKpiValue: (label: string, value: string) => void;
  clearProfile: () => void;
  ready: boolean;
};

const CustomDashboardContext = createContext<CustomDashboardContextValue | null>(null);

function parseStoredProfile(raw: string | null): CustomRestaurantProfile | null {
  if (!raw) return null;
  try {
    return normalizeProfile(JSON.parse(raw) as Partial<CustomRestaurantProfile>);
  } catch {
    return null;
  }
}

function applyKpiToProfile(
  profile: CustomRestaurantProfile,
  label: string,
  value: string,
): CustomRestaurantProfile {
  const next = { ...profile };
  const num = parseFloat(value.replace(/[$,%]/g, ""));

  switch (label) {
    case "Today's Sales":
      if (!Number.isNaN(num)) next.todaySales = num;
      break;
    case "Orders":
      if (!Number.isNaN(num)) next.todayOrders = num;
      break;
    case "Food Cost %":
      if (!Number.isNaN(num)) next.foodCostPct = num;
      break;
    case "Labor %":
      if (!Number.isNaN(num)) next.laborPct = num;
      break;
    case "Inventory Value":
      if (!Number.isNaN(num)) next.inventoryValue = num;
      break;
    case "Waste (7d)":
      if (!Number.isNaN(num)) next.waste7d = num;
      break;
    case "Low Stock":
      if (!Number.isNaN(num)) next.lowStockCount = num;
      break;
    default:
      break;
  }
  return next;
}

export function CustomDashboardProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<CustomRestaurantProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(parseStoredProfile(localStorage.getItem(CUSTOM_PROFILE_STORAGE_KEY)));
    setReady(true);
  }, []);

  const persist = useCallback((next: CustomRestaurantProfile) => {
    setProfileState(next);
    localStorage.setItem(CUSTOM_PROFILE_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setProfile = useCallback(
    (next: CustomRestaurantProfile) => {
      persist(next);
    },
    [persist],
  );

  const updateProfile = useCallback(
    (patch: Partial<CustomRestaurantProfile>) => {
      setProfileState((current) => {
        const next = normalizeProfile({ ...(current ?? DEFAULT_CUSTOM_PROFILE), ...patch });
        localStorage.setItem(CUSTOM_PROFILE_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const updateKpiValue = useCallback(
    (label: string, value: string) => {
      setProfileState((current) => {
        if (!current) return current;
        const next = applyKpiToProfile(current, label, value);
        localStorage.setItem(CUSTOM_PROFILE_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const clearProfile = useCallback(() => {
    setProfileState(null);
    localStorage.removeItem(CUSTOM_PROFILE_STORAGE_KEY);
  }, []);

  const kpis = useMemo(
    () => (profile ? deriveKpis(profile) : []),
    [profile],
  );
  const salesTrend = useMemo(
    () => (profile ? deriveSalesTrend(profile) : []),
    [profile],
  );
  const categorySales = useMemo(
    () => (profile ? deriveCategorySales(profile) : []),
    [profile],
  );

  const value = useMemo(
    () => ({
      profile,
      kpis,
      salesTrend,
      categorySales,
      setProfile,
      updateProfile,
      updateKpiValue,
      clearProfile,
      ready,
    }),
    [
      profile,
      kpis,
      salesTrend,
      categorySales,
      setProfile,
      updateProfile,
      updateKpiValue,
      clearProfile,
      ready,
    ],
  );

  return (
    <CustomDashboardContext.Provider value={value}>
      {children}
    </CustomDashboardContext.Provider>
  );
}

export function useCustomDashboard() {
  const ctx = useContext(CustomDashboardContext);
  if (!ctx) {
    throw new Error("useCustomDashboard must be used within CustomDashboardProvider");
  }
  return ctx;
}

export function useOptionalCustomDashboard() {
  return useContext(CustomDashboardContext);
}
