// Seeds the two demo accounts with sample content. Safe to re-run.
// Usage: npm run seed:demo  (needs DATABASE_URL, DIRECT_DATABASE_URL,
// DEMO_TEACHER_CLERK_ID and DEMO_STUDENT_CLERK_ID in the environment).
import { PrismaClient } from "@prisma/client";
import { seedDemo } from "../src/lib/demo-seed";

async function main() {
  const db = new PrismaClient();
  try {
    await seedDemo(
      db,
      process.env.DEMO_TEACHER_CLERK_ID || "",
      process.env.DEMO_STUDENT_CLERK_ID || ""
    );
    console.log("Demo data seeded.");
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
