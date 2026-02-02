// LinkedIn API Integration Library
import { prisma } from "@/lib/prisma";

interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
}

interface LinkedInPostResponse {
  id: string;
}

export class LinkedInAPI {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.LINKEDIN_CLIENT_ID || "";
    this.clientSecret = process.env.LINKEDIN_CLIENT_SECRET || "";
    this.redirectUri = process.env.LINKEDIN_REDIRECT_URI || "";
  }

  /**
   * Generate LinkedIn OAuth authorization URL
   */
  getAuthorizationUrl(): string {
    // Minimal scopes:
    // - w_member_social: create posts
    // - r_liteprofile: read /v2/me to derive person URN
    // NOTE: If LinkedIn rejects any scope, remove it from here and retry.
    const scope = "w_member_social r_liteprofile";
    const state = Math.random().toString(36).substring(7);
    
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state,
      scope,
      prompt: "consent",
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<LinkedInTokenResponse> {
    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LinkedIn token exchange failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Get organization ID from LinkedIn profile
   */
  async getOrganizationId(accessToken: string): Promise<string> {
    const response = await fetch("https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&projection=(elements*(organization~(id)))", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LinkedIn API error:", response.status, errorText);
      throw new Error(`Failed to fetch organization ID: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("LinkedIn organization response:", JSON.stringify(data, null, 2));
    
    if (data.elements && data.elements.length > 0) {
      return data.elements[0]["organization~"].id;
    }

    throw new Error("No organization found");
  }

  /**
   * Post a job to LinkedIn (personal profile or company page)
   */
  async postJob(params: {
    jobTitle: string;
    jobLocation: string;
    salary: string;
    department: string;
    employmentType: string;
    jobUrl: string;
    organizationId?: string;
    personUrn?: string;
    accessToken: string;
  }): Promise<LinkedInPostResponse> {
    const { jobTitle, jobLocation, salary, department, employmentType, jobUrl, organizationId, personUrn, accessToken } = params;

    // Format post content
    const postText = `🚀 We're Hiring: ${jobTitle}

📍 Location: ${jobLocation}
💰 Salary: ${salary}
🏢 Department: ${department}
⏰ ${employmentType}

Apply now: ${jobUrl}

#NigeriaJobs #Hiring #${department.replace(/\s+/g, '')} #JobOpportunity`;

    // Determine author URN (organization or person)
    const normalizedPersonUrn = personUrn
      ? (personUrn.startsWith("urn:li:") ? personUrn : `urn:li:person:${personUrn}`)
      : "";

    const author = organizationId
      ? `urn:li:organization:${organizationId}`
      : normalizedPersonUrn;

    if (!author) {
      throw new Error("No organization ID or person URN available for posting");
    }

    const postData = {
      author,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postText,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LinkedIn post failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Get stored LinkedIn credentials from database
   */
  async getStoredCredentials(): Promise<{
    accessToken: string;
    organizationId?: string;
    personUrn?: string;
  } | null> {
    const credentials = await prisma.linkedInCredentials.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!credentials) {
      return null;
    }

    // Check if token is expired
    if (credentials.expiresAt < new Date()) {
      console.warn("LinkedIn access token expired");
      return null;
    }

    return {
      accessToken: credentials.accessToken,
      organizationId: credentials.organizationId || undefined,
      personUrn: credentials.personUrn || undefined,
    };
  }
}

export const linkedInAPI = new LinkedInAPI();
