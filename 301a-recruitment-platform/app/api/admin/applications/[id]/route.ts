import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';

// GET - Get specific application
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id }
    });

    if (!application) {
      return NextResponse.json(
        { ok: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // Don't convert CV to base64 here - it's too slow
    // We'll handle it in the download endpoint instead
    return NextResponse.json({ 
      ok: true, 
      application: { 
        ...application,
        cvData: undefined, // Remove binary data
        hasCv: !!application.cvData
      } 
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// PATCH - Update application status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ['PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWED', 'REJECTED', 'ACCEPTED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      return NextResponse.json(
        { ok: false, error: "Application not found" },
        { status: 404 }
      );
    }

    await prisma.application.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ 
      ok: true, 
      message: "Application status updated successfully" 
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update application" },
      { status: 500 }
    );
  }
}

// DELETE - Delete application
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const application = await prisma.application.findUnique({ where: { id } });
    
    if (!application) {
      return NextResponse.json(
        { ok: false, error: "Application not found" },
        { status: 404 }
      );
    }

    await prisma.application.delete({ where: { id } });

    return NextResponse.json({ 
      ok: true, 
      message: "Application deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
