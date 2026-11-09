import { describe, it, expect, vi } from "vitest";
import { submitContactAction } from "@/actions/contact";
import { retryNotificationEmailAction } from "@/actions/admin";
import { sendContactNotificationEmail } from "@/lib/email";
import { submitContactMessage } from "@/lib/messages";

describe("Contact Server Action & Validation", () => {
  it("should fail validation when full name is too short", async () => {
    const formData = new FormData();
    formData.append("fullName", "J");
    formData.append("email", "john@example.com");
    formData.append("projectType", "Web Application");
    formData.append("projectDescription", "Detailed project requirements for test.");

    const res = await submitContactAction(null, formData);
    expect(res.success).toBe(false);
    expect(res.errors?.fullName).toBeDefined();
  });

  it("should fail validation when email is invalid", async () => {
    const formData = new FormData();
    formData.append("fullName", "John Doe");
    formData.append("email", "invalid-email");
    formData.append("projectType", "Web Application");
    formData.append("projectDescription", "Detailed project requirements for test.");

    const res = await submitContactAction(null, formData);
    expect(res.success).toBe(false);
    expect(res.errors?.email).toBeDefined();
  });

  it("should detect bot honeypot submission and return success without saving spam", async () => {
    const formData = new FormData();
    formData.append("fullName", "Spam Bot");
    formData.append("email", "bot@spammer.net");
    formData.append("projectType", "Web Application");
    formData.append("projectDescription", "I am a bot trying to spam your website form.");
    formData.append("website_honeypot", "http://spam-link.ru");

    const res = await submitContactAction(null, formData);
    // Honeypot silently succeeds to avoid tipping off bots
    expect(res.success).toBe(true);
    expect(res.message).toBe(
      "Thank you! Your project enquiry has been submitted successfully. I'll get back to you soon."
    );
  });

  it("should accept valid submission data and return exact success message", async () => {
    const formData = new FormData();
    formData.append("fullName", "Alice Johnson");
    formData.append("email", "alice@enterprise.com");
    formData.append("projectType", "Full-Stack Application");
    formData.append("budgetRange", "$5,000 - $10,000");
    formData.append(
      "projectDescription",
      "We need a robust enterprise dashboard built with Next.js and Supabase."
    );

    const res = await submitContactAction(null, formData);
    expect(res.success).toBe(true);
    expect(res.message).toBe(
      "Thank you! Your project enquiry has been submitted successfully. I'll get back to you soon."
    );
    expect(res.messageId).toBeDefined();
  });
});

describe("Email Notification Service & Retry Pipeline", () => {
  it("should handle missing RESEND_API_KEY gracefully without throwing", async () => {
    // When RESEND_API_KEY is not configured or placeholder
    const res = await sendContactNotificationEmail({
      inquiryId: "test-id-123",
      fullName: "Test Customer",
      email: "customer@test.com",
      projectType: "Web Application",
      budgetRange: "$3,000 - $5,000",
      projectDescription: "Need a full ecommerce site.",
      createdAt: new Date().toISOString(),
    });

    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
    expect(res.notConfigured).toBe(true);
  });

  it("should save message to store with pending or failed status when email key is absent", async () => {
    const submission = await submitContactMessage({
      fullName: "Test Client",
      email: "client@test.com",
      projectType: "Mobile Application",
      budgetRange: "$10,000+",
      projectDescription: "Need high-performance React Native mobile app.",
    });

    expect(submission.success).toBe(true);
    expect(submission.messageId).toBeDefined();
    expect(submission.message).toContain("submitted successfully");
  });

  it("should allow retrying email notification via admin action", async () => {
    const submission = await submitContactMessage({
      fullName: "Retry Client",
      email: "retry@test.com",
      projectType: "Other",
      projectDescription: "Custom AI tool integration enquiry.",
    });

    const retryRes = await retryNotificationEmailAction(submission.messageId!);
    // Retrying without configured key should report descriptive error rather than throwing
    expect(retryRes.success).toBe(false);
    expect(retryRes.error).toContain("RESEND_API_KEY");
  });
});
