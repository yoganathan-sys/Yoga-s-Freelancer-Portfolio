import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/lib/projects";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoganathan.dev";
  const projects = await getPublishedProjects();

  const xmlUrls = projects
    .map(
      (p) => `
  <url>
    <loc>${baseUrl}/projects/${p.slug}</loc>
    <lastmod>${new Date(p.updated_at || p.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${xmlUrls}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
