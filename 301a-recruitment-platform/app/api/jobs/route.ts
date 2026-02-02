import { NextResponse } from "next/server";
import { getJobs, getFeaturedJobs } from "@/lib/jobs-postgres";

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured') === 'true';

    const jobs = featured ? await getFeaturedJobs() : await getJobs();

    return NextResponse.json(
      { ok: true, jobs },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
