<script lang="ts">
  import { LINK, SITE } from "$lib-docs/constants";
  import CliBlock from "$lib-docs/components/cli-block.svelte";
  import CommentBlock from "$lib-docs/components/comment-block.svelte";
  import IconsList from "$lib-docs/components/icons-list.svelte";
  import { ICON_MANIFEST } from "$lib-docs/manifest";
  import { MetaTags } from "svelte-meta-tags";

  let { data } = $props<{ data: { initialSearch: string } }>();

  const metaTitle = `${SITE.NAME} | Free Animated Heroicons for Svelte`;
  const ogImageAlt = `${SITE.NAME} - Animated Heroicons Library for Svelte`;
  const ogImageUrl = `${SITE.URL}${SITE.OG_IMAGE}`;
</script>

<MetaTags
  title={metaTitle}
  description={SITE.DESCRIPTION.SHORT}
  canonical={SITE.URL}
  keywords={[...SITE.KEYWORDS]}
  openGraph={{
    type: "website",
    url: SITE.URL,
    title: metaTitle,
    description: SITE.DESCRIPTION.SHORT,
    siteName: SITE.NAME,
    images: [
      {
        url: ogImageUrl,
        alt: ogImageAlt,
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image",
    site: SITE.AUTHOR.TWITTER,
    title: metaTitle,
    description: SITE.DESCRIPTION.SHORT,
    image: ogImageUrl,
    imageAlt: ogImageAlt,
  }}
  additionalMetaTags={[{ name: "theme-color", content: "#f5f5f5" }]}
/>

<section
  class="view-container flex flex-col items-center justify-center border-neutral-200 px-0 pt-[60px] xl:border-x dark:border-neutral-800"
  id="hero"
>
  <h1 class="px-4 text-center font-pixel text-[32px] min-[640px]:text-[42px]">
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
    </a>) collection of smooth animated <br>
    316 icons for your projects. feel free to use them, share your feedback, and
    let's make this library awesome together!
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
  <IconsList initialSearch={data.initialSearch} />
</section>
