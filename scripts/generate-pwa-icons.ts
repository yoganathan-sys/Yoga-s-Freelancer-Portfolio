import fs from "fs";
import path from "path";
import { chromium } from "@playwright/test";

/**
 * Script to generate high-resolution, pixel-perfect PWA icons
 * using Playwright Chromium renderer for optimal antialiasing and crisp typography.
 */
async function generatePwaIcons() {
  const iconsDir = path.resolve(process.cwd(), "public", "icons");
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log("🎨 Launching Chromium to generate authentic YA PWA icons...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  // 1. Generate SVG Icon
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="100" fill="#000000"/>
    <rect x="16" y="16" width="480" height="480" rx="84" fill="none" stroke="#27272a" stroke-width="8"/>
    <g font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif" font-weight="900" font-size="230" letter-spacing="4" text-anchor="middle" dominant-baseline="central">
      <text x="180" y="260" fill="#FFFFFF">Y</text>
      <text x="325" y="260" fill="#3B82F6">A</text>
    </g>
    <circle cx="395" cy="180" r="14" fill="#3B82F6"/>
  </svg>`;
  fs.writeFileSync(path.join(iconsDir, "icon.svg"), svgContent);

  // Helper to render HTML in page and screenshot
  async function renderAndCapture(size: number, isMaskable: boolean, outputPath: string) {
    const padding = isMaskable ? Math.round(size * 0.15) : 0;
    const borderRadius = isMaskable ? "0px" : `${Math.round(size * 0.18)}px`;
    const fontSize = Math.round((size - padding * 2) * 0.48);
    const dotSize = Math.round(fontSize * 0.08);

    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${size}px;
            height: ${size}px;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .container {
            width: ${size}px;
            height: ${size}px;
            background: #000000;
            border-radius: ${borderRadius};
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: ${isMaskable ? "none" : `${Math.max(1, Math.round(size * 0.015))}px solid #27272a`};
          }
          .logo-text {
            font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 900;
            font-size: ${fontSize}px;
            line-height: 1;
            letter-spacing: ${Math.round(fontSize * 0.02)}px;
            display: flex;
            align-items: center;
            position: relative;
          }
          .y { color: #FFFFFF; }
          .a { color: #3B82F6; margin-left: ${Math.round(fontSize * 0.04)}px; }
          .dot {
            position: absolute;
            top: -${Math.round(fontSize * 0.05)}px;
            right: -${Math.round(fontSize * 0.1)}px;
            width: ${dotSize}px;
            height: ${dotSize}px;
            background-color: #3B82F6;
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo-text">
            <span class="y">Y</span>
            <span class="a">A</span>
            <div class="dot"></div>
          </div>
        </div>
      </body>
    </html>`;

    await page.setViewportSize({ width: size, height: size });
    await page.setContent(html);
    await page.screenshot({ path: outputPath, type: "png" });
    console.log(`  ✓ Generated: ${path.basename(outputPath)} (${size}x${size})`);
  }

  // Generate required icons
  await renderAndCapture(192, false, path.join(iconsDir, "icon-192x192.png"));
  await renderAndCapture(512, false, path.join(iconsDir, "icon-512x512.png"));
  await renderAndCapture(512, true, path.join(iconsDir, "icon-maskable-512x512.png"));
  await renderAndCapture(180, false, path.join(iconsDir, "apple-touch-icon.png"));
  await renderAndCapture(32, false, path.join(iconsDir, "favicon-32x32.png"));

  await browser.close();
  console.log("✅ All PWA icons generated successfully in public/icons/\n");
}

generatePwaIcons().catch((err) => {
  console.error("Failed to generate PWA icons:", err);
  process.exit(1);
});

