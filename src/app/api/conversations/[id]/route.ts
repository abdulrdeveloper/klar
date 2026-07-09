import { NextResponse } from "next/server";
import { asc, and, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { conversations, messages } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { id: string } },
) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const [conversation] = await db
    .select({
      id: conversations.id,
      title: conversations.title,
    })
    .from(conversations)
    .where(
      and(
        eq(conversations.id, params.id),
        eq(conversations.userId, session.userId),
      ),
    )
    .limit(1);

  if (!conversation) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const items = await db
    .select({
      role: messages.role,
      content: messages.content,
    })
    .from(messages)
    .where(eq(messages.conversationId, params.id))
    .orderBy(asc(messages.createdAt));

  return NextResponse.json({
    success: true,
    conversation,
    messages: items,
  });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const [conversation] = await db
    .select({ id: conversations.id })
    .from(conversations)
    .where(
      and(
        eq(conversations.id, params.id),
        eq(conversations.userId, session.userId),
      ),
    )
    .limit(1);

  if (!conversation) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  await db
    .delete(conversations)
    .where(eq(conversations.id, params.id));

  return NextResponse.json({ success: true });
}
