import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';

// GET - Download CV
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      select: {
        cvData: true,
        cvMimeType: true,
        firstName: true,
        lastName: true
      }
    });

    if (!application || !application.cvData) {
      return NextResponse.json(
        { ok: false, error: "CV not found" },
        { status: 404 }
      );
    }

    // Return the CV file directly
    return new NextResponse(application.cvData, {
      headers: {
        'Content-Type': application.cvMimeType,
        'Content-Disposition': `attachment; filename="${application.firstName}_${application.lastName}_CV.pdf"`
      }
    });
  } catch (error) {
    console.error("Error downloading CV:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to download CV" },
      { status: 500 }
    );
  }
}
