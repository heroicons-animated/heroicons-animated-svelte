<script lang="ts">
  import type { Snippet } from "svelte";
  import ArrowPath from "$lib/icons/arrow-path.svelte";
  import Check from "$lib/icons/check.svelte";
  import XMark from "$lib/icons/x-mark.svelte";

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
    status === "loading" && !showLoading ? "idle" : status
  );
</script>

{#key currentKey}
  <span
    class="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0 transition-[opacity,transform,filter] duration-100"
  >
    {#if status === "loading" && showLoading}
      <ArrowPath class="animate-spin" size={16} />
    {:else if status === "done"}
      <Check class="text-green-600" size={16} />
    {:else if status === "error"}
      <XMark class="text-red-500" size={16} />
    {:else}
      {@render children?.()}
    {/if}
  </span>
{/key}
