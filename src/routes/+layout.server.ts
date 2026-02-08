import type { LayoutServerLoad } from "./$types";

const REPO_API =
  "https://api.github.com/repos/heroicons-animated/heroicons-animated-svelte";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 1 day

let cachedStars: number | null = null;
let cachedAt = 0;

export const load: LayoutServerLoad = async ({ fetch }) => {
  const now = Date.now();
  if (cachedAt && now - cachedAt < CACHE_TTL_MS) {
    return { githubStars: cachedStars };
  }

  try {
    const response = await fetch(REPO_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "heroicons-animated-svelte",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (typeof data?.stargazers_count === "number") {
        cachedStars = data.stargazers_count;
        cachedAt = now;
      }
    }
  } catch {
    // ignore
  }

  return { githubStars: cachedStars };
};
