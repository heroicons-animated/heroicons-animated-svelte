import type { RequestHandler } from "./$types";
import { LINK } from "$lib/constants";

export const GET: RequestHandler = () => {
  return new Response(null, {
    status: 307,
    headers: {
      location: LINK.SPONSOR,
      "cache-control": "public, max-age=300",
    },
  });
};
