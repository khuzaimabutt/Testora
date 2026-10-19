import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDemoIds, resetDemoAiUsage } from "@/lib/demo";
import { seedDemo } from "@/lib/demo-seed";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Nightly reset for the demo accounts. Vercel Cron calls this with
// "Authorization: Bearer <CRON_SECRET>". Anything else is rejected.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { teacher, student } = getDemoIds();
  if (!teacher || !student) {
    return NextResponse.json({ error: "Demo users not configured" }, { status: 400 });
  }

  try {
    await seedDemo(db, teacher, student);
    await resetDemoAiUsage();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Demo reset failed");
    return NextResponse.json({ error: "Reset failed" }, { status: 500 });
  }
}
