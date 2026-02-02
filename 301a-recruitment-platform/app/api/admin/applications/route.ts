import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - List applications with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: [
          { boosted: 'desc' }, // Boosted applications first
          { createdAt: 'desc' }
        ],
        select: {
          id: true,
          jobId: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          coverLetter: true,
          cvMimeType: true,
          status: true,
        boosted: true,
        boostExpiry: true,
        createdAt: true,
        updatedAt: true,
        // Exclude cvData from list view
      },
      take: limit,
      skip: skip
    }),
    prisma.application.count({ where })
  ]);

    return NextResponse.json({ 
      ok: true, 
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
