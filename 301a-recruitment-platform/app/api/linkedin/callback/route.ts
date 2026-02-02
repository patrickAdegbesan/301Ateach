import { NextResponse } from "next/server";
import { linkedInAPI } from "@/lib/linkedin";
import { prisma } from "@/lib/prisma";

/**
 * LinkedIn OAuth Callback Handler
 * Receives auth code from LinkedIn, exchanges for access token
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      console.error("LinkedIn OAuth error:", error, errorDescription);
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head><title>LinkedIn Error</title></head>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h1>❌ LinkedIn Authentication Error</h1>
          <p>Error: ${error}</p>
          <p>Description: ${errorDescription || "No description provided"}</p>
          <a href="/admin/linkedin">Return to Dashboard</a>
        </body>
        </html>
        `,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    if (!code) {
      return NextResponse.json(
        { ok: false, error: "No authorization code provided" },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const tokenResponse = await linkedInAPI.getAccessToken(code);
    const { access_token, expires_in } = tokenResponse;

    // Get user profile to extract person URN
    // NOTE: /v2/me typically requires r_liteprofile.
    const profileResponse = await fetch(
      "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)",
      {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
      }
    );

    const profileStatus = profileResponse.status;
    const profileStatusText = profileResponse.statusText;
    let profileBodyText: string | null = null;
    let profileId: string | null = null;
    let profileName: string | null = null;

    try {
      profileBodyText = await profileResponse.text();
      const profileJson = profileBodyText ? JSON.parse(profileBodyText) : null;
      if (profileJson?.id) {
        profileId = String(profileJson.id);
      }
      if (profileJson?.localizedFirstName || profileJson?.localizedLastName) {
        profileName = [profileJson?.localizedFirstName, profileJson?.localizedLastName]
          .filter(Boolean)
          .join(" ");
      }
    } catch {
      // ignore parse errors; we still surface status for debugging
    }

    let personUrn = null;
    if (profileResponse.ok && profileId) {
      personUrn = `urn:li:person:${profileId}`;
    }

    // Try to get organization ID (will work once Share on LinkedIn is approved)
    let organizationId = null;
    try {
      organizationId = await linkedInAPI.getOrganizationId(access_token);
    } catch (err) {
      console.log("No organization access (expected until Share on LinkedIn is approved):", err);
    }

    // Store credentials in database
    const expiresAt = new Date(Date.now() + expires_in * 1000);
    
    // Try to delete old credentials (if table exists)
    try {
      await prisma.linkedInCredentials.deleteMany({});
    } catch (error) {
      console.log("No existing credentials to delete (table may not exist yet)");
    }
    
    // Create new credentials
    const credentials = await prisma.linkedInCredentials.create({
      data: {
        accessToken: access_token,
        expiresAt,
        personUrn,
        organizationId,
      },
    });

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>LinkedIn Connected</title>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
          }
          .success { color: #16a34a; }
          .info { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; }
          .code { background: #1f2937; color: #10b981; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1 class="success">✅ LinkedIn Connected Successfully!</h1>
        
        <div class="info">
          <p><strong>Status:</strong></p>
          <ul>
            <li>Access token: ✅ Stored</li>
            <li>Expires: ${expiresAt.toLocaleString()}</li>
            <li>Personal profile: ${personUrn ? '✅ Ready' : '⚠️ Not available'}</li>
            <li>Profile lookup: ${profileResponse.ok ? '✅ /v2/me OK' : `❌ /v2/me ${profileStatus} ${profileStatusText}`}</li>
            ${profileName ? `<li>Profile name: ${profileName}</li>` : ''}
            <li>Organization: ${organizationId ? `✅ ${organizationId}` : '⚠️ Pending approval'}</li>
          </ul>
        </div>

        ${(!personUrn && !profileResponse.ok) ? `
          <div class="info">
            <p><strong>Why personal profile is unavailable</strong></p>
            <p>Your token cannot read <span class="code">/v2/me</span>. This usually means the app did not get <span class="code">r_liteprofile</span> consent, or the member needs to re-consent after scope changes.</p>
            <p>Details (from LinkedIn):</p>
            <pre style="white-space: pre-wrap; word-break: break-word;">${(profileBodyText || '').slice(0, 2000)}</pre>
          </div>
        ` : ''}

        <p>${organizationId 
          ? '🎉 You can now post jobs to your company page!' 
          : '📝 Currently you can post to your personal profile. Once "Share on LinkedIn" product is approved, company page posting will work automatically.'
        }</p>

        <p><a href="/admin/linkedin" style="display: inline-block; background: #0077b5; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.5rem;">Go to Dashboard</a></p>
      </body>
      </html>
      `,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("LinkedIn callback error:", error);
    const errorMessage = error instanceof Error ? error.message : "Authentication failed";
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h1>❌ Error</h1>
        <p>${errorMessage}</p>
        <a href="/admin/linkedin">Return to Dashboard</a>
      </body>
      </html>
      `,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
