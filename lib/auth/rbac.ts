/**
 * Role-Based Access Control for the Restaurant OS.
 *
 * Roles mirror the Prisma `Role` enum. The permission map is the single source
 * of truth for what each role may do; UI and Server Actions both consult it.
 */

export const ROLES = ["OWNER", "MANAGER", "KITCHEN", "PREP", "EMPLOYEE"] as const;
export type Role = (typeof ROLES)[number];

/** Higher number = more privilege. Used for "at least this role" checks. */
export const ROLE_RANK: Record<Role, number> = {
  EMPLOYEE: 1,
  PREP: 2,
  KITCHEN: 3,
  MANAGER: 4,
  OWNER: 5,
};

/** Granular permissions, namespaced by module. */
export type Permission =
  | "dashboard:view"
  | "inventory:read"
  | "inventory:write"
  | "purchasing:read"
  | "purchasing:write"
  | "production:read"
  | "production:write"
  | "recipes:read"
  | "recipes:write"
  | "costing:read"
  | "menu:read"
  | "menu:write"
  | "orders:read"
  | "orders:write"
  | "waste:read"
  | "waste:write"
  | "vendors:read"
  | "vendors:write"
  | "analytics:read"
  | "employees:read"
  | "employees:write"
  | "reports:read"
  | "settings:write";

const ALL_PERMISSIONS: Permission[] = [
  "dashboard:view",
  "inventory:read",
  "inventory:write",
  "purchasing:read",
  "purchasing:write",
  "production:read",
  "production:write",
  "recipes:read",
  "recipes:write",
  "costing:read",
  "menu:read",
  "menu:write",
  "orders:read",
  "orders:write",
  "waste:read",
  "waste:write",
  "vendors:read",
  "vendors:write",
  "analytics:read",
  "employees:read",
  "employees:write",
  "reports:read",
  "settings:write",
];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  OWNER: ALL_PERMISSIONS,
  MANAGER: [
    "dashboard:view",
    "inventory:read",
    "inventory:write",
    "purchasing:read",
    "purchasing:write",
    "production:read",
    "production:write",
    "recipes:read",
    "recipes:write",
    "costing:read",
    "menu:read",
    "menu:write",
    "orders:read",
    "orders:write",
    "waste:read",
    "waste:write",
    "vendors:read",
    "vendors:write",
    "analytics:read",
    "employees:read",
    "employees:write",
    "reports:read",
  ],
  KITCHEN: [
    "dashboard:view",
    "inventory:read",
    "inventory:write",
    "production:read",
    "production:write",
    "recipes:read",
    "waste:read",
    "waste:write",
    "orders:read",
  ],
  PREP: [
    "dashboard:view",
    "inventory:read",
    "production:read",
    "production:write",
    "recipes:read",
    "waste:read",
    "waste:write",
  ],
  EMPLOYEE: ["dashboard:view", "orders:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isAtLeast(role: Role, minimum: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[minimum];
}
