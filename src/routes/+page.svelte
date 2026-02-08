<script lang="ts">
  import { ICON_MANIFEST } from "$lib/manifest";
  import { LINK, SITE } from "$lib/constants";
  import CliBlock from "$lib/components/CliBlock.svelte";
  import CommentBlock from "$lib/components/CommentBlock.svelte";
  import IconsList from "$lib/components/IconsList.svelte";
  import type {
    FAQPage,
    Organization,
    SoftwareSourceCode,
    WebSite,
    WithContext,
  } from "schema-dts";
  const websiteJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.NAME,
    url: SITE.URL,
    description: SITE.DESCRIPTION.LONG,
    inLanguage: "en-US",
  } satisfies WithContext<WebSite>);

  const softwareJsonLd = JSON.stringify({
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
    keywords: SITE.KEYWORDS,
    isAccessibleForFree: true,
    dateModified: new Date().toISOString().split("T")[0],
  } satisfies WithContext<SoftwareSourceCode>);

  const organizationJsonLd = JSON.stringify({
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
  } satisfies WithContext<Organization>);

  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is heroicons-animated-svelte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE.NAME} is a free, open-source library of beautifully animated Svelte icons based on Heroicons.`,
        },
      },
      {
        "@type": "Question",
        name: "How do I install heroicons-animated-svelte icons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use the registry: ${SITE.URL}/r/{icon-name}.json (replace {icon-name} with the icon name in kebab-case).`,
        },
      },
      {
        "@type": "Question",
        name: "Is heroicons-animated-svelte free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE.NAME} is free and open-source under the MIT license.`,
        },
      },
      {
        "@type": "Question",
        name: "What technologies are used in heroicons-animated-svelte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Icons are Svelte components written in TypeScript, based on Heroicons, with motion-inspired animations.`,
        },
      },
    ],
  } satisfies WithContext<FAQPage>);
</script>

<svelte:head>
  <title>heroicons-animated | Animated Heroicons for Svelte</title>
  <meta name="description" content={SITE.DESCRIPTION.SHORT} />
  <meta name="keywords" content={SITE.KEYWORDS.join(", ")} />
  <meta name="theme-color" content="#f5f5f5" />
  <link rel="canonical" href={SITE.URL} />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="heroicons-animated | Animated Heroicons for Svelte"
  />
  <meta property="og:description" content={SITE.DESCRIPTION.SHORT} />
  <meta property="og:url" content={SITE.URL} />
  <meta property="og:image" content={`${SITE.URL}${SITE.OG_IMAGE}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={SITE.AUTHOR.TWITTER} />
  <meta
    name="twitter:title"
    content="heroicons-animated | Animated Heroicons for Svelte"
  />
  <meta name="twitter:description" content={SITE.DESCRIPTION.SHORT} />
  <meta name="twitter:image" content={`${SITE.URL}${SITE.OG_IMAGE}`} />
  <script type="application/ld+json">
{@html websiteJsonLd}
  </script>
  <script type="application/ld+json">
{@html softwareJsonLd}
  </script>
  <script type="application/ld+json">
{@html organizationJsonLd}
  </script>
  <script type="application/ld+json">
{@html faqJsonLd}
  </script>
</svelte:head>

<section
  class="view-container flex flex-col items-center justify-center border-neutral-200 px-0 pt-[60px] xl:border-x dark:border-neutral-800"
  id="hero"
>
  <h1 class="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
    Beautifully animated heroicons for Svelte<span class="text-primary">^</span>
  </h1>
  <p
    class="mt-5 max-w-[582px] px-4 text-center font-mono text-secondary text-sm"
  >
    an open-source (<a
      class="underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 hover:decoration-primary focus-visible:outline-1 focus-visible:outline-primary"
      href={`${LINK.GITHUB}/blob/main/LICENSE`}
      rel="noopener noreferrer"
      tabindex="0"
      target="_blank"
    >
      MIT License
    </a>) collection of smooth animated <br />
    316 icons for your projects. built with CSS animations and Heroicons.
  </p>
  <p class="mt-4 font-mono text-secondary text-xs min-[640px]:text-sm">
    Crafted with
    <a
      class="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
      href={LINK.CSS_ANIMATIONS}
      rel="noopener noreferrer"
      tabindex="0"
      target="_blank"
    >
      CSS Animations
    </a>
    &
    <a
      class="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
      href={LINK.HEROICONS}
      rel="noopener noreferrer"
      tabindex="0"
      target="_blank"
    >
      Heroicons
    </a>
  </p>
  <CliBlock icons={ICON_MANIFEST} />
  <CommentBlock />
</section>
<section id="icons">
  <IconsList />
</section>
