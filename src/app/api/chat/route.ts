import { chatRequestSchema } from "@/lib/validation";
import { generateChatReply } from "@/lib/chat-runtime";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response("Invalid chat request.", { status: 400 });
    }

    const { messages, model } = parsed.data;
    const result = await generateChatReply({ messages, model });

    return new Response(result.text, {
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("[Chat] Error:", error);
    return new Response("Service unavailable. Please try again in a moment.", {
      status: 503,
    });
  }
}