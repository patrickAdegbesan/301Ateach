import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const jobId = formData.get("jobId") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string || "";
    const portfolioUrl = formData.get("portfolioUrl") as string || "";
    const additionalInfo = formData.get("additionalInfo") as string || "";
    const wantBoost = formData.get("wantBoost") === "true";
    const agreedToPrivacy = formData.get("agreedToPrivacy") === "true";
    const cvFile = formData.get("cv") as File | null;

    // Basic validation
    if (!jobId || !jobTitle || !fullName || !email || !phone || !location) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!agreedToPrivacy) {
      return NextResponse.json(
        { ok: false, error: "Privacy policy consent is required" },
        { status: 400 }
      );
    }

    if (!cvFile) {
      return NextResponse.json(
        { ok: false, error: "CV is required" },
        { status: 400 }
      );
    }

    // Validate file
    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    if (!ALLOWED_FILE_TYPES.includes(cvFile.type)) {
      return NextResponse.json(
        { ok: false, error: "Only PDF and DOCX files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const fileExtension = cvFile.name.split('.').pop() || 'pdf';
    const sanitizedFileName = `CV_${fullName.replace(/[^a-zA-Z0-9]/g, '_')}_${jobTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`;

    // Save application to PostgreSQL first so SMTP/DNS issues do not block submissions
    // Split fullName into firstName and lastName
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || nameParts[0];

    const applicationData = {
      jobId,
      firstName,
      lastName,
      email,
      phone: phone || null,
      coverLetter: additionalInfo || null,
      cvData: cvBuffer,
      cvMimeType: cvFile.type,
      status: 'PENDING' as const,
      boosted: false,
      boostExpiry: null,
    };

    const application = await prisma.application.create({ data: applicationData });

    // SMTP Configuration (read after database save so email issues don't block submissions)
    const smtpHostRaw = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpUserRaw = process.env.SMTP_USER;
    const smtpPassRaw = process.env.SMTP_PASS;
    const recruitEmail = process.env.RECRUIT_EMAIL || "recruit@301atech.com";

    const smtpHost = (smtpHostRaw || "").trim() || "smtp.zoho.com";
    const smtpPort = Number.parseInt((smtpPortRaw || "465").trim(), 10) || 465;
    const smtpUser = (smtpUserRaw || "").trim();
    const smtpPass = (smtpPassRaw || "").trim();

    // Email is best-effort (do not fail the application if SMTP is down)
    let recruiterEmailSent = false;
    let candidateEmailSent = false;
    let emailError: string | null = null;

    if (smtpUser && smtpPass && smtpHost) {
      try {
        // Wrap transporter creation in try-catch (DNS can fail on Vercel)
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000, // 10s timeout
          greetingTimeout: 10000,
          tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2'
          }
        });

    // Email to recruiter
    const recruiterEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A1628;">New Job Application</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0A1628; margin-top: 0;">Position Applied For</h3>
          <p style="font-size: 18px; font-weight: bold; color: #0A1628;">${jobTitle}</p>
          <p style="color: #6b7280; font-size: 14px;">Job ID: ${jobId}</p>
        </div>

        <h3 style="color: #0A1628;">Candidate Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">Name:</td>
            <td style="padding: 12px 0;">${fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">Email:</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #0A1628;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">Phone:</td>
            <td style="padding: 12px 0;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">Location:</td>
            <td style="padding: 12px 0;">${location}</td>
          </tr>
          ${linkedinUrl ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">LinkedIn:</td>
            <td style="padding: 12px 0;"><a href="${linkedinUrl}" style="color: #0A1628;">${linkedinUrl}</a></td>
          </tr>
          ` : ''}
          ${portfolioUrl ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #4b5563;">Portfolio:</td>
            <td style="padding: 12px 0;"><a href="${portfolioUrl}" style="color: #0A1628;">${portfolioUrl}</a></td>
          </tr>
          ` : ''}
        </table>

        ${additionalInfo ? `
        <h3 style="color: #0A1628; margin-top: 30px;">Additional Information</h3>
        <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #0A1628; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${additionalInfo}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 15px; background: #ecfdf5; border-radius: 8px;">
          <p style="margin: 0; color: #065f46; font-size: 14px;">
            <strong>✓</strong> CV/Resume is attached to this email
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Application submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
          <p>Candidate consented to privacy policy: Yes</p>
        </div>
      </div>
    `;

        await transporter.sendMail({
          from: `"301A TECH Recruitment" <${smtpUser}>`,
          to: recruitEmail,
          subject: `Application – ${jobTitle} – ${fullName}`,
          html: recruiterEmailHtml,
          attachments: [
            {
              filename: sanitizedFileName,
              content: cvBuffer,
            },
          ],
        });
        recruiterEmailSent = true;

        // Confirmation email to candidate
        const candidateEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A1628;">Application Received</h2>
        
        <p>Dear ${fullName},</p>
        
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position at 301A TECH LTD.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0A1628; margin-top: 0;">What Happens Next?</h3>
          <ol style="color: #4b5563; line-height: 1.8;">
            <li><strong>Review:</strong> Our recruitment team will carefully review your application (typically 3-5 business days)</li>
            <li><strong>Assessment:</strong> If your profile matches our requirements, we'll contact you to discuss the next steps</li>
            <li><strong>Interview:</strong> Shortlisted candidates will be invited for an interview</li>
            <li><strong>Decision:</strong> We'll keep you informed throughout the process</li>
          </ol>
        </div>

        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
          <p style="margin: 0; color: #065f46;">
            <strong>Your application details:</strong><br>
            Position: ${jobTitle}<br>
            Submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>

        <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact us at 
        <a href="mailto:${recruitEmail}" style="color: #0A1628;">${recruitEmail}</a></p>

        <p>Best regards,<br>
        <strong>301A TECH LTD Recruitment Team</strong></p>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This is an automated confirmation. Please do not reply to this email.</p>
        </div>
      </div>
    `;

        await transporter.sendMail({
          from: `"301A TECH Recruitment" <${smtpUser}>`,
          to: email,
          subject: `Application Received - ${jobTitle} at 301A TECH LTD`,
          html: candidateEmailHtml,
        });
        candidateEmailSent = true;
      } catch (err) {
        console.error('Email send failed:', err);
        emailError = 'Email delivery failed (SMTP/DNS). Application saved.';
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Application submitted successfully",
      applicationId: application.id,
      recruiterEmailSent,
      candidateEmailSent,
      emailError,
    });

  } catch (error) {
    console.error("Application submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process application";
    console.error("Error details:", errorMessage);
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
