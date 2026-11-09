import fs from "fs";
import path from "path";
import { PORTFOLIO_MEDIA_MANIFEST } from "../lib/media-manifest";

/**
 * Build-time asset validation script
 * Verifies that every local media asset referenced in PORTFOLIO_MEDIA_MANIFEST exists on disk
 * and matches exact filename casing before production deployment.
 */

function validateAssets() {
  console.log("🔍 [Asset Validation] Starting portfolio asset verification...");
  const publicDir = path.resolve(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ [Asset Validation] Error: public directory not found at: ${publicDir}`);
    process.exit(1);
  }

  let totalChecked = 0;
  let errorCount = 0;
  const projectSlugs = Object.keys(PORTFOLIO_MEDIA_MANIFEST);

  for (const slug of projectSlugs) {
    const project = PORTFOLIO_MEDIA_MANIFEST[slug];
    console.log(`\n📁 Validating assets for project: "${project.title}" (${slug})`);

    // 1. Verify Cover Image
    const coverRel = project.coverImage.startsWith("/")
      ? project.coverImage.slice(1)
      : project.coverImage;
    const coverFullPath = path.join(publicDir, coverRel);

    totalChecked++;
    if (!fs.existsSync(coverFullPath)) {
      console.error(`  ❌ MISSING COVER IMAGE: ${project.coverImage} -> ${coverFullPath}`);
      errorCount++;
    } else {
      // Check exact casing in directory
      const dir = path.dirname(coverFullPath);
      const base = path.basename(coverFullPath);
      const actualFiles = fs.readdirSync(dir);
      if (!actualFiles.includes(base)) {
        console.error(`  ⚠️ CASING MISMATCH for cover image: expected "${base}", found in dir:`, actualFiles);
        errorCount++;
      } else {
        const stats = fs.statSync(coverFullPath);
        console.log(`  ✓ Cover Image OK: ${project.coverImage} (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    }

    // 2. Verify Gallery Images
    for (const item of project.galleryImages) {
      totalChecked++;
      const itemRel = item.publicPath.startsWith("/")
        ? item.publicPath.slice(1)
        : item.publicPath;
      const itemFullPath = path.join(publicDir, itemRel);

      if (!fs.existsSync(itemFullPath)) {
        console.error(`  ❌ MISSING GALLERY IMAGE [${item.id}]: ${item.publicPath} -> ${itemFullPath}`);
        errorCount++;
      } else {
        const dir = path.dirname(itemFullPath);
        const base = path.basename(itemFullPath);
        const actualFiles = fs.readdirSync(dir);
        if (!actualFiles.includes(base)) {
          console.error(`  ⚠️ CASING MISMATCH: expected "${base}" in ${dir}`);
          errorCount++;
        } else {
          const stats = fs.statSync(itemFullPath);
          console.log(`  ✓ Gallery Image OK: ${item.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        }
      }
    }

    // 3. Verify Videos
    for (const vid of project.videos) {
      totalChecked++;
      const vidRel = vid.publicPath.startsWith("/")
        ? vid.publicPath.slice(1)
        : vid.publicPath;
      const vidFullPath = path.join(publicDir, vidRel);

      if (!fs.existsSync(vidFullPath)) {
        console.error(`  ❌ MISSING VIDEO [${vid.id}]: ${vid.publicPath} -> ${vidFullPath}`);
        errorCount++;
      } else {
        const dir = path.dirname(vidFullPath);
        const base = path.basename(vidFullPath);
        const actualFiles = fs.readdirSync(dir);
        if (!actualFiles.includes(base)) {
          console.error(`  ⚠️ CASING MISMATCH: expected "${base}" in ${dir}`);
          errorCount++;
        } else {
          const stats = fs.statSync(vidFullPath);
          console.log(`  ✓ Video OK: ${vid.filename} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
        }
      }
    }
  }

  // 4. Verify Profile Photo, Resume & PWA Assets
  const extraAssets = [
    { name: "Profile Photo", path: "images/profile-photo.png" },
    { name: "Resume PDF", path: "resume.pdf" },
    { name: "PWA Icon 192x192", path: "icons/icon-192x192.png" },
    { name: "PWA Icon 512x512", path: "icons/icon-512x512.png" },
    { name: "PWA Maskable Icon 512x512", path: "icons/icon-maskable-512x512.png" },
    { name: "Apple Touch Icon", path: "icons/apple-touch-icon.png" },
    { name: "Favicon 32x32", path: "icons/favicon-32x32.png" },
    { name: "PWA Manifest JSON", path: "manifest.json" },
    { name: "PWA WebManifest", path: "manifest.webmanifest" },
    { name: "Service Worker", path: "sw.js" },
  ];

  for (const asset of extraAssets) {
    totalChecked++;
    const fullPath = path.join(publicDir, asset.path);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ❌ MISSING CORE ASSET [${asset.name}]: ${asset.path}`);
      errorCount++;
    } else {
      console.log(`  ✓ Core Asset OK: ${asset.name} (public/${asset.path})`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 [Asset Validation Summary] Checked ${totalChecked} assets.`);

  if (errorCount > 0) {
    console.error(`❌ Found ${errorCount} missing or misconfigured assets! Exiting with failure.`);
    process.exit(1);
  } else {
    console.log(`✅ All ${totalChecked} portfolio media assets verified successfully!`);
  }
}

validateAssets();

