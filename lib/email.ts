import { Resend } from "resend";

export interface ContactEmailPayload {
  inquiryId: string;
  fullName: string;
  email: string;
  projectType: string;
  budgetRange?: string | null;
  projectDescription: string;
  createdAt: string;
}

export interface EmailDispatchResult {
  success: boolean;
  id?: string;
  error?: string;
  notConfigured?: boolean;
}

/**
 * Sends a notification email to the developer whenever a client submits the portfolio contact form.
 */
export async function sendContactNotificationEmail(
  payload: ContactEmailPayload
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL || "yoganathan162008@gmail.com";
  // Default to Resend verified test sender unless a custom verified domain is provided
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your-api-key")) {
    console.warn(
      "[Resend Email] RESEND_API_KEY is not configured. Email notification skipped."
    );
    return {
      success: false,
      error: "RESEND_API_KEY environment variable is not configured.",
      notConfigured: true,
    };
  }

  try {
    const resend = new Resend(apiKey);

    const formattedDate = new Date(payload.createdAt).toUTCString();

    const subject = `New Freelance Project Enquiry – ${payload.fullName}`;

    // Plain text fallback
    const plainText = `
NEW CLIENT ENQUIRY
==================
A new potential client has contacted you through your portfolio website.

CUSTOMER DETAILS:
- Full Name: ${payload.fullName}
- Email Address: ${payload.email}
- Project Type: ${payload.projectType}
- Budget Range: ${payload.budgetRange || "To be discussed / Not specified"}

PROJECT DESCRIPTION:
--------------------
${payload.projectDescription}

SUBMISSION DETAILS:
- Date & Time: ${formattedDate}
- Enquiry ID: ${payload.inquiryId}
- Direct Reply: Reply directly to this email to contact ${payload.fullName} (${payload.email})

---------------------------------------------------
Portfolio Contact System – Yoganathan A
`.trim();

    // Responsive HTML Email Template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #18181b;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f4f5;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e4e4e7;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #09090b;
      color: #ffffff;
      padding: 28px 32px;
      border-bottom: 3px solid #2563eb;
    }
    .header-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background-color: #2563eb;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #ffffff;
    }
    .header p {
      margin: 6px 0 0;
      font-size: 13px;
      color: #a1a1aa;
    }
    .content {
      padding: 32px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #71717a;
      margin: 0 0 12px;
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 6px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .details-table td {
      padding: 8px 0;
      vertical-align: top;
      font-size: 14px;
    }
    .details-table .label {
      width: 140px;
      color: #71717a;
      font-weight: 600;
    }
    .details-table .value {
      color: #09090b;
      font-weight: 600;
    }
    .message-box {
      background-color: #fafafa;
      border: 1px solid #e4e4e7;
      border-left: 4px solid #2563eb;
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 24px;
      font-size: 14px;
      color: #27272a;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .reply-btn {
      display: inline-block;
      background-color: #09090b;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 9999px;
      margin-bottom: 24px;
    }
    .meta-box {
      background-color: #f4f4f5;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #71717a;
      font-family: monospace;
    }
    .footer {
      background-color: #fafafa;
      border-top: 1px solid #e4e4e7;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #a1a1aa;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <span class="header-badge">NEW CLIENT ENQUIRY</span>
        <h1>New Project Enquiry</h1>
        <p>A new potential client has contacted you through your portfolio website.</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <!-- Customer Details -->
        <div class="section-title">Customer Information</div>
        <table class="details-table">
          <tr>
            <td class="label">Full Name:</td>
            <td class="value"><strong>${payload.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Email Address:</td>
            <td class="value"><a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a></td>
          </tr>
          <tr>
            <td class="label">Project Type:</td>
            <td class="value">${payload.projectType}</td>
          </tr>
          <tr>
            <td class="label">Budget Range:</td>
            <td class="value">${payload.budgetRange || "To be discussed / Not specified"}</td>
          </tr>
        </table>

        <!-- Project Description -->
        <div class="section-title">Project Description</div>
        <div class="message-box">${payload.projectDescription.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

        <!-- Quick Reply Action -->
        <a href="mailto:${payload.email}?subject=${encodeURIComponent(`Re: Your Project Enquiry – ${payload.projectType}`)}" class="reply-btn">
          Reply Directly to ${payload.fullName} &rarr;
        </a>

        <!-- Metadata -->
        <div class="meta-box">
          <div>Enquiry ID: ${payload.inquiryId}</div>
          <div>Submitted: ${formattedDate}</div>
          <div>Reply-To configured: ${payload.email}</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Portfolio Contact System &bull; Yoganathan A &bull; Full-Stack Developer
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

    const result = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: payload.email,
      subject,
      text: plainText,
      html,
    });

    if (result.error) {
      console.error("[Resend Email Error]:", result.error);
      return {
        success: false,
        error: result.error.message || "Failed to deliver email through Resend.",
      };
    }

    return {
      success: true,
      id: result.data?.id,
    };
  } catch (err: any) {
    console.error("[Resend Email Exception]:", err);
    return {
      success: false,
      error: err?.message || "Unexpected exception during email dispatch.",
    };
  }
}

