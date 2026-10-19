// Demo-account helpers. Demo user ids come from env vars, never from code.
// Daily AI uses per demo account (override with DEMO_AI_DAILY_LIMIT, default 5).
export const DEMO_AI_DAILY_LIMIT = Number(process.env.DEMO_AI_DAILY_LIMIT) || 5;
export const DEMO_DISABLED_MESSAGE = "Disabled in the demo";

// Seeded tests use ids in a reserved range so they can be told apart from
// anything a demo visitor creates (ids from the normal sequence).
export const DEMO_TEST_ID_START = 900001;
export const DEMO_TEST_ID_END = 900999;

export function isSeededTestId(id: number) {
  return id >= DEMO_TEST_ID_START && id <= DEMO_TEST_ID_END;
}

export function getDemoIds() {
  return {
    teacher: process.env.DEMO_TEACHER_CLERK_ID || "",
    student: process.env.DEMO_STUDENT_CLERK_ID || "",
  };
}

export function isDemoUser(userId?: string | null) {
  if (!userId) return false;
  const { teacher, student } = getDemoIds();
  return userId === teacher || userId === student;
}
