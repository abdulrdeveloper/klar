import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation";
import { registerRateLimiter } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { users, verifyTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const identifier =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        .trim() ||
      "anonymous";

    const { success } = await registerRateLimiter.limit(identifier);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many registration requests. Try again later.",
        },
        { status: 429 },
      );
    }

    const parsedResult = registerSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsedResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = parsedResult.data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        name: name,
        email: email,
        passwordHash: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    const verifyToken = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.insert(verifyTokens).values({
      userId: newUser.id,
      token: verifyToken,
      expiresAt,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const baseURL = req.headers.get("origin") || "http://localhost:3000";
    const verifyURL = `${baseURL}/auth/verify?token=${verifyToken}`;

    const emailHtml = `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>Verify your Klar account</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f4f5;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">
            <tr>
              <td align="center" style="padding:0 0 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" style="padding-right:10px;">
                      <img src="https://klar.abdulrdeveloper.me/klar.png" alt="Klar" width="40" height="40" style="display:block;border:0;width:45px;height:45px;border-radius:8px;">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:12px;border:1px solid #e4e4e7;padding:48px 48px 40px;">
                <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#09090b;line-height:1.3;letter-spacing:-0.4px;">Verify your email address</p>
                <p style="margin:0 0 28px;font-size:15px;color:#71717a;line-height:1.6;">Hi ${name}, thanks for signing up for Klar.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                  <tr><td style="border-top:1px solid #e4e4e7;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
                <p style="margin:0 0 32px;font-size:15px;color:#3f3f46;line-height:1.7;">To get started, we need to verify that this email address belongs to you. Click the button below to confirm your account. This link will expire in <strong style="color:#09090b;font-weight:600;">24 hours</strong>.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:32px;">
                  <tr>
                    <td>
                      <a href="${verifyURL}" style="display:inline-block;background-color:#111118;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.1px;padding:14px 28px;border-radius:8px;-webkit-text-size-adjust:none;">Verify Email Address</a>
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
                  <tr><td style="border-top:1px solid #e4e4e7;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
                <p style="margin:0 0 8px;font-size:13px;color:#71717a;line-height:1.5;">Or copy and paste this URL into your browser:</p>
                <p style="margin:0;font-size:12px;color:#f97316;line-height:1.6;word-break:break-all;font-family:'Courier New',Courier,monospace;">
                  <a href="${verifyURL}" style="color:#f97316;text-decoration:underline;">${verifyURL}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:32px 16px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 8px 0;font-size:14px;font-weight:600;color:#3f3f46;">Klar — your AI tutor for school.</p>
                <p style="margin:0 0 16px 0;font-size:12px;color:#71717a;line-height:1.6;">You're receiving this email because an account was registered with this address.<br>If you didn't create a Klar account, you can safely ignore this email.</p>
                <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2026 Klar. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

await resend.emails.send({
  from: "Klar <noreply@abdulrdeveloper.me>",
  to: email,
  subject: "Verify your Klar account",
  html: emailHtml,
  replyTo: "dev@abdulrdeveloper.me",
});

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Check your email to verify.",
        userId: newUser.id,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
      },
      { status: 500 },
    );
  }
}