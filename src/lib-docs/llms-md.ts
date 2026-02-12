import { ICON_MANIFEST } from "$lib-docs/manifest";
import { LINK, SITE } from "$lib-docs/constants";

const LLMS_MD_PREFIX = /^\/llms\.md\/?/;
const LEADING_SLASH = /^\//;

const kebabToPascal = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const getIconBySlug = (slug: string) =>
  ICON_MANIFEST.find((icon) => icon.name === slug);

const getSimilarIcons = (
  currentIcon: (typeof ICON_MANIFEST)[number],
  limit = 5
) => {
  const currentKeywords = new Set(currentIcon.keywords);
  return ICON_MANIFEST.filter((icon) => icon.name !== currentIcon.name)
    .map((icon) => ({
      icon,
      score: icon.keywords.filter((k) => currentKeywords.has(k)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.icon);
};

const generateHomePage = () => {
  const iconsList = ICON_MANIFEST.map(
    (icon) =>
      `- [${icon.name}](${SITE.URL}/icons/${icon.name}) - Keywords: ${icon.keywords.slice(0, 5).join(", ")}`
  ).join("\n");

  return `# ${SITE.NAME} - Home

> Beautifully animated Heroicons for Svelte

## About

${SITE.NAME} is an open-source (MIT License) collection of ${ICON_MANIFEST.length} beautifully animated icons built with CSS animations and Heroicons for Svelte.

## Quick Links

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- License: ${LINK.LICENSE}
- Sponsor: ${LINK.SPONSOR}

## Package

- Package: "@heroicons-animated/svelte"
- Peer dependencies: "svelte"
- Supports: Svelte 5

## Installation

\`\`\`bash
npm install @heroicons-animated/svelte
\`\`\`

## Copy-paste via CLI

\`\`\`bash
npx shadcn-svelte@latest add "${SITE.URL}/r/{icon-name}.json"
\`\`\`

Replace {icon-name} with the desired icon name in kebab-case.

## All Icons (${ICON_MANIFEST.length} total)

${iconsList}

## Features

- ${ICON_MANIFEST.length} animated icons
- Svelte support
- Smooth CSS animations
- Fully customizable (size, color via class)
- Tree-shakable imports
- TypeScript support
- MIT licensed
- Copy-paste ready

## Author

${SITE.AUTHOR.NAME} - ${LINK.TWITTER}
`;
};

const generateIconPage = (slug: string) => {
  const icon = getIconBySlug(slug);

  if (!icon) {
    return null;
  }

  const pascalName = kebabToPascal(slug);
  const similarIcons = getSimilarIcons(icon);

  return `# ${pascalName}

> Animated ${icon.name.replace(/-/g, " ")} icon for Svelte

## Overview

- **Name**: ${pascalName}
- **Slug**: ${icon.name}
- **Page URL**: ${SITE.URL}/icons/${slug}
- **License**: MIT

## Keywords

${icon.keywords.map((k) => `- ${k}`).join("\n")}

## Installation

\`\`\`bash
npm install @heroicons-animated/svelte
\`\`\`

\`\`\`svelte
<script>
  import { ${pascalName} } from '@heroicons-animated/svelte'
</script>

<${pascalName} class="size-6" />
\`\`\`

### Copy-paste via CLI

\`\`\`bash
npx shadcn-svelte@latest add "${SITE.URL}/r/${slug}.json"
\`\`\`

## Similar Icons

${similarIcons.length > 0 ? similarIcons.map((i) => `- [${kebabToPascal(i.name)}](${SITE.URL}/icons/${i.name})`).join("\n") : "No similar icons found."}

## Links

- [All Icons](${SITE.URL})
- [GitHub](${LINK.GITHUB})
- [License](${LINK.LICENSE})
`;
};

const generateNotFound = (path: string) => {
  return `# Page Not Found

The page "${path}" was not found.

## Available Pages

- [Home](${SITE.URL})
- [All Icons](${SITE.URL}/#icons)
- [GitHub](${LINK.GITHUB})
`;
};

export function generateMarkdown(pathname: string): {
  content: string;
  status: number;
} {
  let pathToUse = pathname.endsWith(".md") ? pathname.slice(0, -3) : pathname;
  pathToUse = pathToUse.replace(LLMS_MD_PREFIX, "") || "/";

  const segments =
    pathToUse === "" || pathToUse === "/"
      ? []
      : pathToUse.replace(LEADING_SLASH, "").split("/").filter(Boolean);

  if (segments.length === 0 || segments[0] === "page") {
    return { content: generateHomePage(), status: 200 };
  }

  if (segments[0] === "icons" && segments.length === 2) {
    const iconSlug = segments[1];
    const iconContent = generateIconPage(iconSlug);
    if (iconContent) {
      return { content: iconContent, status: 200 };
    }
    return {
      content: generateNotFound(`/icons/${iconSlug}`),
      status: 404,
    };
  }

  return {
    content: generateNotFound(`/${segments.join("/")}`),
    status: 404,
  };
}
