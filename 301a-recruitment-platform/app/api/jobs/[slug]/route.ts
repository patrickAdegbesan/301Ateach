import { NextResponse } from "next/server";
import { getJobBySlug } from "@/lib/jobs-postgres";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}
