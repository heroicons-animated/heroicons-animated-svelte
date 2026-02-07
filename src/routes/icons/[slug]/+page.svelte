<script lang="ts">
  import IconCard from "$lib/components/IconCard.svelte";
  import CliBlock from "$lib/components/CliBlock.svelte";
  import SimilarIcons from "$lib/components/SimilarIcons.svelte";
  import { LINK, SITE } from "$lib/constants";

  let props = $props<{
    data: { icon: { name: string; keywords: string[] } };
  }>();

  const kebabToPascal = (value: string) =>
    `${value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")}Icon`;

  let icon = $state<{ name: string; keywords: string[] }>(
    props.data?.icon ?? { name: "", keywords: [] },
  );

  $effect(() => {
    icon = props.data?.icon ?? { name: "", keywords: [] };
  });

  let iconName = $derived(icon.name ?? "");
  let keywords = $derived(Array.isArray(icon.keywords) ? icon.keywords : []);
  let pascalName = $derived(iconName ? kebabToPascal(iconName) : "");
  let displayName = $derived(pascalName ? pascalName.split("Icon")[0] : "Icon");
  let description = $derived(
    `Free animated ${iconName} icon for Svelte. Smooth animations, copy-paste ready.`,
  );

  let breadcrumbJsonLd = $derived.by(() =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.URL },
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
    }),
  );

  let iconJsonLd = $derived.by(() =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${displayName} Icon`,
      description,
      url: `${SITE.URL}/icons/${iconName}`,
      keywords: [...keywords, "animated icon", "svelte icon"],
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: SITE.NAME,
        url: SITE.URL,
      },
    }),
  );
</script>

<svelte:head>
  <title>{displayName} Icon - Animated Icon for Svelte</title>
  <meta name="description" content={description} />
  <meta
    name="keywords"
    content={[...keywords, "animated icon", "svelte icon"].join(", ")}
  />
  <link rel="canonical" href={`${SITE.URL}/icons/${iconName}`} />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content={`${displayName} Icon - Animated Icon for Svelte`}
  />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={`${SITE.URL}/icons/${iconName}`} />
  <meta property="og:image" content={`${SITE.URL}${SITE.OG_IMAGE}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={SITE.AUTHOR.TWITTER} />
  <meta
    name="twitter:title"
    content={`${displayName} Icon - Animated Icon for Svelte`}
  />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${SITE.URL}${SITE.OG_IMAGE}`} />
  <script type="application/ld+json">
{@html breadcrumbJsonLd}
  </script>
  <script type="application/ld+json">
{@html iconJsonLd}
  </script>
</svelte:head>

<section class="flex min-h-[calc(100vh-var(--header-height))] flex-col">
  <div
    class="view-container flex flex-col items-start border-neutral-200 py-12 xl:border-x xl:pb-4 min-[880px]:pt-[60px] dark:border-neutral-800"
  >
    <a
      class="mb-8 flex items-center gap-2 font-sans text-secondary text-sm transition-[color] duration-100 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
      href="/"
    >
      <svg
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
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
