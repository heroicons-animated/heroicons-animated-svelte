<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import ClipboardDocument from "$lib/icons/clipboard-document.svelte";
  import { PACKAGE_MANAGER, SITE } from "$lib/constants";
  import { getCLICommand, getRegistryPathPrefix, getShadcnCLI } from "$lib/cli";
  import { getPackageManagerPrefix } from "$lib/package-manager";
  import { cn } from "$lib/utils.js";
  import { packageManager } from "$lib/state";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import IconState from "$lib/components/ui/icon-state.svelte";

  let {
    icons = [],
    staticIconName = "",
    className = "",
  }: {
    icons?: { name: string }[];
    staticIconName?: string;
    className?: string;
  } = $props();

  const iconList = $derived(
    (icons || []).filter((icon) => icon.name.length <= 20)
  );

  let loopIndex = $state(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    if (staticIconName) {
      return;
    }
    intervalId = setInterval(() => {
      if (iconList.length === 0) {
        return;
      }
      loopIndex = (loopIndex + 1) % iconList.length;
    }, 1500);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  const currentIconName = $derived(
    staticIconName || iconList[loopIndex]?.name || ""
  );

  let copyStatus = $state<"idle" | "done" | "error">("idle");

  async function handleCopy() {
    if (copyStatus !== "idle") {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        getCLICommand($packageManager, currentIconName)
      );
      copyStatus = "done";
      setTimeout(() => (copyStatus = "idle"), 2000);
    } catch {
      copyStatus = "error";
      setTimeout(() => (copyStatus = "idle"), 2000);
    }
  }
</script>

<div class={cn("relative mt-[40px] w-full max-w-[642px] px-4", className)}>
  <Tabs class="w-full" bind:value={$packageManager}>
    <TabsList class="w-full" onclick={(event) => event.stopPropagation()}>
      {#each Object.values(PACKAGE_MANAGER) as pm}
        <TabsTrigger
          value={pm}
          class="z-50 inline-flex cursor-pointer items-center justify-center whitespace-nowrap bg-white px-4 py-1 font-mono text-black text-sm tracking-[-0.39px] hover:bg-neutral-50 data-[state=active]:bg-primary data-[state=active]:text-white dark:bg-white/10 dark:text-white dark:data-[state=active]:bg-primary dark:hover:bg-white/5 first:rounded-tl-[8px] last:rounded-tr-[8px] supports-[corner-shape:squircle]:first:corner-tl-squircle supports-[corner-shape:squircle]:first:rounded-tl-[14px] supports-[corner-shape:squircle]:last:corner-tr-squircle supports-[corner-shape:squircle]:last:rounded-tr-[14px] transition-[background-color] duration-50 focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary"
        >
          {pm}
        </TabsTrigger>
      {/each}
    </TabsList>

    {#each Object.values(PACKAGE_MANAGER) as pm}
      <TabsContent
        value={pm}
        class="supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle mt-px overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]"
      >
        <div class="relative w-full overflow-hidden">
          <ScrollArea
            orientation="horizontal"
            class="relative w-full overflow-hidden"
            scrollbarXClasses="pointer-events-none absolute right-2! bottom-1! left-2! flex h-0.5 touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-100 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:duration-0 dark:bg-neutral-700"
          >
            <div
              class="overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-white focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-0 dark:bg-white/10 supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px] isolate whitespace-nowrap px-4 py-3 pr-20 font-mono text-sm tracking-[-0.39px] before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:block before:h-full before:rounded-bl-[10px] supports-[corner-shape:squircle]:before:corner-bl-squircle supports-[corner-shape:squircle]:before:rounded-bl-[14px] before:transition-[width] before:duration-50 before:ease-out before:content-[''] before:w-[min(40px,var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,white,transparent)] dark:before:bg-[linear-gradient(to_right,rgb(47_47_47/1),transparent)] before:[--scroll-area-overflow-x-start:inherit] after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:block after:h-full after:rounded-r-[10px] supports-[corner-shape:squircle]:after:corner-r-squircle supports-[corner-shape:squircle]:after:rounded-r-[14px] after:transition-[width] after:duration-50 after:ease-out after:content-[''] after:w-[calc(min(40px,var(--scroll-area-overflow-x-end,100px))+100px)] after:bg-[linear-gradient(to_left,white_0%,white_30%,transparent)] dark:after:bg-[linear-gradient(to_left,rgb(47_47_47/1)_0%,rgb(47_47_47/1)_30%,transparent)] after:[--scroll-area-overflow-x-end:inherit]"
            >
              <span class="sr-only">
                {getPackageManagerPrefix(pm)}
                {getShadcnCLI()} add @{SITE.NAME}/
                {staticIconName || currentIconName}
              </span>
              <span class="text-neutral-600 dark:text-neutral-400">
                {getPackageManagerPrefix(pm)}
              </span>
              <span class="text-black dark:text-white">
                {getShadcnCLI()} add @{SITE.NAME}
                {getRegistryPathPrefix()}
              </span>
              {#if staticIconName}
                <span class="shrink-0 text-primary">{staticIconName}</span>
              {:else}
                {#key loopIndex}
                  <span class="shrink-0 text-primary text-loop">
                    {currentIconName}
                  </span>
                {/key}
              {/if}
            </div>
          </ScrollArea>
          <button
            aria-disabled={copyStatus !== "idle"}
            aria-label="Copy to clipboard"
            class="supports-[corner-shape:squircle]:corner-squircle absolute top-1/2 right-1.5 z-20 -translate-y-1/2 cursor-pointer rounded-[6px] p-2 transition-[background-color] duration-100 focus-within:outline-offset-1 hover:bg-neutral-100 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[8px] dark:hover:bg-neutral-700"
            onclick={handleCopy}
            type="button"
          >
            <IconState status={copyStatus}>
              <ClipboardDocument aria-hidden="true" size={16} />
            </IconState>
          </button>
        </div>
      </TabsContent>
    {/each}
  </Tabs>
</div>

<style>
  .text-loop {
    display: inline-block;
    transform-origin: 50% 50%;
    will-change: transform, opacity, filter;
    animation: text-loop-in 0.25s ease-out;
  }

  @keyframes text-loop-in {
    0% {
      transform: translateY(-12px) rotateX(-90deg);
      opacity: 0;
      filter: blur(2px);
    }
    100% {
      transform: translateY(0) rotateX(0deg);
      opacity: 1;
      filter: blur(0);
    }
  }
</style>
