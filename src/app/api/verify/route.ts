import { verifyToken } from "@/libs/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { auth } = body;
  const verify = verifyToken(auth);
  if (verify) {
    return NextResponse.json({ message: "Auth success", data: verify });
  }
  return NextResponse.json({ message: "Invalid auth", data: null });
}
