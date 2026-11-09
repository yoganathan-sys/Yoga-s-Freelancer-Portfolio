import { describe, it, expect } from "vitest";
import { submitContactAction } from "@/actions/contact";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  WHATSAPP_DESTINATION_NUMBER,
} from "@/lib/whatsapp";
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
      "Thank you! Your project enquiry has been received successfully."
    );
  });

  it("should accept valid submission data, return success message and generate WhatsApp link", async () => {
    const formData = new FormData();
    formData.append("fullName", "Alice Johnson");
    formData.append("email", "alice@enterprise.com");
    formData.append("phone", "+91 98765 43210");
    formData.append("projectType", "Full-Stack Application");
    formData.append("budgetRange", "$5,000 - $10,000");
    formData.append(
      "projectDescription",
      "We need a robust enterprise dashboard built with Next.js and Supabase."
    );

    const res = await submitContactAction(null, formData);
    expect(res.success).toBe(true);
    expect(res.message).toBe(
      "Thank you! Your project enquiry has been received successfully."
    );
    expect(res.messageId).toBeDefined();
    expect(res.whatsAppUrl).toBeDefined();
    expect(res.whatsAppUrl).toContain("https://wa.me/919025281363?text=");

    const decoded = decodeURIComponent(res.whatsAppUrl!);
    expect(decoded).toContain("NEW CLIENT PROJECT ENQUIRY");
    expect(decoded).toContain("Alice Johnson");
    expect(decoded).toContain("alice@enterprise.com");
    expect(decoded).toContain("+91 98765 43210");
    expect(decoded).toContain("Full-Stack Application");
    expect(decoded).toContain("$5,000 - $10,000");
    expect(decoded).toContain("Yoganathan's Freelancer Portfolio");
  });
});

describe("WhatsApp Message Formatter", () => {
  it("should format all fields according to specification", () => {
    const formatted = buildWhatsAppMessage({
      fullName: "David Miller",
      email: "david@logistics.com",
      phone: "+91 90252 81363",
      projectType: "Mobile Application",
      budgetRange: "$10,000+",
      projectDescription: "Need a full fleet tracking app in React Native.",
    });

    expect(formatted).toContain("NEW CLIENT PROJECT ENQUIRY");
    expect(formatted).toContain("Hello Yoganathan!");
    expect(formatted).toContain("CUSTOMER DETAILS");
    expect(formatted).toContain("Full Name: David Miller");
    expect(formatted).toContain("Email Address: david@logistics.com");
    expect(formatted).toContain("Phone / WhatsApp: +91 90252 81363");
    expect(formatted).toContain("PROJECT INFORMATION");
    expect(formatted).toContain("Project Type: Mobile Application");
    expect(formatted).toContain("Budget Range: $10,000+");
    expect(formatted).toContain("PROJECT DESCRIPTION\nNeed a full fleet tracking app in React Native.");
    expect(formatted).toContain("SOURCE\nYoganathan's Freelancer Portfolio");
  });

  it("should handle optional fields when phone or budget are omitted", () => {
    const formatted = buildWhatsAppMessage({
      fullName: "Sarah Connor",
      email: "sarah@future.io",
      projectType: "Web Application",
      projectDescription: "AI surveillance portal.",
    });

    expect(formatted).toContain("Phone / WhatsApp: Not Provided");
    expect(formatted).toContain("Budget Range: Not Specified");
  });

  it("should build correct wa.me link with destination number", () => {
    expect(WHATSAPP_DESTINATION_NUMBER).toBe("919025281363");
    const url = buildWhatsAppUrl({
      fullName: "Test User",
      email: "test@user.com",
      projectType: "Website Development",
      projectDescription: "Simple business landing page.",
    });

    expect(url.startsWith("https://wa.me/919025281363?text=")).toBe(true);
  });
});

describe("Email Notification Service & Retry Pipeline", () => {
  it("should handle missing RESEND_API_KEY gracefully without throwing", async () => {
    const res = await sendContactNotificationEmail({
      inquiryId: "test-id-123",
      fullName: "Test Customer",
      email: "customer@test.com",
      phone: "+91 90000 11111",
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
      phone: "+91 91234 56789",
      projectType: "Mobile Application",
      budgetRange: "$10,000+",
      projectDescription: "Need high-performance React Native mobile app.",
    });

    expect(submission.success).toBe(true);
    expect(submission.messageId).toBeDefined();
  });

  it("should allow retrying email notification via admin action", async () => {
    const submission = await submitContactMessage({
      fullName: "Retry Client",
      email: "retry@test.com",
      projectType: "Other",
      projectDescription: "Custom AI tool integration enquiry.",
    });

    const retryRes = await retryNotificationEmailAction(submission.messageId!);
    expect(retryRes.success).toBe(false);
    expect(retryRes.error).toContain("RESEND_API_KEY");
  });
});
