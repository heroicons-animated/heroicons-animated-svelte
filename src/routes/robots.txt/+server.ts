import type { RequestHandler } from "./$types";
import { SITE } from "$lib/constants";

const ROBOTS_LINES = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${SITE.URL}/sitemap.xml`,
];

export const GET: RequestHandler = () => {
  return new Response(ROBOTS_LINES.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
};
