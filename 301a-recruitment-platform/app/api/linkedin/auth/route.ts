import { NextResponse } from "next/server";
import { linkedInAPI } from "@/lib/linkedin";

/**
 * LinkedIn OAuth initialization
 * Redirects to LinkedIn for authorization
 */
export async function GET() {
  try {
    const authUrl = linkedInAPI.getAuthorizationUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("LinkedIn auth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/linkedin?error=Failed to initialize authentication`
    );
  }
}
