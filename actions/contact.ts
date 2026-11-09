"use server";

import { z } from "zod";
import { submitContactMessage } from "@/lib/messages";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name must not exceed 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(120, "Email address is too long."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional(),
  projectType: z
    .string()
    .trim()
    .min(1, "Please select a project type.")
    .max(80),
  budgetRange: z
    .string()
    .trim()
    .max(50)
    .optional(),
  projectDescription: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project.")
    .max(3000, "Project description must not exceed 3000 characters."),
  website_honeypot: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

export async function submitContactAction(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  messageId?: string;
  emailSent?: boolean;
  whatsAppUrl?: string;
}> {
  try {
    const rawHoneypot = ((formData.get("website_honeypot") as string) || "").trim();

    // 1. Honeypot anti-spam check — silently pretend to succeed to neutralize automated spam bots
    if (rawHoneypot.length > 0) {
      return {
        success: true,
        message:
          "Thank you! Your project enquiry has been received successfully.",
      };
    }

    const rawData = {
      fullName: (formData.get("fullName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || undefined,
      projectType: (formData.get("projectType") as string) || "",
      budgetRange: (formData.get("budgetRange") as string) || undefined,
      projectDescription: (formData.get("projectDescription") as string) || "",
      website_honeypot: rawHoneypot,
    };

    // 2. Server-side Zod validation & input sanitization
    const validated = contactSchema.safeParse(rawData);

    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Please correct the highlighted errors.",
        errors: fieldErrors,
      };
    }

    // 3. Save to database & dispatch Resend email notification
    const result = await submitContactMessage({
      fullName: validated.data.fullName,
      email: validated.data.email,
      phone: validated.data.phone || null,
      projectType: validated.data.projectType,
      budgetRange: validated.data.budgetRange || null,
      projectDescription: validated.data.projectDescription,
    });

    if (!result.success) {
      return {
        success: false,
        message:
          result.error ||
          "Unable to submit your enquiry. Please try again or contact me directly through WhatsApp.",
      };
    }

    // 4. Generate prefilled WhatsApp Click to Chat URL with full enquiry details
    const whatsAppUrl = buildWhatsAppUrl({
      fullName: validated.data.fullName,
      email: validated.data.email,
      phone: validated.data.phone || null,
      projectType: validated.data.projectType,
      budgetRange: validated.data.budgetRange || null,
      projectDescription: validated.data.projectDescription,
    });

    return {
      success: true,
      messageId: result.messageId,
      emailSent: result.emailSent,
      whatsAppUrl,
      message:
        "Thank you! Your project enquiry has been received successfully.",
    };
  } catch (err: any) {
    console.error("submitContactAction exception:", err);
    return {
      success: false,
      message:
        "Unable to submit your enquiry. Please try again or contact me directly through WhatsApp.",
    };
  }
}
