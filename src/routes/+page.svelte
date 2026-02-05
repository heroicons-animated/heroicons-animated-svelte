<script lang="ts">
  import IconCard from "$lib/IconCard.svelte";
  import { ICON_MANIFEST } from "$lib/manifest";
  import { LINK, SITE } from "$lib/constants";

  let query = $state("");

  const filteredIcons = $derived(() => {
    const term = query.toLowerCase().trim();
    if (!term) {
      return ICON_MANIFEST;
    }

    const tokens = term.split(/\s+/).filter(Boolean);
    return ICON_MANIFEST.filter((icon) => {
      const haystack = [icon.name, ...icon.keywords].join(" ").toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  });

  const totalCount = ICON_MANIFEST.length;
  const resultCount = $derived(() => filteredIcons.length);
</script>

<svelte:head>
  <title>Heroicons Animated for Svelte</title>
  <meta name="description" content={SITE.DESCRIPTION.SHORT} />
  <meta name="keywords" content={SITE.KEYWORDS.join(", ")} />
  <meta name="theme-color" content="#0f172a" />
</svelte:head>

<main class="page">
  <section class="hero">
    <div class="badges">
      <span class="badge accent">SvelteKit Demo</span>
      <span class="badge">Svelte 5</span>
      <span class="badge">CSS Keyframes</span>
      <span class="badge">MIT Licensed</span>
    </div>
    <h1 class="hero-title">Heroicons Animated for Svelte</h1>
    <p class="hero-subtitle">
      A motion-first icon gallery for Svelte. Hover any icon to see the
      animation and use the registry endpoints to pull components into your own
      stack.
    </p>

    <div class="search-card">
      <input
        bind:value={query}
        class="search-input"
        type="search"
        placeholder="Search icons by name, keyword, or intent"
        aria-label="Search icons"
      />
      <div class="stats">
        <span>{resultCount} of {totalCount} icons</span>
        <span class="code-pill">pnpm add @heroicons-animated/svelte</span>
        <span class="code-pill">/r/registry.json</span>
      </div>
    </div>
  </section>

  <h2 class="section-title">Icon Gallery</h2>

  {#if filteredIcons.length}
    <div class="grid">
      {#each filteredIcons as icon (icon.name)}
        <IconCard name={icon.name} />
      {/each}
    </div>
  {:else}
    <div class="empty">
      No icons matched your search. Try a shorter keyword like "arrow" or
      "check".
    </div>
  {/if}

  <div class="footer">
    <span>Made for SvelteKit.</span>
    <a href={LINK.HEROICONS} target="_blank" rel="noreferrer">Heroicons</a>
    <a href={LINK.MOTION} target="_blank" rel="noreferrer">Motion</a>
    <a href={LINK.GITHUB} target="_blank" rel="noreferrer">GitHub</a>
    <a href={LINK.SPONSOR} target="_blank" rel="noreferrer">Sponsor</a>
  </div>
</main>
