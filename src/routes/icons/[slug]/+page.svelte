<script lang="ts">
  import IconCard from "$lib-docs/components/icon-card.svelte";
  import CliBlock from "$lib-docs/components/cli-block.svelte";
  import SimilarIcons from "$lib-docs/components/similar-icons.svelte";
  import ArrowLeft from "$lib/icons/arrow-left.svelte";
  import { LINK, SITE } from "$lib-docs/constants";
  import { JsonLd, MetaTags } from "svelte-meta-tags";

  let props = $props<{
    data: { icon: { name: string; keywords: string[] } };
  }>();

  const kebabToPascal = (value: string) =>
    value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

  let icon = $derived(props.data?.icon ?? { name: "", keywords: [] });

  let iconName = $derived(icon.name ?? "");
  let keywords = $derived(Array.isArray(icon.keywords) ? icon.keywords : []);
  let pascalName = $derived(iconName ? kebabToPascal(iconName) : "");
  let displayName = $derived(pascalName || "Icon");
  let description = $derived(
    keywords.length > 0
      ? `Free animated ${iconName} icon for Svelte. Smooth animations, copy-paste ready. Keywords: ${keywords.slice(0, 5).join(", ")}.`
      : `Free animated ${iconName} icon for Svelte. Smooth animations, copy-paste ready.`
  );
  let pageTitle = $derived(`${displayName} Icon - Animated Icon for Svelte`);
  let canonicalUrl = $derived(
    iconName ? `${SITE.URL}/icons/${iconName}` : `${SITE.URL}/icons`
  );
  let metaKeywords = $derived([
    ...keywords,
    "animated icon",
    "svelte icon",
    "css animation icon",
    `${iconName} animation`,
    `${iconName} svelte`,
  ]);
  let isBackLinkHovered = $state(false);
  const ogImageUrl = `${SITE.URL}${SITE.OG_IMAGE}`;
</script>

<MetaTags
  title={pageTitle}
  description={description}
  canonical={canonicalUrl}
  keywords={metaKeywords}
  openGraph={{
    type: "website",
    url: canonicalUrl,
    title: pageTitle,
    description,
    siteName: SITE.NAME,
    images: [
      {
        url: ogImageUrl,
        alt: `${displayName} icon preview`,
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image",
    site: SITE.AUTHOR.TWITTER,
    title: pageTitle,
    description,
    image: ogImageUrl,
    imageAlt: `${displayName} icon preview`,
  }}
/>
<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Icons",
        item: `${SITE.URL}/icons`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: displayName,
        item: `${SITE.URL}/icons/${iconName}`,
      },
    ],
  }}
/>
<JsonLd
  schema={{
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: pascalName,
    description: `Animated ${iconName} icon component for Svelte`,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "Svelte"],
    license: LINK.LICENSE,
    isPartOf: {
      "@type": "SoftwareSourceCode",
      name: SITE.NAME,
      url: SITE.URL,
    },
    keywords: keywords.join(", "),
  }}
/>

<section class="flex min-h-[calc(100vh-var(--header-height))] flex-col">
  <div
    class="view-container flex flex-col items-start border-neutral-200 py-12 xl:border-x xl:pb-4 min-[880px]:pt-[60px] dark:border-neutral-800"
  >
    <a
      class="mb-8 flex items-center gap-2 font-sans text-secondary text-sm transition-[color] duration-100 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
      href="/"
      onblur={() => (isBackLinkHovered = false)}
      onfocus={() => (isBackLinkHovered = true)}
      onmouseenter={() => (isBackLinkHovered = true)}
      onmouseleave={() => (isBackLinkHovered = false)}
    >
      <ArrowLeft
        animate={isBackLinkHovered}
        aria-hidden="true"
        class="size-4"
        size={16}
      />
      Back to all icons
    </a>

    <div
      class="flex w-full flex-col gap-6 min-[880px]:flex-row min-[880px]:items-center"
    >
      <IconCard
        name={iconName}
        size={48}
        actionsAlwaysVisible={true}
        showTitle={false}
        cardClassName="w-full min-[880px]:w-[200px]"
        iconClassName="flex items-center justify-center [&>svg]:size-12 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
      />

      <div class="flex h-full flex-col gap-1">
        <h1 class="font-sans text-[28px] min-[640px]:text-[36px]">
          {pascalName}
        </h1>
        <p class="font-mono text-secondary text-sm">
          Animated {iconName.replace(/-/g, " ")} icon for Svelte
        </p>
        <CliBlock
          className="mt-7 hidden px-0 min-[880px]:flex"
          staticIconName={iconName}
        />
      </div>
    </div>

    <CliBlock
      className="mt-8 flex px-0 min-[880px]:hidden"
      staticIconName={iconName}
    />
  </div>

  <div
    class="view-container border-neutral-200 py-4 xl:border dark:border-neutral-800"
  >
    <h2 class="mb-3 font-sans text-xl">Keywords</h2>
    <div class="flex flex-wrap gap-2">
      {#each keywords as keyword, index}
        <span
          class="supports-[corner-shape:squircle]:corner-squircle rounded-[12px] bg-neutral-200 px-3 py-1 font-mono text-secondary text-sm supports-[corner-shape:squircle]:rounded-[20px] dark:bg-[#262626]"
        >
          {keyword}
        </span>
      {/each}
    </div>
  </div>

  {#if icon.keywords}
    <SimilarIcons currentIcon={icon} />
  {/if}
</section>
