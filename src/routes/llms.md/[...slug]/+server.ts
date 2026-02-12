import { generateMarkdown } from "$lib-docs/llms-md";
import type { RequestHandler } from "./$types";

export const prerender = false;

export const GET: RequestHandler = async ({ params }) => {
  const slugParam = await params;
  const slug = slugParam?.slug;

  const pathname =
    !slug || slug.length === 0
      ? "/llms.md"
      : `/llms.md/${Array.isArray(slug) ? slug.join("/") : slug}`;

  const { content, status } = generateMarkdown(pathname);

  return new Response(content, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
