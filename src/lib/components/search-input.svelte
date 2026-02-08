<script lang="ts">
  import { onMount } from "svelte";
  import MagnifyingGlass from "$lib/icons/magnifying-glass.svelte";
  import { Input } from "$lib/components/ui/input";
  import Kbd from "$lib/components/ui/kbd.svelte";

  let {
    value = $bindable(""),
    resultCount,
    totalCount,
  }: {
    value?: string;
    resultCount?: number;
    totalCount?: number;
  } = $props();

  let inputRef = $state<HTMLInputElement | null>(null);

  const showResultCount = $derived(
    value.length > 0 && resultCount !== undefined && totalCount !== undefined
  );

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        inputRef?.focus();
      }
      if (event.key === "Escape") {
        value = "";
        inputRef?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
</script>

<div
  class="sticky top-0 z-50 border-neutral-200 border-y bg-background/80 backdrop-blur-md dark:border-neutral-800 dark:bg-background/80"
>
  <div
    class="view-container flex items-center gap-2 border-neutral-200 py-2 xl:border-x dark:border-neutral-800"
  >
    <div class="group relative w-full">
      <span
        class="pointer-events-none absolute top-1/2 left-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
      >
        <MagnifyingGlass class="size-5 text-neutral-400" size={20} />
      </span>
      <Input
        bind:ref={inputRef}
        bind:value
        aria-label="Search icons"
        autocomplete="off"
        autocorrect="off"
        class="flex h-10 w-full min-w-0 px-3 py-1 text-sm outline-none ring-1 bg-white text-neutral-800 ring-neutral-200 selection:bg-primary selection:text-white placeholder:text-neutral-400/70 dark:bg-[#0A0A0A] dark:text-neutral-100 dark:ring-neutral-800 transition-[color,box-shadow,ring-color] focus-visible:ring-primary dark:focus-visible:ring-primary supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[24px] pl-10 pr-12"
        inputmode="search"
        placeholder="Search icons..."
        role="search"
        spellcheck="false"
        type="search"
      />
      <span
        class="pointer-events-none absolute top-1/2 right-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
      >
        {#if showResultCount}
          <span class="font-mono text-neutral-400 text-sm">
            {resultCount}/{totalCount}
          </span>
        {:else}
          <Kbd
            class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
          >
            ⌘ K
          </Kbd>
        {/if}
      </span>
    </div>
  </div>
</div>
