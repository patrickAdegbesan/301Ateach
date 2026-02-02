import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // Verify Paystack signature
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      console.error("Invalid Paystack signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle successful payment
    if (event.event === "charge.success") {
      const { reference, metadata } = event.data;
      const applicationId = metadata.applicationId;
      const boostDays = parseInt(metadata.boostDays || '7', 10);

      if (!applicationId) {
        console.error("No applicationId in Paystack webhook metadata");
        return NextResponse.json(
          { error: "No applicationId" },
          { status: 400 }
        );
      }

      // Calculate boost expiry date
      const boostExpiry = new Date(Date.now() + boostDays * 24 * 60 * 60 * 1000);

      // Update application with boost
      await prisma.application.update({
        where: { id: applicationId },
        data: {
          boosted: true,
          boostExpiry: boostExpiry,
        },
      });

      console.log(`Application ${applicationId} boosted successfully for ${boostDays} days via Paystack`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
