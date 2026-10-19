import { db } from "@/lib/db";
import { DEMO_AI_DAILY_LIMIT } from "./demo-config";

export * from "./demo-config";

// Daily AI use counter for demo users. Uses a small table created by
// prisma/demo-ai-usage.sql (no change to the Prisma models). If the table is
// missing it is created on first use; if the database fails, the limit still
// applies from an in-memory counter for that server instance.
const memoryUsage = new Map<string, number>();
let tableReady = false;

async function ensureTable() {
  if (tableReady) return;
  await db.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS "DemoAiUsage" ("userId" TEXT NOT NULL, "day" DATE NOT NULL, "count" INTEGER NOT NULL DEFAULT 0, PRIMARY KEY ("userId", "day"))`
  );
  tableReady = true;
}

// Returns true if the demo user may use AI now (and counts the use).
export async function consumeDemoAiUse(userId: string): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  try {
    await ensureTable();
    const rows = await db.$queryRaw<{ count: number }[]>`
      INSERT INTO "DemoAiUsage" ("userId", "day", "count")
      VALUES (${userId}, ${day}::date, 1)
      ON CONFLICT ("userId", "day")
      DO UPDATE SET "count" = "DemoAiUsage"."count" + 1
      RETURNING "count"`;
    return Number(rows[0]?.count ?? 1) <= DEMO_AI_DAILY_LIMIT;
  } catch {
    const key = `${userId}:${day}`;
    const next = (memoryUsage.get(key) ?? 0) + 1;
    memoryUsage.set(key, next);
    return next <= DEMO_AI_DAILY_LIMIT;
  }
}

export async function resetDemoAiUsage() {
  memoryUsage.clear();
  try {
    await ensureTable();
    await db.$executeRawUnsafe(`DELETE FROM "DemoAiUsage"`);
  } catch {
    // table not available, nothing to clear
  }
}
