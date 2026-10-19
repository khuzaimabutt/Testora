-- Daily AI use counter for the demo accounts (limit enforced in src/lib/demo.ts).
-- Optional: the app creates this table itself on first use if it is missing.
CREATE TABLE IF NOT EXISTS "DemoAiUsage" (
  "userId" TEXT NOT NULL,
  "day" DATE NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("userId", "day")
);
