<script lang="ts">
  import Moon from "$lib/icons/moon.svelte";
  import Sun from "$lib/icons/sun.svelte";
  import { useTheme } from "svelte-themes";

  const theme = useTheme();
  let isDark = $derived((theme.resolvedTheme ?? theme.theme) === "dark");
  let isIconHovered = $state(false);

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    theme.theme = next;
  }

  function handleMouseEnter() {
    isIconHovered = true;
  }

  function handleMouseLeave() {
    isIconHovered = false;
  }
</script>

<button
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  aria-pressed={isDark}
  class="supports-[corner-shape:squircle]:corner-squircle flex size-9 cursor-pointer items-center justify-center rounded-[14px] bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-white/10"
  onclick={toggleTheme}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  type="button"
>
  <span class="flex items-center justify-center">
    {#if isDark}
      <Moon aria-hidden="true" size={16} animate={isIconHovered} />
    {:else}
      <Sun aria-hidden="true" size={16} animate={isIconHovered} />
    {/if}
  </span>
</button>
