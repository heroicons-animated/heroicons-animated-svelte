import type { RequestHandler } from "./$types";
import { ICON_MANIFEST } from "$lib-docs/manifest";
import { LINK, SITE } from "$lib-docs/constants";

export const prerender = true;

export const GET: RequestHandler = () => {
  const iconNames = ICON_MANIFEST.map((icon) => icon.name).join(", ");

  const content = `# ${SITE.NAME}

> Beautifully animated Heroicons for Svelte

${SITE.NAME} is an open-source (MIT License) collection of smooth animated ${ICON_MANIFEST.length} icons for Svelte projects.

## Overview

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})

## Packages

| Package | Framework | Animation Engine |
|---------|-----------|------------------|
| @heroicons-animated/svelte | Svelte 5 | CSS Animations |

## Installation

\`\`\`bash
npm install @heroicons-animated/svelte
\`\`\`

\`\`\`svelte
<script>
  import { BeakerIcon } from '@heroicons-animated/svelte'
</script>

<BeakerIcon class="size-6" />
\`\`\`

### Copy-paste via CLI

\`\`\`bash
npx shadcn-svelte@latest add "${SITE.URL}/r/{icon-name}.json"
\`\`\`

Replace {icon-name} with the desired icon name (kebab-case).

## Available Icons (${ICON_MANIFEST.length} total)

${iconNames}

## Icon Page URLs

Each icon has a dedicated page at: ${SITE.URL}/icons/{icon-name}

For example:
- ${SITE.URL}/icons/beaker
- ${SITE.URL}/icons/academic-cap
- ${SITE.URL}/icons/arrow-down

## License

MIT License - free for personal and commercial use.

## Contributing

Contributions welcome! See ${LINK.GITHUB}/blob/main/CONTRIBUTING.md for guidelines.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
