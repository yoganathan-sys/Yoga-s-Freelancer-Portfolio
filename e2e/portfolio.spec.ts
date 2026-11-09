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

    // Verify YouTube social link in Hero
    const heroYouTubeBtn = page.locator('#home a[href="https://www.youtube.com/@yogasstudyzone"]');
    await expect(heroYouTubeBtn).toBeVisible();
    await expect(heroYouTubeBtn).toHaveAttribute("target", "_blank");
    await expect(heroYouTubeBtn).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("should have functional navigation links including Resume", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "About Me" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Portfolio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Resume" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Process" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("should have functional resume buttons in About Me and navigate to /resume", async ({ page }) => {
    await page.goto("/#about");

    const aboutSection = page.locator("#about");
    const downloadBtn = aboutSection.getByRole("link", { name: /Download Resume/i });
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute("href", "/resume.pdf");

    // Verify YouTube channel link button in About section
    const aboutYouTubeBtn = aboutSection.getByRole("link", { name: /Visit My YouTube Channel/i });
    await expect(aboutYouTubeBtn).toBeVisible();
    await expect(aboutYouTubeBtn).toHaveAttribute("href", "https://www.youtube.com/@yogasstudyzone");
    await expect(aboutYouTubeBtn).toHaveAttribute("target", "_blank");

    const viewResumeBtn = aboutSection.getByRole("link", { name: /View Resume/i });
    await expect(viewResumeBtn).toBeVisible();
    await Promise.all([
      page.waitForURL("**/resume"),
      viewResumeBtn.click(),
    ]);

    // Verify /resume page content
    await expect(page.locator("h1")).toContainText("YOGANATHAN A", { timeout: 15000 });
    await expect(page.getByText("FRONTEND DEVELOPER | WEB DEVELOPER | B.TECH IT STUDENT")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional Summary" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Technical Skills" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured Projects" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Education" })).toBeVisible();

    // Verify 3 resume projects
    await expect(page.getByText("Yoga's Parking System")).toBeVisible();
    await expect(page.getByText("Medical Shop Website")).toBeVisible();
    await expect(page.getByText("Code Time & Space Analyzer")).toBeVisible();

    // Verify education
    await expect(page.getByText("Bachelor of Technology (B.Tech) in Information Technology")).toBeVisible();
    await expect(page.getByText("Degree In Progress")).toBeVisible();

    // Verify footer resume link
    const footerResumeLink = page.locator("footer").getByRole("link", { name: /Download Resume/i });
    await expect(footerResumeLink).toBeVisible();
    await expect(footerResumeLink).toHaveAttribute("href", "/resume.pdf");
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

  test("should display exactly two verified client projects with live links and filter by Web Application", async ({ page }) => {
    await page.goto("/#portfolio");

    // Click 'Web Application'
    await page.getByRole("button", { name: "Web Application" }).click();

    // Verify both client projects are displayed
    await expect(page.getByText("RO Water Website").first()).toBeVisible();
    await expect(page.getByText("Medical Shop Website").first()).toBeVisible();

    // Verify both Live Website buttons with correct external URLs
    const roLiveBtn = page.locator('a[href="https://ro-water-rouge.vercel.app/"]').first();
    await expect(roLiveBtn).toBeVisible();
    await expect(roLiveBtn).toHaveAttribute("target", "_blank");
    await expect(roLiveBtn).toHaveAttribute("rel", "noopener noreferrer");

    const medLiveBtn = page.locator('a[href="https://medical-project-wine-one.vercel.app/"]').first();
    await expect(medLiveBtn).toBeVisible();
    await expect(medLiveBtn).toHaveAttribute("target", "_blank");
    await expect(medLiveBtn).toHaveAttribute("rel", "noopener noreferrer");

    // Ensure fake projects are not displayed
    await expect(page.getByText("NexStore")).not.toBeVisible();
    await expect(page.getByText("HealthPulse")).not.toBeVisible();
    await expect(page.getByText("DevFlow")).not.toBeVisible();

    // Navigate to project gallery details
    const firstProjectLink = page.getByRole("link", { name: /Project Gallery/i }).first();
    await expect(firstProjectLink).toBeVisible();
    await Promise.all([
      page.waitForURL("**/projects/**"),
      firstProjectLink.click(),
    ]);

    // Verify detail page
    await expect(page.getByRole("link", { name: "Back to Portfolio" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Technologies Used")).toBeVisible({ timeout: 10000 });
  });

  test("should render video player and open image gallery lightbox on project page", async ({ page }) => {
    await page.goto("/projects/medical-shop-website");

    // Verify video demonstration section
    await expect(page.getByRole("heading", { name: /Medical Shop Website/i }).first()).toBeVisible();
    await expect(page.locator("video")).toBeVisible();

    // Verify gallery and click an image to open lightbox
    const firstGalleryImage = page.locator(".group.cursor-pointer").first();
    await expect(firstGalleryImage).toBeVisible();
    await firstGalleryImage.click();

    // Verify lightbox is open
    await expect(page.getByRole("button", { name: "Close Lightbox" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next Image" })).toBeVisible();

    // Close lightbox
    await page.getByRole("button", { name: "Close Lightbox" }).click();
    await expect(page.getByRole("button", { name: "Close Lightbox" })).not.toBeVisible();
  });

  test("should display 5 contact cards and WhatsApp integration", async ({ page }) => {
    await page.goto("/#contact");

    // Contact cards checks scoped to #contact section
    const contactSection = page.locator("#contact");
    await expect(contactSection.getByText("yoganathan162008@gmail.com").first()).toBeVisible();
    await expect(contactSection.getByText("+91 90252 81363").first()).toBeVisible();
    await expect(contactSection.getByText("Chat with me on WhatsApp")).toBeVisible();
    await expect(contactSection.getByText("Available for Freelance Projects & Contracts")).toBeVisible();
    await expect(contactSection.getByText("Remote / Available Worldwide")).toBeVisible();

    // Verify WhatsApp button presence and link destination
    const waBtn = contactSection.getByRole("link", { name: /Chat directly on WhatsApp/i });
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute("href", /wa\.me\/919025281363/);

    // Verify Location Card is an accessible interactive element
    const locationCard = contactSection.locator('[data-testid="location-card"]');
    await expect(locationCard).toBeVisible();
    await expect(locationCard).toHaveAttribute("type", "button");
    await expect(locationCard).toHaveAttribute("aria-label", /View location on Google Maps/);

    // Verify Social Profiles & Repositories
    const githubBtn = contactSection.getByRole("link", { name: /GitHub/i });
    await expect(githubBtn).toHaveAttribute("href", "https://github.com/yoganathan-sys");

    const contactYouTubeBtn = contactSection.getByRole("link", { name: /YouTube Channel/i });
    await expect(contactYouTubeBtn).toBeVisible();
    await expect(contactYouTubeBtn).toHaveAttribute("href", "https://www.youtube.com/@yogasstudyzone");
    await expect(contactYouTubeBtn).toHaveAttribute("target", "_blank");

    // Verify Footer YouTube link
    const footerYouTubeBtn = page.locator('footer a[aria-label="YouTube Channel"]');
    await expect(footerYouTubeBtn).toBeVisible();
    await expect(footerYouTubeBtn).toHaveAttribute("href", "https://www.youtube.com/@yogasstudyzone");
  });

  test("should render the dedicated YouTube content creator section", async ({ page }) => {
    await page.goto("/#content-creator");

    const creatorSection = page.locator("#content-creator");
    await expect(
      creatorSection.getByRole("heading", { name: "Beyond Development — Sharing Knowledge" })
    ).toBeVisible();
    await expect(creatorSection.getByText("Yoga's Study Zone").first()).toBeVisible();

    const subscribeBtn = creatorSection.getByRole("link", { name: /Subscribe on YouTube/i });
    await expect(subscribeBtn).toBeVisible();
    await expect(subscribeBtn).toHaveAttribute("href", "https://www.youtube.com/@yogasstudyzone");
    await expect(subscribeBtn).toHaveAttribute("target", "_blank");

    const visitBtn = creatorSection.getByRole("link", { name: /Visit Channel/i });
    await expect(visitBtn).toBeVisible();
    await expect(visitBtn).toHaveAttribute("href", "https://www.youtube.com/@yogasstudyzone");
    await expect(visitBtn).toHaveAttribute("target", "_blank");
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
    await page.fill('input[placeholder="e.g. +91 90252 81363"]', "+91 90252 81363");
    await page.fill('textarea[placeholder*="Tell me about your product"]', "Looking to build a custom logistics web application.");
    await page.getByRole("button", { name: "Send Message" }).click();

    // Verify submission confirmation
    await expect(page.getByText("Inquiry Received!")).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText("Thank you! Your project enquiry has been received successfully.")
    ).toBeVisible();
    await expect(
      page.getByText("Continue to WhatsApp to share your project details directly with me.")
    ).toBeVisible();

    // Verify WhatsApp button appears with prefilled URL containing customer details
    const waSubmitBtn = page.getByRole("link", { name: /Send Project Details via WhatsApp/i });
    await expect(waSubmitBtn).toBeVisible();
    await expect(waSubmitBtn).toHaveAttribute("target", "_blank");
    const href = await waSubmitBtn.getAttribute("href");
    expect(href).toContain("wa.me/919025281363?text=");
    const decodedMsg = decodeURIComponent(href!);
    expect(decodedMsg).toContain("David Miller");
    expect(decodedMsg).toContain("david@millertech.com");
    expect(decodedMsg).toContain("+91 90252 81363");
    expect(decodedMsg).toContain("NEW CLIENT PROJECT ENQUIRY");

    // Verify reset button "Submit Another Enquiry"
    const resetBtn = page.getByRole("button", { name: /Submit Another Enquiry/i });
    await expect(resetBtn).toBeVisible();
  });

  test("should render the admin login page and allow inspecting client inquiries with email status badges", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: "Admin Authentication" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In to Dashboard" })).toBeVisible();

    // Login using preview admin credentials
    await page.fill('input[type="email"]', "admin@example.com");
    await page.fill('input[type="password"]', "admin123");
    await page.getByRole("button", { name: "Sign In to Dashboard" }).click();

    // Navigate to /admin/messages
    await page.goto("/admin/messages");
    await expect(page.getByRole("heading", { name: "Client Inquiries" })).toBeVisible({ timeout: 10000 });

    // Verify email status badges are rendered (e.g. Email Sent, Email Failed, or Email Pending)
    const emailBadge = page.getByText(/Email (Sent|Failed|Pending)/i).first();
    await expect(emailBadge).toBeVisible();
  });

  test("should handle location card click and open Google Maps with geolocation", async ({ context, page }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 13.0827, longitude: 80.2707 });

    await page.goto("/#contact");
    const contactSection = page.locator("#contact");
    const locationCard = contactSection.locator('[data-testid="location-card"]');
    await expect(locationCard).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      locationCard.click(),
    ]);

    await newPage.waitForURL(/google\.com\/maps/, { timeout: 10000 });
    expect(newPage.url()).toContain("13.0827");
    expect(newPage.url()).toContain("80.2707");
    await newPage.close();
  });

  test("should handle geolocation permission denial and show fallback Google Maps link", async ({ context, page }) => {
    await context.clearPermissions();

    await page.goto("/#contact");
    const contactSection = page.locator("#contact");

    // Mock geolocation to simulate immediate permission denial
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.geolocation.getCurrentPosition = (success, error) => {
        if (error) {
          // @ts-ignore
          error({
            code: 1,
            message: "User denied Geolocation",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          });
        }
      };
    });

    await page.reload();
    const locationCard = contactSection.locator('[data-testid="location-card"]');
    await locationCard.click();

    // Verify permission denied message appears
    await expect(
      page.getByText("Location permission denied. Opening the saved Google Maps location instead.")
    ).toBeVisible({ timeout: 5000 });

    // Verify working fallback button
    const fallbackLink = page.getByRole("link", { name: "Open saved Google Maps location" });
    await expect(fallbackLink).toBeVisible();
    await expect(fallbackLink).toHaveAttribute("href", "https://maps.app.goo.gl/tpTi2YUs5Q9t15F67");
  });

  test("should handle position unavailable error with descriptive feedback", async ({ page }) => {
    await page.goto("/#contact");
    const contactSection = page.locator("#contact");

    // Mock geolocation to simulate position unavailable (code: 2)
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.geolocation.getCurrentPosition = (success, error) => {
        if (error) {
          // @ts-ignore
          error({
            code: 2,
            message: "Position unavailable",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          });
        }
      };
    });

    await page.reload();
    const locationCard = contactSection.locator('[data-testid="location-card"]');
    await locationCard.click();

    await expect(
      page.getByText("Unable to detect your location. Please try again.")
    ).toBeVisible({ timeout: 5000 });
  });

  test("should handle geolocation request timeout error with descriptive feedback", async ({ page }) => {
    await page.goto("/#contact");
    const contactSection = page.locator("#contact");

    // Mock geolocation to simulate timeout (code: 3)
    await page.addInitScript(() => {
      // @ts-ignore
      navigator.geolocation.getCurrentPosition = (success, error) => {
        if (error) {
          // @ts-ignore
          error({
            code: 3,
            message: "Timeout expired",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          });
        }
      };
    });

    await page.reload();
    const locationCard = contactSection.locator('[data-testid="location-card"]');
    await locationCard.click();

    await expect(
      page.getByText("Location request timed out. Please try again.")
    ).toBeVisible({ timeout: 5000 });
  });
});
