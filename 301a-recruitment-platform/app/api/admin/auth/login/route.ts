import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminAuth } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { ok: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    await setAdminAuth();

    return NextResponse.json({ ok: true, message: "Authenticated successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
