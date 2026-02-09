const SITE = {
  NAME: "heroicons-animated-svelte",
  URL: "https://svelte.heroicons-animated.com",
  OG_IMAGE: "/og.png",
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
    GITHUB: "Aniket-508",
  },
  DESCRIPTION: {
    LONG: "Free open-source library of beautifully animated icons for Svelte. Built with Motion-inspired animations and Heroicons.",
    SHORT:
      "Animated Heroicons for Svelte. Copy-paste ready and fully customizable.",
  },
  KEYWORDS: [
    "animated icons",
    "svelte icons",
    "heroicons",
    "heroicons animated",
    "sveltekit icons",
    "icon library",
    "open source icons",
  ],
} as const;

const LINK = {
  TWITTER: "https://x.com/alaymanguy",
  GITHUB: "https://github.com/heroicons-animated/heroicons-animated-svelte",
  HEROICONS: "https://heroicons.com",
  CSS_ANIMATIONS:
    "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using_CSS_animations",
  MOTION: "https://motion.dev",
  LICENSE:
    "https://github.com/heroicons-animated/heroicons-animated-svelte/blob/main/LICENSE",
  SPONSOR: "https://github.com/sponsors/Aniket-508",
} as const;

const PACKAGE_MANAGER = {
  PNPM: "pnpm",
  NPM: "npm",
  YARN: "yarn",
  BUN: "bun",
} as const;

export { LINK, PACKAGE_MANAGER, SITE };
