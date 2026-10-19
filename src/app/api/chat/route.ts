import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import { isDemoUser, consumeDemoAiUse } from "@/lib/demo";

// Node runtime (not edge) so the demo daily AI limit can use the database.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("missing api key", { status: 400 });
    }

    const { userId } = auth();
    if (isDemoUser(userId) && !(await consumeDemoAiUse(userId as string))) {
      return new NextResponse(
        "Daily AI limit reached for the demo account. It resets tomorrow.",
        { status: 429 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });
    console.log(`response ${response}`);
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch chat response", { status: 500 });
  }
}
