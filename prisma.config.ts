import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration. The datasource URL lives here (no longer in
 * schema.prisma). We read it from process.env directly (instead of the
 * throwing `env()` helper) so `prisma generate` works in CI/type-check
 * environments where DATABASE_URL may be absent.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
