<script lang="ts">
  import type { Snippet } from "svelte";
  import ArrowPath from "@heroicons-animated/svelte/arrow-path.svelte";
  import Check from "@heroicons-animated/svelte/check.svelte";
  import XMark from "@heroicons-animated/svelte/x-mark.svelte";

  let {
    status = "idle",
    loadingDelay = 150,
    children,
  }: {
    status?: "idle" | "loading" | "done" | "error";
    loadingDelay?: number;
    children?: Snippet;
  } = $props();

  let showLoading = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    if (status === "loading") {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          showLoading = true;
        }, loadingDelay);
      }
    } else {
      showLoading = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  });

  let currentKey = $derived(() =>
    status === "loading" && !showLoading ? "idle" : status,
  );
</script>

{#key currentKey}
  <span
    class="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0 transition-[opacity,transform,filter] duration-100"
  >
    {#if status === "loading" && showLoading}
      <ArrowPath aria-hidden="true" class="animate-spin" size={16} />
    {:else if status === "done"}
      <Check aria-hidden="true" class="text-green-600" size={16} />
    {:else if status === "error"}
      <XMark aria-hidden="true" class="text-red-500" size={16} />
    {:else}
      {@render children?.()}
    {/if}
  </span>
{/key}
