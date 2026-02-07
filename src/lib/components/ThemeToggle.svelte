<script lang="ts">
  import { onMount } from "svelte";
  import Moon from "@heroicons-animated/svelte/moon.svelte";
  import Sun from "@heroicons-animated/svelte/sun.svelte";

  let isDark = $state(false);

  const applyTheme = (dark: boolean) => {
    isDark = dark;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  onMount(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      applyTheme(true);
    } else if (stored === "light") {
      applyTheme(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      applyTheme(prefersDark);
    }
  });

  function toggleTheme() {
    const next = !isDark;
    localStorage.setItem("theme", next ? "dark" : "light");
    applyTheme(next);
  }
</script>

<button
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  aria-pressed={isDark}
  class="supports-[corner-shape:squircle]:corner-squircle flex size-9 cursor-pointer items-center justify-center rounded-[14px] bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-white/10"
  onclick={toggleTheme}
  type="button"
>
  <span class="flex items-center justify-center">
    {#if isDark}
      <Moon aria-hidden="true" size={16} />
    {:else}
      <Sun aria-hidden="true" size={16} />
    {/if}
  </span>
</button>
