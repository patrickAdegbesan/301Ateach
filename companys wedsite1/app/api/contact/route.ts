import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type Contact = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const data: Contact = await req.json();

    // Basic validation
    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    // Route to appropriate email based on service selection
    let toAddress = "info@301atech.com";
    if (data.service && ['software-development', 'smart-homes', 'data-analytics'].includes(data.service)) {
      toAddress = "sale@301atech.com"; // Technical/project services → sale
    } else if (data.service && ['hardware-installation', 'networking-security', 'it-training'].includes(data.service)) {
      toAddress = "support@301atech.com"; // Support/maintenance services
    } else if (data.service === 'graphics-design') {
      toAddress = "sale@301atech.com"; // Creative services → sale
    }
    // Default: info@301atech.com for 'other' or no service

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json({ ok: false, error: "SMTP is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `New contact from ${data.name} — ${data.service || "Contact Form"}`;

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "-"}</p>
      <p><strong>Company:</strong> ${data.company || "-"}</p>
      <p><strong>Service:</strong> ${data.service || "-"}</p>
      <hr />
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    `;

    await transporter.sendMail({
      from: `${data.name} <${data.email}>`,
      to: toAddress,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
