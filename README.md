# PJ's Gumbo Platform

A production-grade, two-in-one restaurant platform for an authentic Louisiana gumbo business:

1. **Public Customer Experience** — a premium marketing site (`app/(marketing)`) for menu browsing and online ordering.
2. **PJ's Restaurant OS** — an authenticated, role-based operations dashboard (`app/(os)`) for inventory, purchasing, production, costing, and reporting.

Both apps share one Next.js deployment, one design system, and one Supabase Postgres database accessed through Prisma.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** primitives (brand tokens in `app/globals.css`)
- **Prisma 7** (`prisma-client` generator + `@prisma/adapter-pg`) on **Supabase Postgres**
- **Supabase** Auth + Storage
- **React Query**, **React Hook Form**, **Zod**, **Recharts**, **TanStack Table**, **Framer Motion**, **Lucide**
- **Stripe**, **Resend**, SMS, and delivery analytics behind typed adapters (`lib/integrations`)
- **Vitest** for unit tests

## Project structure

```
app/
  (marketing)/   Public site (home, menu, order, gallery, about, catering, contact)
  (os)/          Restaurant OS (authenticated dashboard + modules)
  (auth)/        Login
  api/           Route handlers
components/
  ui/            Design-system primitives
  marketing/     Marketing sections (hero, footer, reveal, ...)
lib/
  prisma.ts      Prisma client (pg driver adapter)
  supabase/      Server/client/proxy auth helpers
  auth/          RBAC roles, permissions, session guards
  integrations/  Payment/email/SMS/delivery interfaces + stubs
  content/       Menu catalog + site content (shared by site & seed)
  validations/   Shared Zod schemas
prisma/          schema.prisma + seed.ts
proxy.ts         Route protection (Next.js 16 "Proxy", formerly Middleware)
```

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.example .env   # fill in Supabase + service keys
npm run db:generate    # generate the Prisma client
npm run db:push        # push schema to your database
npm run db:seed        # seed menu, inventory, recipes, reviews
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Sync schema to the database |
| `npm run db:migrate` | Create/apply a migration |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |

## Roles

`OWNER` · `MANAGER` · `KITCHEN` · `PREP` · `EMPLOYEE` — permissions are defined in `lib/auth/rbac.ts` and enforced in Server Components/Actions plus an optimistic redirect in `proxy.ts`.

## Status

Foundation, full database schema, and the public Home page + design system are complete. Remaining features (Menu, Online Ordering, the Restaurant OS dashboard, and its 20 modules) are built incrementally.
