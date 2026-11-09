import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
describe("PWA Web App Manifest & Assets", () => {
  it("should generate a compliant PWA manifest with correct branding", () => {
    const manifestPath = path.resolve(process.cwd(), "public", "manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);
    const data = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(data.name).toBe("Yoganathan A — Developer Portfolio");
    expect(data.short_name).toBe("Yoganathan");
    expect(data.start_url).toBe("/");
    expect(data.scope).toBe("/");
    expect(data.display).toBe("standalone");
    expect(data.orientation).toBe("portrait");
    expect(data.background_color).toBe("#FFFFFF");
    expect(data.theme_color).toBe("#000000");
    expect(data.prefer_related_applications).toBe(false);

    // Verify icons array
    expect(data.icons).toBeDefined();
    expect(data.icons?.length).toBeGreaterThanOrEqual(4);

    const icon192 = data.icons?.find((i) => i.sizes === "192x192");
    expect(icon192).toBeDefined();
    expect(icon192?.src).toBe("/icons/icon-192x192.png");

    const icon512 = data.icons?.find((i) => i.sizes === "512x512" && i.purpose === "any");
    expect(icon512).toBeDefined();
    expect(icon512?.src).toBe("/icons/icon-512x512.png");

    const maskable512 = data.icons?.find((i) => i.sizes === "512x512" && i.purpose === "maskable");
    expect(maskable512).toBeDefined();
    expect(maskable512?.src).toBe("/icons/icon-maskable-512x512.png");

    const appleIcon = data.icons?.find((i) => i.sizes === "180x180");
    expect(appleIcon).toBeDefined();
    expect(appleIcon?.src).toBe("/icons/apple-touch-icon.png");
  });

  it("should ensure all declared PWA icon files physically exist on disk", () => {
    const iconsDir = path.resolve(process.cwd(), "public", "icons");
    expect(fs.existsSync(iconsDir)).toBe(true);

    const requiredIcons = [
      "icon-192x192.png",
      "icon-512x512.png",
      "icon-maskable-512x512.png",
      "apple-touch-icon.png",
      "favicon-32x32.png",
      "icon.svg",
    ];

    for (const icon of requiredIcons) {
      const fullPath = path.join(iconsDir, icon);
      expect(fs.existsSync(fullPath)).toBe(true);
      const stat = fs.statSync(fullPath);
      expect(stat.size).toBeGreaterThan(0);
    }
  });

  it("should have a valid production service worker in public/sw.js", () => {
    const swPath = path.resolve(process.cwd(), "public", "sw.js");
    expect(fs.existsSync(swPath)).toBe(true);
    const content = fs.readFileSync(swPath, "utf-8");

    // Strict security & operational rules
    expect(content).toContain("yoganathan-pwa-v1");
    expect(content).toContain("/offline");
    expect(content).toContain("supabase.co");
    expect(content).toContain("/api/");
    expect(content).toContain("/admin");
    expect(content).toContain("request.method !== \"GET\"");
  });
});

