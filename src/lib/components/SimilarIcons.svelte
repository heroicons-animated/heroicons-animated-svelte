<script lang="ts">
  import { ICON_MANIFEST } from "$lib/manifest";
  import IconCard from "$lib/components/IconCard.svelte";

  let props = $props<{ currentIcon: { name: string; keywords: string[] } }>();

  let similarIcons = $derived.by(() => {
    const currentIcon = props.currentIcon;
    if (!currentIcon) {
      return [];
    }

    const currentKeywords = new Set(
      Array.isArray(currentIcon.keywords) ? currentIcon.keywords : []
    );

    const scored = ICON_MANIFEST.filter(
      (icon) => icon.name !== currentIcon.name
    )
      .map((icon) => {
        const sharedKeywords = icon.keywords.filter((kw) =>
          currentKeywords.has(kw)
        ).length;
        return { icon, score: sharedKeywords };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return scored.map((item) => item.icon);
  });
</script>

{#if similarIcons.length === 0}
  <div
    class="view-container flex-1 border-neutral-200 pb-[60px] xl:border-x dark:border-neutral-800"
  ></div>
{:else}
  <div
    class="view-container border-neutral-200 pt-12 pb-[60px] xl:border-x xl:pt-4 dark:border-neutral-800"
  >
    <h2 class="mb-4 font-sans text-xl">Similar Icons</h2>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
      {#each similarIcons as icon (icon.name)}
        <a
          class="rounded-[20px] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
          href={`/icons/${icon.name}`}
        >
          <IconCard
            name={icon.name}
            showActions={false}
            cardClassName="pb-[50px] transition-shadow hover:shadow-sm"
          />
        </a>
      {/each}
    </div>
  </div>
{/if}
