"use server";

import { z } from "zod";
import { submitContactMessage } from "@/lib/messages";
import { Resend } from "resend";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  projectType: z.string().min(1, "Please select a project type."),
  budgetRange: z.string().optional(),
  projectDescription: z
    .string()
    .min(10, "Please provide at least 10 characters describing your project."),
  website_honeypot: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

export async function submitContactAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string; errors?: Record<string, string[]> }> {
  try {
    const rawHoneypot = (formData.get("website_honeypot") as string) || "";

    // 1. Honeypot check (anti-bot) — silently succeed to confuse automated crawlers
    if (rawHoneypot.trim().length > 0) {
      return {
        success: true,
        message: "Thank you! Your message has been received.",
      };
    }

    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      projectType: formData.get("projectType") as string,
      budgetRange: (formData.get("budgetRange") as string) || undefined,
      projectDescription: formData.get("projectDescription") as string,
      website_honeypot: rawHoneypot,
    };

    // 2. Zod Validation
    const validated = contactSchema.safeParse(rawData);

    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Please correct the highlighted errors.",
        errors: fieldErrors,
      };
    }

    // 3. Save to Supabase (or local fallback store)
    const dbResult = await submitContactMessage({
      fullName: validated.data.fullName,
      email: validated.data.email,
      projectType: validated.data.projectType,
      budgetRange: validated.data.budgetRange,
      projectDescription: validated.data.projectDescription,
    });

    if (!dbResult.success) {
      return {
        success: false,
        message: dbResult.error || "Failed to record inquiry in the database.",
      };
    }

    // 4. Send Email Notification with Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

    if (
      resendApiKey &&
      recipientEmail &&
      !resendApiKey.includes("your-api-key") &&
      !resendApiKey.includes("1234567890")
    ) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: recipientEmail,
          replyTo: validated.data.email,
          subject: `⚡ New Project Inquiry from ${validated.data.fullName}: ${validated.data.projectType}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111;">
              <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 8px;">New Client Inquiry</h2>
              <p><strong>Name:</strong> ${validated.data.fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${validated.data.email}">${validated.data.email}</a></p>
              <p><strong>Project Type:</strong> ${validated.data.projectType}</p>
              <p><strong>Budget Range:</strong> ${validated.data.budgetRange || "Not specified"}</p>
              <h3 style="margin-top: 20px;">Project Description:</h3>
              <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
                ${validated.data.projectDescription.replace(/\n/g, "<br/>")}
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error:", emailErr);
      }
    }

    return {
      success: true,
      message:
        "Thank you! Your message has been received. I will review your project details and get back to you shortly.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "An unexpected error occurred. Please try again or reach out directly by email.",
    };
  }
}
