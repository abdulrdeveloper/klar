import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { users, resetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json({ success: true });
    }

    const resetToken = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.insert(resetTokens).values({
      userId: user.id,
      token: resetToken,
      expiresAt,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const baseURL = req.headers.get("origin") || "http://localhost:3000";
    const resetURL = `${baseURL}/auth/reset-password?token=${resetToken}`;

    const emailHtml = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your Klar password</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f4f5;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">
            <tr>
              <td align="center" style="padding:0 0 24px;">
                <img src="https://klar.abdulrdeveloper.me/klar.png" alt="Klar" width="40" height="40" style="display:block;border:0;width:45px;height:45px;border-radius:8px;">
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:12px;border:1px solid #e4e4e7;padding:48px 48px 40px;">
                <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#09090b;">Reset your password</p>
                <p style="margin:0 0 28px;font-size:15px;color:#71717a;line-height:1.6;">Hi ${user.name}, we received a request to reset your Klar password.</p>
                <p style="margin:0 0 32px;font-size:15px;color:#3f3f46;line-height:1.7;">Click the button below to choose a new password. This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:32px;">
                  <tr>
                    <td>
                      <a href="${resetURL}" style="display:inline-block;background-color:#111118;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:8px;">Reset Password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 8px;font-size:13px;color:#71717a;">Or copy and paste this URL:</p>
                <p style="margin:0;font-size:12px;color:#f97316;word-break:break-all;font-family:monospace;">
                  <a href="${resetURL}" style="color:#f97316;">${resetURL}</a>
                </p>
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
      subject: "Reset your Klar password",
      html: emailHtml,
      replyTo: "dev@abdulrdeveloper.me",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}