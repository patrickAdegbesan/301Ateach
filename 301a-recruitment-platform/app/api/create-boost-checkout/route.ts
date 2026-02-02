import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { applicationId, email, fullName, jobTitle, boostTier = 'standard' } = await req.json();

    if (!applicationId || !email || !fullName || !jobTitle) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define pricing tiers (in kobo - Paystack uses smallest currency unit)
    // NGN pricing: ₦1,500 / ₦3,000 / ₦4,500 (approximately $1/$2/$3 at current rates)
    const tiers = {
      basic: { price: 150000, days: 3, name: '3-Day Basic Boost' },      // ₦1,500
      standard: { price: 300000, days: 7, name: '7-Day Standard Boost' }, // ₦3,000
      premium: { price: 450000, days: 14, name: '14-Day Premium Boost' }  // ₦4,500
    };

    const selectedTier = tiers[boostTier as keyof typeof tiers] || tiers.standard;

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: selectedTier.price, // Amount in kobo (NGN 1,500 = 150000 kobo)
        currency: 'NGN',
        reference: `boost_${applicationId}_${Date.now()}`,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/careers/boost-success`,
        metadata: {
          applicationId,
          fullName,
          jobTitle,
          boostTier,
          boostDays: selectedTier.days.toString(),
          type: "application_boost",
          custom_fields: [
            {
              display_name: "Application",
              variable_name: "application_id",
              value: applicationId
            },
            {
              display_name: "Job Title",
              variable_name: "job_title",
              value: jobTitle
            }
          ]
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || 'Paystack initialization failed');
    }

    return NextResponse.json({
      ok: true,
      reference: paystackData.data.reference,
      url: paystackData.data.authorization_url,
    });
  } catch (error) {
    console.error("Paystack checkout error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
