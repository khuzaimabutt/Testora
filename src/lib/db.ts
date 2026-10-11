import { PrismaClient } from '@prisma/client'

// Plain Prisma client over a Postgres connection (Supabase pooler).
// Reused across hot reloads in development so connections do not pile up.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
