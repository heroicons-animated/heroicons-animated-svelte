<script lang="ts">
  import { ICON_MANIFEST } from "$lib-docs/manifest";
  import { LINK, SITE } from "$lib-docs/constants";
  import { JsonLd } from "svelte-meta-tags";
</script>

<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.NAME,
    url: SITE.URL,
    description: SITE.DESCRIPTION.LONG,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.URL}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }}
/>
<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE.NAME,
    description: SITE.DESCRIPTION.LONG,
    url: SITE.URL,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "Svelte", "JavaScript"],
    runtimePlatform: "Node.js",
    license: LINK.LICENSE,
    author: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    maintainer: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    keywords: SITE.KEYWORDS.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    dateModified: new Date().toISOString().split("T")[0],
    numberOfItems: ICON_MANIFEST.length,
  }}
/>
<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.NAME,
    url: SITE.URL,
    logo: `${SITE.URL}${SITE.OG_IMAGE}`,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    founder: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
  }}
/>
<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${SITE.NAME}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE.NAME} is a free, open-source library of 316 beautifully crafted animated Svelte icons. Built with CSS animations and based on Heroicons.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I install ${SITE.NAME} icons?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can install icons using npx shadcn-svelte@latest add "${SITE.URL}/r/{icon-name}.json". Replace {icon-name} with the desired icon name in kebab-case.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${SITE.NAME} free to use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! ${SITE.NAME} is completely free and open-source under the MIT license. You can use it for personal and commercial projects.`,
        },
      },
      {
        "@type": "Question",
        name: `What technologies are used in ${SITE.NAME}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE.NAME} icons are Svelte components written in TypeScript. Animations are powered by CSS, and the icons are based on Heroicons.`,
        },
      },
    ],
  }}
/>
