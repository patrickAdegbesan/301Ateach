import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - List jobs with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: skip
      }),
      prisma.job.count()
    ]);

    return NextResponse.json({ 
      ok: true, 
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(req: Request) {
  try {
    const jobData = await req.json();

    // Validate required fields
    const requiredFields = ['slug', 'title', 'location', 'workType', 'employmentType', 'department', 'summary'];
    for (const field of requiredFields) {
      if (!jobData[field]) {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if slug already exists
    const existingJob = await prisma.job.findUnique({ 
      where: { slug: jobData.slug } 
    });
    
    if (existingJob) {
      return NextResponse.json(
        { ok: false, error: "A job with this slug already exists" },
        { status: 400 }
      );
    }

    // Add defaults
    jobData.postedDate = jobData.postedDate || new Date().toISOString().split('T')[0];
    jobData.featured = jobData.featured || false;

    const newJob = await prisma.job.create({ data: jobData });

    return NextResponse.json({ 
      ok: true, 
      message: "Job created successfully",
      jobId: newJob.id
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create job" },
      { status: 500 }
    );
  }
}
