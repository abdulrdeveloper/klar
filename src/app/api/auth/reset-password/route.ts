
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users, resetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing token" },
        { status: 400 },
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const [record] = await db
      .select()
      .from(resetTokens)
      .where(eq(resetTokens.token, token))
      .limit(1);

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Invalid reset link" },
        { status: 400 },
      );
    }

    if (record.used) {
      return NextResponse.json(
        { success: false, message: "This link has already been used" },
        { status: 400 },
      );
    }

    if (record.expiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        { success: false, message: "This link has expired. Please request a new one." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db
      .update(users)
      .set({ passwordHash: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, record.userId));

    await db
      .update(resetTokens)
      .set({ used: true, updatedAt: new Date() })
      .where(eq(resetTokens.id, record.id));

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
