import type { Handle } from "@sveltejs/kit";
import { generateMarkdown } from "$lib-docs/llms-md";

export const handle: Handle = ({ event, resolve }) => {
  const pathname = event.url.pathname;

  if (pathname.endsWith(".md") && event.request.method === "GET") {
    const { content, status } = generateMarkdown(pathname);

    return new Response(content, {
      status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  }

  return resolve(event);
};
