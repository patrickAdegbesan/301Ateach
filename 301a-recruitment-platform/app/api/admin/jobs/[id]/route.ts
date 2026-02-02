import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get specific job by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id }
    });

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

// PUT - Update job
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await req.json();

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Job not found" },
        { status: 404 }
      );
    }

    // If updating slug, check for conflicts
    if (updates.slug && updates.slug !== job.slug) {
      const existingJob = await prisma.job.findUnique({ 
        where: { slug: updates.slug } 
      });
      
      if (existingJob && existingJob.id !== id) {
        return NextResponse.json(
          { ok: false, error: "A job with this slug already exists" },
          { status: 400 }
        );
      }
    }

    await prisma.job.update({
      where: { id },
      data: updates
    });

    return NextResponse.json({ 
      ok: true, 
      message: "Job updated successfully" 
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Job not found" },
        { status: 404 }
      );
    }

    await prisma.job.delete({ where: { id } });

    return NextResponse.json({ 
      ok: true, 
      message: "Job deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
