import { describe, expect, it } from "vitest";

import { hasPermission, isAtLeast } from "./rbac";

describe("rbac", () => {
  it("grants owners every permission", () => {
    expect(hasPermission("OWNER", "settings:write")).toBe(true);
    expect(hasPermission("OWNER", "reports:read")).toBe(true);
  });

  it("restricts employees to a minimal set", () => {
    expect(hasPermission("EMPLOYEE", "dashboard:view")).toBe(true);
    expect(hasPermission("EMPLOYEE", "inventory:write")).toBe(false);
  });

  it("lets kitchen staff write production but not manage employees", () => {
    expect(hasPermission("KITCHEN", "production:write")).toBe(true);
    expect(hasPermission("KITCHEN", "employees:write")).toBe(false);
  });

  it("ranks roles by privilege", () => {
    expect(isAtLeast("MANAGER", "KITCHEN")).toBe(true);
    expect(isAtLeast("PREP", "MANAGER")).toBe(false);
    expect(isAtLeast("OWNER", "OWNER")).toBe(true);
  });
});
