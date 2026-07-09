import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { conversations } from "@/db/schema";

export async function GET() {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const items = await db
    .select({
      id: conversations.id,
      title: conversations.title,
      createdAt: conversations.createdAt,
      updatedAt: conversations.updatedAt,
    })
    .from(conversations)
    .where(eq(conversations.userId, session.userId))
    .orderBy(desc(conversations.updatedAt));

  return NextResponse.json({ success: true, conversations: items });
}
