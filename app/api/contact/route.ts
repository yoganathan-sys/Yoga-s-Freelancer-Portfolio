import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitContactMessage } from "@/lib/messages";

const contactApiSchema = z.object({
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
    .optional()
    .nullable(),
  projectType: z
    .string()
    .trim()
    .min(1, "Please select a project type.")
    .max(80),
  budgetRange: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable(),
  projectDescription: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project.")
    .max(3000, "Project description must not exceed 3000 characters."),
  website_honeypot: z.string().optional(),
});

// Simple in-memory sliding window rate limiter (5 submissions per 10 minutes per IP)
const ipRateMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRateMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRateMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submissions received. Please wait a few minutes or reach out directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    // 2. Parse Body (supports both JSON and FormData)
    let body: any;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        projectType: formData.get("projectType"),
        budgetRange: formData.get("budgetRange") || undefined,
        projectDescription: formData.get("projectDescription"),
        website_honeypot: formData.get("website_honeypot") || undefined,
      };
    } else {
      body = await req.json();
    }

    // 3. Honeypot check (anti-bot)
    const honeypot = (body.website_honeypot || "").trim();
    if (honeypot.length > 0) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you! Your project enquiry has been submitted successfully. I'll get back to you soon.",
      });
    }

    // 4. Server-Side Zod Validation
    const parsed = contactApiSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted form errors.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 5. Save to Supabase and Dispatch Resend Email
    const result = await submitContactMessage({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      projectType: parsed.data.projectType,
      budgetRange: parsed.data.budgetRange || null,
      projectDescription: parsed.data.projectDescription,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.error ||
            "Unable to submit your enquiry. Please try again or contact me directly through WhatsApp.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      emailSent: result.emailSent,
      message:
        "Thank you! Your project enquiry has been submitted successfully. I'll get back to you soon.",
    });
  } catch (err: any) {
    console.error("[API Contact Route Error]:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your enquiry. Please try again or contact me directly through WhatsApp.",
      },
      { status: 500 }
    );
  }
}

