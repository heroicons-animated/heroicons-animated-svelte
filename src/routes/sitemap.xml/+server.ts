import type { RequestHandler } from "./$types";
import { ICON_MANIFEST } from "$lib-docs/manifest";
import { SITE } from "$lib-docs/constants";

const ICON_CHANGE_FREQUENCY = "monthly";
const ICON_PRIORITY = "0.7";

const STATIC_PAGES = [
  { path: "", changeFrequency: "weekly", priority: "1.0" },
  { path: "/sponsorship", changeFrequency: "monthly", priority: "0.5" },
] as const;

function toAbsoluteUrl(path: string): string {
  return path ? `${SITE.URL}${path}` : SITE.URL;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createUrlNode(
  loc: string,
  lastModified: string,
  changeFrequency: string,
  priority: string
): string {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export const GET: RequestHandler = () => {
  const lastModified = new Date().toISOString();

  const staticEntries = STATIC_PAGES.map((page) =>
    createUrlNode(
      toAbsoluteUrl(page.path),
      lastModified,
      page.changeFrequency,
      page.priority
    )
  );

  const iconEntries = ICON_MANIFEST.map((icon) =>
    createUrlNode(
      `${SITE.URL}/icons/${icon.name}`,
      lastModified,
      ICON_CHANGE_FREQUENCY,
      ICON_PRIORITY
    )
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...iconEntries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
};
