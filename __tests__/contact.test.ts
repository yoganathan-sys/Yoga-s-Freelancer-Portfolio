import { describe, it, expect } from "vitest";
import { submitContactAction } from "@/actions/contact";

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

  it("should detect bot honeypot submission", async () => {
    const formData = new FormData();
    formData.append("fullName", "Spam Bot");
    formData.append("email", "bot@spammer.net");
    formData.append("projectType", "Web Application");
    formData.append("projectDescription", "I am a bot trying to spam your website form.");
    formData.append("website_honeypot", "http://spam-link.ru");

    const res = await submitContactAction(null, formData);
    // Honeypot silently succeeds without dispatching to backend
    expect(res.success).toBe(true);
  });

  it("should accept valid submission data", async () => {
    const formData = new FormData();
    formData.append("fullName", "Alice Johnson");
    formData.append("email", "alice@enterprise.com");
    formData.append("projectType", "Full-Stack Application");
    formData.append("budgetRange", "$5k - $10k");
    formData.append("projectDescription", "We need a robust enterprise dashboard built with Next.js and Supabase.");

    const res = await submitContactAction(null, formData);
    expect(res.success).toBe(true);
    expect(res.message).toContain("received");
  });
});
