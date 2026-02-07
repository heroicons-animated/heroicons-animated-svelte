<script lang="ts">
  import { onMount } from "svelte";
  import { LINK } from "$lib/constants";

  let stars = $state<number | null>(null);

  onMount(async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/heroicons-animated/heroicons-animated-svelte"
      );
      if (!response.ok) return;
      const data = await response.json();
      if (typeof data?.stargazers_count === "number") {
        stars = data.stargazers_count;
      }
    } catch {
      // ignore
    }
  });
</script>

<a
  aria-label={`Star on GitHub${stars !== null ? ` (${stars.toLocaleString()} stars)` : ""}`}
  class="group/github-stars supports-[corner-shape:squircle]:corner-squircle flex size-9 items-center justify-center gap-2 rounded-[14px] bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] sm:size-auto sm:px-2.5 sm:py-2 dark:bg-white/10"
  href={LINK.GITHUB}
  rel="noopener noreferrer"
  tabindex="0"
  target="_blank"
>
  <svg aria-hidden="true" class="size-4" fill="currentColor" viewBox="0 0 16 16">
    <path
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
    />
  </svg>
  {#if stars === null}
    <span
      aria-hidden="true"
      class="hidden h-4 w-[32px] animate-pulse rounded-[6px] bg-neutral-200/70 sm:inline-block dark:bg-neutral-700/60"
    ></span>
  {:else}
    <span
      aria-hidden="true"
      class="hidden min-w-[32px] text-center font-sans text-black text-sm tabular-nums tracking-[-0.4px] [text-shadow:-0.1px_0_0_currentColor,0.1px_0_0_currentColor] sm:inline dark:text-white"
    >
      {stars.toLocaleString()}
    </span>
  {/if}
  <svg
    aria-hidden="true"
    class="hidden text-neutral-400 transition-colors duration-100 group-hover/github-stars:text-[#e3b341] sm:block"
    fill="none"
    height="13"
    viewBox="0 0 13 13"
    width="13"
  >
    <path
      clip-rule="evenodd"
      d="M6.45803 2.89654e-06C6.6061 0.000101587 6.75082 0.0440267 6.87397 0.126243C6.99712 0.208458 7.09317 0.325286 7.15003 0.462003L8.56003 3.855L12.224 4.148C12.3717 4.15988 12.5125 4.2152 12.6287 4.30699C12.7449 4.39878 12.8314 4.52293 12.8772 4.66379C12.923 4.80464 12.926 4.9559 12.8859 5.09849C12.8459 5.24108 12.7645 5.36861 12.652 5.465L9.86103 7.855L10.714 11.43C10.7483 11.574 10.7392 11.725 10.6878 11.8638C10.6364 12.0027 10.5451 12.1233 10.4253 12.2103C10.3056 12.2973 10.1627 12.347 10.0148 12.353C9.86685 12.359 9.72045 12.3211 9.59403 12.244L6.45603 10.33L3.32103 12.245C3.19461 12.3221 3.04821 12.36 2.90027 12.354C2.75234 12.348 2.60949 12.2983 2.48972 12.2113C2.36996 12.1243 2.27864 12.0037 2.22726 11.8649C2.17589 11.726 2.16676 11.575 2.20103 11.431L3.05303 7.857L0.263028 5.467C0.150277 5.37074 0.0685828 5.24323 0.028266 5.10056C-0.0120509 4.9579 -0.00918217 4.80648 0.0365099 4.66545C0.082202 4.52441 0.168667 4.40008 0.284984 4.30816C0.401301 4.21624 0.54225 4.16086 0.690028 4.149L4.35303 3.856L5.76303 0.463003C5.81993 0.325626 5.91638 0.208264 6.04013 0.125824C6.16387 0.0433847 6.30933 -0.000410263 6.45803 2.89654e-06Z"
      fill="currentColor"
      fill-rule="evenodd"
    />
  </svg>
</a>
