import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { getDemoIds } from "@/lib/demo";

export const dynamic = "force-dynamic";

// One-click demo access: mints a short-lived Clerk sign-in token for the demo
// user and sends the visitor to the sign-in page, where Clerk signs them in.
export async function GET(
  req: Request,
  { params }: { params: { role: string } }
) {
  const role = params.role;
  const ids = getDemoIds();
  const userId = role === "teacher" ? ids.teacher : role === "student" ? ids.student : "";
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/sign-in?demo=${reason}`, req.url));

  if (!userId) return fail("unavailable");

  try {
    const signInToken = await clerkClient.signInTokens.createSignInToken({
      userId,
      expiresInSeconds: 60,
    });
    const target = new URL("/sign-in", req.url);
    target.searchParams.set("__clerk_ticket", signInToken.token);
    return NextResponse.redirect(target);
  } catch (e) {
    console.error("Demo sign-in token failed");
    return fail("error");
  }
}
