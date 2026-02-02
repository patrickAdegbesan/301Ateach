import { NextResponse } from "next/server";
import { clearAdminAuth } from "@/lib/adminAuth";

export async function POST() {
  try {
    await clearAdminAuth();
    return NextResponse.json({ ok: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { ok: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}
