<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import ClipboardDocument from "@heroicons-animated/svelte/clipboard-document.svelte";
  import CommandLine from "@heroicons-animated/svelte/command-line.svelte";
  import Pause from "@heroicons-animated/svelte/pause.svelte";
  import Play from "@heroicons-animated/svelte/play.svelte";
  import { ICON_COMPONENTS } from "$lib/icon-components";
  import { getCLICommand, getFileExtension } from "$lib/cli";
  import { packageManager } from "$lib/state";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import IconState from "$lib/components/ui/icon-state.svelte";
  import { cn } from "$lib/utils.js";

  let {
    name,
    size = 40,
    showActions = true,
    showTitle = true,
    reserveActionSlot = true,
    actionsAlwaysVisible = false,
    cardClassName = "",
    iconClassName = "",
  }: {
    name: string;
    size?: number;
    showActions?: boolean;
    showTitle?: boolean;
    reserveActionSlot?: boolean;
    actionsAlwaysVisible?: boolean;
    cardClassName?: string;
    iconClassName?: string;
  } = $props();

  let IconComponent = $derived(ICON_COMPONENTS[name]);
  let iconRef = $state<any>(null);
  let isTouch = $state(false);
  let isAnimating = $state(false);
  let playTimeout: ReturnType<typeof setTimeout> | null = null;
  const ext = getFileExtension();

  onMount(() => {
    isTouch = window.matchMedia("(hover: none)").matches;
  });

  onDestroy(() => {
    if (playTimeout) clearTimeout(playTimeout);
  });

  function handleMouseEnter() {
    if (isTouch) return;
    iconRef?.startAnimation?.();
  }

  function handleMouseLeave() {
    if (isTouch) return;
    iconRef?.stopAnimation?.();
  }

  function handlePlayClick() {
    if (isAnimating) {
      iconRef?.stopAnimation?.();
      isAnimating = false;
      if (playTimeout) clearTimeout(playTimeout);
      return;
    }

    iconRef?.startAnimation?.();
    isAnimating = true;
    playTimeout = setTimeout(() => {
      isAnimating = false;
      iconRef?.stopAnimation?.();
    }, 1500);
  }

  let cliState = $state<"idle" | "done" | "error">("idle");
  let codeState = $state<"idle" | "loading" | "done" | "error">("idle");

  async function handleCopyCLI(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (cliState !== "idle") return;
    try {
      await navigator.clipboard.writeText(getCLICommand($packageManager, name));
      cliState = "done";
      setTimeout(() => (cliState = "idle"), 2000);
    } catch {
      cliState = "error";
      setTimeout(() => (cliState = "idle"), 2000);
    }
  }

  async function handleCopyCode(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (codeState !== "idle") return;
    try {
      codeState = "loading";
      const response = await fetch(`/r/${name}.json`);
      const data = await response.json();
      const content = data?.files?.[0]?.content;
      if (!content) throw new Error("Missing content");
      await navigator.clipboard.writeText(content);
      codeState = "done";
      setTimeout(() => (codeState = "idle"), 2000);
    } catch {
      codeState = "error";
      setTimeout(() => (codeState = "idle"), 2000);
    }
  }
</script>

<div
  class={cn(
    "group/card supports-[corner-shape:squircle]:corner-squircle relative flex flex-col items-center justify-center rounded-[20px] bg-white px-[28px] pt-[50px] supports-[corner-shape:squircle]:rounded-[30px] dark:bg-[#0A0A0A]",
    cardClassName,
  )}
  role="group"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {#if isTouch}
    <button
      aria-label={isAnimating ? "Stop animation" : "Play animation"}
      aria-pressed={isAnimating}
      class="supports-[corner-shape:squircle]:corner-squircle absolute top-3 right-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
      type="button"
      onclick={handlePlayClick}
    >
      {#if isAnimating}
        <Pause
          aria-hidden="true"
          class="size-4 text-neutral-800 dark:text-neutral-100"
          size={16}
        />
      {:else}
        <Play
          aria-hidden="true"
          class="size-4 text-neutral-800 dark:text-neutral-100"
          size={16}
        />
      {/if}
    </button>
  {/if}

  {#if IconComponent}
    <IconComponent
      bind:this={iconRef}
      {size}
      class={cn(
        "flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100",
        iconClassName,
      )}
    />
  {/if}

  {#if showTitle}
    <p
      class="mt-[36px] line-clamp-1 text-center font-mono text-[#9F9FA9] text-xs dark:text-[#D4D4D4]"
      title={name}
    >
      {name}
    </p>
  {/if}

  {#if showActions}
    <TooltipProvider>
      <div
        class={cn(
          "my-6 flex items-center justify-center gap-2 transition-opacity duration-100",
          actionsAlwaysVisible
            ? "opacity-100"
            : "opacity-0 group-hover/card:opacity-100 has-data-busy:opacity-100 has-data-popup-open:opacity-100 has-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
        )}
      >
        <Tooltip>
          <TooltipTrigger
            aria-disabled={codeState !== "idle"}
            aria-label={`Copy .${ext} code`}
            class="supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
            data-busy={codeState !== "idle" ? "" : undefined}
            onclick={handleCopyCode}
            type="button"
          >
            <IconState status={codeState}>
              <ClipboardDocument
                aria-hidden="true"
                class="size-4 text-neutral-800 dark:text-neutral-100"
                size={16}
              />
            </IconState>
          </TooltipTrigger>
          <TooltipContent>
            Copy <code
              class="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono"
              >.{ext}</code
            > code
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            aria-disabled={cliState !== "idle"}
            aria-label="Copy shadcn/cli command"
            class="supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
            data-busy={cliState !== "idle" ? "" : undefined}
            onclick={handleCopyCLI}
            type="button"
          >
            <IconState status={cliState}>
              <CommandLine
                aria-hidden="true"
                class="size-4 text-neutral-800 dark:text-neutral-100"
                size={16}
              />
            </IconState>
          </TooltipTrigger>
          <TooltipContent>
            Copy <code
              class="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono"
              >shadcn/cli</code
            > command
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  {/if}
</div>
