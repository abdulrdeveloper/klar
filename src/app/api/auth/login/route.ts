import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";

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

    console.log("User logged in successfully with email:", email);

    return NextResponse.json(
        {
            success: true,
            message: "User logged in successfully",
        },
        { status: 200 }
    );
  }
   catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    );
  }
}
