import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { loginRateLimiter } from "@/lib/rate-limit";
import { getRequestIdentifier } from "@/lib/request-security";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is missing");
const JWT_SECRET = new TextEncoder().encode(secret);
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedResult = loginSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Login failed",
          errors: parsedResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = parsedResult.data;
    const identifier = getRequestIdentifier(req);
    const [ipLimit, emailLimit] = await Promise.all([
      loginRateLimiter.limit(`ip:${identifier}`),
      loginRateLimiter.limit(`email:${email.toLowerCase()}`),
    ]);

    if (!ipLimit.success || !emailLimit.success) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Try again later." },
        { status: 429 },
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email before logging in",
        },
        { status: 403 },
      );
    }

    const jwt = await new SignJWT({ userId: user.id, userEmail: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 },
    );

    response.cookies.set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
