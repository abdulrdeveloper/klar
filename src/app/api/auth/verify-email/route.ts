import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Verify email route stub" });
}