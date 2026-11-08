import { test, expect } from "@playwright/test";

test.describe("Portfolio Homepage User Journeys", () => {
  test("should render the split-screen hero with Yoganathan A branding", async ({ page }) => {
    await page.goto("/");

    // Verify main headings
    await expect(page.locator("h1")).toContainText("YOGANATHAN A");
    await expect(page.getByText("Full-Stack Developer | Web & Mobile App Developer")).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore My Work" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Let's Work Together" })).toBeVisible();

    // Verify CONTACT ME button
    await expect(page.getByRole("link", { name: "CONTACT ME" })).toBeVisible();
  });

  test("should have functional navigation links", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "About Me" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Portfolio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Process" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("should display 6 services cards", async ({ page }) => {
    await page.goto("/#services");
    await expect(page.getByRole("heading", { name: "Web Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mobile App Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Full-Stack Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "UI/UX Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Database Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Deployment & Maintenance" })).toBeVisible();
  });

  test("should filter skills by category", async ({ page }) => {
    await page.goto("/#skills");
    // Click 'Mobile' category
    await page.getByRole("button", { name: "Mobile", exact: true }).click();
    await expect(page.getByRole("heading", { name: "React Native" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Expo" })).toBeVisible();
  });

  test("should display published projects and navigate to project details", async ({ page }) => {
    await page.goto("/#portfolio");

    // Click 'Full-Stack Projects'
    await page.getByRole("button", { name: "Full-Stack Projects" }).click();

    // View project button
    const firstProjectLink = page.getByRole("link", { name: "View Project" }).first();
    await expect(firstProjectLink).toBeVisible();
    await firstProjectLink.click();
    await page.waitForURL("**/projects/**");

    // Verify detail page
    await expect(page.getByRole("link", { name: "Back to Portfolio" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Technologies Used")).toBeVisible({ timeout: 10000 });
  });

  test("should validate contact form submission", async ({ page }) => {
    await page.goto("/#contact");

    // Attempt submitting empty form
    await page.getByRole("button", { name: "Send Message" }).click();

    // Check error message
    await expect(page.getByText("Full name must be at least 2 characters.")).toBeVisible();

    // Fill valid form
    await page.fill('input[placeholder="e.g. John Doe"]', "David Miller");
    await page.fill('input[placeholder="e.g. john@company.com"]', "david@millertech.com");
    await page.fill('textarea[placeholder*="Tell me about your product"]', "Looking to build a custom logistics web application.");
    await page.getByRole("button", { name: "Send Message" }).click();

    // Verify submission confirmation
    await expect(page.getByText("Inquiry Received!")).toBeVisible({ timeout: 10000 });
  });

  test("should render the admin login page", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: "Admin Authentication" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In to Dashboard" })).toBeVisible();
  });
});
