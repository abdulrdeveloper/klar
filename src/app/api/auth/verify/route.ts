import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, verifyTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try{
    const { token } = await req.json();

     if (!token || typeof token !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing token." },
        { status: 400 },
      );
    }

    const [record] = await db
      .select()
      .from(verifyTokens)
      .where(eq(verifyTokens.token, token))
      .limit(1);

    if (!record) {
      return NextResponse.json(
        { success: false, message: "Invalid verification link" },
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

    await db
      .update(users)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(users.id, record.userId));

      await db
      .update(verifyTokens)
      .set({ used: true, updatedAt: new Date() })
      .where(eq(verifyTokens.id, record.id));

    return NextResponse.json({
      success: true,
      message: "Email verified successfully"},
      {status: 200},
    );
  }
   catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during verification" },
      { status: 500 },
    );
  }
}
