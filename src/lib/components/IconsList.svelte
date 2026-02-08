<script lang="ts">
  import Fuse from "fuse.js";
  import { ICON_MANIFEST } from "$lib/manifest";
  import SearchInput from "$lib/components/SearchInput.svelte";
  import IconCard from "$lib/components/IconCard.svelte";

  let query = $state("");
  let filteredIcons = $state(ICON_MANIFEST);

  const fuse = new Fuse(ICON_MANIFEST, {
    keys: [
      { name: "name", weight: 3 },
      { name: "keywords", weight: 2 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
    findAllMatches: true,
    isCaseSensitive: false,
    minMatchCharLength: 2,
  });

  $effect(() => {
    if (!query.trim()) {
      filteredIcons = ICON_MANIFEST;
      return;
    }
    filteredIcons = fuse.search(query).map((result) => result.item);
  });
</script>

<SearchInput
  bind:value={query}
  resultCount={filteredIcons.length}
  totalCount={ICON_MANIFEST.length}
/>
<div
  class="view-container grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 border-neutral-200 pt-2 pb-[60px] xl:border-x dark:border-neutral-800"
>
  {#if filteredIcons.length === 0}
    <div class="col-span-full pt-10 text-center text-neutral-500 text-sm">
      No icons found
    </div>
  {:else}
    {#each filteredIcons as icon (icon.name)}
      <a
        class="rounded-[20px] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
        href={`/icons/${icon.name}`}
        ><IconCard
          name={icon.name}
          cardClassName="transition-shadow [contain-intrinsic-size:auto_180px] [content-visibility:auto] hover:shadow-sm"
        /></a
      >
    {/each}
  {/if}
</div>
