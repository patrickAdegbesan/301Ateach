import { NextResponse } from "next/server";
import { linkedInAPI } from "@/lib/linkedin";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

/**
 * POST /api/linkedin/post
 * Post a single job to LinkedIn
 */
export async function POST(req: Request) {
  try {
    // Check admin auth
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { ok: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Get job from database
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || !job.active) {
      return NextResponse.json(
        { ok: false, error: "Job not found or not active" },
        { status: 404 }
      );
    }

    // Get LinkedIn credentials
    const credentials = await linkedInAPI.getStoredCredentials();
    if (!credentials) {
      return NextResponse.json(
        { ok: false, error: "LinkedIn not connected. Please authenticate first." },
        { status: 400 }
      );
    }

    // Format job URL
    const jobUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/careers/jobs/${job.slug}`;

    // Post to LinkedIn (works with personal profile or company page)
    const result = await linkedInAPI.postJob({
      jobTitle: job.title,
      jobLocation: job.location,
      salary: job.salaryRange,
      department: job.department,
      employmentType: job.employmentType,
      jobUrl,
      accessToken: credentials.accessToken,
      organizationId: credentials.organizationId,
      personUrn: credentials.personUrn,
    });

    return NextResponse.json({
      ok: true,
      message: "Job posted to LinkedIn successfully",
      linkedInPostId: result.id,
    });
  } catch (error) {
    console.error("LinkedIn post error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to post job";
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
