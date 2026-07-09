import { chatRequestSchema } from "@/lib/validation";
import { generateChatReply } from "@/lib/chat-runtime";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { conversations, messages } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response("Invalid chat request.", { status: 400 });
    }

    const { messages: chatMessages, model, conversationId } = parsed.data;
    const result = await generateChatReply({ messages: chatMessages, model });

    let savedConversationId = conversationId ?? null;

    if (session) {
      const lastUserMessage = [...chatMessages]
        .reverse()
        .find((message) => message.role === "user");

      if (!savedConversationId) {
        const [conversation] = await db
          .insert(conversations)
          .values({
            userId: session.userId,
            title: lastUserMessage?.content.slice(0, 30) || "New chat",
          })
          .returning({ id: conversations.id });

        savedConversationId = conversation.id;
      } else {
        const [existing] = await db
          .select({ id: conversations.id })
          .from(conversations)
          .where(
            and(
              eq(conversations.id, savedConversationId),
              eq(conversations.userId, session.userId),
            ),
          )
          .limit(1);

        if (!existing) {
          return new Response("Conversation not found.", { status: 404 });
        }
      }

      if (savedConversationId && lastUserMessage) {
        await db.insert(messages).values([
          {
            conversationId: savedConversationId,
            role: "user",
            content: lastUserMessage.content,
          },
          {
            conversationId: savedConversationId,
            role: "assistant",
            content: result.text,
          },
        ]);

        await db
          .update(conversations)
          .set({ updatedAt: new Date() })
          .where(eq(conversations.id, savedConversationId));
      }
    }

    return new Response(result.text, {
      headers: {
        "Content-Type": "text/plain",
        ...(savedConversationId
          ? { "X-Conversation-Id": savedConversationId }
          : {}),
      },
    });
  } catch (error) {
    console.error("[Chat] Error:", error);
    return new Response("Service unavailable. Please try again in a moment.", {
      status: 503,
    });
  }
}